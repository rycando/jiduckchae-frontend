import React, { useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon, Descriptions } from 'antd'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

function UploadPage(props) {
        const user = useSelector(state => state.user);
        
        const [Category, setCategory] = useState("")
        const [ProdName, setProdName] = useState("");
        const [Artists, setArtist] = useState([])
        const [Content, setContent] = useState("");
        const [Link, setLink] = useState("");
        const [ImagePath, setImagePath] = useState("");


        useEffect(() => {
            Axios.get('/api/artist/all')
                .then(response => {
                    if (response.data.success) {
                        setArtist(response.data.artists)
                    } else {
                        alert('아티스트 정보를 가져오는데 실패했습니다.')
                    }
                })
        }, [])

        const onNameChange = (e) => {
            setProdName(e.currentTarget.value)
        }
        const onContentChange = (e) => {
            setContent(e.currentTarget.value)
        }
        const onCategoryChange = (e) => {
            setCategory(e.currentTarget.value)
        }
        const onLinkChange = (e) => {
            setLink(e.currentTarget.value)
        }

        const onDrop = (files) => {
            let formData = new FormData;
            const config = {
                header: {'content-type': 'multipart/form-data'}
            }
            formData.append("file", files[0])
            Axios.post('/api/prod/uploadImage', formData, config)
                .then(response => {
                    if(response.data.success) {
                        setImagePath(response.data.url)
                    } else {
                        alert('파일 업로드에 실패했습니다.')
                    }
                })
        }

        const onSubmit = (e) => {
            e.preventDefault();

            const variable = {
                'userId': user.userData._id,
                'name': ProdName,
                'artistId': Category,
                'link': Link,
                'mainImage': ImagePath,
                'content': Content
            }
            Axios.post('/api/prod/addProd', variable)
                .then(response => {
                    if (response.data.success) {
                        message.success('성공적으로 업로드를 완료했습니다.')
                        setTimeout(() => {
                            props.history.push('/')
                        }, 3000);
                    } else {
                        alert('데이터 저장에 실패했습니다.')
                    }
                })
        }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Prod Upload </Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                    onDrop={onDrop}
                    multieple={false}
                    maxSize={10000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }}/>
                        </div>
                        )}
                    </Dropzone>
                </div>
            <br />
            <br />
            <label>상품 이름</label>
            <Input
                onChange={onNameChange}
                value={ProdName}
            />
            <br />
            <br />
            <label>내용</label>
            <TextArea
                onChange={onContentChange}
                value={Content}
            />
            <br />
            <br />
            <label>링크</label>
            <TextArea
                onChange={onLinkChange}
                value={Link}
            />
            <br />
            <br />
            <select style={{ width: '150px', height: '2rem', border: '1px solid rgba(0,0,0,0.3)', outline: '0', borderRadius: '5px', paddingLeft: '0.5rem' }} onChange={onCategoryChange}>
                {Artists.map((artist, index) => (
                    <option key={index} value={artist._id}>{artist.name}</option>
                ))}
            </select>
            <br />
            <br />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default withRouter(UploadPage)
