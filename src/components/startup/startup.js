import styles from './startup.module.scss';
import Button from '../../shared/uibuttons';
import firebase from 'firebase/app';
import { useAuth } from 'reactfire';
import cart from '../../pics/cart.png'

function Startup () {

    const auth = useAuth();

    const signIn = async () => {
        await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    return (
        <div className={styles.startup}>
            <img src={cart} alt=""/>
            <div className={styles.startup_text}>
                <h1></h1>
                <div>Log in with Google Account</div>
            </div>
            
            <Button onClick={signIn}>Click to login</Button>
            
        </div>
    );
}

export default Startup;