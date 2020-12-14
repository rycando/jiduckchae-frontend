import React from 'react'

function GridCard(props) {
    const prod = props.prod
    const index = props.index
    return (
        <div key={index} style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center',marginTop: '1rem' }}>
            <a href={`/prod/${prod._id}`}>
                <div style={{width: '80%', height: '300px', display: 'flex', alignItems: 'center'}}>
                    <div style={{ width: '270px', height: '270px', margin: 0 }}>
                        <img style={{ height: '270px', objectFit: 'cover' }} src={`${prod.preImage}`} alt={prod.name}/>
                    </div>
                    <div style={{ display: 'flex', width: '700px', height: '90%', marginLeft: '48px', flexDirection:'column', justifyContent: 'center', textAlign: 'right'}}>
                        <h1>{prod.name}</h1>
                        <h2>{prod.content}</h2>
                        <h3>{prod.userId.name}</h3>
                    </div>
                </div>
                <hr style={{ color: 'grey' }}/>
            </a>
        </div>
    )
}

export default GridCard
