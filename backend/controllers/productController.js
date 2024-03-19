const Product = require ('../models/productModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require ('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');
const cloudinary = require('cloudinary');

// Create Product --- Admin
exports.createProduct = catchAsyncErrors (async (req, res, next) => {

    let images = [];
    if (typeof(req.body.images) === "string")
    {
        images.push(req.body.images);
    }
    else
    {
        images = req.body.images;
    }


    const imagesLink = [];

    for(let i = 0; i < images.length; i++)
    {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;

    const product = await Product.create (req.body);
    res.status (201).json ({
        success: true,
        product
    })
});




// Get All Products
exports.getAllProducts = catchAsyncErrors (async (req,res, next) => {

    //return next (new ErrorHandler("This is my temp error", 500));
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const productsQuery = await new ApiFeatures (Product.find(), req.query)
    .search()
    .filter()
    .query;


    const apiFeatures = await new ApiFeatures (Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    //const products = await apiFeatures.query;
    const products = await apiFeatures.query;
    const filteredProductsCount = productsQuery.length;

    
    //const filteredProductsCount = products.length;
    //products = await apiFeatures.query;
    res.status(200).json ({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });
});


// Get Product Details
exports.getProductDetails = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById (req.params.id);
    if (!product)
    {
        return next(new ErrorHandler ("Product Not Found", 404));
    }
    res.status (200).json ({
        success: true,
        product
    })
});


// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product)
    {
        return next(new ErrorHandler ("Product Not Found", 404));
    }

    // IMAGES
    let images = [];
    if (typeof(req.body.images) === "string")
    {
        images.push(req.body.images);
    }
    else
    {
        images = req.body.images;
    }

    if (images !== undefined)
    {
        // DELETE IMAGES FROM CLOUDINARY
        for(let i = 0; i < product.images.length; i++)
        {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        const imagesLink = [];

        for(let i = 0; i < images.length; i++)
        {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status (200).json ({
        success: true,
        product
    })  
});

//Delete Product
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById (req.params.id);
    if (!product)
    {
        return next(new ErrorHandler ("Product Not Found", 404));
    }

    // DELETE IMAGES FROM CLOUDINARY
    for(let i = 0; i < product.images.length; i++)
    {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }


    await product.deleteOne();

    res.status (200).json ({
        success: true,
        message: "Product Deleted Successfully"
    })
});


// Create New Review or Update The Review
exports.createProductReview = catchAsyncErrors (async(req, res, next) => {

    const {rating, comment, productId} = req.body;


    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());
    if (isReviewed)
    {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString())
            {
                review.rating = rating;
                review.comment = comment;
            }
        })
    }
    else
    {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach(review => {
        avg = avg + review.rating;
    });

    product.ratings = avg /product.reviews.length;

    await product.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
    });
});


// Get All Reviews of a Product
exports.getProductReviews = catchAsyncErrors (async (req, res, next) => {
    console.log(req.query.productId);
    const product = await Product.findById (req.query.productId);
    if (!product)
    {
        return next(new ErrorHandler ("Product Not Found", 404));
    }
    
    res.status (200).json ({
        success: true,
        reviews: product.reviews,
    });
});


// Delete Review
exports.deleteReview = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById (req.query.productId);
    if (!product)
    {
        return next(new ErrorHandler ("Product Not Found", 404));
    }
    
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach(review => {
        avg = avg + review.rating;
    });

    let ratings = 0;
    if (reviews.length === 0)
    {
        ratings = 0;
    }
    else
    {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status (200).json ({
        success: true,
    });
});



// GET ALL PRODUCTS ADMIN
exports.getAllProductsAdmin = catchAsyncErrors (async (req,res, next) => {
    const products = await Product.find();
    res.status(200).json ({
        success: true,
        products: [
            products
        ]
    });
});