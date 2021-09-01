import ConfirmationDialog from '../../components/common/ConfirmationDialog/ConfirmationDialog';
import SuccessDialog from '../../components/common/SuccessDialog/SuccessDialog';
import CircularButton from '../../components/common/CircularButton/CircularButton';
import AddButton from '../../components/common/AddButton/AddButton';
import SmallCard from '../../components/common/SmallCard/SmallCard';
import { useDispatch } from 'react-redux';
import { openConfirmationDialog } from '../../actions/confirmationDialogActions';
import { openSuccessDialog } from '../../actions/successDialogActions';
import { openEditCardDialog } from '../../actions/editCardDialogActions';

import SearchBarComponent from '../../components/common/SearchBar/SearchBar';
import TableChartIcon from '@material-ui/icons/TableChart';
import BackupTableIcon from '@material-ui/icons/BackupTable';
import EditCardDialog from '../../components/common/EditCardDialog/EditCardDialog';

const TestPage = () => {
    const dispatch = useDispatch();

    //  This is a test function with the click event that will be called when 
    // a click event on a button happens.

    const openConfirmation = () => {
        dispatch(openConfirmationDialog());
    }

    const openSuccess = () => {
        dispatch(openSuccessDialog());
    }
    // This is the button that will be send to the card component,
    // including the function that will be called on a click event.
    const btnMatrizPrinc = {
        title: "Matriz principal",
        Icon: TableChartIcon,
        onClick: openConfirmation

    }
    const btnMatrizTrat = {
        title: "Matriz de tratamiento",
        Icon: BackupTableIcon,
        onClick: openSuccess

    }
    const description = "Lorem Ipsum Dolor Sit Amet, Consectetur A Ipiscing Elit, Sed Do Eiusmod Tempor Incidid Ut Labore Et Dolore."

    return (
        <>
            <SmallCard onEditClick={() => dispatch(openEditCardDialog())} title="Titulo" description={description}
                bottomActions={[btnMatrizPrinc, btnMatrizTrat]}></SmallCard>

            <AddButton></AddButton>

            <SearchBarComponent onSearchClick={() => dispatch(openConfirmationDialog())}></SearchBarComponent>

            <CircularButton variant="contained" color="primary" onClick={() => dispatch(openConfirmationDialog())}>Open confirmation modal</CircularButton>

            <ConfirmationDialog></ConfirmationDialog>

            <CircularButton variant="contained" color="primary" onClick={() => dispatch(openSuccessDialog())}>Open success modal</CircularButton>

            <SuccessDialog mensaje="Los datos fueron enviados"></SuccessDialog>

            <CircularButton variant="contained" color="primary" onClick={() => dispatch(openEditCardDialog())}>Open edit card modal</CircularButton>

            <EditCardDialog title="Editar algo"></EditCardDialog>
        </>




    );
}

export default TestPage;