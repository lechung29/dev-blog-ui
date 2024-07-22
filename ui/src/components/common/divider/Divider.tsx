import { Divider, DividerOwnProps, styled } from "@mui/material";
import React from "react";

export interface IDividerProps extends DividerOwnProps {
    title?: string;
    textFontSize?: number;
    margin?: string
}

const DividerView: React.FunctionComponent<IDividerProps> = (props) => {
    const { title, margin, textFontSize, ...rest } = props;
    const Root = styled("div")(({ theme }) => ({
        width: "100%",
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        "& > :not(style) ~ :not(style)": {
            marginTop: theme.spacing(2),
        },
        fontSize: textFontSize,
        margin: margin,
    }));
    return <Root>
        {title 
            ? <Divider {...rest}>{title}</Divider> 
            : <Divider {...rest} />
        }
    </Root>;
};

export { DividerView as Divider };
