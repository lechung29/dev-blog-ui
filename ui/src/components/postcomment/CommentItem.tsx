import React from 'react'
import "./index.scss"
import { Avatar, Badge, Stack } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comment from './Comment';
import { IReferenceComments } from '../../types/Comment';
import { useAppSelector } from '../../redux/store/store';
import { userState } from '../../redux/reducers/users/UserSlice';
import { CommentService } from '../../services/comments/CommentService';
import ConfirmDialog from '../common/confirmDialog/ConfirmDialog';
import { useAuth } from '../../context/AuthContext';
import { useImmerState } from '../../hook/useImmerState';
import { IAction, IFunc } from '../../types/Function';
import { Alert, ISeverity } from '../common/alert/Alert';
import { DefaultButton } from '../common/button/defaultbutton/DefaultButton';
import { classNames, formatDate } from '../../utils/helper';

interface ICommentItemProps {
    item: IReferenceComments
    refreshPost: () => Promise<void>
}

interface ICommentItemState {
    isUpdateComment: boolean,
    isOpenDeleteCommentDialog: boolean,
    commentValue: string,
    isDeletingComment: boolean
    isOpenAlert: boolean;
    message: string;
    alertType: ISeverity
    isDisabledLikeComment: boolean
}

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
    const { item, refreshPost } = props
    const { user } = useAppSelector(userState)
    const { handleUnauthorized } = useAuth()
    const initialState: ICommentItemState = {
        isUpdateComment: false,
        isOpenDeleteCommentDialog: false,
        commentValue: item.content,
        isDeletingComment: false,
        isOpenAlert: false,
        message: "",
        alertType: ISeverity.success,
        isDisabledLikeComment: false
    }
    const [state, setState] = useImmerState<ICommentItemState>(initialState)
    const { commentValue, isDeletingComment, isOpenDeleteCommentDialog, isUpdateComment, isOpenAlert, message } = state

    const onRenderBadgeContent: IFunc<JSX.Element | null> = () => {
        if (!item.like.length) return null
        return (
            <div className='g-comment-badge-content'>
                <ThumbUpAltIcon className='g-comment-badge-icon' />
                <strong>{item.like.length}</strong>
            </div>
        )
    }



    const handleLikeComment = async () => {
        try {
            const res = await CommentService.likeComment(item._id, handleUnauthorized)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.message = res.message;
            })
            await refreshPost()
        } catch (error: any) {
            console.log(error)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.message = error.message;
            })
        }
    }

    const onUpdateComment = async () => {
        if (!commentValue.trim()) {
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.error
                draft.message = "Không được để trống"
            })
            return Promise.resolve()
        }

        try {
            const res = await CommentService.updateComment(props.item._id, user?._id!, commentValue, handleUnauthorized)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.success
                draft.message = res.message;
                draft.isUpdateComment = false
            })
            await refreshPost()

        } catch (error: any) {
            console.log(error)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.error
                draft.message = error.message
            })
        }
    }

    const handleDeleteComment = async () => {
        setState({ isDeletingComment: true })
        try {
            const res = await CommentService.deleteComment(props.item._id, user?._id!, handleUnauthorized)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.success
                draft.message = res.message;
                draft.isOpenDeleteCommentDialog = false
                draft.isDeletingComment = false
            })
            await refreshPost()
        } catch (error: any) {
            console.log(error)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.error
                draft.message = error.message
                draft.isDeletingComment = false
            })
        }
    }

    const onCancelUpdate: IAction = () => {
        setState((draft) => {
            draft.isUpdateComment = false
            draft.commentValue = props.item.content
        })
    }

    return (
        <div className='g-post-comment-item'>
            <div className="g-post-comment-avatar">
                <Avatar
                    className="g-post-comment-avatar-image"
                    src={item.commentator.avatar}
                    alt={item.commentator.displayName} />
            </div>
            {isUpdateComment
                ? <div className='g-post-comment-update-section' >
                    <Comment
                        className='g-post-comment-textarea-updated'
                        placeholder='Nhập bình luận tại đây'
                        minRows={4}
                        maxRows={4}
                        value={commentValue}
                        onChange={(e) => setState({ commentValue: e.target.value })}
                    />
                    <Stack className='g-post-comment-update-action'>
                        <DefaultButton
                            className='g-post-comment-update-action-cancel'
                            variant="outlined"
                            size="small"
                            title='Hủy bỏ'
                            onClick={onCancelUpdate}
                        />
                        <DefaultButton
                            className='g-post-comment-update-action-submit'
                            variant="contained"
                            size="small"
                            title='Chỉnh sửa'
                            onClick={onUpdateComment}
                        />
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
                            <p className="g-post-comment-username">{item.commentator.displayName}</p>
                            <p className='g-post-comment-content'>{item.content}</p>
                        </div>
                    </Badge>

                    <div className='g-post-comment-action-bottom'>
                        <DefaultButton
                            className={classNames('g-post-comment-action-button', { 'g-post-comment-action-button-active': item.isLike })}
                            title='Thích'
                            onClick={handleLikeComment}
                        />

                        {user?._id === props.item.commentator._id && <DefaultButton
                            className='g-post-comment-action-button'
                            title='Chỉnh sửa'
                            onClick={() => setState({ isUpdateComment: true })}
                        />}

                        {user?._id === props.item.commentator._id && <DefaultButton
                            className='g-post-comment-action-button'
                            title='Xóa'
                            onClick={() => setState({ isOpenDeleteCommentDialog: true })}
                        />}

                        {isOpenDeleteCommentDialog && <ConfirmDialog
                            open={isOpenDeleteCommentDialog}
                            title={"Xác nhận xóa bình luận"}
                            content={"Bạn có chắc muốn xóa bình luận này?"}
                            onClose={() => setState({ isOpenDeleteCommentDialog: false })}
                            isLoading={isDeletingComment}
                            handleConfirm={handleDeleteComment}
                        />}
                        <span>{formatDate(new Date(item.createdAt))}</span>
                    </div>
                </div>
            }
            {isOpenAlert && <Alert
                open={isOpenAlert}
                severity={state.alertType}
                message={message}
                onClose={() => setState({ isOpenAlert: false })}
            />}
        </div>
    )
}

export default CommentItem