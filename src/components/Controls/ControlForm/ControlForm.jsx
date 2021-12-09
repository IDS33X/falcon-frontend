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

const ControlForm = ({ saveControl, resetRoute, title, control, riskCategoryId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const formRef = useRef(); // Allows to access properties and methods of the formik form from outside   
    const { showControlFormDialog, automationLevels, controlStates, controlTypes } = useSelector(state => state.controls);
    const [controlForm, setControlForm] = useState({ control: {} });
    // When the control is fetched the values of the form are updated
    useEffect(() => {
        setControlForm(getFormState(control, riskCategoryId))

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
        values.creationDate = values.creationDate ?? new Date(Date.now());

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

                            <Grid container alignItems="center" justifyContent="space-around">
                                <Grid item xs={4} sm={6} md={5} mt={40} className={classes.firstColumn}>
                                    {
                                        control &&
                                        (
                                            <>
                                                <InputFormik name="creator" type="text" disabled label="Creador" />

<<<<<<< HEAD
                                <InputFormik name="activity" id="activity" type="text" label="Actividad" multiline rows={2} />
=======
                                                <InputFormik name="creationDate" type="text" disabled label="Fecha de creación" />
>>>>>>> develop

                                                <InputFormik name="lastUpdateDate" disabledtype="text" label="Fecha de modificación" />

<<<<<<< HEAD
                                {
                                    !control && (
                                        <InputFormik name="responsablePosition" type="text" label="Posición responsable" />

                                    )
                                }
                                <InputFormik name="policy" type="text" label="Política" multiline rows={3} />

                            </Grid>
=======
                                            </>
                                        )
                                    }
                                    <InputFormik name="code" type="text" label="Código" disabled={control} />
>>>>>>> develop

                                    <InputFormik name="activity" type="text" label="Actividad" multiline rows={2} />

<<<<<<< HEAD
                                <SelectFormik name="automationLevelId" id="automationLevelId" label="Nivel de automatización" options={automationLevels.map(automationLevel => ({ id: automationLevel.id, name: automationLevel.title }))} />

                                <SelectFormik name="controlTypeId" id="controlTypeId"  label="Tipo de control" options={controlTypes.map(controlType => ({ id: controlType.id, name: controlType.title }))} />

                                <SelectFormik name="controlStateId" id="controlStateId"  label="Estado" options={controlStates.map(controlState => ({ id: controlState.id, name: controlState.title }))} />
=======
                                    <InputFormik name="objective" type="text" label="Objetivo" multiline rows={1} />
                                    <SelectFormik name="automationLevelId" label="Nivel de automatización" options={automationLevels.map(automationLevel => ({ id: automationLevel.id, name: automationLevel.title }))} />


                                    <SelectFormik name="controlStateId" label="Estado" options={controlStates.map(controlState => ({ id: controlState.id, name: controlState.title }))} />
>>>>>>> develop

                                    <InputFormik name="documented" type="checkbox" label="Documentado" />

                                </Grid>

<<<<<<< HEAD
                                {
                                    control && (
                                        <InputFormik name="responsablePosition" type="text" label="Posición responsable" />

                                    )
                                }

                                <InputFormik name="documented" type="checkbox" label="Documentado" />
=======
>>>>>>> develop

                            </Grid>

                            <Grid container alignItems="flex-end" justifyContent="flex-end">


                                <Button variant="contained" color="secondary" onClick={closeForm}
                                    className={classes.button}>Cancelar</Button>

                                <Button variant="contained" color="primary" type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className={classes.button}> Guardar </Button>
                            </Grid>

                        </Form>


                    )}

                </Formik>


            </DialogWrapper>
        );
    }
}

export default ControlForm;