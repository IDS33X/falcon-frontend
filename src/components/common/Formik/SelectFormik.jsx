import { useField } from "formik";
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { TextField } from "@material-ui/core";

// Input component that handles the validations of a field
export default function SelectFormik({ label, options, type, ...props }) {

  const [field, meta] = useField(props)
  return (

    <TextField
      {...field}
      {...props}
      label={label}
      value={meta.value}
      error={meta.touched && Boolean(meta.error)} // It will display an error if the field has been touched
      select
      margin="dense"
      variant="outlined"
      helperText={(meta.error && meta.touched) && meta.error}
      fullWidth>

      {
        type === "inherentRisk"
      }
      <MenuItem value={0}>Seleccionar</MenuItem>
      {

        options && options.map(option => (
          <MenuItem value={option.id} key={option.id}>

            {type === "inherentRisk" ? option.title + ` (S: ${option.severity}, P: ${option.probability})` : option.name}

          </MenuItem>

        ))
      }
    </TextField>

  )
}

