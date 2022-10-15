import styles from './settings.module.scss';
import Button from '../../shared/uibuttons';
import { useUser, useAuth } from 'reactfire';


function Settings() {

    const user = useUser();
    const auth = useAuth();

    const signOut = async () => {
        await auth.signOut();
    }

    return (
        <div className={styles.settings}>
            <h2>Profile</h2>
            <div className={styles.settings_profile}>
                <div className={styles.settings_user}> 
                    <div><img src={user.data.photoURL} alt="" /></div>
                    <div>{user.data.displayName}<br/>{user.data.email}</div>
                </div>
                <div className={styles.settings_button}>
                    <Button secondary onClick={signOut}>LOG OUT</Button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
