import React , {useState, useEffect} from 'react';
import Dexie from "dexie";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import AddressForm from './pages/AddressForm';
import AddressList from './pages/AddressList';

 const db = new Dexie("AddressBook");
 
 db.version(1).stores({
     addresses: "locationName, addressLineOne, suitNo, addressLineTwo, city, state, zipCode, contact, timeZone, facilityTime, appointmentPool"
 })
 db.open().catch((err) => {
     console.log(err.stack || err)
 })
 

const useStyles = makeStyles((theme) => ({
    flex: {
        flexGrow: 1,
    },
    backGround: {
        backgroundColor: '#EFF0F2',
        width: '100%',
        height: '100vh',
        overflow: 'auto'
    },
    appBar: {
        position: 'relative',
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    button: {
        backgroundColor: "#48558c",
        color: "white",
        borderRadius: '15px'
    },
}));

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressList />;
        case 1:
            return <AddressForm />;
        case 2:
        //return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <div className={classes.backGround}>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.flex} color="inherit" >
                        Locations
                    </Typography>
                    {(activeStep !== 0)?
                    <Button onClick={handleBack} className={classes.button}>
                        Back
                        </Button>
                        :
                    <Button onClick={handleNext} variant="contained" className={classes.button}>
                        <AddIcon className={classes.rightIcon} /> Add Location
                    </Button>
                     }
                </Toolbar>
            </AppBar>
            <React.Fragment>
                {getStepContent(activeStep)}
            </React.Fragment>
        </div>
    );
}