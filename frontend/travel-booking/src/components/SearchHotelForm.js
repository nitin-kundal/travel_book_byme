import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { majorIndianCities } from '../config/Cities';
import { formatDate } from '../utils/Utils';

function SearchHotelForm({ classes }) {
    const today = new Date();
    const defaultCheckOut = new Date(today);
    defaultCheckOut.setDate(today.getDate() + 1);
    const defaultDestination = majorIndianCities[0]?.value;

    const [destination, setDestination] = React.useState(defaultDestination);
    const [checkInDate, setCheckInDate] = React.useState(formatDate(today));
    const [checkOutDate, setCheckOutDate] = React.useState(formatDate(defaultCheckOut));
    const navigate = useNavigate();

    const handleSubmit = async () => {
        navigate(`/hotels?destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    };

    const handleCheckInChange = (date) => {
        setCheckInDate(formatDate(date));
        const newCheckOut = new Date(date);
        newCheckOut.setDate(date.getDate() + 1);
        setCheckOutDate(formatDate(newCheckOut));
    };

    const handleDestinationChange = (e, selected) => {
        const { value } = selected || {};
        setDestination(value);
    }

    return (<form noValidate autoComplete="off">
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    value={majorIndianCities[0]}
                    options={majorIndianCities}
                    classes={{ option: classes.option }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(option) => option.label}
                    onChange={handleDestinationChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a destination"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={6} sm={3}>
                    <DatePicker
                        label="Check-in Date"
                        fullWidth
                        inputVariant="outlined"
                        disablePast
                        value={new Date(checkInDate)}
                        onChange={handleCheckInChange}
                        format="yyyy-MM-dd"
                        className={classes.textField}
                        disableToolbar
                        autoOk
                        shouldDisableDate={(date) => date < today}
                        variant="inline"
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DatePicker
                        label="Check-out Date"
                        fullWidth
                        inputVariant="outlined"
                        value={new Date(checkOutDate)}
                        onChange={(date) => setCheckOutDate(formatDate(date))}
                        format="yyyy-MM-dd"
                        className={classes.textField}
                        disableToolbar
                        autoOk
                        disablePast
                        shouldDisableDate={(date) => date < new Date(checkInDate)}
                        variant="inline"
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    disabled={!(destination && checkInDate && checkOutDate)}
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    </form>)
}

export default SearchHotelForm;