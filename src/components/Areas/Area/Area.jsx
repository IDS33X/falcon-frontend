import ConfirmationDialog from "../../common/ConfirmationDialog/ConfirmationDialog";
import EditCardDialog from "../../common/EditCardDialog/EditCardDialog";
import { openConfirmationDialog } from "../../../actions/confirmationDialogActions";
import { openEditCardDialog } from "../../../actions/editCardDialogActions";
import SmallCard from "../../common/SmallCard/SmallCard";
import TableChartIcon from '@material-ui/icons/TableChart';
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router';
import { FaRegEdit } from 'react-icons/fa';
import { setCurrentAreaTitle } from "../../../actions/areas";

const Area = ({area, currentAreaId, setCurrentAreaId, setFormType }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const openEditCard = () => {
        setFormType('Editar');
        setCurrentAreaId(area.id);
        //console.log(area.id);
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
        // Use area.id and dispatch the GetDivisionsByArea
        history.push(`/divisions?areaId=${area.id}&areaName=${area.title}`);
        // Setting the current area name for breadcrumb
        dispatch(setCurrentAreaTitle(area.title));
        // use history push or dispatch.
        console.log("Opening division");
    }

    //const description = "Lorem Ipsum Dolor Sit Amet, Consectetur A Ipiscing Elit, Sed Do Eiusmod Tempor Incidid Ut Labore Et Dolore."

    
    // Card
    return(
        <>
            <SmallCard name="areaCard" editButton={editButton} title={area.title} description={area.description}
                    bottomTitle={'Divisiones'} bottomCounter={area.countDivisions} onClickCard = {onClickCard}></SmallCard>
            <ConfirmationDialog/>
            {/* <EditCardDialog currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId}/> */}
        </>
    );
}

export default Area;




