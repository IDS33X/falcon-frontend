import ConfirmationDialog from "../../common/ConfirmationDialog/ConfirmationDialog";
import EditCardDialog from "../../common/EditCardDialog/EditCardDialog";
import { openConfirmationDialog } from "../../../actions/confirmationDialogActions";
import { openEditCardDialog } from "../../../actions/editCardDialogActions";
import SmallCard from "../../common/SmallCard/SmallCard";
import TableChartIcon from '@material-ui/icons/TableChart';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { FaRegEdit } from 'react-icons/fa';
import { setCurrentDepartmentTitle } from "../../../actions/departments";

const Department = ({ department, currentDepartmentId, setCurrentDepartmentId, setFormType }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const openEditCard = () => {
        setFormType('Editar');
        setCurrentDepartmentId(department.id);
        //console.log(`Este es el id de la division abierta: ${division.id}`);
        dispatch(openEditCardDialog());
    }

    const openConfirmation = () => {
        dispatch(openConfirmationDialog());
    }

    const pricipalMatrixButton = {
        title: "Matriz principal",
        Icon: TableChartIcon,
        onClick: openConfirmation,
    }

    const editButton = {
        title: "Editar",
        Icon: FaRegEdit,
        onClick: openEditCard
    }


    const onClickCard = (area) => {
        // Link this to the users table.
        // use history push or dispatch
        history.push(`/departments/${department.id}/users`);
        // Setting the current area name for breadcrumb
        dispatch(setCurrentDepartmentTitle(department.title));
        console.log("Opening users table");
    }

    //const description = "Lorem Ipsum Dolor Sit Amet, Consectetur A Ipiscing Elit, Sed Do Eiusmod Tempor Incidid Ut Labore Et Dolore."


    // Card
    return (
        <>
            <SmallCard name="departmentCard" editButton={editButton} title={department.title} description={department.description}
                bottomTitle={'Analistas de Riesgo'} bottomCounter={department.countAnalytics} onClickCard={onClickCard}></SmallCard>
            <ConfirmationDialog />
            {/* <EditCardDialog currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId}/> */}
        </>
    );
}

export default Department;