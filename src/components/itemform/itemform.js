import styles from './itemform.module.scss';
import Button from '../../shared/uibuttons';
import useForm from '../../shared/useform';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Itemform(props) {

    const history = useHistory();

   const submit = () => {
        let storedvalues = Object.assign({}, values);
        storedvalues.id = storedvalues.id ? storedvalues.id : uuidv4();
        props.onItemSubmit(storedvalues);
        history.push("/");
    }

    const initialState = props.data ? props.data : {
        checked: "",
        receiver: "",
        //varmistaa että merkinnät asettuvat listaan oikeasssa järjestyksessä
        order: new Date()
    };

    const {values, handleChange, handleSubmit} = useForm(submit, initialState, false);

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

    const handleDelete = (event) => {
        event.preventDefault();
        props.onItemDelete(values.id);
        history.push("/");
    }
   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.form}>

                   <div className={styles.form_row}>
                        <div>
                            <label htmlFor="receiver"></label>
                            <input type="text" name="receiver" onChange={handleChange} value={values.receiver} required/>
                        </div>
                    </div> 
                    
                    <div className={styles.form_row}>
                        <div>
                            <Button onClick={handleCancel}>CANCEL</Button>
                        </div>
                        <div>
                            <Button secondary type="submit">{ props.data ? "SAVE" : "ADD" }</Button>
                        </div>
                    </div>
                    
                    { props.onItemDelete ? 
                       <div className={styles.form_row}>
                          <div>
                            <Button onClick={handleDelete}>DELETE</Button>
                          </div>
                        <div></div>
                    </div> : "" }

                </div>
            </form>
        </div>
    );
}

export default Itemform;