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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Cart from "./Cart.js"
import All_Items from "./all_items.js"
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FaceSharpIcon from '@mui/icons-material/FaceSharp';
import Face3SharpIcon from '@mui/icons-material/Face3Sharp';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './App.css';

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
      all_categories : [],
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
      isLoading: true
    }
  }

  componentDidMount = () => {
    this.getItems();
    // setInterval(()=>{
    // }, 1000);

    var user_details = sessionStorage.getItem('username');
    if (user_details)
      this.setState({
        user_details,
        isUserLoggedIn: true
      })
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
          all_categories : [...Object.keys(data), 'Cart'],
          all_items : data,
          isLoading: false
        })
      });
  }

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
    if(this.state.isLoading)
    {
      return (<div className="App">
        <div style={{display:'flex', flexDirection:'row', flex:1}}>
          <div style={{flex:1}}>
            <span>Loading...</span>
            <Box>
              <CircularProgress />
            </Box>
          </div>
        </div>
      </div>);      
    }
    else {
      if(this.state.user_details==='admin')
      {
        return (
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Toolbar>
                <div>
                  <Typography variant="h6" noWrap component="div">
                    SHOPIFY
                  </Typography>
                  <Badge badgeContent={this.state.cart_total_count} color="primary">
                    <ShoppingCartIcon color="action" />
                  </Badge>
                  <span> {this.state.user_details ? "Hi " + this.state.user_details + " " : ''} </span>
                  <Button style={{marginLeft:16}} variant="contained" onClick={() => { this.handlesubmit(-1) }}>{this.state.user_details ? 'Click here to Logout' : 'Login'}</Button>                
                  </div>
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
              {/* <Box sx={{ overflow: "auto" }}>
                <List>
                  {["Women", "Men", "Cart","Add Products","View Orders"].map((text, index) => (
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
                </List>
              </Box> */}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              {
                this.state.page_to_display === 'Thanks'
                  ?
                  <div><h1>Thanks for placing the order, <button onClick={() => this.resetCart()}> click here </button> to continue shopping</h1></div>
                  :
                  (this.state.page_to_display !== "Cart" ? (
                    <All_Items title={this.state.page_to_display + ' Section'} type={this.state.item_types[this.state.page_to_display]} items={[...this.state.all_items]} test={(ele) => this.handleAdd(ele)} />
                  ) :
                    <Cart title="Cart" {...this.state} placeOrder={() => this.setState({ from_checkout: true }, () => this.checkIsUserLoggedIn())} test={(ele, op) => this.handleAdd(ele, op)} />
                  )
    
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
      else{
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
                  <Badge badgeContent={this.state.cart_total_count} color="primary" style={{ marginLeft: '1000px' }}>
                    <ShoppingCartIcon color="action" />
                  </Badge>
                  <br />
                  <p> {this.state.user_details ? "Hi " + this.state.user_details + " " : ''} </p>
                  <Button variant="contained" onClick={() => { this.handlesubmit(-1) }}>{this.state.user_details ? 'Click here to Logout' : 'Login'}</Button>
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
                  </List>
                </Box>
              </Drawer>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {
                  this.state.page_to_display === 'Thanks'
                    ?
                    <div><h1>Thanks for placing the order, <button onClick={() => this.resetCart()}> click here </button> to continue shopping</h1></div>
                    :
                    (this.state.page_to_display !== "Cart" ? (
                      <All_Items title={this.state.page_to_display + ' Section'} items={[...this.state.all_items[this.state.page_to_display]]} test={(ele) => this.handleAdd(ele)} />
                    ) :
                      <Cart title="Cart" {...this.state} placeOrder={() => this.setState({ from_checkout: true }, () => this.checkIsUserLoggedIn())} test={(ele, op) => this.handleAdd(ele, op)} />
                    )
      
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
}

export default App;