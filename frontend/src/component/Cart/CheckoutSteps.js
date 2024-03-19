import { Typography, Stepper, Step, StepLabel } from '@mui/material';
import React, { Fragment } from 'react';
import { MdLocalShipping, MdLibraryAddCheck, MdAccountBalance } from 'react-icons/md';
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <MdLocalShipping />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <MdLibraryAddCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <MdAccountBalance />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
        margin: "2vmax",
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {
                    steps.map((item, index) => (
                        <Step 
                        key={index} 
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                        >
                            <StepLabel style={{color: activeStep >= index ? "lightcoral" : "-moz-initialrgba(0, 0, 0, 0.649)"}} icon={item.icon}>
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))
                }

            </Stepper>
        </Fragment>
    )
}

export default CheckoutSteps