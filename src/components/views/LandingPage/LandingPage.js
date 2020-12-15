import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { Row } from 'antd'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'

function LandingPage(props) {

    const [BestProds, setBestProds] = useState([])
    const [MainProd, setMainProd] = useState([])
    const [Page, setPage] = useState(0)
    const [Prods, setProds] = useState([])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER}/api/like/getBestProds`)
            .then(response => {
                console.log(response.data)
                setBestProds(response.data.prods)
                setMainProd(response.data.prods[0]._id)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER}/api/prod/getProds/${Page}`)
            .then(response => {
                console.log(response.data)
                setProds([...Prods,...response.data.prods])
            })
            .catch(err => {
                console.log(err)
            })
    }, [Page])


    const loadMoreItems = () => {
        setPage(Page+1)
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainProd &&
                <MainImage
                    image={`${MainProd.preImagePath}`}
                    title={MainProd.name}
                    text={MainProd.content}
                    prodId={MainProd._id}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2> 가장 인기있는 굿즈 </h2>
                <hr />
                <Row gutter={[16, 16]} type="flex" style={{ alignItems: 'center' }}>
                    {BestProds && BestProds.map((prod, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={`${prod._id.preImagePath}`}
                                prodId={prod._id._id}
                                prodName={prod._id.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                <hr />
                <h2> 새로운 굿즈 </h2>
                <hr />
                <Row gutter={[16, 16]} type="flex" style={{ alignItems: 'center' }}>
                    {Prods && Prods.map((prod, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={`${prod.preImagePath}`}
                                prodId={prod._id}
                                prodName={prod.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
        
    )
}

export default withRouter(LandingPage)
