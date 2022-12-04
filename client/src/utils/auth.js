
const auth = {
  setToken: authToken => localStorage.setItem("AUTH_TOKEN", authToken),

  LoggedIn:(value) => {
           localStorage.setItem('loggedIn', value)
  },

  isLoggedIn:()=> localStorage.getItem("loggedIn"),
  
  getToken: () => localStorage.getItem("AUTH_TOKEN"),

  setRole: (role) => localStorage.setItem("Role", JSON.stringify(role)),

  getRole: () => localStorage.getItem("Role"),

  setUserInfo: user =>
    localStorage.setItem("USER_INFO", JSON.stringify(user)),
  getUserInfo: () => {
    const user = localStorage.getItem("USER_INFO");
    return JSON.parse(user || "{}");
  },
  isAdmin: function() {
    return (
      JSON.parse(this.getRole()) === "Admin"
    )
  },

  isCustomer: function() {
    return (
      JSON.parse(this.getRole()) === "Customer"
    )
  },
  isAuthenticated: function() {
    return this.getToken();
  },
  setConfig: data =>
    localStorage.setItem("CONFIG", JSON.stringify(data)),
  getConfig: () =>
    JSON.parse(localStorage.getItem("CONFIG") || "{}"),
  clearAll: () => localStorage.clear()
};


export default auth;



