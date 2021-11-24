import { React } from 'react';

import useStyles from './styles';

export const FalconLoadingPage = () => {
    const classes = useStyles();

    return (
        <div>
            <h1 className={classes.loading}>Component loading...</h1>
        </div>
    )
}
