import { useField } from "formik";
import { TextField, InputLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';


// Input component that handles the validations of a field
export default function InputFormik({ label, type, ...props }) {
  const [field, meta] = useField(props)
  return (
    <>
      {

        type === "text" || type === "password" ?

          <TextField
            {...field}
            {...props}
            label={label}
            value={meta.value}
            error={meta.touched && Boolean(meta.error)} // It will display an error if the field has been touched
            margin="dense"
            variant="outlined"
            helperText={(meta.error && meta.touched) && meta.error}
            fullWidth />

          : type === "checkbox" ? (
            <>

              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    {...props}
                    checked={meta.value}
                    label={label}
                    value={meta.value}
                    error={meta.touched && Boolean(meta.error)} // It will display an error if the field has been touched
                    helperText={(meta.error && meta.touched) && meta.error}
                    style={{ color: "#023E7D" }} />
                }
                label="Documentado"
              />


            </>
          )
            : null

      }
    </>

  )
}