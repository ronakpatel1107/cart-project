import * as React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const ViewOrder = (props) => {
    console.log(props)

    return (
        <div>
            <div style={{ textAlign: 'center', margin: 10, padding: 10 }}>
                <h1>{props.title}</h1>
            </div>
            <MDBRow>
            {props.vieworderdetails.map((ele) => {
                return (
                    
                    <MDBCol sm='4'>
                    <MDBCard alignment='center'>
                        <MDBCardHeader>User Name : {ele.username}</MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>Total amount paid: Rs. {ele.total_amount} </MDBCardTitle>
                            <MDBCardText> Total Number of Items:{ele.total_items}</MDBCardText>
                            <MDBBtn href='#'>View More Details</MDBBtn>
                        </MDBCardBody>
                        <MDBCardFooter className='text-muted'>Date and time of Order: {ele.dt}</MDBCardFooter>
                    </MDBCard>
                    </MDBCol>
                   
                )
            })}
             </MDBRow>
        </div>
    );
};
export default ViewOrder;