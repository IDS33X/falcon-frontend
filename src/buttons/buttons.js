import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

// All the custom buttons (inclding icons and titles) that will be passed to the components will be defined here 

export const deleteButton = {
    id: 1,
    title: "Borrar",
    icon: DeleteIcon,
    onClick: null // The event is null cause it will be defined inside the parent component

}

export const editButton = {
    id: 2,
    title: "Editar",
    icon: EditIcon,
    onClick: null
}


export const showControlsButton = {
    title: "Mostrar controles",
    icon: AssignmentOutlinedIcon,
    onClick: null

}
