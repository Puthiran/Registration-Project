const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

mongoose.connect("mongodb://localhost:27017/customerdetails",
{ useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
  if(!err){
    console.log("DB Connected");
  }
});

const dbconnection = mongoose.connection;

const port = process.env.PORT || 8080;
var corsOptions = {
  origin: "http://localhost:8080"
};
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
//app.use(events(connection,upload));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

router.route("/insertdata").post(function(req, res) {
  console.log("fname:"+req.body.firstname);
  dbconnection.collection('details').insertOne({
  firstname: req.body.firstname,
  lastname: req.body.lasttname,
  email: req.body.email,
  mobileno: req.body.mobileno,
  address1: req.body.address1,
  address2:req.body.address2,
  dob: req.body.dob,
  countryname: req.body.countryname,
  country: req.body.country,
  statename: req.body.statename,
  state:req.body.state,
  cityname: req.body.cityname,
  city: req.body.city,
  idtype:req.body.idtype,
  idno: req.body.idno
  },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/getcustomerdetails', function (req, res) {
  dbconnection.collection('details').find({}).toArray(function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("resests"+result);
        res.send(result);
      }
    });
});

//module.exports = router;