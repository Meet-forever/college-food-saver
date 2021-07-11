// API creates an interface between the backend and frontend 

// gets all of the items in the database
// fetching data from the backend using the PORT = 4000
export const getItems = () => fetch("http://localhost:4000/").then(res => res.json())

// creates a item in a database 
export const createItem = (item) => fetch("http://localhost:4000/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(item)
})  

// creates a item in a database 
export const createUser = (user) => fetch("http://localhost:4000/signup", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
})

// login a user database 
export const loginUser = (email) => fetch(`http://localhost:4000/login/${email}`)
.then(res => {
  return res.json();
  })

// can update a single item 
export const updateItem = (item, id) => fetch(`http://localhost:4000/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(item)
})  

export const deleteItem = (id) => fetch(`http://localhost:4000/item/${id}`, {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
})
// get a single item by providing a id 
export const getItem = (id) => fetch(`http://localhost:4000/${id}`).then(res => res.json())