import { Checkbox, FormControlLabel, FormControlLabelProps, FormHelperText } from "@mui/material";
import React, { Fragment, useMemo } from "react";
import "./index.scss";
import { classNames } from "../../../utils/helper";
export interface ICheckboxProps extends FormControlLabelProps {
    error?: boolean;
    errorMessage?: string;
}
const CheckboxView: React.FunctionComponent<ICheckboxProps> = (props) => {
    const { error, errorMessage, ...rest } = props;

    const onRenderMessage: JSX.Element = useMemo(() => {
        return (error || errorMessage)
            ? <FormHelperText
                error={error}
                className={classNames("g-helpText-message", { "g-helpText-error-message": errorMessage })}
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
