import * as Yup from 'yup';

// Validations for the form of the cards 
const userFormValidations = Yup.object().shape({

    name: Yup.string()
        .required('El nombre es requerido')
        .max(50, 'El nombre no puede exceder los 50 caraceteres'),

    lastName: Yup.string()
        .required('El apellido es requerido')
        .max(50, 'El apellido no puede exceder los 50 caraceteres'),
    username: Yup.string()
        .required('El usuario es requerido')
        .max(50, 'El usuario no puede exceder los 50 caraceteres'),
    code: Yup.string()
        .required('El codigo es requerido')
        .max(50, 'El codigo no puede exceder los 50 caraceteres'),

    password: Yup.string()
        .required('La contraseña es requerida')
        .max(50, 'La contraseña no puede exceder los 50 caraceteres'),

    passwordEditForm: Yup.string()
        .max(50, 'La contraseña no puede exceder los 50 caraceteres'),

    roleId: Yup.number()
        .min(1, 'Debe seleccionar un rol')

});

export default userFormValidations;