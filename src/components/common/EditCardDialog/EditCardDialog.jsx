import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import DialogWrapper from "../Dialog/DialogWrapper";
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux"
import { closeEditCardDialog } from '../../../actions/editCardDialogActions'
import { Form, Formik } from "formik";
import InputFormik from "../Formik/InputFormik";
import formValidationSchema from "../../../validations/cardFormValidations";
import { useFormik } from 'formik';
import { createArea, updateArea, getAreas } from '../../../actions/areas';
import { store } from '../../..';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { openConfirmationDialog } from '../../../actions/confirmationDialogActions';

// Form that will appear when a click event happens on a card.

const EditCardDialog = ({ 
    onYesAction,
    entityType,
    title,
    currentAreaId,
    setCurrentAreaId,
    currentDivisionId,
    setCurrentDivisionId,
    areaId,
    currentDepartmentId,
    setCurrentDepartmentId,
    divisionId,
    currentRiskCategoryId,
    setCurrentRiskCategoryId,
    departmentId,
    formType,
    amountOfPages,
    onCreateDispatch,
    onUpdateDispatch}) => {

    const classes = useStyles();
    const { showEditCardDialog } = useSelector(state => state.editCardDialog);
    const dispatch = useDispatch();
    const history = useHistory();

    //const [areaData, setAreaData] = useState({ title: '', description: '' });
    //console.log(currentAreaId);
    const area = useSelector((state) => (currentAreaId ? state.areas.areas.find((area) => area.id === currentAreaId) : null));
    const division = useSelector((state) => (currentDivisionId ? state.divisions.divisions.find((division) => division.id === currentDivisionId) : null));
    const department = useSelector((state) => (currentDepartmentId ? state.departments.departments.find((department) => department.id === currentDepartmentId) : null));
    const riskCategory = useSelector((state) => (currentRiskCategoryId ? state.riskCategories.riskCategories.find((riskCategory) => riskCategory.id === currentRiskCategoryId) : null));
    
    //const { areas } = useSelector((state) => state.areas);
    //const area = (areas.find((area) => area.id === currentAreaId))

    //console.log(area);


    const clear = (values) => {
        if (formType === 'Crear'){
            values.title = '';
            values.description = '';
            dispatch(closeEditCardDialog());
        }else{
            if(entityType === 'area'){
                setCurrentAreaId(0);
            }
            if(entityType === 'division'){
                setCurrentDivisionId(0);
            }
            if(entityType === 'department'){
                setCurrentDepartmentId(0);
            }
            if(entityType === 'riskCategory'){
                setCurrentRiskCategoryId(0);
            }

            dispatch(closeEditCardDialog()); // If user is editing, we dont clean the form if press cancel.
        }
        //setCurrentAreaId(0);
        //setAreaData({ title: '', description: ''});
    }; // We dont need this fuction because of the reinitilize property that lets us have the updated state.

   // const [initialValues, setInitialValues] = useState({title: '', description: ''});
    
    // useEffect(() => {
    //     if (!area?.title) clear();
    //     if (area) setAreaData({title: area.title, description: area.description});
    //   }, [area]);

    // Initial state of the form

    const initialValues = () => {
        if (entityType === 'area'){
            return { title: area?.title || '',
                     description: area?.description || '', }
        }
        if (entityType === 'division'){
            return { title: division?.title || '',
                     description: division?.description || '', }
        }
        if (entityType === 'department'){
            return { title: department?.title || '',
                     description: department?.description || '', }
        }
        if (entityType === 'riskCategory'){
            return { title: riskCategory?.title || '',
                     description: riskCategory?.description || '', }
        }
    }

    // This function will send the data to the API 

    // function handleSubmit(values) {
    //     console.log(values);
    //     //dispatch(signIn(values));
    //     //setSubmitting(false);
    //     //dispatch(closeModal());
    // }
    //dispatch(getAreas(amountOfPages, 8))

    async function handleSubmit (values, setSubmitting) {
        setSubmitting(true);
        
        if (formType === 'Crear') {
            if (entityType === 'area'){
                onCreateDispatch(values.title, values.description);
            }
            if (entityType === 'division'){
                onCreateDispatch(values.title, values.description);
            }
            if (entityType === 'department'){
                onCreateDispatch(values.title, values.description);
            }
            if (entityType === 'riskCategory'){
                onCreateDispatch(values.title, values.description);
            }
            //dispatch(createArea({area: {title: values.title, description: values.description}}));
            //console.log(amountOfPages);
             // This helps to go to the last page after creating a new area.
            //dispatch(closeEditCardDialog());
            clear(values);
            //console.log(`Area Title... ${values.title}`);
            //console.log(`Area Description... ${values.description}`); 
        }   
        else {
            if(entityType === 'area'){
                onUpdateDispatch(area.id, values.title, values.description);
            }
            if(entityType === 'division'){
                onUpdateDispatch(division.id, values.title, values.description);
            }
            if(entityType === 'department'){
                onUpdateDispatch(department.id, values.title, values.description);
            }
            if(entityType === 'riskCategory'){
                onUpdateDispatch(riskCategory.id, values.title, values.description);
            }
            //dispatch(openConfirmationDialog());
            //dispatch(updateArea({area: {id: area.id, title: values.title, description: values.description}}));
            clear(values);
            //console.log(`Area Title... ${values.title}`);
            //console.log(`Area Description... ${values.description}`); 
        }   

        setSubmitting(false);
    }

    // const handleSubmit = async (values, setSubmitting) => {
    //     setSubmitting(true);
    //     console.log("Submitting...");
    //     setSubmitting(false);
    // }

    // const formik = useFormik({
    //     onSubmit: (values, setSubmitting)=>{
    //         setSubmitting(true);
    //         console.log("Submitting...");
    //         setSubmitting(false);
    //     }});

    return (
        <DialogWrapper fullWidth="sm" open={showEditCardDialog} title={title} close={() => dispatch(closeEditCardDialog())}>
            {/* <ConfirmationDialog/> */}
            <Formik 
                initialValues = {formType === 'Editar' ? initialValues() : {title: '', description: ''}}
                enableReinitialize={true} // This property allows to update the state of the modal, basically allow to restart it with the new values.
                validateOnMount
                validateOnChange
                validationSchema={formValidationSchema}
                >

                {({ isValid, isSubmitting, dirty, values, setSubmitting }) => (

                    <Form >
                        {formType === 'Editar' ?
                            (<div>
                                <label>Editar</label>
                            </div>) : 
                            (<div>
                                <label>Crear</label>
                            </div>)
                        }
                        <InputFormik name="title" label="Name" id="name"/>
                        <InputFormik name="description" label="Description" id="description" multiline rows={4}/>
                        
                        <Button variant="contained" color="secondary"
                            onClick={() => {
                                clear(values);
                            }}
                            className={classes.button}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary"
                            type="submit"
                            onClick = {() => handleSubmit(values, setSubmitting)}
                            //disabled={ !isValid }
                            className={classes.button}> Guardar </Button>

                    </Form>


                )}

            </Formik>


        </DialogWrapper>
    );
}

export default EditCardDialog;