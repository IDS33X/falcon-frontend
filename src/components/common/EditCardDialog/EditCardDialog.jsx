import React, { useState, useEffect } from 'react';
import DialogWrapper from "../Dialog/DialogWrapper";
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux"
import { closeEditCardDialog } from '../../../actions/editCardDialogActions'
import { Form, Formik } from "formik";
import InputFormik from "../FormikInput/InputFormik";
import formValidationSchema from "../../../validations/cardFormValidations";
import { useFormik } from 'formik';

// Form that will appear when a click event happens on a card.

const EditCardDialog = ({ onYesAction, title, entity, currentAreaId, setCurrentAreaId}) => {
    const classes = useStyles();
    const { showEditCardDialog } = useSelector(state => state.editCardDialog);
    const dispatch = useDispatch();

    const [areaData, setAreaData] = useState({ title: '', description: '' });
    //console.log(currentAreaId);
    const area = useSelector((state) => (currentAreaId ? state.areas.areas.find((area) => area.id === currentAreaId) : null));
    //const { areas } = useSelector((state) => state.areas);
    //const area = (areas.find((area) => area.id === currentAreaId))

    console.log(area);


    const clear = () => {
        setCurrentAreaId(0);
        setAreaData({ title: '', description: ''});
    };

   // const [initialValues, setInitialValues] = useState({title: '', description: ''});
    
    // useEffect(() => {
    //     if (!area?.title) clear();
    //     if (area) setAreaData({title: area.title, description: area.description});
    //   }, [area]);

    // Initial state of the form

    const initialValues = {
        title: area?.title,
        description: area?.description,
    }

    // This function will send the data to the API 

    // function handleSubmit(values) {
    //     console.log(values);
    //     //dispatch(signIn(values));
    //     //setSubmitting(false);
    //     //dispatch(closeModal());
    // }
    

    async function handleSubmit (values, setSubmitting) {
        setSubmitting(true);
        console.log(`Submitting... ${values.title}`);
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
            
            <Formik 
                initialValues = {initialValues}
                enableReinitialize={true} // This property allows to update the state of the modal, basically allow to restart it with the new values.
                validateOnMount
                validateOnChange
                validationSchema={formValidationSchema}
                >

                {({ isValid, isSubmitting, dirty, values, setSubmitting }) => (

                    <Form >

                        <InputFormik name="title" label="Name" id="name" />
                        <InputFormik name="description" label="Description" id="description" multiline rows={4} />

                        <Button variant="contained" color="secondary"
                            onClick={() => dispatch(closeEditCardDialog())}
                            className={classes.button}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary"
                            type="submit"
                            onClick = {() => handleSubmit(values, setSubmitting)}
                            disabled={ !isValid }
                            className={classes.button}> Guardar </Button>

                    </Form>


                )}

            </Formik>


        </DialogWrapper>
    );
}

export default EditCardDialog;