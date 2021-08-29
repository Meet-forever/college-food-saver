// API creates an interface between the backend and frontend 
// gets all of the items in the database
// fetching data from the backend using the PORT = 4002

export const getItems = () => fetch("http://localhost:4002/").then(res => res.json())

// creates a item in a database 
export const createItem = (item) => fetch("http://localhost:4002/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(item)
})  

// creates a item in a database 
export const createUser = (user) => fetch("http://localhost:4002/signup", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
})

// login a user database 
export const loginUser = (email) => fetch(`http://localhost:4002/login/${email}`)
.then(res => {
  return res.json();
  })

// can update a single item 
export const updateItem = (item, id) => fetch(`http://localhost:4002/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(item)
})  

// to update the order request status
export const changeOrderRequestStatus = (id) => fetch(`http://localhost:4002/requested/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
})  

export const deleteItem = (id) => fetch(`http://localhost:4002/item/${id}`, {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
})
// get a single item by providing a id 
export const getItem = (id) => fetch(`http://localhost:4002/${id}`).then(res => res.json())