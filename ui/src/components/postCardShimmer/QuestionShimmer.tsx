import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import "../postCard/index.scss"

const QuestionShimmer: React.FunctionComponent = () => {
    const shimmerHeight = "1rem"
    return (
        <Stack className="g-post-card-section">
            <div className="g-post-card-content">
                <div className="g-post-card-title">
                    <Skeleton
                        animation="wave"
                        height={20}
                        width="200px"
                    />
                </div>
                <div className="g-post-card-tags">
                    {Array(3).fill("").map((_item, id) => (
                        <Skeleton
                            key={id}
                            animation="wave"
                            height={shimmerHeight}
                            width="35px"
                        />
                    ))}
                </div>
                <div className="g-post-card-reaction">
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

export default QuestionShimmer