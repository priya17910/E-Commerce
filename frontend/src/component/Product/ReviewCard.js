import React from 'react';
import { Rating } from '@mui/material';
import profilePng from '../../images/Profile.png';
import StarIcon from '@mui/icons-material/Star';
const styles = {
    starIcon: {
      color: 'goldenrod',
      fontSize: 20
    },
    starIconEmpty: {
        color: 'lightGray',
        fontSize: 20
    }
};
const ReviewCard = ({review}) => {
    const options = {
        name: "custom-size",
        edit: false,
        value: review.rating,
        readOnly: true,
        precision: 0.5
    };
    return (
        <div className='reviewCard'>
            <img src = {profilePng} alt = "User" />
            <p>{review.name}</p>
            <Rating {...options} 
            icon={<StarIcon style={styles.starIcon} />}
            emptyIcon={<StarIcon style={styles.starIconEmpty} />} />
            <span className='reviewCardComment'>{review.comment}</span>
        </div>
  )
}

export default ReviewCard