import useStyles from './styles';
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import TableChartIcon from '@material-ui/icons/TableChart';
import RowMenuCell from './RowMenuCell';

// Generic componet that renders a grid with dynamic  headers and data

const TableGrid = ({ headers, rows, actions }) => {

    // Component used to pass all the parameters received from the parent to MenuCell component before using it with renderCell (it cannot be done directly)
    const RenderOptions = () => {
        return (
            <RowMenuCell actions={actions} />
        )
    }

    const classes = useStyles();
    const columns = [
        {
            field: 'actions',
            headerName: 'Acciones',
            renderCell: RenderOptions, // Adds the action buttons to this column (so the grid wont try to look up for a property called "actions" in the rows)
            sortable: false,
            width: 120,
            headerAlign: 'center',
            filterable: false,
            align: 'center',
            disableColumnMenu: true,
            disableReorder: true,
        },
        ...headers // Adds all the other headers to the grid
    ];



    return (
        <div className={classes.tableGrid}>
            <DataGrid
                rows={rows} //rows={headers}
                columns={columns}
                pageSize={5}
            />
        </div>
    );
}
export default TableGrid;