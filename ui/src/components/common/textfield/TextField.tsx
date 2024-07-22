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
    const {bold, helpText, errorMessage, onValueChange, ...rest} = props;
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

        if (onValueChange) {
           onValueChange(event.target.value || "");
        }

        if (props.onChange) {
            props.onChange(event);
        }
    }

    const onRenderMessage: JSX.Element = useMemo(() => {
        return !!errorMessage || !!helpText
            ? <FormHelperText 
                error={!!errorMessage}
                className={`g-helpText-message ${!!errorMessage && "g-helpText-error-message"}`}
            >
                {errorMessage || helpText}
            </FormHelperText>
            : <Fragment></Fragment>
    }, [errorMessage, helpText])      
    return (
        <div className="g-form-textfield g-form-outline-textfield">
            <OutlinedInput 
                {...rest} 
                className={`${props.className} ${props.errorMessage && "g-input-error"}`}
                type={props.type === "number" ? "" : props.type}
                error={!!errorMessage}
                onChange={onChange}
            />
            {onRenderMessage}
        </div>
        
    )
};

export { TextFieldView as TextField };

