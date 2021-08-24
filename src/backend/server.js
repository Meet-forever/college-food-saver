'use strict';

const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var path = require('path');
require('dotenv').config()

const Item = require("./models/Item");
const User = require("./models/User");
const {CloudTasksClient} = require('@google-cloud/tasks');
const { LiveTvRounded } = require("@material-ui/icons");
const client = new CloudTasksClient();

// serve on port 4000
const PORT = 4000;
const app = express();

// socket.io
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
})

try {
  // connect db 
mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connection.once("open", () => {
  console.log("Mongodb connection established successfully");
  const db = mongoose.connection;
  const taskCollection = db.collection('items');
  const changeStream = taskCollection.watch();

io.on('connection', socket =>{
  console.log('connection made successfully')
})
    changeStream.on('change', (change) => {
        let itemLen = 0;

      if(change.operationType === 'update') {
        const task = change.fullDocument; 
        let doc;
        Item.find({requested: true}, (err, item) => {
          itemLen = item.length
        });
        Item.findById(change.documentKey._id, (err, item) => {
          io.emit('update', { item, itemLen})
        });
      } else if(change.operationType === 'insert') {
          io.emit('insert')
      }
    });
});
}catch(err){
  console.log(err)
}

// cors helps to break webbrowser rule of connecting with an external api because of which node.js can connect to the browser
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw({type: 'application/octet-stream'}));

// to get all of the items
app.get("/", (req, res) => {  
    Item.find((err, items) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          })
          res.write(JSON.stringify(items)); 
          res.end();
        }
    });
});

// to create a new item
app.post("/create", (req, res) => {
  console.log(JSON.stringify(req.body))
  const item = new Item(req.body);
  item
    .save()
    .then((item) => {
      createTask(item._id)
      res.json(item);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

async function createTask(id){
  const project = 'college-food-saver-app';
    const queue = 'my-queue';
    const location = 'us-east1';
    // const payload = 'Hello, World!';

    // Construct the fully qualified queue name.
    const parent = client.queuePath(project, location, queue);

    const task = {
      appEngineHttpRequest: {
        httpMethod: 'DELETE',
        relativeUri: `/item/${id}`,
      },
    };

    // The time when the task is scheduled to be attempted.
    task.scheduleTime = {
      seconds: 50 + Date.now() / 1000,
    };

    console.log('Sending task:');
    console.log(task);
    // Send create task request.
    const request = {parent, task};
    const [response] = await client.createTask(request);
    const name = response.name;
    console.log(`Created task ${name}`);
}


// to create a new user
app.post("/signup", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// to get a single user credentials for login
app.get("/login/:email", (req, res) => {
  const email = req.params.email;
  User.find({"email":email}, (err, user) => {
    res.json(user);
  });  
});

app.get('/notificationscount', (req, res) => {
  Item.find({requested: true}, (err, item) => {
    res.json(item)
  })
})

app.get('/newordernotifications', (req, res) => {
  Item.find({requested: true}) 
  .limit(3)
  .sort({_id:-1})
  .exec(function(err, item) {
    res.json(item)
  })
})

// to verify a single user credentials for login
app.get("/verify/:email", (req, res) => {
  const email = req.params.email;
  User.find({"email":email}, (err, user) => {
  });  
});

// to get a single todo by id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id, (err, item) => {
    res.json(item);
  });
});

// to update the text of single item 
app.post("/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id, (err, item) => {
    if (!item) {
      res.status(404).send("Todo not found");
    } else {
      item.text = req.body.text;

      item
        .save()
        .then((item) => {
          res.json(item);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  }); 
});

app.delete("/item/:id", (req, res) => {
  const id = req.params.id;
  Item.deleteOne({"_id":id}, (err, item) => {
      if(err){
        throw err;
      }else{
        console.log("1 document deleted!")
        res.send("Deleted Successfully!")
      }
  })
})

// to get a single item by id
app.get("/item/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  Item.findById(id, (err, item) => {
    res.json(item);
  });
});


server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
