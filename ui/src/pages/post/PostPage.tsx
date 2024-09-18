/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo } from 'react'
import AppLayout from '../../layout/Layout'
import "./index.scss"
import { Button, ButtonGroup, Chip, Skeleton, Stack, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Comment from '../../components/postcomment/Comment';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import CommentItem from '../../components/postcomment/CommentItem';
import { useParams } from 'react-router-dom';
import { PostService } from '../../services/posts/PostService';
import { IPostDataProps } from '../../types/Post';
import { CommentService } from '../../services/comments/CommentService';
import { useAppSelector } from '../../redux/store/store';
import { userState } from '../../redux/reducers/users/UserSlice';
import { IRequestStatus } from '../../types/IResponse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useImmerState } from '../../hook/useImmerState';
import { Alert, ISeverity } from '../../components/common/alert/Alert';
import { classNames, formatDate } from '../../utils/helper';
import { DefaultButton } from '../../components/common/button/defaultbutton/DefaultButton';
import { useTranslation } from 'react-i18next';
interface IPostPageProps {

}

interface IPostPageState {
    isLoading: boolean;
    showComment: boolean;
    commentValue: string;
    post: IPostDataProps | null;
    isLike: boolean;
    isFavorite: boolean;
    disableLike: boolean;
    disableFavorite: boolean;
    alertMessage: string;
    isAlertOpen: boolean;
    alertType: ISeverity
}

const initialState: IPostPageState = {
    isLoading: false,
    showComment: false,
    commentValue: "",
    post: null,
    isLike: false,
    isFavorite: false,
    disableLike: false,
    disableFavorite: false,
    alertMessage: "",
    isAlertOpen: false,
    alertType: ISeverity.success
}

const PostPage: React.FunctionComponent<IPostPageProps> = (props) => {
    const params = useParams()
    const { postId } = params
    const { t } = useTranslation()
    const { user } = useAppSelector(userState)
    const [state, setState] = useImmerState<IPostPageState>(initialState)
    const {
        isLoading,
        commentValue,
        disableFavorite,
        disableLike,
        post,
        isLike,
        isFavorite,
        showComment,
        alertMessage,
        alertType,
        isAlertOpen
    } = state


    useEffect(() => {
        setState({ isLoading: true })
        getPostDetails().then(() => {
            setTimeout(() => {
                setState({ isLoading: false })
            }, 1000)
        })
    }, [])


    const getPostDetails = async () => {
        try {
            const post = await PostService.getSinglePost(postId!, user?._id)
            if (post.data) {
                setState((draft) => {
                    draft.post = post.data!
                    draft.isLike = post.data!.isLike
                    draft.isFavorite = post.data!.isFavorite
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmitComment = async () => {
        try {
            const res = await CommentService.createComment({
                post: postId!,
                content: commentValue,
                commentator: user?._id!
            })
            if (res.requestStatus === IRequestStatus.Success) {
                setState((draft) => {
                    draft.showComment = false;
                    draft.commentValue = "";
                    draft.alertMessage = t(res.message);
                    draft.isAlertOpen = true;
                    draft.alertType = ISeverity.success;
                })
                await getPostDetails()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleLikePost = async () => {
        if (disableLike) {
            return Promise.resolve();
        }
        try {
            setState({ disableLike: true })
            const res = await PostService.likePost(postId!)
            if (res.requestStatus === IRequestStatus.Success) {
                setState((draft) => {
                    draft.alertMessage = t(res.message);
                    draft.alertType = ISeverity.success
                    draft.isAlertOpen = true
                })
                await getPostDetails()
                setState({ disableLike: false })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleFavoritePost = async () => {
        if (disableFavorite) {
            return Promise.resolve();
        }
        try {
            setState({ disableFavorite: true })
            const res = await PostService.addOrRemoveFavorites(user?._id!, postId!, !isFavorite)
            if (res.requestStatus === IRequestStatus.Success) {
                setState((draft) => {
                    draft.alertMessage = t(res.message);
                    draft.alertType = ISeverity.success
                    draft.isAlertOpen = true
                })
                await getPostDetails()
                setState({ disableFavorite: false })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const postTitle = useMemo(() => {
        return isLoading ? <Skeleton
            animation="wave"
            height={60}
            width="50%"
            style={{ borderRadius: 16, marginBottom: "0.35em" }}
        /> : <Typography
            textAlign={"center"}
            variant="h4"
            gutterBottom
            fontWeight={500}
        >
            {post?.title}
        </Typography>
    }, [isLoading])


    const subTitle = useMemo(() => {
        return isLoading ? <Skeleton
            animation="wave"
            height={30}
            width="60%"
            style={{ borderRadius: 8, marginBottom: "0.35rem" }}
        /> : <Typography
            variant="caption"
            fontSize={14}
            display="block"
            gutterBottom
        >
            {`${post?.author.displayName}  -  ${post?.category}  -  ${formatDate(new Date(post?.createdAt as string))}`}
        </Typography>
    }, [isLoading])


    const postThumbnail = useMemo(() => {
        return isLoading
            ? <Skeleton
                width={"100%"}
                height={160}
                animation="wave"
                variant="rectangular"
                style={{ borderRadius: 20 }}
            />
            : <img
                src={post?.thumbnail || "/assets/thumbnail.jpg"}
                style={{
                    width: "100%",
                    objectFit: "contain"
                }}
                alt='img'
            />
    }, [isLoading])


    const postContent = useMemo(() => {
        return isLoading
            ? <Fragment>
                {Array(2).fill("").map((_item, id) => (
                    <Skeleton
                        key={id}
                        animation={false}
                        width={"100%"}
                        height={30}
                        style={{ marginBottom: "0.5rem" }}
                    />
                ))}
                {Array(2).fill("").map((_item, id) => (
                    <Skeleton
                        key={id}
                        animation="wave"
                        width={"100%"}
                        height={30}
                        style={{ marginBottom: "0.5rem" }}
                    />
                ))}
                {Array(2).fill("").map((_item, id) => (
                    <Skeleton
                        key={id}
                        width={"100%"}
                        height={30}
                        style={{ marginBottom: "0.5rem" }}
                    />
                ))}
            </Fragment>
            : <div
                className='g-post-page-content-data-text'
                dangerouslySetInnerHTML={{ __html: post?.content as string }}
            />
    }, [isLoading])


    const tagsList = useMemo(() => {
        return isLoading ? Array(3).fill("").map((_item, id) => (
            <Skeleton
                key={id}
                animation="wave"
                height={36}
                width="80px"
                style={{ borderRadius: 8, marginBottom: "0.35rem" }}
            />
        )) : post?.tags.map((item, id) => (
            <Chip
                key={id}
                label={item}
                aria-label={item}
                size='small'
            />
        ))
    }, [isLoading])


    const postAction = useMemo(() => {
        return isLoading ? Array(2).fill("").map((_item, id) => (
            <Skeleton
                key={id}
                animation="wave"
                height={60}
                width="30%"
                style={{ borderRadius: 8, marginRight: "0.5rem" }}
            />
        )) : <ButtonGroup
            variant="text"
            aria-label="post-action -utton"
            className='g-post-action-button-group'
        >
            <Button
                onClick={handleLikePost}
                className='g-post-action-button'
            >
                {isLike ? <ThumbUpIcon style={{ color: "#5488c7" }} /> : <ThumbUpOutlinedIcon />}
                <span className={classNames('g-post-action-count', { 'g-post-action-count-active': post?.isLike })}> {post?.like?.length} </span>
            </Button>
            <Button
                className='g-post-action-button'
                onClick={() => setState({ showComment: !state.showComment })}
            >
                {showComment ? <ModeCommentIcon style={{ color: "#5488c7" }} /> : <ModeCommentOutlinedIcon />}
                <span className={classNames('g-post-action-count', { 'g-post-action-count-active': showComment })}>{post?.comments.length}</span>
            </Button>
            <Button
                className='g-post-action-button'
                onClick={handleFavoritePost}
            >
                {isFavorite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon />}
            </Button>
        </ButtonGroup>
    }, [isLoading, isLike, showComment, post?.comments, isFavorite])

    return (
        <AppLayout title={t("DetailPost.Title")}>
            <div className='g-post-page-content-section'>
                <Stack className='g-post-page-content-title'>
                    {postTitle}
                </Stack>
                <Stack className='g-post-page-content-title'>
                    {subTitle}
                </Stack>
                <Stack className='g-post-page-content-tags'>
                    {tagsList}
                </Stack>
                <Stack className='g-post-page-content-thumbnail'>
                    {postThumbnail}
                </Stack>
                <Stack className='g-post-page-content-data'>
                    {postContent}
                </Stack>
                <Stack className='g-post-page-action-list-button'>
                    {postAction}
                </Stack>
                {!isLoading && showComment && <Stack className='g-post-page-comment-part'>
                    <Comment
                        className='g-post-comment-textarea'
                        placeholder={t("Fill.Comment.Here")}
                        minRows={4}
                        maxRows={4}
                        value={commentValue}
                        onChange={(e) => setState({ commentValue: e.target.value })}
                    />
                    <Stack className='g-post-page-comment-part-action'>
                        <DefaultButton
                            className='g-post-page-comment-part-action-button'
                            variant="outlined"
                            size="small"
                            title={t("Common.Cancel")}
                            onClick={() => {
                                setState((draft) => {
                                    draft.showComment = false
                                    draft.commentValue = ""
                                })
                            }}
                        />

                        <DefaultButton
                            className='g-post-page-comment-part-action-button-active'
                            variant="contained"
                            size="small"
                            title={t("Common.Submit.Comment")}
                            onClick={onSubmitComment}
                        />
                    </Stack>
                </Stack>}
                {!isLoading && <Stack className='g-post-page-comment-part-list-item'>
                    {post && post?.comments?.map((item, id) => (
                        <CommentItem
                            key={id}
                            item={item}
                            refreshPost={getPostDetails}
                        />
                    ))}
                </Stack>}
                {isAlertOpen && <Alert
                    open={isAlertOpen}
                    severity={alertType}
                    message={alertMessage}
                    onClose={() => setState({ isAlertOpen: false })}
                />}
            </div>
        </AppLayout>
    )
}

export default PostPage