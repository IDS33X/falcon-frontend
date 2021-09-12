import DialogWrapper from "../Dialog/DialogWrapper";
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux"
import { closeEditCardDialog } from '../../../actions/editCardDialogActions'
import { Form, Formik } from "formik";
import InputFormik from "../FormikInput/InputFormik";
import formValidationSchema from "../../../validations/cardFormValidations";

// Form that will appear when a click event happens on a card.

const EditCardDialog = ({ onYesAction, title, entity }) => {
    const classes = useStyles();
    const { showEditCardDialog } = useSelector(state => state.editCardDialog);
    const dispatch = useDispatch();

    // Initial state of the form
    const initialValues = {
        name: '',
        description: ''
    }

    // This function will send the data to the API 

    function handleSubmit(values, setSubmitting) {
        //dispatch(signIn(values));
        //setSubmitting(false);
        //dispatch(closeModal());
    }

    return (
        <DialogWrapper fullWidth="sm" open={showEditCardDialog} title={title} close={() => dispatch(closeEditCardDialog())}>

            <Formik initialValues={initialValues}
                validationSchema={formValidationSchema}
                onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}>

                {({ isValid, isSubmitting, dirty }) => (

                    <Form >

                        <InputFormik name="name" label="Name" id="name" />
                        <InputFormik name="description" label="Description" id="description" multiline rows={4} />

                        <Button variant="contained" color="secondary"
                            onClick={() => dispatch(closeEditCardDialog())}
                            className={classes.button}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary"
                            onClick={onYesAction}
                            disabled={!isValid || !dirty || isSubmitting}
                            className={classes.button}> Guardar </Button>

                    </Form>


                )}

            </Formik>


        </DialogWrapper>
    );
}

export default EditCardDialog;