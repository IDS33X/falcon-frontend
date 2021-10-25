import ConfirmationDialog from "../../common/ConfirmationDialog/ConfirmationDialog";
import EditCardDialog from "../../common/EditCardDialog/EditCardDialog";
import { openConfirmationDialog } from "../../../actions/confirmationDialogActions";
import { openEditCardDialog } from "../../../actions/editCardDialogActions";
import SmallCard from "../../common/SmallCard/SmallCard";
import TableChartIcon from '@material-ui/icons/TableChart';
import { useDispatch } from "react-redux";
import { FaRegEdit } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router';
import { setCurrentDivisionTitle } from "../../../actions/divisions";

const Division = ({division, currentDivisionId, setCurrentDivisionId, setFormType}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const openEditCard = () => {
        setFormType('Editar');
        setCurrentDivisionId(division.id);
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


    const onClickCard = () => {
        // use history push or dispatch
        history.push(`/departments?divisionId=${division.id}`);
        // Setting the current area name for breadcrumb
        dispatch(setCurrentDivisionTitle(division.title));
        console.log("Opening department");
    }

    //const description = "Lorem Ipsum Dolor Sit Amet, Consectetur A Ipiscing Elit, Sed Do Eiusmod Tempor Incidid Ut Labore Et Dolore."

    
    // Card
    return(
        <>
            <SmallCard editButton={editButton} title={division.title} description={division.description}
                    bottomTitle={'Departamentos'} bottomCounter={division.countDepartments} onClickCard = {onClickCard}></SmallCard>
            <ConfirmationDialog/>
            {/* <EditCardDialog currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId}/> */}
        </>
    );
}

export default Division;

