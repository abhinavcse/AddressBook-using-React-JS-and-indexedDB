import React, { useState, useEffect } from 'react';
import Dexie from "dexie";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import SelectTimezoneMaterialUi from 'select-timezone-material-ui';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const TagsInput = props => {
    const [tags, setTags] = React.useState(props.tags);
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    return (
        <div className="tags-input">
            <ul id="tags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon'
                            onClick={() => removeTags(index)}
                        >
                            x
						</span>
                    </li>
                ))}
            </ul>
            <TextField
                required
                id="appointmentPool"
                name="appointmentPool"
                label="Appointment Pool (Enter to Add Tags)"
                fullWidth
                autoComplete="appointment pool"
                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    button: {
        marginTop: '15px',
        float: 'right',
        marginLeft: '5px',
        width: '120px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
let location = {
    locationName: '',
    suitNo: '',
    state: '',
    addressLineOne: '',
    appointmentPool: '',
    contact: '',
    zipCode: '',
    facilityTime: '',
    city: '',
    addressLineTwo: '',
};

export default function AddressForm() {
    let [msg, setMsg] = useState("");

    let history = useHistory();
    const db = new Dexie("AddressBook");
    db.version(1).stores({
        addresses: `locationName, suitNo, facilityTime, city, state,
         appointmentPool, contact, zipCode, addressLineOne, addressLineTwo`
    })
    function reset() {
        document.getElementById("form").reset();
    }
    const classes = useStyles();
    const [addresses, setAddresses] = useState("");

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    function GrowTransition(props) {
        return <Grow {...props} />;
    }
    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
        msg: ''
    });

    const handleClick = (msg) => {
        setState({
            open: true,
            msg: msg
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    const [addressCount, setAddressCount] = React.useState('');
    const getAddressesCount = async () => {
        let allAddresses = await db.addresses.toArray();
        setAddressCount(allAddresses.length);
    }
    function onSubmit() {
        getAddressesCount();
            console.log(addressCount);
        if (location['locationName'] != '' && location['suitNo'] != '' && location['state'] != '' && location['addressLineOne'] != ''
            && location['appointmentPool'] && location['contact'] && location['zipCode'] && location['facilityTime'] != '' && location['city'] != '' && location['addressLineTwo']) {
            let zipCode = location['zipCode']; let contact = location['contact'];
            if (zipCode.length < 5 || zipCode.length > 10 || zipCode.indexOf(' ') >= 0) {
                return handleClick("Zip code is not valid");
            } else if (isNaN(contact) || contact.length < 10 || contact.length > 10 || contact.indexOf(' ') >= 0) {
                return handleClick("Phone number is not valid");
            }
            location.contact = formatPhoneNumber(contact);
            
            db.addresses.add(location).then(async () => {
                let allAddresses = await db.addresses.toArray();
                setAddresses(allAddresses);
                history.push("/");
            });
        } else {
            
            handleClick("Please fill the form completly");
        }
    }

    const [indianState, setIndianState] = React.useState('');
    const handleChange = (event) => {
        setIndianState(event.target.value);
        location.state = event.target.value;
    };

    const selectedTags = tags => {
        location.appointmentPool = tags;
    };


    let stateIndia = ["Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"];

    return (
        <React.Fragment>
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message={state.msg}
            />
            <form id="form">
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Add Locations
                    </Typography>
                        {msg}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="locationName"
                                    name="locationName"
                                    label="Location Name"
                                    fullWidth
                                    autoComplete="location name"
                                    onChange={(event) => {
                                        location.locationName = event.target.value;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="address1"
                                    name="address1"
                                    label="Address line 1"
                                    fullWidth
                                    autoComplete="address-line1"
                                    onChange={(event) => {
                                        location.addressLineOne = event.target.value;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="suitno"
                                    name="suitno"
                                    label="Suit No"
                                    fullWidth
                                    autoComplete="suit no"
                                    onChange={(event) => {
                                        location.suitNo = event.target.value;
                                        console.log(location);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    id="address2"
                                    name="address2"
                                    label="Address line 2"
                                    fullWidth
                                    autoComplete="address-line2"
                                    onChange={(event) => {
                                        location.addressLineTwo = event.target.value;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    autoComplete="city"
                                    onChange={(event) => {
                                        location.city = event.target.value;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="State/Province/Region">State/Region</InputLabel>
                                    <Select
                                        labelId="State/Province/Region"
                                        id="state" name="state"
                                        value={indianState}
                                        onChange={handleChange}
                                    >
                                        {
                                            stateIndia.map((item, i) => (
                                                <MenuItem key={i} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="zip"
                                    name="zip"
                                    label="Zip code"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    onChange={(event) => {
                                        location.zipCode = event.target.value;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="contact"
                                    name="contact"
                                    label="Phone Number"
                                    fullWidth
                                    autoComplete="phone number"
                                    onChange={(event) => {
                                        location.contact = event.target.value;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <SelectTimezoneMaterialUi
                                    label="Timezone"
                                    helpertext="Please select a timezone from the list"
                                    onChange={(event) => {
                                        location.timeZone = event;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TagsInput selectedTags={selectedTags}
                                    tags={[]} />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="facility"
                                    name="facility"
                                    label="Facility Time"
                                    fullWidth
                                    autoComplete="facility time"
                                    onChange={(event) => {
                                        location.facilityTime = event.target.value;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button className={classes.button}
                                    color="primary" onClick={onSubmit}
                                    variant="contained" >
                                    Save
                            </Button>
                                <Button onClick={reset} className={classes.button} color="secondary"
                                    variant="contained" >
                                    Cancel
                            </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </main>
            </form>
        </React.Fragment >
    );
}