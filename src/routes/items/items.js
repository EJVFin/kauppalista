import { Link } from 'react-router-dom';
import Item from '../../components/item';
import { FloatingButton, ButtonContainer } from '../../shared/uibuttons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React from 'react'


function Items(props) {

  const items = props.data.map((item) => <Item key={item.id} data={item} onItemDelete={props.onItemDelete} onComplete={props.onComplete}/>);

    return (
      <ButtonContainer>    
        <div>
            { items }
            <Link to="/add"><FloatingButton secondary><AddShoppingCartIcon/></FloatingButton></Link>
        </div>
      </ButtonContainer>
    );
}

export default Items;