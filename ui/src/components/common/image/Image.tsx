import React from "react";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";

interface IIImageProps extends IImageProps {
    objectFit: ImageFit;
}

const ImageView: React.FunctionComponent<IIImageProps> = (props) => {
    const { objectFit } = props;
    return <Image {...props} imageFit={objectFit} />;
};

export { ImageView as Image };
