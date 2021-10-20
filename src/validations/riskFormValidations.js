import * as Yup from 'yup';

// Validations for the form of the cards 
const riskFormValidations = Yup.object().shape({

    code: Yup.string()
        .required('El codigo es requerido')
        .max(50, 'El codigo no puede exceder los 50 caracteres'),

    description: Yup.string()
        .required('La descripción es requerida')
        .max(50, 'La descripción no puede exceder los 50 caraceteres'),
    
    inherentRiskId: Yup.number()
        .min(1, 'Debe seleccionar un riesgo inherente'),

    controlledRiskId: Yup.number()
        .min(1, 'Debe seleccionar un riesgo controlado'),

    rootCause: Yup.string()
        .required('Debe ingresar la causa raíz')
        .max(100, 'La causa raíz no puede exceder los 100 caraceteres'),

});

export default riskFormValidations;