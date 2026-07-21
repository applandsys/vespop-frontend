"use client";

import React, { createContext, useState, useCallback, useContext } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

const SlideTransition = (props) => {
    return <Slide {...props} direction="up"  children={props.children} />;
};

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const showSnackbar = useCallback((msg, type = 'success') => {
        setMessage(msg);
        setSeverity(type);
        setOpen(true);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at the top-right
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
