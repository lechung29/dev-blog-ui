import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface IFavouriteCardProps {
}

const FavouriteCard: React.FunctionComponent<IFavouriteCardProps> = (props) => {
    const [isFavourite, setFavourite] = useState<boolean>(true)
    const onChangeFavourite = () => {
        setFavourite(!isFavourite)
    }
	return (
		<Card sx={{ maxWidth: "100%" }}>
			<CardActionArea style={{cursor: "auto"}}>
				<CardMedia component="img" height="100" image="/static/images/cards/contemplative-reptile.jpg" alt="green iguana" />
				<CardContent>
					<TooltipHost title={"Lizard Lizard Lizard Lizard Lizard Lizard"}>
                        <Typography 
                            style={{
                                fontSize: 18,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }} 
                            gutterBottom 
                            component="div"
                        >
                            Lizard Lizard Lizard Lizard Lizard Lizard
                        </Typography>
                    </TooltipHost>
					<Typography variant="body2" color="text.secondary">
                        Tác giả: admin
					</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Thể loại: Reactjs
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem"
            }}>
				<Button 
                    size="small" 
                    color="primary"
                    endIcon={<ArrowRightAltIcon />}
                    className="g-none-border-button"
                >
					Xem bài viết
				</Button>
                <IconButton 
                    size="small"
                    className="g-favourite-icon-button" 
                    onClick={onChangeFavourite}
                >
                    {isFavourite 
                        ? <FavoriteIcon style={{
                            color: "red"
                        }}/> 
                        : <FavoriteBorderIcon />
                    }
                </IconButton>
			</CardActions>
		</Card>
	);
};

export default FavouriteCard;
