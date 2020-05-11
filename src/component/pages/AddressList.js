import React, { useState, useEffect } from 'react';
import Dexie from "dexie";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    emptyLayout: {
        alignItems: "center",
        textAlign: "center",
        marginTop: '16em',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('90%' + theme.spacing(2) * 2)]: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: '25px'
    },
    locationIcon: {
        width: "100px",
        height: "100px",
        textAlign: "center"
    },
    srnoStyle: {
        backgroundColor: "#274e73",
        color: "white",
        width: "2em",
        height: "2em",
        paddingTop: "4px",
        textAlign: "center",
        borderRadius: "4em"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '150px',
    },
    alignRight: {
        textAlign: 'right',
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(3),
        },
    },
}));

export default function Review() {
    let history = useHistory();
    const classes = useStyles();
    const db = new Dexie("AddressBook");
    db.version(1).stores({
        addresses: "locationName, suitNo, facilityTime, city, state, appointmentPool, contact, zipCode, addressLineOne, addressLineTwo"
    })

    const [addresses, setAddresses] = useState("");
    useEffect(() => {
        const getAddresses = async () => {
            let allAddresses = await db.addresses.toArray();
            setAddresses(allAddresses);
        }
        getAddresses();
    }, [])

    function onDelete() {
        history.push("/");
    }

    const [itemValue, setItemValue] = React.useState('');
    const handleChange = (event) => {
        setItemValue(event.target.value);
    };

    let itemsPerPage = [
        "5",
        "10",
        "15",
        "20",
        "25",
    ];
    return (
        <React.Fragment>
            {(addresses.length > 0) ?
                <React.Fragment>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={1} >
                                    <Typography variant="h6" >
                                        Srno.
                     </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="h6" >
                                        Location Name
                     </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="h6" >
                                        Address
                     </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="h6" >
                                        Phone No.
                     </Typography>
                                </Grid>
                                <Grid item xs={2} >
                                    <Typography variant="h6" >
                                        Action
                     </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </main>
                    {
                        addresses.map((address, idx) => (
                            <main key={idx} className={classes.layout}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1} >
                                            <Typography variant="body1" >
                                                <div className={classes.srnoStyle}> {idx + 1}</div>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Typography variant="body1" >
                                                {address.locationName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Typography variant="body1" >
                                                {address.addressLineOne}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Typography variant="body1" >
                                                {address.contact}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Typography variant="body1" >
                                                <DeleteIcon
                                                    onClick={(e) => {
                                                        db.addresses.delete(address.locationName);
                                                        history.push("/");
                                                    }}
                                                    style={{ color: 'red', cursor: 'pointer' }} />
                                                    
                                                    <EditIcon
                                                    onClick={(e) => {
                                                    }}
                                                    style={{ color: '#d1ab21', cursor: 'pointer' }} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </main>
                        ))
                    }
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2} >
                                <Grid item xs={6} className={classes.alignRight} >
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="items">Items per page:</InputLabel>
                                        <Select
                                            labelId="items"
                                            id="items" name="items"
                                            value={itemValue}
                                            onChange={handleChange}
                                        >
                                            {
                                                itemsPerPage.map((item, i) => (
                                                    <MenuItem key={i} value={item}>{item}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} >
                                    <div className={classes.root}>
                                        <Pagination count={10} showFirstButton showLastButton />
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </main>
                </React.Fragment> :
                <main className={classes.emptyLayout}>
                    <svg className={classes.locationIcon}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    <h2>Kindly Add Your Location First</h2>
                    <span>There is no location right now</span>
                </main>
            }
        </React.Fragment>
    );
}