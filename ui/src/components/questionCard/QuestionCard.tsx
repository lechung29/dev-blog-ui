import React from "react";
import "./index.scss";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack } from "@mui/material";
import { IPostCardItemProps } from "../postCard/PostCard";

const QuestionCard: React.FunctionComponent<IPostCardItemProps> = (props) => {
    const { item, onClick } = props
    return (
        <Stack className="g-question-card-section">
            <div className="g-question-card-title">
                <TooltipHost title={item.title}>
                    <span onClick={onClick}>{item.title}</span>
                </TooltipHost>
            </div>
            <div className="g-question-card-reaction">
                <TooltipHost title={`Lượt thích: ${item.totalLikes}`}>
                    <div className="g-post-card-reaction-item">
                        <RemoveRedEyeIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{item.totalLikes}</span>
                    </div>
                </TooltipHost>
                <TooltipHost title={`Bình luận: ${item.comments.length}`}>
                    <div className="g-post-card-reaction-item">
                        <ModeCommentIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{item.comments.length}</span>
                    </div>
                </TooltipHost>
                <TooltipHost title={`Favorites: ${item.totalFavorites}`}>
                    <div className="g-post-card-reaction-item">
                        <FavoriteIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{item.totalFavorites}</span>
                    </div>
                </TooltipHost>
            </div>
            <div className="g-question-card-author">
                <p className="g-post-card-category-item">{item.author.displayName}</p>
            </div>
        </Stack>
    );
};

export default QuestionCard;
