import { Avatar } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "./index.scss"
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
const PostCard = () => {
    return (
        <div className="g-post-card-section">
            <div className="g-post-card-user-avatar">
                <Avatar sx={{ width: 36, height: 36 }}>N</Avatar>
            </div>
            <div className="g-post-card-content">
                <div className="g-post-card-basic-info">
                    <span className="g-post-card-author">{"Lâm Phú Cường"}</span>
                    <span className="g-post-card-time-created">{"Khoảng 8 giờ trước"}</span>
                </div>
                <div className="g-post-card-title">
                    <TooltipHost title={"Chia Sẻ Trực Tiếp Bài Hát Đang Nghe Lên Website Với Spotify API"}>
                        <span>{"Chia Sẻ Trực Tiếp Bài Hát Đang Nghe Lên Website Với Spotify API"}</span>
                    </TooltipHost>
                </div>
                <div className="g-post-card-category">
                    <p className="g-post-card-category-item">{"Amazon Web Services (AWS)"}</p>
                    <p className="g-post-card-category-item">{"Amazon Web Services (AWS)"}</p>
                    <p className="g-post-card-category-item">{"Amazon Web Services (AWS)"}</p>
                </div>
                <div className="g-post-card-reaction">
                    <TooltipHost title={"Lượt thích: 7"}>
                        <div className="g-post-card-reaction-item">
                            <RemoveRedEyeIcon style={{color: "#9b9b9b",  fontSize: 14}} />
                            <span>{7}</span>
                        </div>
                    </TooltipHost>
                    <TooltipHost title={"Bình luận: 3"}>
                        <div className="g-post-card-reaction-item">
                            <ModeCommentIcon style={{color: "#9b9b9b", fontSize: 14}} />
                            <span>{3}</span>
                        </div>
                    </TooltipHost>
                    <TooltipHost title={"Bookmark: 1"}>
                        <div className="g-post-card-reaction-item">
                            <BookmarkIcon style={{color: "#9b9b9b", fontSize: 14}} />
                            <span>{1}</span>
                        </div>
                    </TooltipHost>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
