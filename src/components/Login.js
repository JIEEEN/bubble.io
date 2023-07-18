import styles from '../style/Login.module.css';
import {useState, useEffect} from 'react';
import logo from '../assets/logo512.png';
import Loading from './Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login(){
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [button, setButton] = useState(true);
    const [register, setRegister] = useState(false);

    const onSubmit = () => {
        /* To Be Implemented */
    }
    
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
                    setRegister(false);
                }else{
                    alert('이미 존재하는 아이디입니다.');
                }
            }
        );
    }

    const submitLogin = () => {
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, password: password}),
        }
        );
    }

    return (
        <>
            <div>
                <img src={logo} className={styles.images}></img>
            </div>
            <div className={styles.loginBox}>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            className={styles.idBox}
                            placeholder="id"
                            value={id}
                            onChange={(e) => setID(e.target.value)}
                        />
                    </div>
                    {register ? 
                    <>
                        <br></br>
                        <div>
                            <input
                                className={styles.idBox}
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
                            className={styles.idBox}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {register ?
                        <>
                            <br></br>
                            <div>
                                <input
                                    className={styles.idBox}
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
                        className={styles.btn}
                        onClick={register? submitRegister : submitLogin}
                    >
                    {register? "Signup":"Login"}</button>
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