import DialogWrapper from "../../common/Dialog/DialogWrapper";
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux"
import { Form, Formik } from "formik";
import InputFormik from "../../common/Formik/InputFormik";
import riskFormValidations from "../../../validations/riskFormValidations";
import SelectFormik from "../../common/Formik/SelectFormik";
import { ResetRisk } from '../../../actions/risks'
import React, { useState, useEffect, useRef } from 'react'
import { getFormState } from '../../../helpers/risksHelper'
import { closeFormDialog } from '../../../actions/risks'

const RiskForm = ({ saveRisk, resetRoute, title, risk, categoryId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const formRef = useRef(); // Allows to access properties and methods of the formik form from outside   
    const { showRiskFormDialog } = useSelector(state => state.risks);

    // State management of the form
    const [riskForm, setRiskForm] = useState({ risk: {} });

    // When the user is fetched the values of the form are updated
    useEffect(() => {
        setRiskForm(getFormState(risk, categoryId))

    }, [risk, categoryId]);

    // Form validations are executed when the values change (this way the save button is disabled or not) 
    useEffect(() => {

        if (formRef?.current) {
            // A timeout is set so it validates current values (without it, 
            //it takes the values of last form which is incorrect)
            setTimeout(() => { formRef.current?.validateForm() }, 100);

        }
    }, [riskForm.risk]);


    // Saves the user data and fetch all the users 
    async function handleSubmit(values, setSubmitting) {
        setSubmitting(true);
        values.creationDate = new Date(Date.now());
        Object.assign(riskForm.risk, values);
        await dispatch(saveRisk(JSON.stringify(riskForm)));
        closeForm();
    }

    // Close the form and resets it to its original state
    const closeForm = async () => {
        await dispatch(closeFormDialog());
        resetRoute();
        dispatch(ResetRisk());

    };


    return (
        <DialogWrapper fullWidth="md" open={showRiskFormDialog} title={title} close={() => closeForm()}>

            <Formik initialValues={riskForm.risk} enableReinitialize={true} validateOnMount
                validationSchema={riskFormValidations} innerRef={formRef} validateOnChange
                onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit(values, setSubmitting, resetForm)}
            >

                {({ isValid, isSubmitting }) => (

                    <Form >

                        {
                            risk &&
                            (
                                <>
                                    <InputFormik name="creator" disabled label="Creador" />

                                    <InputFormik name="creationDate" disabled label="Fecha de creación" />
                                </>
                            )
                        }
                        <InputFormik name="code" label="Codigo" />

                        <InputFormik name="description" label="Descripción" multiline rows={2} />


                        <SelectFormik name="inherentRiskId" id="inherentRiskId" label="Riesgo inherente" options={[{ id: 1, name: "Impacto X" }, { id: 2, name: "Impacto Y" }]} />

                        <SelectFormik name="controlledRiskId"  id="controlledRiskId" label="Riesgo controlado" options={[{ id: 1, name: "Impacto X" }, { id: 2, name: "Impacto Y" }]} />



                        <InputFormik name="rootCause" label="Causa raíz" multiline rows={4} />

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

export default RiskForm;