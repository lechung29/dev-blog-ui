import { Avatar, Stack } from "@mui/material";
import React from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./index.scss"
import { ITooltipHostPlacement, TooltipHost } from "../common/tooltiphost/TooltipHost";
import { Label } from "../common/label/Label";
import { IPostDataProps } from "../../types/Post";
import { IAction } from "../../types/Function";
import { formatDate } from "../../utils/helper";
import { useTranslation } from "react-i18next";

export interface IPostCardItemProps {
    item: IPostDataProps;
    subTitle?: string;
    onClick: IAction;
}

const PostCard: React.FunctionComponent<IPostCardItemProps> = (props) => {
    const { item, subTitle, onClick } = props
    const { author, title, totalFavorites, totalLikes, tags, createdAt, comments } = item
    const { t } = useTranslation()
    return (
        <Stack className="g-post-card-section">
            <div className="g-post-card-user-avatar">
                <Avatar
                    className="g-post-card-user-avatar-image"
                    src={author.avatar}
                    alt={author.displayName}
                />
            </div>
            <div className="g-post-card-content">
                <div className="g-post-card-basic-info">
                    <span className="g-post-card-author">{author.displayName}</span>
                    <span className="g-post-card-time-created">{formatDate(new Date(createdAt))}</span>
                </div>
                <div className="g-post-card-title">
                    <Label
                        className="g-post-card-title-label"
                        title={title}
                        subTitle={subTitle}
                        subTitleStyle={{
                            color: "#5488c7",
                            fontWeight: 600,
                        }}
                        tooltipProps={{
                            arrow: true,
                            placement: ITooltipHostPlacement.Top
                        }}
                        onClick={onClick}
                    />
                </div>
                <div className="g-post-card-tags">
                    {tags.map((tag, id) => (
                        <Label
                            key={id}
                            className="g-post-card-tag-item"
                            title={tag}
                        />
                    ))}
                </div>
                <div className="g-post-card-reaction">
                    <TooltipHost title={t("Post.Like.Count", { count: totalLikes })}>
                        <div className="g-post-card-reaction-item">
                            <ThumbUpIcon className="g-post-card-react-icon" />
                            <span>{totalLikes}</span>
                        </div>
                    </TooltipHost>
                    <TooltipHost title={t("Post.Comment.Count", { count: comments.length })}>
                        <div className="g-post-card-reaction-item">
                            <ModeCommentIcon className="g-post-card-react-icon" />
                            <span>{item.comments.length}</span>
                        </div>
                    </TooltipHost>
                    <TooltipHost title={t("Post.Favorite.Count", { count: totalFavorites })}>
                        <div className="g-post-card-reaction-item">
                            <FavoriteIcon className="g-post-card-react-icon" />
                            <span>{totalFavorites}</span>
                        </div>
                    </TooltipHost>
                </div>
            </div>
        </Stack>
    );
};

export default PostCard;
