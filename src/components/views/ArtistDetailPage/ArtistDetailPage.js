import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import GridCard from './Section/GridCard';

function ArtistDetailPage(props) {

    const [Prods, setProds] = useState([]);
    const variable = {
        artistId: props.match.params.artistId
    }

    useEffect(() => {
        Axios.post('/api/prod/getArtistProds', variable)
            .then(response => {
                if(response.data.success) {
                    setProds(response.data.prods);
                } else {
                    alert('상품을 불러오는데 실패 했습니다.')
                }
            })
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Prods && Prods.map((prod, index) => (
                <GridCard
                    prod={prod}
                    index={index} />
            ))}
        </div>
    )
}

export default withRouter(ArtistDetailPage)
