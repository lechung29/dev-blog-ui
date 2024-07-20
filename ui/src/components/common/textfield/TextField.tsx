import React, { Fragment, useMemo } from "react";
import { IAction1 } from "../../../types/Function";
import { FormHelperText, OutlinedInput, OutlinedInputProps } from "@mui/material";

export interface ITextFieldProps extends OutlinedInputProps {
    bold?: boolean;
    helpText?: string;
    errorMessage?: string
    onValueChange?: IAction1<string>;
}

const TextFieldView: React.FunctionComponent<ITextFieldProps> = (props) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        if (props.type === "number") {
            const numberRegex: RegExp = /^[0-9]\d*$/g;
            if (newValue !== "" && (
                !newValue.match(numberRegex)
                || newValue.match(numberRegex)?.length !== 1
            )) {
                return;
            }
        }

        if (props.onValueChange) {
            props.onValueChange(event.target.value || "");
        }

        if (props.onChange) {
            props.onChange(event);
        }
    }

    const onRenderMessage: JSX.Element = useMemo(() => {
        return !!props.errorMessage || !!props.helpText
            ? <FormHelperText 
                error={!!props.errorMessage}
                className={`g-helpText-message ${!!props.errorMessage && "g-helpText-error-message"}`}
            >
                {props.errorMessage || props.helpText}
            </FormHelperText>
            : <Fragment></Fragment>
    }, [props.errorMessage, props.helpText])      
    return (
        <div className="g-form-textfield g-form-outline-textfield">
            <OutlinedInput 
                {...props} 
                className={`${props.className} ${props.errorMessage && "g-input-error"}`}
                type={props.type === "number" ? "" : props.type}
                error={!!props.errorMessage}
                onChange={onChange}
            />
            {onRenderMessage}
        </div>
        
    )
};

export { TextFieldView as TextField };

