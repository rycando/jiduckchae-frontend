import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import { SERVER } from '../../../config/config'

function ArtistDetailPage(props) {

    const [Prods, setProds] = useState([]);
    const variable = {
        artistId: props.match.params.artistId
    }

    useEffect(() => {
        Axios.post('/api/prod/getArtistProds', variable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.prods)
                    setProds(response.data.prods);
                } else {
                    alert('상품을 불러오는데 실패 했습니다.')
                }
            })
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Prods && Prods.map((prod, index) => (
                    <div key={index} style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center',marginTop: '1rem' }}>
                        <a href={`/prod/${prod._id}`}>
                            <div style={{width: '80%', height: '300px', display: 'flex', alignItems: 'center'}}>
                                <div style={{ width: '270px', height: '270px', margin: 0 }}>
                                    <img style={{ maxHeight: '100%', objectFit: 'contain' }} src={`${SERVER}/${prod.mainImage}`} alt={prod.name}/>
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
            ))}
        </div>
    )
}

export default withRouter(ArtistDetailPage)
