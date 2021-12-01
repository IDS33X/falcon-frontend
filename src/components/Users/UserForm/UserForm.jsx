import DialogWrapper from "../../common/Dialog/DialogWrapper";
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux"
import { closeUserFormDialog } from '../../../actions/userFormDialog'
import { Form, Formik } from "formik";
import InputFormik from "../../common/Formik/InputFormik";
import userFormValidations from "../../../validations/userFormValidations";
import SelectFormik from "../../common/Formik/SelectFormik";
import { ResetUser } from '../../../actions/users'
import React, { useState, useEffect, useRef } from 'react'


const UserForm = ({ saveUser, resetRoute, title, user, departmentId }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const formRef = useRef(); // Allows to access properties and methods of the formik form from outside   
    const { showUserFormDialog } = useSelector(state => state.userFormDialog);
    //const user = useSelector(state => state.users.user);

    // State management of the form
    const [userForm, setUserForm] = useState({ user: {} });
    //const [showPassword, setShowPassword] = useState(false);

    // When the user is fetched the values of the form are updated
    useEffect(() => {
        setUserForm({
            user: {
                departmentId: user?.departmentId ?? 1,
                roleId: user?.roleId ?? 3,
                username: user?.username ?? '',
                name: user?.name ?? '',
                lastName: user?.lastName ?? '',
                code: user?.code ?? '',
                password: user?.password ?? ''
            }
        })

    }, [user]);

    // Form validations are executed when the values change (this way the save button is disabled or not) 
    useEffect(() => {

        if (formRef?.current) {
            // A timeout is set so it validates current values (without it, 
            //it takes the values of last form which is incorrect)
            setTimeout(() => { formRef.current?.validateForm() }, 100);

        }
    }, [userForm.user]);


    // Saves the user data and fetch all the users 
    async function handleSubmit(values, setSubmitting) {
        setSubmitting(true);
        values.departmentId = departmentId;
        Object.assign(userForm.user, values);
        if(user){
            userForm.user.id = user.id;
        }
        await dispatch(saveUser(JSON.stringify(userForm)));
        closeForm();
    }

    // Close the form and resets it to its original state
    const closeForm = async () => {
        await dispatch(closeUserFormDialog());
        resetRoute();
        dispatch(ResetUser());

    };


    return (
        <DialogWrapper fullWidth="md" open={showUserFormDialog} title={title} close={() => closeForm()}>

            <Formik initialValues={userForm.user} enableReinitialize={true} validateOnMount
                validationSchema={userFormValidations} innerRef={formRef} validateOnChange
                onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit(values, setSubmitting, resetForm)}
            >

                {({ isValid, isSubmitting }) => (

                    <Form >

                        <InputFormik type="text" name="code" label="Codigo" id="code" disabled={user}/>

                        <InputFormik type="text" name="name" label="Nombre" id="name" />
                        <InputFormik type="text" name="lastName" label="Apellido" id="lastName" />
                        <SelectFormik name="roleId" label="Rol" id="roleId" options={[{ id: 2, name: "Administrador" }, { id: 3, name: "Analista de riesgo" }]} disabled />

                        <InputFormik type="text" name="username" label="Usuario" />

                        <InputFormik type="text" name="password" type="password" label="Contraseña" />

                        <Button variant="contained" color="secondary" onClick={closeForm}
                            className={classes.button}>Cancelar</Button>

                        <Button variant="contained" color="primary" type="submit"
                            disabled={!isValid || isSubmitting} testId="saveUserButton"
                            className={classes.button}> Guardar </Button>

                    </Form>


                )}

            </Formik>


        </DialogWrapper>
    );
}

export default UserForm;