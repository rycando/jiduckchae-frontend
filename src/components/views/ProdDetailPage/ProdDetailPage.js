import React, { useEffect, useState } from 'react'
import { Tooltip, Icon, List } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Like from './Section/Like'
import Comment from './Section/Comment'

function ProdDetailPage(props) {

    const user = useSelector(state => state.user)
    const [Prod, setProd] = useState(null)
    const [Comments, setComments] = useState([])

    const prodId = props.match.params.prodId

    const variable = {
        prodId: prodId,
    }

    useEffect(() => {
        
        Axios.post('/api/prod/getProdInfo', variable)
            .then(response => {
                if(response.data.success) {
                    setProd(response.data.prod)
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
            <div style={{ display: 'flex', width: '90%', alignItems:'center'}}>
                <div style={{ display: 'flex', width: '50%' }}>
                    <img style={{ objectFit: 'contain', maxWidth: '100%' }} src={`http://localhost:5000/${Prod.mainImage}`} alt="prodImage"/>
                </div>
                <div style={{ width: '10%'}}/>
                    <div style={{ display: 'flex', width: '40%', flexDirection: 'column' }}>
                        <h2 style={{fontWeight: 400, fontSize: '24px'}}> {Prod.content} </h2>
                        <hr />
                        <hr />
                        <a href={Prod.link} target="_blank">
                            <h3 style={{textAlign:'right'}}> 사러가기 </h3>
                        </a>
                        <hr />
                        <div>
                            <List.Item
                                actions={[ <Like prod prodId={Prod._id} userId={localStorage.getItem('userId')}/>]}/>
                        </div>
                </div>
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
