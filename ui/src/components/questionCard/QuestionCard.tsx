import React from "react";
import "./index.scss";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Stack } from "@mui/material";
import { IPostCardItemProps } from "../postCard/PostCard";

const QuestionCard: React.FunctionComponent<IPostCardItemProps> = (props) => {
    return (
        <Stack className="g-question-card-section">
            <div className="g-question-card-title">
                <TooltipHost title={props.item.title}> 
                    <span>{props.item.title}</span>
                </TooltipHost>
            </div>
            <div className="g-question-card-reaction">
                <TooltipHost title={`Lượt thích: ${props.item.totalLikes}`}>
                    <div className="g-post-card-reaction-item">
                        <RemoveRedEyeIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{props.item.totalLikes}</span>
                    </div>
                </TooltipHost>
                <TooltipHost title={`Bình luận: ${props.item.comments.length}`}>
                    <div className="g-post-card-reaction-item">
                        <ModeCommentIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{props.item.comments.length}</span>
                    </div>
                </TooltipHost>
                <TooltipHost title={"Bookmark: 1"}>
                    <div className="g-post-card-reaction-item">
                        <BookmarkIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{1}</span>
                    </div>
                </TooltipHost>
            </div>
            <div className="g-question-card-author">
                <p className="g-post-card-category-item">{props.item.author.displayName}</p>
            </div>
        </Stack>
    );
};

export default QuestionCard;
