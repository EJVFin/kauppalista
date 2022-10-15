import { Link } from 'react-router-dom';
import styles from './menu.module.scss';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Menu() {
    return (
        <div className={styles.menu}>
            <div><Link to="/"><ShoppingCartIcon /></Link></div>
            <div><Link to="/stats"><TimelineIcon /></Link></div>
            <div><Link to="/settings"><SettingsIcon /></Link></div>
        </div>
    );
}

export default Menu;