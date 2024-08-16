import { Avatar, Stack } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "./index.scss"
import { ITooltipHostPlacement, TooltipHost } from "../common/tooltiphost/TooltipHost";
import { Label } from "../common/label/Label";

export interface IPostCardItemProps {
    postAuthor: string;
    authorAvatar: string;
    title: string;
    subTitle?: string;
    postCreatedAt: string;
    category: string;
    postComment: any[];
}

const PostCard: React.FunctionComponent<IPostCardItemProps> = (props) => {
    return (
        <Stack direction={"row"} className="g-post-card-section">
            <div className="g-post-card-user-avatar">
                <Avatar sx={{ width: 36, height: 36 }} >N</Avatar>
            </div>
            <div className="g-post-card-content">
                <div className="g-post-card-basic-info">
                    <span className="g-post-card-author">{props.postAuthor}</span>
                    <span className="g-post-card-time-created">{props.postCreatedAt}</span>
                </div>
                <div className="g-post-card-title">
                    <Label
                        title={props.title}
                        subTitle={props.subTitle}
                        subTitleStyle={{
                            color: "#5488c7",
                            fontWeight: 600,
                        }}
                        tooltipProps={{
                            arrow: true,
                            placement: ITooltipHostPlacement.Top
                        }}
                        style={{
                            cursor: "pointer",
                        }}
                    />
                </div>
                <div className="g-post-card-category">
                    <p className="g-post-card-category-item">{props.category}</p>
                </div>
                <div className="g-post-card-reaction">
                    <TooltipHost title={"Lượt thích: 7"}>
                        <div className="g-post-card-reaction-item">
                            <RemoveRedEyeIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                            <span>{7}</span>
                        </div>
                    </TooltipHost>
                    <TooltipHost title={`Bình luận: ${props.postComment.length}`}>
                        <div className="g-post-card-reaction-item">
                            <ModeCommentIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                            <span>{props.postComment.length}</span>
                        </div>
                    </TooltipHost>
                    <TooltipHost title={"Bookmark: 1"}>
                        <div className="g-post-card-reaction-item">
                            <BookmarkIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                            <span>{1}</span>
                        </div>
                    </TooltipHost>
                </div>
            </div>
        </Stack>
    );
};

export default PostCard;
