import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


// Component that contains the buttons that will be shown in the actions section of a table
const RowMenuCell = (props) => {


    const { api, id, actions } = props;

    return (
        <div >
            {actions && actions.map(action =>
                <Tooltip title={action.title} placement="bottom">
                    <IconButton
                        color="inherit"
                        size="small"
                        aria-label={action.title}
                        onClick={() => action.onClick()}>
                        <action.icon fontSize="small" />
                    </IconButton>

                </Tooltip>


            )}




        </div>
    );
}

export default RowMenuCell;