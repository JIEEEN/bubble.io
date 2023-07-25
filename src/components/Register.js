import styles from '../style/Login.module.css';

function Register(){
    return (
        <div>
            <input 
                placeholder='confirm password'
                className={styles.idBox}
            >
            </input>
        </div>
    )
}

export default Register;