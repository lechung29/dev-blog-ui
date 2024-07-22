import React, { AllHTMLAttributes } from "react";

enum ImageFit {
    CONTAIN = "contain",
    COVER = "cover",
}
export interface IImageProps extends AllHTMLAttributes<HTMLImageElement> {
    objectFit?: ImageFit;
}

const ImageView: React.FunctionComponent<IImageProps> = (props) => {
    const { objectFit, ...rest } = props;
    const imageStyle = {
        objectFit: objectFit
    }
    return <img {...rest} alt={props.alt || "error"} style={imageStyle}/>;
};

export { ImageView as Image, ImageFit };
