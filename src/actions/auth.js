import { AUTH } from '../constants/actionTypes';
import employeesData from '../__mocks__/employeesData';

// const data = { employee: {
//     id: '1',
//     rol: 'admin',
//     departmentId: '1',
//     name: 'Juan Manuel',
//     lastname: 'Perez Garcia',
//     code: '78102',
//     password: 'admin123'
// },
// token: 'dfjdfdgfsfafg4fwse'
// };


export const signIn = (formData, history) => async (dispatch) => {
    try {
        //API simulation
        // const { data } = await api.signIn(formData); This will be the real call to the API.
        const data = employeesData.find((data) => data.employee.code === formData.employeeCode)
        console.log(data);

        dispatch({ type: AUTH, data });

        // Logic to push to the route of role.
        switch (data.employee.rol) {
            case 'admin':
                history.push('/areas');
                break;
            case 'analyst':
                history.push('/riskcategories');
                break;
            case 'internalcontrol':
                history.push('/deviationmatrix');
                break;    
            case 'employee':
                history.push('/mycontrols');
                break; 
            default:
                break;
        }

    }
    catch (error){
        console.log(error);
    }
}