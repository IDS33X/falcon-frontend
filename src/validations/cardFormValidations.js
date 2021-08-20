import * as Yup from 'yup';

// Validations for the form of the cards 
const formValidationSchema = Yup.object().shape({

    name: Yup.string()
        .required('El nombre es requerido')
        .max(50, 'El nombre no puede exceder los 50 caraceteres'),

    description: Yup.string()
        .required('La descripción es requerida')
        .max(100, 'La descripción no puede exceder los 100 caracteres'),


});

export default formValidationSchema;