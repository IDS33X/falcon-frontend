import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { CircularProgress, Grid } from '@material-ui/core';
import Area from './Area/Area';

const Areas = ({currentAreaId, setCurrentAreaId}) => {
    //const classes = useStyles();
    const { areas, isLoading } = useSelector((state) => state.areas);

    if (!areas.length && !isLoading) return 'No Areas';

    return (
      isLoading ? <CircularProgress/> : (
          <Grid container alignItems="stretch" spacing={3}>
              {areas?.map((area) => (
                  <Grid key={area.id} item xs={12} sm={12} md={6} lg={3}>
                      <Area area={area} setCurrentAreaId={setCurrentAreaId} currentAreaId={currentAreaId}/>
                  </Grid>
              ))}
          </Grid>
      )
    )
}

export default Areas;
