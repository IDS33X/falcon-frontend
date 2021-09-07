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
//import BackupTableIcon from '@material-ui/icons/BackupTable';
import EditCardDialog from '../../components/common/EditCardDialog/EditCardDialog';
import TableGrid from '../../components/common/TableGrid/TableGrid';

import { deleteButton, editButton } from '../../buttons/buttons'

// Table component test data
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const headers = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    }
]



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
    const openEditCard = () => {
        dispatch(openEditCardDialog());
    }


    editButton.onClick = openEditCard;
    deleteButton.onClick = openConfirmation;
    
    // This is the button that will be send to the card component,
    // including the function that will be called on a click event.
    const btnMatrizPrinc = {
        title: "Matriz principal",
        Icon: TableChartIcon,
        onClick: openConfirmation

    }


    // const btnMatrizTrat = {
    //     title: "Matriz de tratamiento",
    //     //Icon: BackupTableIcon,
    //     onClick: openSuccess

    // }
    const description = "Lorem Ipsum Dolor Sit Amet, Consectetur A Ipiscing Elit, Sed Do Eiusmod Tempor Incidid Ut Labore Et Dolore."


    return (
        <>
            <SmallCard onEditClick={openEditCard} title="Titulo" description={description}
                bottomActions={[btnMatrizPrinc]}></SmallCard>

            <AddButton></AddButton>

            <TableGrid rows={rows} actions={[deleteButton, editButton]} headers={headers}></TableGrid>

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