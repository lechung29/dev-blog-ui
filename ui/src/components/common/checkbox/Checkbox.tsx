import { Checkbox, FormControlLabel, FormControlLabelProps } from "@mui/material";
import React from "react";

export interface ICheckboxProps extends FormControlLabelProps {
    labelStyle?: React.CSSProperties;
}
const CheckboxView: React.FunctionComponent<ICheckboxProps> = (props) => {
    const { labelStyle, ...rest } = props;
    return <FormControlLabel 
        {...rest} 
        
        control={<Checkbox />} 
    />;
};

export { CheckboxView as Checkbox };
