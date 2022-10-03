import * as React from "react";
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

const AddProduct = (props) => {
    console.log("props----->", props);
    const [Addproduct, setAddproduct] = React.useState({
        name: '',
        price: '',
        quantity: '',
        type: '',
        image: ''
    });


    const handleChange = (e) => {
        if(e.target.file)
            setAddproduct([{ ...Addproduct, image: e.target.files }])
        else 
            setAddproduct({ ...Addproduct, [e.target.name]: e.target.value })
        }   


    const AddItem = () => {
        console.log("Add Product--->", Addproduct)
        fetch('http://localhost:3001/storedata',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Addproduct)
            }.then(setAddproduct({
                ...Addproduct,
                name: '',
                price: '',
                quantity: '',
                type: '',
                image: ''
            })
            )
        );
    }


    return (
        <div>
            <div style={{ textAlign: 'center', margin: 10, padding: 10 }}>
                <h1>{props.title}</h1>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField label="Name"
                    name="name"
                    onChange={handleChange}
                    value={Addproduct.name}
                    focused />
                <TextField label="Price"
                    name="price"
                    onChange={handleChange}
                    value={Addproduct.price}
                    focused />
                <TextField label="Quantity"
                    name="quantity"
                    onChange={handleChange}
                    value={Addproduct.quantity}
                    focused />
                <TextField label="Type"
                    name="type"
                    onChange={handleChange}
                    value={Addproduct.type}
                    focused /> 

                <br></br>
                <Form.Group controlId="formFile" className="mb-3">                 
                    <Form.Label color="blue"> <strong>Image to Upload</strong> </Form.Label>
                    <Form.Control type="file" name="image" onChange={handleChange} />
                </Form.Group>
                <Button variant="contained" onClick={AddItem}>Submit</Button>
                <Button variant="contained">Cancel</Button>


            </Box>


        </div>
    );
};

export default AddProduct;



// const AddProduct = (props) => {
//     console.log("props----->", props);
//     return (
//         <div>
//             <div style={{ textAlign: 'center', margin: 10, padding: 10 }}>
//                 <h1>{props.title}</h1>
//             </div>

//             <Box
//                 component="form"
//                 sx={{
//                     '& > :not(style)': { m: 1, width: '35ch' },
//                 }}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <TextField label="Name"
//                     name="name"
//                     onChange={(e) => props.test(e)}
//                     value ={props.name}
//                     focused />
//                 <TextField label="Price"
//                     name="price"
//                     onChange={(e) => props.test(e)}
//                     value ={props.price}
//                     focused />
//                 <TextField label="Quantity"
//                     name="quantity"
//                     onChange={(e) => props.test(e)}
//                     value ={props.quantity}
//                     focused />
//                 <TextField label="Type"
//                     name="type"
//                     onChange={(e) => props.test(e)}
//                     value ={props.type}
//                     focused /> <br></br>
//                 <Form.Group controlId="formFile" className="mb-3">
//                     <Form.Label color="blue"> <strong>Image to Upload</strong> </Form.Label>
//                     <Form.Control type="file" name="image" />
//                 </Form.Group>
//                 <Button variant="contained" onClick={()=>props.submit()}>Submit</Button>
//                 <Button variant="contained">Cancel</Button>


//             </Box>


//         </div>
//     );
// };

// export default AddProduct;