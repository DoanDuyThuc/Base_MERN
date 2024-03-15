const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParse = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001

mongoose.connect(`${process.env.MONGODB}`)
  .then(()=> {
    console.log('connect success');
  })
  .catch((err) => {
    console.log(err);
  })
  
// Middleware xử lý cookie
app.use(cookieParser())

// Middleware để xử lý CORS
app.use(cors());


//phải để trước routes
app.use(bodyParse.json())

routes(app);  

app.listen(port, () => {
    console.log("server is running in: "+ port);
})