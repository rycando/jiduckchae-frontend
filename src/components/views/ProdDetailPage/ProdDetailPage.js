import React, { useEffect, useState } from 'react'
import { Tooltip, Icon, List } from 'antd'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Like from './Section/Like'
import Comment from './Section/Comment'
import moment from 'moment'

function ProdDetailPage(props) {

    const user = localStorage.getItem('userId')
    const [Prod, setProd] = useState(null)
    const [Comments, setComments] = useState([])
    const [MainImage, setMainImage] = useState([])
    const [PreImage, setPreImage] = useState([])
    const [DDay, setDDay] = useState(0);
    const today = moment().format('YYYY-MM-DD')

    const prodId = props.match.params.prodId
    const variable = {
        prodId: prodId,
        originName: MainImage,
        PreName: PreImage
    }

    useEffect(() => {
        
        Axios.post('/api/prod/getProdInfo', variable)
            .then(response => {
                if(response.data.success) {
                    setProd(response.data.prod)
                    setMainImage(response.data.prod.mainImage)
                    setPreImage(response.data.prod.preImage)
                    setDDay(moment(response.data.prod.endDate).diff(today, 'days'))
                } else {
                    alert('게시글 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments)
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패했습니다.')
                }
            })

    }, [])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    const onDeleteClick = () => {
        if((user === Prod.userId._id) || (user.isAdmin)) {
            Axios.post('/api/prod/deleteProd', variable)
                .then(response => {
                    if(response.data.success) {
                        props.history.push('/')
                    } else {
                        alert('상품 삭제에 실패했습니다.')
                    }
                })
            } else {
                alert('해당 상품 작성자만 삭제할 수 있습니다.')
            }
        }

    const onModifyClick = () => {
        props.history.push(`/modify/${prodId}`)
    }

    

    return (
        <div style={{ display: 'flex', justifyContent:'center', alignContent: 'center', alignItems:'center', width: '100%', height: '100%', flexDirection: 'column'}}>
            {Prod &&
            <>
            <div style={{ display: 'flex', justifyContent:'center', width: '80%', height: '280px', alignContent: 'center', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <a href={`/artist/${Prod.artistId._id}`}>
                        <span style={{ display: 'flex', alignItems: 'center', width:'50px', height: '50px', borderRadius: '50%', backgroundColor:'black', marginRight: '0.5rem' }}>
                            <img style={{ maxWidth: '90%', display: 'block', margin: '0px auto', objectFit: 'contain' }} src={`http://localhost:5000/${Prod.artistId.image}`} alt="artistImage" />
                        </span>
                        <h3 style={{padding: 0, margin: 0}}> {Prod.artistId.name} </h3>
                    </a>
                </div>
                <h1 style={{fontWeight: 800, fontSize: '4vh', margin: '10px 0px'}}>{Prod.name}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{ width:'25px', height: '25px', borderRadius: '50%', backgroundImage:'', marginRight: '0.5rem'}} />
                    <h4> {Prod.userId.name} </h4>
                </div>
            </div>
            <div style={{ display: 'flex', width: '80%', alignItems:'center'}}>
                <div style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
                    <img style={{ objectFit: 'contain', maxWidth: '100%' }} src={`${Prod.preImagePath}`} alt="prodPreImage"/>
                </div>
                <div style={{ display: 'flex', width: '40%', flexDirection: 'column' }}>
                    <h2 style={{fontWeight: 400, fontSize: '24px'}}> {Prod.content} </h2>
                    <hr />
                    <hr />
                    <a href={Prod.link} target="_blank">
                        <h3 style={{textAlign:'right'}}> 사러가기 </h3>
                    </a>
                    <hr />
                    {DDay >= 0 ?
                        <h2>D-DAY {DDay}</h2>
                        :
                        <h2>판매가 종료된 상품입니다.</h2>
                    }
                    <div>
                        <List.Item
                            actions={[ <Like prod prodId={Prod._id} userId={localStorage.getItem('userId')}/>]}/>
                    </div>
                    {((user === Prod.userId._id) || user.isAdmin) && (
                        <div>
                            <button style={{ marginRight: '1rem' }} onClick={onModifyClick}> 수정하기</button>
                            <button onClick={onDeleteClick}>지우기</button>
                        </div>
                        )}
                </div>
            </div>
            <div style={{ display:'flex', marginTop: '5rem', flexDirection:'column' }}>
                <img src={`${Prod.mainImagePath}`} alt="prodImage"/>
            </div>
            </>
            }
            <div style={{ width: '100%', padding: '3rem 4rem' }}>
                <Comment refreshFunction={refreshFunction} commentLists={Comments} prodId={prodId}/>
            </div>
        </div>
    )
}

export default withRouter(ProdDetailPage)
