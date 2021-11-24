import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { CircularProgress, Grid } from '@material-ui/core';
import Division from './Division/Division';
import { green } from '@material-ui/core/colors';

const Divisions = ({currentDivisionId, setCurrentDivisionId, setFormType}) => {
    const classes = useStyles();
    const { divisions, isLoading } = useSelector((state) => state.divisions);

    if (!divisions?.length && !isLoading) return 'No Divisions';

    return (
      isLoading ? <CircularProgress size={100} className={classes.circularProgress}/> : (
          <Grid container alignItems="stretch" spacing={3} className={classes.mainContainer} elevation={6}>
              {divisions?.map((division) => (
                  <Grid key={division.id} item xs={12} sm={12} md={6} lg={3}>
                      <Division division={division} setCurrentDivisionId={setCurrentDivisionId} currentDivisionId={currentDivisionId} setFormType={setFormType}/>
                  </Grid>
              ))}
          </Grid>
      )
    )
}

export default Divisions;