import React, { useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon, Descriptions } from 'antd'
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

function EntUploadPage(props) {

    const [EntName, setEntName] = useState("");
    const [ImagePath, setImagePath] = useState("");

    const onNameChange = (e) => {
        setEntName(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        Axios.post('/api/ent/uploadImage', formData, config)
            .then(response => {
                if(response.data.success) {
                    setImagePath(response.data.url)
                } else {
                    alert('파일 업로드에 실패했습니다.')
                }
                console.log(response.data.err)
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            'name': EntName,
            'image': ImagePath,
        }
        Axios.post('/api/ent/addEnt', variable)
            .then(response => {
                if (response.data.success) {
                    message.success('성공적으로 업로드를 완료했습니다.')
                    setTimeout(() => {
                        setEntName("")
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
                <Title level={2}> Ent Upload </Title>
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
            <label>엔터 이름</label>
            <Input
                onChange={onNameChange}
                value={EntName}
            />
            <br />
            <br />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default EntUploadPage
