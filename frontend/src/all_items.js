import * as React from "react";
import Button from '@mui/material/Button';

const All_Items = (props) => {
  console.log("All_Items", props);
  return (
    <div>
      <div style={{textAlign:'center', margin:10, padding:10}}>
        <h1>{props.title}</h1>
      </div>
      {props.items.map((ele) => {
        return (
          <div key={ele.id} className="img-container">
            <img width="200" height="200" src={ele.image} alt='' />
            <h4>{ele.name} <br /> &#8377; {ele.price}</h4>
            <Button variant="contained" onClick={() => { props.test({...ele}) }}>Add to cart</Button>
          </div>
        )
      })}
    </div>
  );
};

export default All_Items;