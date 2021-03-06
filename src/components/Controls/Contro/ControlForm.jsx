import DialogWrapper from "../../common/Dialog/DialogWrapper";
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux"
import { Form, Formik } from "formik";
import InputFormik from "../../common/Formik/InputFormik";
import controlFormValidations from "../../../validations/controlFormValidations";
import SelectFormik from "../../common/Formik/SelectFormik";
import React, { useState, useEffect, useRef } from 'react'
import { getFormState } from '../../../helpers/controlsHelper'
import { closeFormDialog, ResetControl } from '../../../actions/controls'
import { Grid } from '@material-ui/core';

const ControlForm = ({ saveControl, resetRoute, title, control }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const formRef = useRef(); // Allows to access properties and methods of the formik form from outside   
    const { showControlFormDialog, automationLevels, controlStates, controlTypes } = useSelector(state => state.controls);
    const [controlForm, setControlForm] = useState({ control: {} });
    // When the control is fetched the values of the form are updated
    useEffect(() => {
        setControlForm(getFormState(control))

    }, [control]);

    // Form validations are executed when the values change (this way the save button is disabled or not) 
    useEffect(() => {

        if (formRef?.current) {
            // A timeout is set so it validates current values (without it, 
            //it takes the values of last form which is incorrect)
            setTimeout(() => { formRef.current?.validateForm() }, 100);

        }
    }, [controlForm.control]);


    // Saves the user data and fetch all the users 
    async function handleSubmit(values, setSubmitting) {
        setSubmitting(true);
        values.creationDate = new Date(Date.now());
        Object.assign(controlForm.control, values);
        await dispatch(saveControl(JSON.stringify(controlForm)));
        closeForm();
    }

    // Close the form and resets it to its original state
    const closeForm = async () => {
        await dispatch(closeFormDialog());
        resetRoute();
        dispatch(ResetControl());

    };


    return (
        <DialogWrapper fullWidth="md" open={showControlFormDialog} title={title} close={() => closeForm()}>




            <Formik initialValues={controlForm.control} enableReinitialize={true} validateOnMount
                validationSchema={controlFormValidations} innerRef={formRef} validateOnChange
                onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit(values, setSubmitting, resetForm)}
            >

                {({ isValid, isSubmitting }) => (

                    <Form >

                        <Grid container spacing={6}   alignItems="center" justifyContent="space-even"> 
                            <Grid item xs={4} sm={6} md={5} >
                                 {
                            control &&
                            (
                                <>
                                    <InputFormik name="creator" type="text" disabled label="Creador" />

                                    <InputFormik name="creationDate" type="text" disabled label="Fecha de creaci??n" />

                                    <InputFormik name="lastUpdateDate" disabledtype="text" label="Fecha de modificaci??n" />

                                </>
                            )
                        }
                        <InputFormik name="code" type="text" label="C??digo" />

                        <InputFormik name="activity" type="text" label="Actividad" multiline rows={2} />

                        <InputFormik name="objective" type="text" label="Objetivo" multiline rows={1} />

                        <InputFormik name="evidence" type="text" label="Evidencia" multiline rows={2} />

                            </Grid>

                            <Grid item xs={4} sm={6} md={5}>

                                <SelectFormik name="automationLevelId" label="Nivel de automatizaci??n" options={automationLevels.map(automationLevel => ({ id: automationLevel.id, name: automationLevel.title }))} />

                        <SelectFormik name="controlTypeId" label="Tipo de control" options={controlTypes.map(controlType => ({ id: controlType.id, name: controlType.title }))} />

                        <SelectFormik name="controlStateId" label="Estado" options={controlStates.map(controlState => ({ id: controlState.id, name: controlState.title }))} />

                        <InputFormik name="responsablePosition" type="text" label="Posici??n responsable" />

                        <InputFormik name="frequency" type="text" label="Frecuencia" />

                        <InputFormik name="policy" type="text" label="Pol??tica" multiline rows={3} />


                        <InputFormik name="documented" type="checkbox" label="Documentado" />

                        </Grid>


                        </Grid>

                       

                        

                        <Button variant="contained" color="secondary" onClick={closeForm}
                            className={classes.button}>Cancelar</Button>

                        <Button variant="contained" color="primary" type="submit"
                            disabled={!isValid || isSubmitting}
                            className={classes.button}> Guardar </Button>

                    </Form>


                )}

            </Formik>


        </DialogWrapper>
    );
}

export default ControlForm;