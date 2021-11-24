import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    tableGrid: {
        height: '500px',
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
            backgroundColor: '#023E7D',
        },
        '& .MuiDataGrid-columnHeaderTitle':{
            color: '#fff'
        },
        '& .MuiButton-label':{
            color: '#fff'
        },
        '& .MuiDataGrid-toolbarContainer':{
            backgroundColor: '#00143b'
        },
        '& .MuiDataGrid-footerContainer':{
            backgroundColor: '#023E7D'
        },
        '& .MuiTablePagination-root':{
            backgroundColor: '#023E7D'
        },
        '& .MuiTypography-root':{
            color: '#fff'
        },
        '& .MuiIconButton-label':{
            color: '#fff'
        },
        '& .MuiSvgIcon-root':{
            color: '#fff'
        },
        '& .MuiSelect-root':{
            color: '#fff'
        },
        '& .MuiSvgIcon-fontSizeSmall':{
            color: '#023E7D'
        },


        
        backgroundColor: '#fff',
    }

}));
export default useStyles;