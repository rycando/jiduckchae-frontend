import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import Axios from 'axios'

function Like(props) {
    let variable = { }
    if(props.prod) {
        variable = { prodId: props.prodId, userId: props.userId }
    } else {
        variable = { prodId: props.prodId, commentId: props.commentId, userId: props.userId }
    }

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    useEffect(() => {
        
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {
                    setLikes(response.data.likes.length)
                    response.data.likes.map(like => {
                        if(like.userId === variable.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('좋아요 정보를 가져오는데 실패했습니다.')
                }
            })
        
    }, [Likes])

    const onLike = () => {
        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                    } else {
                        alert('좋아요 반영에 실패했습니다.')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('좋아요 취소 반영에 실패했습니다.')
                    }
                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? "filled" : "outlined"}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>
        </div>
    )
}

export default Like
