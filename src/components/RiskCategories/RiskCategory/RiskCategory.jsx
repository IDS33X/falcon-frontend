import ConfirmationDialog from "../../common/ConfirmationDialog/ConfirmationDialog";
import EditCardDialog from "../../common/EditCardDialog/EditCardDialog";
import { openConfirmationDialog } from "../../../actions/confirmationDialogActions";
import { openEditCardDialog } from "../../../actions/editCardDialogActions";
import SmallCard from "../../common/SmallCard/SmallCard";
import TableChartIcon from '@material-ui/icons/TableChart';
import { useDispatch } from "react-redux";
import { FaRegEdit } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router';
import { setCurrentRiskCategoryTitle } from "../../../actions/riskCategories";

const RiskCategory = ({riskCategory, currentRiskCategoryId, setCurrentRiskCategoryId, setFormType}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const openEditCard = () => {
        setFormType('Editar');
        setCurrentRiskCategoryId(riskCategory.id);
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
        // Open principal Matrix
        history.push(`/riskcategories/${riskCategory.id}/risks`);
        dispatch(setCurrentRiskCategoryTitle(riskCategory.title));
        //history.push(`/matrizprincipal?riskCategoryId=${riskCategory.id}`);
        // use history push or dispatch
        console.log("Opening Principal Matrix");
    }

    //const description = "Lorem Ipsum Dolor Sit Amet, Consectetur A Ipiscing Elit, Sed Do Eiusmod Tempor Incidid Ut Labore Et Dolore."

    
    // Card
    return(
        <>
            <SmallCard editButton={editButton} title={riskCategory?.title} description={riskCategory?.description}
                    bottomActions={[pricipalMatrixButton]} onClickCard={onClickCard}></SmallCard>
            <ConfirmationDialog/>
            {/* <EditCardDialog currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId}/> */}
        </>
    );
}

export default RiskCategory;