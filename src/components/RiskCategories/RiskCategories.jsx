import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { CircularProgress, Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import RiskCategory from './RiskCategory/RiskCategory';

const RiskCategories = ({currentRiskCategoryId, setCurrentRiskCategoryId, setFormType}) => {
    const classes = useStyles();
    const { riskCategories, isLoading } = useSelector((state) => state.riskCategories);

    if (!riskCategories?.length && !isLoading) return 'No Risk Categories';

    return (
      isLoading ? <CircularProgress size={100} className={classes.circularProgress}/> : (
          <Grid container alignItems="stretch" spacing={3} className={classes.mainContainer} elevation={6}>
              {riskCategories?.map((riskCategory) => (
                  <Grid key={riskCategory.id} item xs={12} sm={12} md={6} lg={3}>
                      <RiskCategory riskCategory={riskCategory} setCurrentRiskCategoryId={setCurrentRiskCategoryId} currentRiskCategoryId={currentRiskCategoryId} setFormType={setFormType}/>
                  </Grid>
              ))}
          </Grid>
      )
    )
}

export default RiskCategories;