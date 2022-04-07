require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.DEFAULT_PORT || process.env.PORT;
const mongodb_connection = require("./src/configs/db.js");
const path = require("path");
mongodb_connection();

//middleware
app.use("/images",express.static(path.join(__dirname,"/src/public/img")));
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));

app.use(
  cors()
);

app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

 
  next();
});
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"src/public/img");
    },filename :(req,file,cb)=>{
        cb(null,req.body.name);
    }
});

var upload = multer({ storage: storage })
   
app.post('/api/upload', upload.single('file'), (req, res) => {
          res.status(200).json("File uploded successfully");
});

app.use("/api", require("./src/routes/index.js"));

app.use((err,req,res,next) =>{
    const error = app.get('env') === 'development'? err : {};
    const status = err.status || 500;

    return res.status(status).json({
        error: {
            message: error.message,
        }
    })
})

app.listen(PORT,()=> console.log(`🚀 Sever Running on http://localhost:${PORT}`));
