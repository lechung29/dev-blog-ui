/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import "./index.scss"
import { Avatar, Badge, Menu, MenuItem, Stack } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comment from './Comment';
import { IReferenceComments } from '../../types/Comment';
import { useAppSelector } from '../../redux/store/store';
import { userState } from '../../redux/reducers/users/UserSlice';
import { CommentService } from '../../services/comments/CommentService';
import ConfirmDialog from '../common/confirmDialog/ConfirmDialog';
import { useImmerState } from '../../hook/useImmerState';
import { IAction, IFunc } from '../../types/Function';
import { Alert, ISeverity } from '../common/alert/Alert';
import { DefaultButton } from '../common/button/defaultbutton/DefaultButton';
import { classNames, formatDate } from '../../utils/helper';
import { IRequestStatus } from '../../types/IResponse';
import { useTranslation } from 'react-i18next';
import { useExtraMini } from '../../utils/Responsive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '../common/button/iconbutton/IconButton';
import Fade from '@mui/material/Fade';

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
    anchorEl: HTMLElement | null;
}

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
    const { item, refreshPost } = props
    const { user } = useAppSelector(userState)
    const { t } = useTranslation()
    const initialState: ICommentItemState = {
        isUpdateComment: false,
        isOpenDeleteCommentDialog: false,
        commentValue: item.content,
        isDeletingComment: false,
        isOpenAlert: false,
        message: "",
        alertType: ISeverity.success,
        isDisabledLikeComment: false,
        anchorEl: null,
    }
    const [state, setState] = useImmerState<ICommentItemState>(initialState)
    const { commentValue, isDeletingComment, isOpenDeleteCommentDialog, isUpdateComment, isOpenAlert, message, anchorEl } = state
    const isExtraMini = useExtraMini()

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setState({ anchorEl: event.target });
    };
    const handleClose = () => {
        setState({ anchorEl: null });
    };

    useEffect(() => {
        if (!isExtraMini) {
            handleClose()
        }
    }, [isExtraMini])

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
            const res = await CommentService.likeComment(item._id)
            if (res.requestStatus === IRequestStatus.Success) {
                setState((draft) => {
                    draft.isOpenAlert = true;
                    draft.message = t(res.message);
                })
                await refreshPost()
            }

        } catch (error: any) {
            console.log(error)
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
            const res = await CommentService.updateComment(props.item._id, user?._id!, commentValue)
            if (res.requestStatus === IRequestStatus.Success) {
                setState((draft) => {
                    draft.isOpenAlert = true;
                    draft.alertType = ISeverity.success
                    draft.message = t(res.message)
                    draft.isUpdateComment = false
                })
                await refreshPost()
            }

        } catch (error: any) {
            console.log(error)
        }
    }

    const handleDeleteComment = async () => {
        setState({ isDeletingComment: true })
        try {
            const res = await CommentService.deleteComment(props.item._id, user?._id!)

            if (res.requestStatus === IRequestStatus.Success) {
                setState((draft) => {
                    draft.isOpenAlert = true;
                    draft.alertType = ISeverity.success
                    draft.message = t(res.message)
                    draft.isOpenDeleteCommentDialog = false
                    draft.isDeletingComment = false
                })
                await refreshPost()
            }
        } catch (error: any) {
            console.log(error)
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

                        {!isExtraMini && user?._id === props.item.commentator._id && <DefaultButton
                            className='g-post-comment-action-button'
                            title={t("Common.Edit")}
                            onClick={() => setState({ isUpdateComment: true })}
                        />}

                        {!isExtraMini && user?._id === props.item.commentator._id && <DefaultButton
                            className='g-post-comment-action-button'
                            title={t("Comment.Action.Delete")}
                            onClick={() => setState({ isOpenDeleteCommentDialog: true })}
                        />}

                        {isExtraMini && user?._id === props.item.commentator._id && <div>
                            <IconButton
                                id="fade-button"
                                size='large'
                                className='g-more-action-icon-button'
                                icon={<MoreHorizIcon style={{ color: "#000!important" }} />}
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                style={{
                                    padding: "0!important",
                                }}
                                onClick={handleClick}
                            />
                            <Menu
                                id="fade-menu"
                                className='g-more-action-menu'
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={() => setState({ isUpdateComment: true, anchorEl: null })}>{t("Common.Edit")}</MenuItem>
                                <MenuItem onClick={() => setState({ isOpenDeleteCommentDialog: true, anchorEl: null })}>{t("Comment.Action.Delete")}</MenuItem>
                            </Menu>
                        </div>}

                        {isOpenDeleteCommentDialog && <ConfirmDialog
                            open={isOpenDeleteCommentDialog}
                            title={t("Confirm.Delete.Comment.Title")}
                            content={t("Confirm.Delete.Comment.Description")}
                            onClose={() => setState({ isOpenDeleteCommentDialog: false })}
                            isLoading={isDeletingComment}
                            handleConfirm={handleDeleteComment}
                        />}
                        <span className='g-post-comment-timeline'>{formatDate(new Date(item.createdAt))}</span>
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