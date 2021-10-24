import * as Yup from 'yup';

// Validations for the control form 
const controlFormValidations = Yup.object().shape({

    code: Yup.string()
        .required('El codigo es requerido')
        .max(50, 'El codigo no puede exceder los 50 caracteres'),



    controlStateId: Yup.number()
        .min(1, 'Debe seleccionar un estado'),

    // Las opciones son manual y automatico, tomar id de la bd
    automationLevelId: Yup.number()
        .min(1, 'Debe seleccionar un nivel de automatizacion'),

    controlTypeId: Yup.number()
        .min(1, 'Debe seleccionar un tipo de control'),

    //Documented debe venir Documentado por defecto (la otra opcion es no documentado)


    frequency: Yup.string()
        .required('La frecuencia es requerida')
        .max(100, 'La frecuencia no puede exceder los 100 caracteres'),

    policy: Yup.string()
        .required('Debe ingresar la política')
        .max(500, 'La política no puede exceder los 500 caraceteres'),

    // Poner un select con los valores en string (admin y analista)
    responsablePosition: Yup.string()
        .min(2, 'Debe seleccionar una posición responsable'),

    activity: Yup.string()
        .required('Debe ingresar la actividad')
        .max(200, 'La política no puede exceder los 200 caraceteres'),

    objective: Yup.string()
        .required('Debe ingresar el objetivo')
        .max(100, 'La política no puede exceder los 100 caraceteres'),

    evidence: Yup.string()
        .required('Debe ingresar la evidencia')
        .max(200, 'La política no puede exceder los 200 caraceteres'),
});

export default controlFormValidations;