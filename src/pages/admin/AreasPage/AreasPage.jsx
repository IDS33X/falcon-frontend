import React, { useState } from 'react';
import { Typography, Card, CardContent, CardActions, Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import Areas from '../../../components/Areas/Areas';

import useStyles from './styles';
import Layout from '../../../components/common/Layout/Layout';


const AreasPage = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const search = 'hola';

    return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField onKeyDown={() => {}} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={() => {}} />
                <Button onClick={() => {}} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </AppBar>
                <Card className={classes.root}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AreasPage

