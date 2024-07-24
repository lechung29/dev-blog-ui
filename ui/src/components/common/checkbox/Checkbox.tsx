import { Checkbox, FormControlLabel, FormControlLabelProps, FormHelperText } from "@mui/material";
import React, { Fragment, useMemo } from "react";
import "./index.scss";
export interface ICheckboxProps extends FormControlLabelProps {
    labelStyle?: React.CSSProperties;
    error?: boolean;
    errorMessage?: string;
}
const CheckboxView: React.FunctionComponent<ICheckboxProps> = (props) => {
    const { labelStyle, error, errorMessage, ...rest } = props;
    const onRenderMessage: JSX.Element = useMemo(() => {
        return (error || errorMessage)
            ? <FormHelperText 
                error={error}
                className={`g-helpText-message ${!!errorMessage && "g-helpText-error-message"}`}
            >
                {errorMessage || ""}
            </FormHelperText>
            : <Fragment></Fragment>
    }, [errorMessage, error])    
    return (
        <div className={`g-checkbox-container`}>
            <FormControlLabel {...rest} control={<Checkbox />} />
            {onRenderMessage}
        </div>
    );
};

export { CheckboxView as Checkbox };
