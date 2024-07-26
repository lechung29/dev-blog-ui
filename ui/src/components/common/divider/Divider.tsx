import { Divider, DividerOwnProps, styled } from "@mui/material";
import React from "react";

export interface IDividerProps extends DividerOwnProps {
    title?: string;
    textFontSize?: number;
    margin?: string
    color?: string;
    fontWeight?: number
}

const DividerView: React.FunctionComponent<IDividerProps> = (props) => {
    const { title, margin, textFontSize, color, fontWeight, ...rest } = props;
    const Root = styled("div")(({ theme }) => ({
        width: "100%",
        ...theme.typography.body2,
        color: color || theme.palette.text.secondary,
        "& > :not(style) ~ :not(style)": {
            marginTop: theme.spacing(2),
        },
        fontSize: textFontSize,
        margin: margin,
        fontWeight: fontWeight || theme.typography.fontWeightRegular,
    }));
    return <Root>
        {title 
            ? <Divider {...rest}>{title}</Divider> 
            : <Divider {...rest} />
        }
    </Root>;
};

export { DividerView as Divider };
