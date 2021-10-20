import { useField } from "formik";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// Input component that handles the validations of a field
export default function InputFormik({ label, handleShowPassword, ...props }) {
  const [field, meta] = useField(props)
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      value={meta.value}
      error={meta.touched && Boolean(meta.error)} // It will display an error if the field has been touched
      margin="dense"
      variant="outlined"
      helperText={(meta.error && meta.touched) && meta.error}
      fullWidth

      InputProps={field.name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {field.type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />

  )
}

