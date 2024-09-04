import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import "../postCard/index.scss"

const PostShimmer: React.FunctionComponent = () => {
    const shimmerHeight = "1rem"
    return (
        <Stack direction={"row"} className="g-post-card-section">
            <div className="g-post-card-user-avatar">
                <Skeleton animation="wave" variant="circular" width={36} height={36} />
            </div>
            <div className="g-post-card-content">
                <div className="g-post-card-basic-info">
                    <Skeleton
                        animation="wave"
                        height={shimmerHeight}
                        width="100px"
                        className='g-post-card-author'
                    />
                    <Skeleton
                        animation="wave"
                        height={shimmerHeight}
                        width="160px"
                        className='g-post-card-time-created'
                    />
                </div>
                <div className="g-post-card-title">
                    <Skeleton
                        animation="wave"
                        height={24}
                        width="400px"
                    />
                </div>
                <div className="g-post-card-tags">
                    {Array(3).fill("").map((_item) => (
                        <Skeleton
                            animation="wave"
                            height={shimmerHeight}
                            width="80px"
                        />
                    ))}
                </div>
                <div className="g-post-card-reaction">
                    <Skeleton
                        animation="wave"
                        height={shimmerHeight}
                        width="50px"
                    />
                    <Skeleton
                        animation="wave"
                        height={shimmerHeight}
                        width="50px"
                    />
                    <Skeleton
                        animation="wave"
                        height={shimmerHeight}
                        width="50px"
                    />
                </div>
            </div>
        </Stack>
    )
}

export default PostShimmer