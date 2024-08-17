import React from 'react'
import AppLayout from '../../layout/Layout'
import "./index.scss"
import { Chip, Stack, Typography } from '@mui/material'

interface IPostPageProps {

}

const PostPage: React.FunctionComponent<IPostPageProps> = (props) => {
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
                        React và những ứng dụng thực tế trong công việc phát triển web
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
                    <Chip label="ReactJs" size='small'/>
                    <Chip label="ReactJs" size='small'/>
                </Stack>
            </div>
        </AppLayout>
    )
}

export default PostPage