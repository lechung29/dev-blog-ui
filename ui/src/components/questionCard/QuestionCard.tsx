import React from "react";
import "./index.scss";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
const QuestionCard = () => {
    return (
        <div className="g-question-card-section">
            <div className="g-question-card-title">
                <TooltipHost title={"Store Procedure."}> 
                    <span>{"Store Procedure dsdfdsfds dshf lkdsj flkds ídjfl kdskff"}</span>
                </TooltipHost>
            </div>
            <div className="g-question-card-reaction">
                <TooltipHost title={"Lượt thích: 7"}>
                    <div className="g-post-card-reaction-item">
                        <RemoveRedEyeIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{7}</span>
                    </div>
                </TooltipHost>
                <TooltipHost title={"Bình luận: 3"}>
                    <div className="g-post-card-reaction-item">
                        <ModeCommentIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                        <span>{3}</span>
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
                <p className="g-post-card-category-item">{"Nam Do"}</p>
            </div>
        </div>
    );
};

export default QuestionCard;
