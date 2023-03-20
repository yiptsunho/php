import React from 'react';
import ItemForm from '../../components/ItemForm';
import { CssBaseline, Container, Paper } from '@mui/material';

function EditMenu() {

    return (
        <React.Fragment>
            <CssBaseline />
            <Container height="100%">
                <h1>Edit Menu</h1>
                <Paper elevation={3} sx={{ borderRadius: "16px" }}>
                    <ItemForm />
                </Paper>
            </Container>
        </React.Fragment>
    )
};

export default EditMenu;
