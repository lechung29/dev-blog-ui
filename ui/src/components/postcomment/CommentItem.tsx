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
import { IRequestStatus } from '../../types/IResponse';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation()
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
                draft.message = t(res.message);
            })
            if (res.requestStatus === IRequestStatus.Success) await refreshPost()
        } catch (error: any) {
            console.log(error)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.message = t(error.message);
            })
        }
    }

    const onUpdateComment = async () => {
        if (!commentValue.trim()) {
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.error
                draft.message = t("Not.Allowed.Comment.Blank")
            })
            return Promise.resolve()
        }

        try {
            const res = await CommentService.updateComment(props.item._id, user?._id!, commentValue, handleUnauthorized)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.success
                draft.message = t(res.message)
                draft.isUpdateComment = false
            })
            if (res.requestStatus === IRequestStatus.Success) await refreshPost()

        } catch (error: any) {
            console.log(error)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.error
                draft.message = t(error.message)
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
                draft.message = t(res.message)
                draft.isOpenDeleteCommentDialog = false
                draft.isDeletingComment = false
            })
            if (res.requestStatus === IRequestStatus.Success) await refreshPost()
        } catch (error: any) {
            console.log(error)
            setState((draft) => {
                draft.isOpenAlert = true;
                draft.alertType = ISeverity.error
                draft.message = t(error.message)
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
                        placeholder={t("Fill.Comment.Here")}
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
                            title={t("Common.Cancel")}
                            onClick={onCancelUpdate}
                        />
                        <DefaultButton
                            className='g-post-comment-update-action-submit'
                            variant="contained"
                            size="small"
                            title={t("Common.Edit")}
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
                            title={t("Comment.Action.Like")}
                            onClick={handleLikeComment}
                        />

                        {user?._id === props.item.commentator._id && <DefaultButton
                            className='g-post-comment-action-button'
                            title={t("Common.Edit")}
                            onClick={() => setState({ isUpdateComment: true })}
                        />}

                        {user?._id === props.item.commentator._id && <DefaultButton
                            className='g-post-comment-action-button'
                            title={t("Comment.Action.Delete")}
                            onClick={() => setState({ isOpenDeleteCommentDialog: true })}
                        />}

                        {isOpenDeleteCommentDialog && <ConfirmDialog
                            open={isOpenDeleteCommentDialog}
                            title={t("Confirm.Delete.Comment.Title")}
                            content={t("Confirm.Delete.Comment.Description")}
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