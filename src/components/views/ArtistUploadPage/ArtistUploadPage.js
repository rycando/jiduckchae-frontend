import React, { useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon, Descriptions } from 'antd'
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

function ArtistUploadPage() {

    const [Category, setCategory] = useState("")
    const [ArtistName, setArtistName] = useState("");
    const [Ents, setEnts] = useState([])
    const [ImagePath, setImagePath] = useState("");

    useEffect(() => {
        Axios.get('/api/ent/all')
            .then(response => {
                if (response.data.success) {
                    setEnts(response.data.ents)
                } else {
                    alert('아티스트 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    const onNameChange = (e) => {
        setArtistName(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        Axios.post('/api/artist/uploadImage', formData, config)
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
            'name': ArtistName,
            'entId': Category,
            'image': ImagePath,
        }
        Axios.post('/api/artist/addArtist', variable)
            .then(response => {
                if (response.data.success) {
                    message.success('성공적으로 업로드를 완료했습니다.')
                    setTimeout(() => {
                        setArtistName("")
                        setCategory("")
                        setImagePath("")
                    }, 3000);
                } else {
                    alert('데이터 저장에 실패했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Artist Upload </Title>
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
            <label>아티스트 이름</label>
            <Input
                onChange={onNameChange}
                value={ArtistName}
            />
            <br />
            <br />
            <label>엔터 선택</label> <br />
            <select style={{ width: '150px', height: '2rem', border: '1px solid rgba(0,0,0,0.3)', outline: '0', borderRadius: '5px', paddingLeft: '0.5rem' }} onChange={onCategoryChange}>
                {Ents.map((ent, index) => (
                    <option key={index} value={ent._id}>{ent.name}</option>
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

export default ArtistUploadPage
