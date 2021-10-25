import * as api from '../api/index.js';
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
        const data = employeesData.find((data) => data.employee.username === formData.employeeUsername)
        console.log(data);

        dispatch({ type: AUTH, data });
        
        //Logic to push to the route of role.
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
            
            // const { data } = await api.signIn(formData); //This is  the real call to the API.
            // dispatch({ type: AUTH, data });
        
            // switch (data.user.roleId) {
            //     case '2':
            //         history.push('/areas');
            //         break;
            //     case '3':
            //         history.push('/riskcategories');
            //         break;
            //     default:
            //         break;
            // }
        }
        catch (error){
            console.log(error);
        }
    }