import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();
    
    const [values, setValues] = useState({
        id: "",
        email: "",
        password: "",
        passwordCheck: ""
    });

    const {
        id,
        email,
        password,
        passwordCheck
    } = values;

    const onChange = (e) => {
        const { value, name } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(password !== passwordCheck) {
            return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
        }
        let body = {
            name: id,
            email: email,
            password: password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success){
                    props.history.push('/login')
                } else {
                    alert('Error')
                }
            })
    }
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:'center',
            width: '100%',
            height: '100vh' }}>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '70%',
                height: '70vh',
                justifyContent: 'center'
            }}
            onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    name="id"
                    value={id}
                    onChange={onChange}
                    style={{
                        width: '35%',
                        height: '40px',
                        margin: '5px'
                    }}
                />
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    name="email"
                    value={email}
                    onChange={onChange}
                    style={{
                        width: '35%',
                        height: '40px',
                        margin: '5px'
                    }}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    name="password"
                    value={password}
                    onChange={onChange}
                    style={{
                        width: '35%',
                        height: '40px',
                        margin: '5px'
                    }}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    name="passwordCheck"
                    value={passwordCheck}
                    onChange={onChange}
                    style={{
                        width: '35%',
                        height: '40px',
                        margin: '5px'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '35%',
                        height: '40px',
                        margin: '20px'
                    }}>
                        회원가입하기
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
