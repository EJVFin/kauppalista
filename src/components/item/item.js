import styles from './item.module.scss'
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';


function Item(props) {

    //esittelee state-hookin johon checkboxin tila tallennetaan
    const [isChecked, setIsChecked] = useState(props.data.checked);
    
    //hanskaa checkboxin tilan
    function handleComplete() {
        setIsChecked(!isChecked);
        props.onComplete(props.data.id);
    }
    //hanskaa itemin deletoinnin
    const handleClick = () => {props.onItemDelete(props.data.id)}

    return (
        <div className={styles.item}>
            <div className={styles.item_checkbox}>
                <form>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleComplete()}
                    /> 
                </form>
            </div>
            
            <div className={styles.item_data}>
                <div className={styles.item_receiver}>{props.data.receiver}</div>
            </div>
            
            <div className={styles.item_edit}>
                <Link to={"/edit/"+props.data.id}> <EditIcon /></Link>
            </div>
           
            <div className={styles.item_delete}>
                <DeleteIcon onClick={handleClick}/>
            </div>
        </div>
    );
}

export default Item;