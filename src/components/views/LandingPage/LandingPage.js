import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { Row } from 'antd'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import { SERVER } from '../../../config/config'

function LandingPage(props) {

    const [Prods, setProds] = useState([])
    const [MainProd, setMainProd] = useState([])

    useEffect(() => {
        Axios.get('/api/like/getBestProds')
            .then(response => {
                setProds(response.data.prods)
                setMainProd(response.data.prods[0]._id)
            })
    }, [])

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainProd &&
                <MainImage
                    image={`${SERVER}/${MainProd.mainImage}`}
                    title={MainProd.name}
                    text={MainProd.content}
                    prodId={MainProd._id}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2> 가장 인기있는 굿즈 </h2>
                <hr />
                <Row gutter={[16, 16]} type="flex" style={{ alignItems: 'center' }}>
                    {Prods && Prods.map((prod, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={`${SERVER}/${prod._id.mainImage}`}
                                prodId={prod._id._id}
                                prodName={prod._id.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
        </div>
        
    )
}

export default withRouter(LandingPage)
