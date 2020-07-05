import React, { Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import MomentUtils from '@date-io/moment';
import { Form } from 'react-final-form';
import {
    TextField,
    Checkboxes,
    DatePicker,
    TimePicker,
} from 'mui-rff';
import {
    Paper,
    Grid,
    Button,
    CssBaseline,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    }
    if (!values.description) {
        errors.description = 'Required';
    }
    if (!values.time) {
        errors.time = 'Required';
    }
    return errors;
};

const formFields = [
    {
        size: 12,
        field: (
            <TextField
                label="Title"
                name="title"
                margin="none"
                required={true}
            />
        ),
    },
    {
        size: 12,
        field: (
            <TextField
                label="Description"
                name="description"
                margin="none"
                required={true}
            />
        ),
    },
    {
        size: 12,
        field: (
            <Checkboxes
                name="remember"
                formControlProps={{ margin: 'none' }}
                data={{ label: 'Remember', value: true }}
                required={true}
            />
        ),
    },
    {
        size: 6,
        field: (
            <DatePicker
                name="date"
                margin="normal"
                label="Date"
                disabled
                dateFunsUtils={MomentUtils}

            />
        ),
    },
    {
        size: 6,
        field: (
            <TimePicker
                name="time"
                margin="normal"
                label="Time"
                required={true}
                dateFunsUtils={MomentUtils}

            />
        ),
    },
];

export default function FormDialog({ open, data, saveEvents, handleClose, isEdit }) {
    const onSubmit = async values => {
        saveEvents(values)
    };
    return (
        <Fragment>
            <CssBaseline />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <Paper style={{ padding: 16 }}>
                <DialogTitle id="form-dialog-title">{isEdit?"Edit":"Add"} Event<CloseIcon style={{ fontSize: 19 }} onClick={($event)=>handleClose($event)}></CloseIcon></DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ title: data.title, description: data.description, remember: data.remember, date: data.date, time: data.date, i:data.i }}
                        validate={validate}
                        render={({ handleSubmit, form, submitting, pristine }) => (
                            <form onSubmit={handleSubmit} noValidate>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                        {formFields.map((item, idx) => (
                                            <Grid item xs={item.size} key={idx}>
                                                {item.field}
                                            </Grid>
                                        ))}
                                        <Grid item style={{ marginTop: 16 }}>
                                            <Button
                                                type="button"
                                                variant="contained"
                                                onClick={form.reset}
                                                disabled={submitting || pristine}
                                            >
                                                Reset
                                            </Button>
                                        </Grid>
                                        <Grid item style={{ marginTop: 16 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={submitting}
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                            </form>
                        )} />
                </DialogContent>
                </Paper>
            </Dialog>
        </Fragment>
    )
}