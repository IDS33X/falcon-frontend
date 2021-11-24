import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { CircularProgress, Grid } from '@material-ui/core';
import Area from './Area/Area';
import { green } from '@material-ui/core/colors';

const Areas = ({currentAreaId, setCurrentAreaId, setFormType }) => {
    const classes = useStyles();
    const { areas, isLoading } = useSelector((state) => state.areas);

    if (!areas.length && !isLoading) return 'No Areas';

    return (
      isLoading ? <CircularProgress size={100} className={classes.circularProgress}/> : (
          <Grid container alignItems="stretch" spacing={3} className={classes.mainContainer} elevation={6}>
              {areas?.map((area) => (
                  <Grid key={area.id} item xs={12} sm={12} md={6} lg={3}>
                      <Area area={area} setCurrentAreaId={setCurrentAreaId} currentAreaId={currentAreaId} setFormType={setFormType}/>
                  </Grid>
              ))}
          </Grid>
      )
    )
}

export default Areas;
