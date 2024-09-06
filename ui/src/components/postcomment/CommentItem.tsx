import React, { useState } from 'react'
import "./index.scss"
import { Avatar, Badge, Button, Stack } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comment from './Comment';
import { IReferenceComments } from '../../types/Comment';
import { useAppSelector } from '../../redux/store/store';
import { userState } from '../../redux/reducers/users/UserSlice';
import { CommentService } from '../../services/comments/CommentService';
import { IToastProps, renderToast } from '../../utils/utils';
import { IRequestStatus } from '../../types/IResponse';
import ConfirmDialog from '../common/confirmDialog/ConfirmDialog';

interface ICommentItemProps {
    item: IReferenceComments
    refreshPost: () => Promise<void>
}

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
    const { user } = useAppSelector(userState)
    const [isUpdateComment, setIsUpdateComment] = useState(false)
    const [isOpenDeleteCommentDialog, setIsOpenDeleteCommentDialog] = useState(false)
    const [isDeletingComment, setIsDeletingComment] = useState(false)
    const [commentValue, setCommentValue] = useState(props.item.content)
    const onRenderBadgeContent = () => {
        if (!props.item.like.length) return null
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
                <span>{props.item.like?.length}</span>
            </div>
        )
    }

    const handleLikeComment = () => {
        return CommentService.likeComment(props.item._id)
            .then((data) => {
                renderToast(
                    data.requestStatus === IRequestStatus.Success ? IToastProps.success : IToastProps.error,
                    data.message
                )
                props.refreshPost()
            })
    }

    const onUpdateComment = () => {
        if (!commentValue.trim()) {
            renderToast(IToastProps.error, "Không được để trống")
            return
        }
        return CommentService.updateComment(props.item._id, user?._id!, commentValue)
            .then((data) => {
                renderToast(
                    data.requestStatus === IRequestStatus.Success ? IToastProps.success : IToastProps.error,
                    data.message
                )
                setIsUpdateComment(false)
                props.refreshPost()
            })
    }

    const handleDeleteComment = () => {
        setIsDeletingComment(true)
        return CommentService.deleteComment(props.item._id, user?._id!)
            .then((data) => {
                renderToast(
                    data.requestStatus === IRequestStatus.Success ? IToastProps.success : IToastProps.error,
                    data.message
                )
                setIsDeletingComment(false)
                setIsOpenDeleteCommentDialog(false)
                props.refreshPost()
            })
    }
    return (
        <div className='g-post-comment-item'>
            <div className="g-post-comment-avatar">
                <Avatar src={props.item.commentator.avatar} sx={{ width: 36, height: 36 }} alt={props.item.commentator.displayName} />
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
                                setCommentValue(props.item.content)
                            }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={onUpdateComment}
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
                            <p className="g-post-comment-username">{props.item.commentator.displayName}</p>
                            <p className='g-post-comment-content'>{props.item.content}</p>
                        </div>
                    </Badge>

                    <div className='g-post-comment-action-bottom'>
                        <span
                            style={{
                                fontWeight: props.item.isLike ? "600" : "400",
                                cursor: "pointer",
                                color: props.item.isLike ? "#5488c7" : "#000"
                            }}
                            onClick={handleLikeComment}
                        >
                            Thích
                        </span>
                        {user?._id === props.item.commentator._id && <span
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => setIsUpdateComment(true)}
                        >
                            Chỉnh sửa
                        </span>}
                        {user?._id === props.item.commentator._id && <span
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => setIsOpenDeleteCommentDialog(true)}
                        >
                            Xóa
                        </span>}
                        {isOpenDeleteCommentDialog && <ConfirmDialog 
                            open={isOpenDeleteCommentDialog}
                            title={"Xác nhận xóa bình luận"}
                            content={"Bạn có chắc muốn xóa bình luận này?"}
                            onClose={() => setIsOpenDeleteCommentDialog(false)}
                            isLoading={isDeletingComment}
                            handleConfirm={handleDeleteComment}
                        />}
                        <span>{new Date(props.item.createdAt).toLocaleString()}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentItem