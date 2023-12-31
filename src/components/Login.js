import lstyles from '../style/Login.module.css';
import bstyles from '../style/Button.module.css';
import React, {useState, useEffect, history} from 'react';
import logo from '../assets/logo512.png';
import Loading from './Loading';
import { setCookie } from '../util/cookie/index';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();

    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [button, setButton] = useState(true);
    const [register, setRegister] = useState(false);
    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = () => setRegister(true);

    const changeButton = () => {
        id && password.length >= 5 ? setButton(false) : setButton(true);
    }

    const submitRegister = async () => {
        await fetch('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, name:name, password: password}),
            }
        )
        .then((res) => 
            {
                if (res.status == '201'){
                    alert('Success');
                    setRegister(false);
                    setID('');
                    setName('');
                    setPassword('');
                    setConfirmPassword('');
                }else{
                    alert('Already Exist');
                }
            }
        );
    }

    const submitLogin = async () => {
        console.log(id, password);
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, password: password}),
        }
        );

        if (response.ok){
            setFail(false);
            const data = await response.json();
            console.log(data);
            const jwtToken = data.access_token;

            setCookie('jwt', jwtToken, 1);
            navigate('/room/list');
        }else{
            setFail(true);
        }
    }

    return (
        <>
            <div>
                <img src={logo} className={lstyles.images}></img>
            </div>
            <div className={lstyles.loginBox} style={{
                top: '60%',
                width: 400,
                height: 400,
            }}>
                <form>
                    <div>
                        <input
                            type="text"
                            className={lstyles.idBox}
                            placeholder="id"
                            value={id}
                            onChange={(e) => {
                                setID(e.target.value)
                            }}
                        />
                    </div>
                    {register ? 
                    <>
                        <br></br>
                        <div>
                            <input
                                className={lstyles.idBox}
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </>
                    : null}
                    <br></br>
                    <div>
                        <input
                            className={lstyles.idBox}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {
                        fail ? register ? null:
                        <div>
                            <p style={{
                                position: 'relative',
                                top: 30,
                                left: 140,
                                fontFamily: 'sans-serif',
                                align: 'center',
                                color: 'red',
                                fontSize: 12,
                            }}>Wrong Id or Password</p>
                        </div>
                        : null
                    }
                    {register ?
                        <>
                            <br></br>
                            <div>
                                <input
                                    className={lstyles.idBox}
                                    placeholder="confirm password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </>
                    : null}
                    <br></br>
                    <button 
                        type="button"
                        className={bstyles.btn}
                        style={{
                            top: 50,
                            left: "10%"
                        }}
                        onClick={register? submitRegister : submitLogin}
                    >
                    {register? "Register":"Login"}</button>
                </form>
                {register ? null : <p style={{
                    position: 'relative',
                    top: 60,
                    left: 90,
                    fontFamily: 'sans-serif',
                    align: 'center',
                }}>Don't have an account? <span style={{color: "red"}}onClick={handleRegister}>Signup</span></p>}
            </div>
        </>
    )
}

export default Login;