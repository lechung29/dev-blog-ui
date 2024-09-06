import { Avatar, Stack } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "./index.scss"
import { ITooltipHostPlacement, TooltipHost } from "../common/tooltiphost/TooltipHost";
import { Label } from "../common/label/Label";
import { IPostDataProps } from "../../types/Post";
import { IAction } from "../../types/Function";

export interface IPostCardItemProps {
    item: IPostDataProps;
    subTitle?: string;
    onClick: IAction;
}

const PostCard: React.FunctionComponent<IPostCardItemProps> = (props) => {
    const { item, subTitle, onClick } = props
    return (
        <Stack direction={"row"} className="g-post-card-section">
            <div className="g-post-card-user-avatar">
                <Avatar sx={{ width: 36, height: 36 }} src={item.author.avatar} />
            </div>
            <div className="g-post-card-content">
                <div className="g-post-card-basic-info">
                    <span className="g-post-card-author">{item.author.displayName}</span>
                    <span className="g-post-card-time-created">{new Date(item.createdAt).toLocaleString()}</span>
                </div>
                <div className="g-post-card-title">
                    <Label
                        title={item.title}
                        subTitle={subTitle ?? ""}
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
                        onClick={onClick}
                    />
                </div>
                <div className="g-post-card-tags">
                    {item.tags.map((tag, id) => (
                        <p key={id} className="g-post-card-tag-item">{tag}</p>
                    ))}
                </div>
                <div className="g-post-card-reaction">
                    <TooltipHost title={`Lượt thích: ${item.like.length}`}>
                        <div className="g-post-card-reaction-item">
                            <RemoveRedEyeIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                            <span>{item.like.length}</span>
                        </div>
                    </TooltipHost>
                    <TooltipHost title={`Bình luận: ${item.comments.length}`}>
                        <div className="g-post-card-reaction-item">
                            <ModeCommentIcon style={{ color: "#9b9b9b", fontSize: 14 }} />
                            <span>{item.comments.length}</span>
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
