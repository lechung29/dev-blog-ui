import React, { useState } from 'react'
import "./index.scss"
import { Avatar, Badge } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface ICommentItemProps { }

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
    const [isLike, setIsLike] = useState(false)
    const onRenderBadgeContent= () => {
        return (
            <div 
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    backgroundColor: "#5488c7"
                }}
            >
                <ThumbUpAltIcon 
                    style={{
                        fontSize: 13,
                    }}
                />
                <span>123</span>
            </div>
        )
    }
    return (
        <div className='g-post-comment-item'>
            <div className="g-post-comment-avatar">
                <Avatar sx={{ width: 36, height: 36 }} >N</Avatar>
            </div>
            <div className='g-post-comment-data'>
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={onRenderBadgeContent()}
                    color='info'
                >
                    <div className="g-post-comment-info">
                        <p className="g-post-comment-username">Killian</p>
                        <p className='g-post-comment-content'>Bài viết haydssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                    </div>
                </Badge>

                <div className='g-post-comment-action-bottom'>
                    <span 
                        style={{
                            fontWeight: isLike ? "600" : "400",
                            cursor: "pointer",
                            color: isLike ? "#5488c7" : "#000"
                        }}
                        onClick={() => setIsLike(!isLike)}
                    >
                        Thích
                    </span>
                    <span>Chỉnh sửa</span>
                    <span>3 ngày trước</span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem