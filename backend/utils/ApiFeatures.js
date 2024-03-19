class ApiFeatures {
    constructor (query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search()
    {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i",
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter()
    {
        const queryCopy = {...this.queryString}

        // Removing Some Fields For Category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach (key => delete queryCopy[key])

        // Filter For Price And Rating
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace (/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        //console.log (queryString);
        //console.log(queryCopy);
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    pagination(resultPerPage)
    {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};


module.exports = ApiFeatures;