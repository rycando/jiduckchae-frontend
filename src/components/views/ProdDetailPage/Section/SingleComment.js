import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux';
import Like from './Like'

const { TextArea } = Input;


function SingleComment(props) {


    const user = useSelector(state => state.user)

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHnadleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: CommentValue,
            userId: user.userData._id,
            prodId: props.prodId,
            responseTo: props.comment._id
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    props.refreshFunction(response.data.commentInfo)
                    setCommentValue("")
                    setOpenReply(false)
                } else {
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
    }

    const actions = [
        <Like userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to" style={{margin: '0 0 0 10px'}}>Reply to</span>
    ]
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.userId.name}
                avatar={<Avatar src={props.comment.userId.image} alt />}
                content={ <p> {props.comment.content} </p>}
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHnadleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} > Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
