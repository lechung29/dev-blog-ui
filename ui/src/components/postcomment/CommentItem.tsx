import React, { useState } from 'react'
import "./index.scss"
import { Avatar, Badge, Button, Stack } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comment from './Comment';

interface ICommentItemProps { }

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
    const [isLike, setIsLike] = useState(false)
    const [isUpdateComment, setIsUpdateComment] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const onRenderBadgeContent = () => {
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
            {isUpdateComment
                ? <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "100%",
                }}>
                    <Comment
                        className='g-post-comment-textarea'
                        placeholder='Nhập bình luận tại đây'
                        minRows={4}
                        maxRows={4}
                        value={commentValue}
                        onChange={(e) => {
                            setCommentValue(e.target.value)
                        }}
                        style={{
                            width: "100%",
                        }}
                    />
                    <Stack
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                        flexDirection={"row"}
                        width={"100%"}
                        gap={2}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            style={{
                                backgroundColor: "transparent",
                                color: "#9b9b9b",
                                textTransform: "none",
                                borderColor: "#9b9b9b"
                            }}
                            onClick={() => {
                                setIsUpdateComment(false)
                                setCommentValue("")
                            }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            style={{
                                backgroundColor: "#5488c7",
                                color: "#fff",
                                textTransform: "none",
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </Stack>
                </div>
                : <div className='g-post-comment-data'>
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
                            <p className='g-post-comment-content'>Bài viết haydssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss Bài viết haydssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss Bài viết haydssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
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
                        <span
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => setIsUpdateComment(true)}
                        >
                            Chỉnh sửa
                        </span>
                        <span>3 ngày trước</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentItem