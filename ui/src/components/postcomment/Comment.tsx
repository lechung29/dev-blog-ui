import React, { memo } from 'react'
import { TextareaAutosizeProps } from "@mui/material"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import "./index.scss"

interface ICommentProps extends TextareaAutosizeProps { }

const Comment: React.FunctionComponent<ICommentProps> = (props) => {
  return (
    <TextareaAutosize
      {...props}
    />
  )
}

export default memo(Comment)