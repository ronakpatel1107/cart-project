import * as React from "react";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Button from '@mui/material/Button';

const Cart = (props) => {
    console.log('inside the cart--->', props)
    const [finalorder, setfinalorder] = React.useState({
        username: props.user_details,
        total_items: props.cart_total_count,
        total_amount: props.cart_total_amount
    })
    const finalOrder = () => {
        console.log("finalorder",finalorder)
        
        fetch('http://localhost:3001/placeorder',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalorder)
            }
            
        );
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td> Item </td>
                        <td> Item name </td>
                        <td> Quantity </td>
                        <td> Price per item (INR) </td>
                        <td> Action </td>
                        <td> Total </td>
                    </tr>
                </thead>
                {props.cart_items.length
                    ?
                    <tbody>
                        {props.cart_items.map((ele, index) => (
                            <tr key={ele.id}>
                                <td>{<img width="50px" height="50px" src={ele.image} alt='' />}</td>
                                <td> {ele.name}</td>
                                <td>{ele.quantity}</td>
                                <td>&#8377; {ele.price}</td>
                                <td>
                                    <button onClick={() => { props.test(ele, +1) }}>+</button> &nbsp;
                                    <button>{ele.quantity}</button>&nbsp;
                                    <button onClick={() => { props.test(ele, -1) }}>-</button>
                                </td>
                                <td>&#8377; {ele.quantity * ele.price}</td>
                            </tr>
                        )
                        )}
                        <tr>
                            <td colSpan="1">
                                <b> Total Items:</b>
                            </td>
                            <td colSpan="5">
                                {props.cart_total_count}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="1">
                                <b> Total Amount:</b>
                            </td>
                            <td colSpan="5">
                                &#8377;{props.cart_total_amount}
                            </td>
                        </tr>
                        <tr><td colSpan="6"><Button variant="contained" onClick={() =>{props.placeOrder();finalOrder()}} > Proceed to Checkout </Button></td></tr>
                    </tbody>
                    :
                    <tbody>
                        <tr><td colSpan="6"><span>No purchase yet. Start Shopping! <RemoveShoppingCartIcon /></span></td></tr>
                    </tbody>
                }

            </table>
        </div>
    );
};

export default Cart;