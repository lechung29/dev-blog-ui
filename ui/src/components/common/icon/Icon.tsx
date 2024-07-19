import { IIconProps, IIconStyleProps } from "@fluentui/react";
import { Icon } from '@fluentui/react/lib/Icon';
import React from "react";

interface IIIconProps extends IIconProps {
    a?: string;
}

interface IIIconStyleProps extends IIconStyleProps {}

const IconView: React.FunctionComponent<IIIconProps> = (props) => {
    return (
        <Icon {...props}/>
    )
};

export { IconView as Icon };

export type {
    IIIconProps as IIconProps,
    IIIconStyleProps as IIconStyleProps,
}
