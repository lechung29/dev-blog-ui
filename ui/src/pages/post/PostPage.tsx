import React, { useRef, useState } from 'react'
import AppLayout from '../../layout/Layout'
import "./index.scss"
import { Button, ButtonGroup, Chip, Stack, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Comment from '../../components/postcomment/Comment';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
interface IPostPageProps {

}

const PostPage: React.FunctionComponent<IPostPageProps> = (props) => {
    const [isLike, setIsLike] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const commentRef = useRef<HTMLTextAreaElement | null>(null)
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
                    <Typography
                        textAlign={"center"}
                        variant="h4"
                        gutterBottom
                        fontWeight={500}
                    >
                        Hello 123
                    </Typography>
                </Stack>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"row"}
                    width={"75%"}
                >
                    <Typography
                        variant="caption"
                        fontSize={14}
                        display="block"
                        gutterBottom
                    >
                        Post by: admin - Category: ReactJs - Created at: Tuesday
                    </Typography>
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
                    <Chip label="ReactJs" aria-label='ReactJs' size='small' onClick={(e) => console.log(e.currentTarget.ariaLabel)} />
                    <Chip label="ReactJs" size='small' />
                    <Chip label="ReactJs" size='small' />
                </Stack>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                    flexDirection={"row"}
                    margin={"1rem 0"}
                >
                    <img
                        src='/assets/thumbnail.JPG'
                        width={"100%"}
                        alt='img'
                    />
                </Stack>
                <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                >
                    <div
                        style={{
                            margin: "1rem 0",
                            width: "100%"
                        }}
                        dangerouslySetInnerHTML={{ __html: "Hello" }}
                    ></div>
                </Stack>
                <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    flexDirection={"row"}
                    width={"100%"}
                    margin={"1rem 0"}
                >
                    <ButtonGroup
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
                    </ButtonGroup>
                </Stack>
                {showComment && <Stack
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    width={"100%"}
                    flexDirection={"row"}
                >
                    <Comment
                        className='g-post-comment-textarea'
                        placeholder='Nhập bình luận tại đây'
                        minRows={4}
                        maxRows={4}
                        value={commentValue}
                        ref={commentRef}
                        onChange={(e) => {
                            setCommentValue(e.target.value)
                        }}
                    />
                </Stack>}
            </div>
        </AppLayout>
    )
}

export default PostPage