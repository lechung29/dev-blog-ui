import React, { Fragment, useMemo } from "react";
import { IAction1 } from "../../../types/Function";
import { FormHelperText, OutlinedInput, OutlinedInputProps } from "@mui/material";
import { classNames } from "../../../utils/helper";

export interface ITextFieldProps extends OutlinedInputProps {
    bold?: boolean;
    helpText?: string;
    errorMessage?: string
    onValueChange?: IAction1<string>;
}

const TextFieldView: React.FunctionComponent<ITextFieldProps> = (props) => {
    const { bold, helpText, errorMessage, onValueChange, onChange, className, type, ...rest } = props;

    const onHandleChange: IAction1<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>> = (event) => {
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

        if (onChange) {
            onChange(event);
        }
    }


    const inputType = useMemo(() => {
        return type !== "number"
            ? type
            : ""
    }, [type])


    const onRenderMessage: JSX.Element = useMemo(() => {
        return !!errorMessage || !!helpText
            ? <FormHelperText
                error={!!errorMessage}
                className={classNames("g-helpText-message", { "g-helpText-error-message": errorMessage })}
            >
                {errorMessage || helpText}
            </FormHelperText>
            : <Fragment></Fragment>
    }, [errorMessage, helpText])
    

    return (
        <div className="g-form-textfield g-form-outline-textfield">
            <OutlinedInput
                {...rest}
                className={classNames(className, { "g-input-error": errorMessage })}
                type={inputType}
                error={!!errorMessage}
                onChange={onHandleChange}
            />
            {onRenderMessage}
        </div>

    )
};

export { TextFieldView as TextField };

