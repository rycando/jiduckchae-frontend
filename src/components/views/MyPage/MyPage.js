import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import { SERVER } from '../../../config/config'


function MyPage() {

    const [LikeProds, setLikeProds] = useState([])
    const [MyProds, setMyProds] = useState([])

    const user = localStorage.getItem('userId')

    useEffect(() => {

        const variable = {
            userId: user
        }
        
        Axios.post('/api/like/getMyLikeProds', variable)
            .then(response => {
                if (response.data.success) {
                    setLikeProds(response.data.prods)
                    console.log(response.data.prods)
                    console.log(user)
                } else {
                    alert('좋아요 목록을 가져오는데 실패했습니다.')
                }
            })
        
        Axios.post('/api/prod/getMyProds', variable)
            .then(response => {
                if (response.data.success) {
                    setMyProds(response.data.prods)

                } else {
                    alert('나의 게시물을 가져오는데 실패했습니다.')
                }
            })
    }, [])

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2> 내가 좋아하는 굿즈 </h2>
                <hr />
                <Row gutter = {[16, 16]} type="flex" style={{ alignItems: 'center'}} >
                    {LikeProds && LikeProds.map((likeProd, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={`${SERVER}${likeProd.prodId.mainImage}`}
                                    prodId={likeProd.prodId._id}
                                    prodName={likeProd.prodId.name}
                                /> 
                            </React.Fragment>
                    ))}
                </Row>
            </div>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2> 내가 올린 굿즈 </h2>
                <hr />
                <Row gutter = {[16, 16]} type="flex" style={{ alignItems: 'center'}} >
                    {
                        MyProds && MyProds.map((myProd, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={`${SERVER}${myProd.mainImage}`}
                                    prodId={myProd._id}
                                    prodName={myProd.name}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            </div>
        </div>
    )
}

export default MyPage
