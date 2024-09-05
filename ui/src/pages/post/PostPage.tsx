/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
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
import { IToastProps, renderToast } from '../../utils/utils';
import { IRequestStatus } from '../../types/IResponse';
interface IPostPageProps {

}

const PostPage: React.FunctionComponent<IPostPageProps> = (props) => {
    const params = useParams()
    const { postId } = params
    const user = useAppSelector(userState)
    const [isLike, setIsLike] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [post, setPost] = useState<IPostDataProps>()

    useEffect(() => {
        setIsLoading(true)
        getPostDetails()
    }, [])

    const getPostDetails = () => {
        return PostService.getSinglePost(postId!, user.user?._id).then((data) => {
            if (data.data) {
                setPost(data.data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            }
        })
    }

    const onSubmitComment = () => {
        return CommentService.createComment({
            post: postId!,
            content: commentValue,
            commentator: user.user?._id!
        }).then((data) => {
            if (data.requestStatus === IRequestStatus.Success) {
                setShowComment(false)
                setCommentValue("")
                renderToast(IToastProps.success, data.message);
                getPostDetails()
            } else {
                renderToast(IToastProps.error, data.message);
            }
        })
    }
    return (
        <AppLayout>
            <div className='g-post-page-content-section'>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"row"}
                    width={"75%"}
                >
                    {isLoading ? <Skeleton
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
                    </Typography>}
                </Stack>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"row"}
                    width={"75%"}
                >
                    {isLoading ? <Skeleton
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
                        {`Post by: ${post?.author.displayName} - Category: ${post?.category} - Created at: ${new Date(post?.createdAt as string).toLocaleString()}`}
                    </Typography>}
                </Stack>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"row"}
                    width={"75%"}
                    margin={".5rem 0"}
                    gap={3}
                >
                    {isLoading ? Array(3).fill("").map((_item, id) => (
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
                            onClick={(e) => console.log(e.currentTarget.ariaLabel)}
                        />
                    ))}
                </Stack>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                    flexDirection={"row"}
                    margin={"1rem 0"}
                >
                    {isLoading
                        ? <Skeleton
                            width={"100%"}
                            height={160}
                            animation="wave"
                            variant="rectangular"
                            style={{ borderRadius: 20 }}
                        />
                        : <img
                            src='/assets/thumbnail.JPG'
                            width={"100%"}
                            alt='img'
                        />}
                </Stack>
                <Stack
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                    marginTop={"40px"}
                >
                    {isLoading
                        ? <Fragment>
                            {Array(2).fill("").map((_item, id) => (
                                <Skeleton
                                    key={id}
                                    animation={false}
                                    width={"100%"}
                                    height={30}
                                    style={{
                                        marginBottom: "0.5rem"
                                    }}
                                />
                            ))}
                            {Array(2).fill("").map((_item, id) => (
                                <Skeleton
                                    key={id}
                                    animation="wave"
                                    width={"100%"}
                                    height={30}
                                    style={{
                                        marginBottom: "0.5rem"
                                    }}
                                />
                            ))}
                            {Array(2).fill("").map((_item, id) => (
                                <Skeleton
                                    key={id}
                                    width={"100%"}
                                    height={30}
                                    style={{
                                        marginBottom: "0.5rem"
                                    }}
                                />
                            ))}
                        </Fragment>
                        : <div
                            style={{
                                margin: "1rem 0",
                                width: "100%"
                            }}
                            dangerouslySetInnerHTML={{ __html: post?.content as string }}
                        />}
                </Stack>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    flexDirection={"row"}
                    width={"100%"}
                    margin={"1rem 0"}
                >
                    {isLoading ? Array(2).fill("").map((_item, id) => (
                        <Skeleton
                            key={id}
                            animation="wave"
                            height={60}
                            width="30%"
                            style={{ borderRadius: 8, marginRight: "0.5rem" }}
                        />
                    )) : <ButtonGroup
                        variant="text"
                        aria-label="Post action button"
                        className='g-post-action-button-group'
                    >
                        <Button
                            onClick={() => setIsLike(!isLike)}
                            className='g-post-action-button'
                        >
                            {isLike
                                ? <ThumbUpIcon style={{
                                    color: "#5488c7"
                                }} />
                                : <ThumbUpOutlinedIcon />}

                            <span>Like</span>
                        </Button>
                        <Button
                            className='g-post-action-button'
                            onClick={() => setShowComment(!showComment)}
                        >
                            {showComment
                                ? <ModeCommentIcon style={{
                                    color: "#5488c7"
                                }} />
                                : <ModeCommentOutlinedIcon />}
                            <span>Comment</span>
                        </Button>
                    </ButtonGroup>}

                </Stack>
                {!isLoading && showComment && <Stack
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                    width={"100%"}
                    flexDirection={"column"}
                    gap={2}
                >
                    <Comment
                        className='g-post-comment-textarea'
                        placeholder='Nhập bình luận tại đây'
                        minRows={4}
                        maxRows={4}
                        value={commentValue}
                        onChange={(e) => {
                            setCommentValue(e.target.value)
                        }}
                    />
                    <Stack
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                        flexDirection={"row"}
                        width={"70%"}
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
                                setShowComment(false)
                                setCommentValue("")
                            }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={onSubmitComment}
                            style={{
                                backgroundColor: "#5488c7",
                                color: "#fff",
                                textTransform: "none",
                            }}
                        >
                            Đăng
                        </Button>
                    </Stack>
                </Stack>}
                {!isLoading && <Stack
                    display={"flex"}
                    alignItems={"flex-start"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={2}
                    width={"100%"}
                    marginTop={"1rem"}
                >
                    {post && post?.comments?.map((item, id) => (
                        <CommentItem 
                            key={id} 
                            item={item}
                            refreshPost={getPostDetails} 
                        />
                    ))}
                </Stack>}
            </div>
        </AppLayout>
    )
}

export default PostPage