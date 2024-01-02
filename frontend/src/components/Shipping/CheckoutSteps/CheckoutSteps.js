import './CheckoutSteps.css';
import { Typography, Stepper, Step, StepLabel } from '@mui/material';
import { LocalShipping, LibraryAddCheck, AccountBalance } from '@mui/icons-material';

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shopping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />
        },
    ];

    return (
        <div className="checkout-step">
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
                        <StepLabel icon={item.icon} style={{ color: activeStep >= index ? 'tomato' : "rgba(0, 0, 0, 0.234)" }} >{item.label} </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

export default CheckoutSteps;