// Maps the fetched risks to a format that can be read by the grid 
export const getGridRows = (risks) => {

    return risks.map((risk) => {

        if (risk) risk.creationDate = formatDate(risk.creationDate);
        return {
            id: risk.id,
            code: risk.code,
            description: risk.description,
            rootCause: risk.rootCause,
            si: risk.inherentRisk?.severity,
            pi: risk.inherentRisk?.probability,
            ri: risk.inherentRisk?.title,
            sc: risk.controlledRisk?.severity,
            pc: risk.controlledRisk?.probability,
            rc: risk.controlledRisk?.title,
            creator: `${risk.user?.name} ${risk.user?.lastName}`,
            creationDate: risk?.creationDate
        }
    });
}
// Headers that will be shown in the grid 
export const headers = [
    { field: 'id', headerName: 'Id', width: 100, hide: true },
    { field: 'code', headerName: 'Código', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'rootCause', headerName: 'Causa raíz', width: 200 },
    { field: 'si', headerName: 'SI', width: 90 },
    { field: 'pi', headerName: 'PI', width: 90 },
    { field: 'ri', headerName: 'RI', width: 150 },
    { field: 'sc', headerName: 'SC', width: 100 },
    { field: 'pc', headerName: 'PC', width: 100 },
    { field: 'rc', headerName: 'RC', width: 150},
    { field: 'creator', headerName: 'Gestor de riesgo', width: 300 },
    { field: 'creationDate', headerName: 'Fecha de ingreso', width: 200 }
];

// Maps the fetched risks to a format that can be read by the grid 
export const getFormState = (risk, categoryId, userId) => {
    let objectToReturn = {
        risk: {
            userId: risk?.user.id ?? 5,
            riskCategoryId: categoryId,
            code: risk?.code ?? '',
            description: risk?.description ?? '',
            inherentRiskId: risk?.inherentRisk.id ?? 0,
            controlledRiskId: risk?.controlledRisk.id ?? 0,
            rootCause: risk?.rootCause ?? '',

        }
    }
    if (risk) {
        objectToReturn.risk = {
            ...objectToReturn.risk,
            id: risk?.id ?? 0,
            creator: `${risk?.user.name} ${risk?.user.lastName}` ?? '',
            creationDate: risk?.creationDate ?? '',


        }

    }
    return objectToReturn;

}

// Transforms date object to a readable format
const formatDate = (date) => {
    let formattedDate = new Date(date);

    if (!isNaN(formattedDate)) {
        formattedDate = formattedDate.getDate() + "/" + (formattedDate.getMonth() + 1) + "/" + formattedDate.getFullYear();
        return formattedDate;

    }
    return date;

}