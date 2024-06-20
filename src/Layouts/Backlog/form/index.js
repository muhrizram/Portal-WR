import React from "react";
import { Controller } from "react-hook-form";
import { getErrorArrayPosition } from "../../../global/formFunctions";
import { TextField } from "@mui/material";

const FormTextField = ({
  name,
  control,
  errors,
  position,
  onTaskChange,
  ...otherProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          error={Boolean(
            getErrorArrayPosition(errors, [
              position.list,
              position.number,
              position.name,
            ])
          )}
          helperText={
            Boolean(
              getErrorArrayPosition(errors, [
                position.list,
                position.number,
                position.name,
              ])
            )
              ? errors.listTask[position.number][position.name].message
              : ""
          }
          onChange={(e) => {
            field.onChange(e.target.value);
            onTaskChange(position.number, position.name, e.target.value);
          }}
        />
      )}
    />
  );
};

export default FormTextField;
