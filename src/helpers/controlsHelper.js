// Maps the fetched risks to a format that can be read by the grid 
export const getGridRows = (controls) => {

    return controls?.map((control) => {

        if (control) {
            control.creationDate = formatDate(control.creationDate);
            control.lastUpdateDate = formatDate(control.lastUpdateDate);
        }
        return {
            id: control.id,
            code: control.code,
            controlState: control.controlState,
            automationLevel: control.automationLevel,
            controlType: control.controlType,
            frequency: control.frequency,
            documented: control.documented,
            policy: control.policy,
            responsablePosition: control.responsablePosition,
            lastUpdateDate: control.lastUpdateDate,
            activity: control.activity,
            objective: control.objective,
            evidence: control.evidence,
            creator: `${control.user?.name} ${control.user?.lastName}`,
            creationDate: control?.creationDate
        }
    });
}

export const OptionsDocumented = {
    true: "Documentado",
    false: "No documentado",
}
// Headers that will be shown in the grid 
export const headers = [
    { field: 'id', headerName: 'Id', width: 100, hide: true },
    { field: 'code', headerName: 'Código', width: 150 },
    { field: 'activity', headerName: 'Actividad', width: 300 },
    { field: 'objective', headerName: 'Objetivo', width: 150 },
    { field: 'evidence', headerName: 'Evidencia', width: 200 },
    { field: 'objective', headerName: 'Objetivo', width: 150 },
    { field: 'automationLevel', headerName: 'Grado de automatización', width: 300 },
    { field: 'controlType', headerName: 'Tipo', width: 120 },
    { field: 'frequency', headerName: 'Frecuencia', width: 150 },
    { field: 'documented', headerName: 'Documentado', width: 200 },
    { field: 'policy', headerName: 'Política', width: 200 },
    { field: 'controlState', headerName: 'Estado', width: 150 },
    { field: 'responsablePosition', headerName: 'Responsable', width: 250 },
    { field: 'creator', headerName: 'Gestor de riesgo', width: 300 },
    { field: 'creationDate', headerName: 'Fecha de ingreso', width: 200 },
    { field: 'lastUpdateDate', headerName: 'Fecha de modificación', width: 200 },

];



// Maps the fetched risks to a format that can be read by the grid 
export const getFormState = (control) => {
    let objectToReturn = {
        control: {
            userId: control?.user.id ?? 5,
            code: control?.code ?? '',
            controlStateId: control?.controlStateId ?? 0,
            automationLevelId: control?.automationLevelId ?? 0,
            controlTypeId: control?.controlTypeId ?? 0,
            frequency: control?.frequency ?? '',
            documented: control?.documented ?? false,
            policy: control?.policy ?? '',
            responsablePosition: control?.responsablePosition ?? '',
            activity: control?.activity ?? '',
            objective: control?.objective ?? '',
            evidence: control?.evidence ?? '',

        }
    }
    if (control) {
        objectToReturn.control = {
            ...objectToReturn.control,
            id: control?.id ?? 0,
            creator: `${control?.user.name} ${control?.user.lastName}` ?? '',
            creationDate: control?.creationDate ?? '',
            lastUpdateDate: control.lastUpdateDate ?? '',

        }

    }
    return objectToReturn;

}

// Transforms date object to a readable format
const formatDate = (date) => {
    let formattedDate = new Date(date);
    const year = formattedDate.getFullYear();

    if (!isNaN(formattedDate) && formattedDate.getYear() > 1) {
        formattedDate = formattedDate.getDate() + "/" + (formattedDate.getMonth() + 1) + "/" + formattedDate.getFullYear();
        return formattedDate;

    }
    else if (formattedDate.getYear() > 1) {
        return date;
    }

    return 'N/A';


}