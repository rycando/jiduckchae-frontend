import React from 'react'
import { Col } from 'antd'


function GridCards(props) {
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/prod/${props.prodId}`}>
                    <img style={{ width: '100%', height: '100%' }} src={props.image} alt={props.prodName}/>
                </a>
            </div>
        </Col>
    )
}

export default GridCards
