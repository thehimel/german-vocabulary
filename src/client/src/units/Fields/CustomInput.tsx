import { Input, InputProps } from "@nextui-org/react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps extends InputProps {
  errorMessage?: string;
  isSubmitting: boolean;
  fields: UseFormRegisterReturn;
}

const CustomInput: React.FC<CustomInputProps> = ({errorMessage, isSubmitting, fields, ...props}) => {
  return (
    <Input
      {...fields}
      {...props}
      variant="bordered"
      autoComplete="off"
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
      isDisabled={isSubmitting}
    />
  );
};

export default CustomInput;
