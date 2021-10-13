// Maps the fetched risks to a format that can be read by the grid 
export const getGridRows = (risks) => {

    return risks?.map((risk) => {

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
    { field: 'ri', headerName: 'RI', width: 150, hide: true },
    { field: 'sc', headerName: 'SC', width: 100 },
    { field: 'pc', headerName: 'PC', width: 100 },
    { field: 'rc', headerName: 'RC', width: 150, hide: true },
    { field: 'creator', headerName: 'Gestor de riesgo', width: 300 },
    { field: 'creationDate', headerName: 'Fecha de ingreso', width: 200 }
];

// Maps the fetched risks to a format that can be read by the grid 
export const getFormState = (risk, categoryId, userId) => {
    if (risk) risk.creationDate = formatDate(risk.creationDate);
    let objectToReturn = {
        risk: {
            userId: risk?.user.id ?? 5,
            riskCategoryId: categoryId,
            code: risk?.code ?? '',
            description: risk?.description ?? '',
            inherentRiskId: risk?.inherentRisk.id ?? 0,
            controlledRiskId: risk?.controlledRisk.id ?? 0,
            rootCause: risk?.rootCause ?? '',
            creationDate: risk?.creationDate ?? '',

        }
    }
    if (risk) {
        objectToReturn = {
            ...objectToReturn,
            id: risk?.id ?? 0,
            creator: `${risk?.user.name} ${risk?.user.lastName}` ?? '',
        
        }

    }
    return objectToReturn;
        
}

const formatDate = (date) => {
    date = new Date(date);
    const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

    return formattedDate;

}