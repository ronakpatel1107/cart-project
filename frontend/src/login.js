// isLogged_in : null
  componentDidMount = () => {
    var isLogged_in = sessionStorage.getItem("isUserLoggedIn");
    this.setState(()=>{
      page_to_display:isLogged_in?'Home':'Login'
    })
  }

  login= ()=>{
  //hit the server get the token.
  var token = "SERVER SE AYA HUA TOKEN";
  sessionStorage.setItem("isUserLoggedIn", token);
  //navigate to home page
  //sessionStorage.getItem("isUserLoggedIn")?'YES':'NO';
  }