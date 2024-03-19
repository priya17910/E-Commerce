import React from 'react'
import { Rating } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import {Link} from 'react-router-dom';

const styles = {
  starIcon: {
    color: 'goldenrod',
    fontSize: 20,
  },
  starIconEmpty: {
    color: 'lightGray',
    fontSize: 20
  }
};

const Product = ({ product }) => {
  const options = {
    name: "custom-size",
    edit: false,
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small"
};


  return (
  <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <Rating {...options} 
            icon={<StarIcon style={styles.starIcon}/>}
            emptyIcon={<StarIcon style={styles.starIconEmpty} />} /> <span> ({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default Product