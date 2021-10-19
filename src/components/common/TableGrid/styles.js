import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    tableGrid: {
        height: '550px',
        width: '100%',
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderLeft: `1px solid rgba(232, 232, 232, 1)}`,
        },

        '& .MuiPaginationItem-root': {
            borderRadius: 0,
        },

        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: 'rgba(189, 195, 199, 0.22)',
        },

    }

}));
export default useStyles;