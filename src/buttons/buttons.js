import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';


// All the custom buttons (inclding icons and titles) that will be passed to the components will be defined here 

export const deleteButton = {
    title: "Borrar",
    icon: DeleteIcon,
    onClick: null // The event is null cause it will be defined inside the parent component

}

export const editButton = {
    title: "Editar",
    icon: EditIcon,
    onClick: null

}