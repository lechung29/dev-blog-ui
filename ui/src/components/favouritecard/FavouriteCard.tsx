import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useMemo } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IPostDataProps } from "../../types/Post";
import { useNavigate } from "react-router-dom";
import "./index.scss"
import { IconButton } from "../common/button/iconbutton/IconButton";
import { DefaultButton } from "../common/button/defaultbutton/DefaultButton";
import { useTranslation } from "react-i18next";

interface IFavouriteCardProps {
    item: IPostDataProps
    onChangeFavorite: (item: IPostDataProps) => void
}

const FavouriteCard: React.FunctionComponent<IFavouriteCardProps> = (props) => {
    const { item, onChangeFavorite } = props
    const { t } = useTranslation();
    const navigate = useNavigate();
    const favoriteIcon = useMemo(() => {
        return item.isFavorite
            ? <FavoriteIcon style={{
                color: "red"
            }} />
            : <FavoriteBorderIcon />
    }, [item.isFavorite])
    return (
        <Card className="g-favorite-card">
            <CardActionArea className="g-card-action-area">
                <CardMedia
                    component="img"
                    height="100"
                    image={item.thumbnail}
                    alt={item.title} />
                <CardContent>
                    <TooltipHost title={item.title}>
                        <Typography
                            className="g-card-title"
                            gutterBottom
                            component="div"
                        >
                            {item.title}
                        </Typography>
                    </TooltipHost>
                    <Typography className="g-card-sub-title">
                        {t("Common.Author")} {item.author.displayName}
                    </Typography>
                    <Typography className="g-card-sub-title">
                        {t("Common.Category")} {item.category}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="g-card-footer-action">
                <DefaultButton
                    size="small"
                    color="primary"
                    endIcon={<ArrowRightAltIcon />}
                    className="g-none-border-button"
                    title={t("Common.Seen.Post")}
                    onClick={() => navigate(`/post/${item._id}`)}
                />
                <IconButton
                    size="small"
                    className="g-favorite-icon-button"
                    icon={favoriteIcon}
                    onClick={() => onChangeFavorite(item)}
                />
            </CardActions>
        </Card>
    );
};

export default FavouriteCard;
