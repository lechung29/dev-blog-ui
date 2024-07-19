import React, { Fragment } from "react";
import { TextField, ITextFieldProps, ITextField, ITextFieldStyleProps, ITextFieldStyles, ITextFieldSubComponentStyles } from "@fluentui/react/lib/TextField";
import { IAction1, IFunc } from "../../../types/Function";
import { ILabelBoldType, Label } from "../label/Label";
import { getId, mergeStyles } from "@fluentui/react";

interface IITextFieldProps extends ITextFieldProps {
    bold?: boolean;
    onValueChange?: IAction1<string>;
    boldType?: ILabelBoldType;
    description?: string;
}

interface IITextField extends ITextField {}

interface IITextFieldStyleProps extends ITextFieldStyleProps {}

interface IITextFieldStyles extends ITextFieldStyles {}

interface IITextFieldSubComponentStyles extends ITextFieldSubComponentStyles {}

const TextFieldView: React.FunctionComponent<IITextFieldProps> = (props) => {
    
    const { required, bold, boldType, errorMessage, description, id, type } = props;
    const onChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        const { onValueChange } = props;

        if (type === "number") {
            const numberRegex: RegExp = /^[0-9]\d*$/g;
            if (newValue !== "" && (!newValue?.match(numberRegex) || newValue?.match(numberRegex)?.length !== 1)) {
                return;
            }
        }

        if (onValueChange) {
            onValueChange(newValue || "");
        }

        if (props.onChange) {
            props.onChange(event, newValue);
        }
    };

    const labelId = getId(id || "label");
    const className = mergeStyles("g-common-textfield", props.className)
    const onRenderLabel: IFunc<JSX.Element> = () => {
        const labelText = props.label || props.title
        return labelText ? <Label 
            id={labelId}
            bold={bold}
            boldType={boldType}
            required={required}
            description={description}
        >
            {props.label || props.title}
        </Label> : <Fragment></Fragment>
    }
    return (Boolean(id && props["aria-describedby"])) ? 
        (<TextField
            {...props}
            description=""
            type={type === "number" ? "" : type}
            className={className}
            aria-labelledby={labelId}
            aria-describedby={props["aria-describedby"]
                ? props["aria-describedby"]
                : `${id}-description`
            }
            onRenderLabel={onRenderLabel}
            onChange={onChange}
            tabIndex={0}
            errorMessage={errorMessage}
            invalid={!!errorMessage}
        />) : (<TextField 
            {...props}
            id={id}
            description=""
            type={type === "number" ? "" : type}
            className={className}
            aria-labelledby={labelId}
            onRenderLabel={onRenderLabel}
            onChange={onChange}
            tabIndex={0}
            errorMessage={errorMessage}
            invalid={!!errorMessage}
        />)
};

export { TextFieldView as TextField };

export type {
    IITextFieldProps as ITextFieldProps,
    IITextField as ITextField,
    IITextFieldStyleProps as ITextFieldStyleProps,
    IITextFieldStyles as ITextFieldStyles,
    IITextFieldSubComponentStyles as ITextFieldSubComponentStyles,
}
