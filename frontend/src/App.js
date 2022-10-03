import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Cart from "./Cart.js";
import All_Items from "./all_items.js";
import AddProduct from "./AddProduct.js";
import ViewOrder from "./ViewOrder.js"
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FaceSharpIcon from '@mui/icons-material/FaceSharp';
import Face3SharpIcon from '@mui/icons-material/Face3Sharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
  
// import Dropdown from 'react-bootstrap/Dropdown';

import './App.css';
import DropdownToggle from "react-bootstrap/esm/DropdownToggle.js";

const drawerWidth = 200;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//require ('./component/images/'),
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_categories: [],
      all_items: [],
      cart_items: [],
      cart_total_amount: 0,
      cart_total_count: 0,
      page_to_display: "Women",
      isUserLoggedIn: false,
      user_details: "",
      username: '',
      password: '',
      from_checkout: false,
      isLoading: true,
      vieworderdetails:''
      // Addproduct:{
      //       name: "",
      //       price:"",
      //       quantity:"",
      //       type:""
      // }

    }
  }

  componentDidMount = () => {
    this.getItems();
    this.getOrderdetails();
    // setInterval(()=>{
    // }, 1000);

    var user_details = sessionStorage.getItem('username');
    if (user_details)
      this.setState({
        user_details,
        isUserLoggedIn: true
      })
  }
  getOrderdetails = () => {
    console.log("view order", this.state.vieworderdetails)
    fetch('http://localhost:3001/ViewOrder',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log("data--->",data)

      this.setState({
        vieworderdetails:data
      })
    }
      );
    }

  getItems = () => {
    fetch('http://localhost:3001/tabledata',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        //body:JSON.stringify(this.state.cart_items)
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log(data)

        this.setState({
          all_categories: [...Object.keys(data)],
          all_items: data,
          isLoading: false
        })
        
      });
    }
    
  //   AddItem =()=>{
  //    console.log("Add Product--->",this.state.Addproduct)
  //     fetch('http://localhost:3001/storedata',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body:JSON.stringify(this.state.Addproduct)
  //     }.then (
  //       this.setState({
  //         Addproduct:{
  //           name: "",
  //           price:"",
  //           quantity:"",
  //           type:""
  //     }
  //    })
  //     )  
  //   );
    
  // }

  // handleChange =(e)=>{
  //   const {name, value} = e.target;
  //   let Addproduct = {...this.state.Addproduct};
  //   Addproduct[name] = value;

  //   this.setState({
  //     Addproduct
  //   });
  // }
  
  componentWillUnmount = () => {
    // console.log('data')
  }

  checkIsUserLoggedIn = () => {
    if (this.state.isUserLoggedIn && this.state.user_details)
      this.setState({ page_to_display: 'Thanks' })
    else {
      this.setState({
        isUserLoggedIn: false
      })
    }
  }

  setThePage = (page) => {
    console.log(page)
    this.setState({
      page_to_display: page
    })
  }

  handleAdd = (ele, op) => {
    let cart_items = [...this.state.cart_items]
    let index = cart_items.findIndex(element => element.id === ele.id);
    console.log("index", ele, index);
    if (index > -1) {
      cart_items[index].quantity = cart_items[index].quantity + (op ? op : 1);
      if (cart_items[index].quantity < 1)
        cart_items.splice(index, 1);
    }
    else
      cart_items.push(ele);

    let cart_total_amount = 0;
    let cart_total_count = 0;
    if (cart_items.length) {
      cart_items.map((ele) => {
        cart_total_amount += (ele.quantity * ele.price);
        cart_total_count += (ele.quantity);
        return;
      });
    }

    console.log("cart_items", ele, cart_items);

    this.setState({
      cart_items,
      cart_total_amount,
      cart_total_count,
    });
  }

  resetCart = () => {
    this.setState({
      cart_items: [],
      cart_total_amount: 0,
      cart_total_count: 0,
      page_to_display: "Women",
    });
  }

  handlesubmit = (op) => {
    if (op === -1) {
      this.resetCart()
      sessionStorage.removeItem('username', this.state.username)
      sessionStorage.removeItem('password', this.state.password)
      this.setState({
        isUserLoggedIn: false,
        user_details: "",
        username: '',
        password: '',
        from_checkout: false
      });
    }
    else {
      sessionStorage.setItem('username', this.state.username)
      sessionStorage.setItem('password', this.state.password)

      this.setState({
        user_details: this.state.username,
        isUserLoggedIn: true,
      }, () => {
        if (this.state.from_checkout)
          this.checkIsUserLoggedIn();
      })
    }
  }


  render() {
    if (this.state.isLoading) {
      return (<div className="App">
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          <div style={{ flex: 1 }}>
            <span>Loading...</span>
            <Box>
              <CircularProgress />
            </Box>
          </div>
        </div>
      </div>);
    }
    else {
      return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                SHOPIFY
              </Typography>
              <Badge badgeContent={this.state.cart_total_count} color="primary" style={{ marginLeft: '900px' }}>
                <ShoppingCartIcon color="action" />
              </Badge> &nbsp;&nbsp;&nbsp;&nbsp;
              <br />
              <AccountCircleIcon /> &nbsp;&nbsp;&nbsp;&nbsp;
             {this.state.user_details ?
              // "Welcome," + this.state.user.email
              <Dropdown >
              <DropdownToggle variant="success">
                {"Welcome," + this.state.user_details}
                </DropdownToggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>this.handlesubmit(-1)}>LogOut</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              : <Button variant="contained" onClick={()=>this.handlesubmit(-1)}>Log In</Button>}

            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box"
              }
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                {this.state.all_categories.map((text, index) => (
                  <div key={text + index}>
                    <ListItem
                      onClick={() => {
                        this.setThePage(text);
                      }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          {text === "Women" ? (
                            <Face3SharpIcon />
                          ) : text === "Men" ? (
                            <FaceSharpIcon />
                          ) :
                            <ShoppingCartIcon />
                          }
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
                {this.state.user_details === 'admin'?
                <div>
                {['Add Product', 'View Order'].map((text, index) => (
                  <div key={text + index}>
                    <ListItem
                      onClick={() => {
                        this.setThePage(text);
                      }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          {text === 'Add Product' ? (
                            <AddCircleIcon />
                          ) :  (
                            <ViewListIcon />
                          )
                          }
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
                </div>
                : null
                 }
                <Divider />
                {this.state.user_details !== 'admin'? 
                <ListItem onClick={() => {
                  this.setThePage('Cart');
                }}>
                  <ListItemButton>
                    <ListItemIcon>

                      <ShoppingCartIcon />

                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                  </ListItemButton>
                </ListItem>
                :null}
              </List>
            </Box>

          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {
              this.state.page_to_display === 'Thanks'
                ?
                <div><h1>Thanks for placing the order, <button onClick={() => this.resetCart()}> click here </button> to continue shopping</h1></div>
                : (this.state.page_to_display == 'Add Product')?
                // <AddProduct title={this.state.page_to_display  + ' Details '} test={(e)=>this.handleChange(e)} submit={()=>this.AddItem()}/>
                  <AddProduct title={this.state.page_to_display  + ' Details '} />
                  : (this.state.page_to_display == 'View Order')?
                  <ViewOrder title={this.state.page_to_display  + ' Details '}  {...this.state} />
                : (this.state.page_to_display !== "Cart")? (
                  <All_Items title={this.state.page_to_display + ' Section'} items={[...this.state.all_items[this.state.page_to_display]]} test={(ele) => this.handleAdd(ele)} />
                ) : 
                  <Cart title="Cart" {...this.state} placeOrder={() => this.setState({ from_checkout: true }, () => this.checkIsUserLoggedIn())} test={(ele, op) => this.handleAdd(ele, op)} />
                

            }

            <Modal
              open={!this.state.isUserLoggedIn}
            >
              <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Please Login to Continue
                </Typography>

                <br />
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >

                  <TextField
                    id="outlined-name"
                    label="Username"
                    value={this.state.username}
                    onChange={(e) => {
                      let username = this.state.username
                      username = e.target.value
                      this.setState({
                        username,
                      })
                    }}
                  />
                  <br />
                  <TextField
                    id="outlined-name"
                    label="password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value
                      })
                    }}
                  />
                </Box>
                <br />
                <Stack>
                  <Button onClick={() => this.setState({ isUserLoggedIn: true })}>Cancel</Button>
                  <Button variant="contained" onClick={this.handlesubmit}>Login</Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
        </Box>
      );
    }
  }

}

export default App;