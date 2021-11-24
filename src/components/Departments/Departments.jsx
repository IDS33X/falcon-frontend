import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { CircularProgress, Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Department from './Department/Department';

const Departments = ({currentDepartmentId, setCurrentDepartmentId, setFormType}) => {
    const classes = useStyles();
    const { departments, isLoading } = useSelector((state) => state.departments);

    if (!departments?.length && !isLoading) return 'No Departments';

    return (
      isLoading ? <CircularProgress size={100} className={classes.circularProgress}/> : (
          <Grid container alignItems="stretch" spacing={3} className={classes.mainContainer} elevation={6}>
              {departments?.map((department) => (
                  <Grid key={department.id} item xs={12} sm={12} md={6} lg={3}>
                      <Department department={department} setCurrentDepartmentId={setCurrentDepartmentId} currentDepartmentId={currentDepartmentId} setFormType={setFormType}/>
                  </Grid>
              ))}
          </Grid>
      )
    )
}

export default Departments;