import { useField } from "formik";
import { TextField } from "@material-ui/core";

// Input component that handles the validations of a field
export default function InputFormik({ label, ...props }) {
  const [field, meta] = useField(props)
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      value={meta.value}
      error={meta.touched && Boolean(meta.error)}
      margin="dense"
      variant="outlined"
      helperText={(meta.error && meta.touched) && meta.error}
      fullWidth
    />

  )
}

