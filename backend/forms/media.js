const mysql = require('mysql')
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
module.exports = (con) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../../storage');
    },
    filename: (req, file, cb) => {
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`; //makes the file name wonky
      cb(null, newFilename);
    },
  });
  const upload = multer({ storage });//where the files go
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/videos', upload.array('selectedFiles', 2), (req, res) => {
      fs.rename(req.files[0].path, req.files[0].path + '.mov', function (err) {
        if (err) throw err;
      }); //makes the video into a mov, rather than j data
      fs.rename(req.files[1].path, req.files[1].path + '.png', function (err) {
      if (err) throw err;
    }); //makes the thumbnail into a png, rather than j data
    let query1 = "INSERT INTO `Posts` (`userID`, `uri`, `caption`, `thumbnail`, `category`) VALUES (";
    let query2 = '"' +req.body.user + '", "' +
    req.files[0].filename +  '", "' +
    req.files[0].originalname + '", "' +
    req.files[1].filename + '", "' +
    req.body.category + '")';
    let query = query1+query2;
    console.log(query)
    con.query(query, function (error, result){
      if (error) throw error
      console.log(result)
    })
    res.send();
  });

  app.listen(3002, function() {
    console.log('videoreceiver is running on port 3002');
  })

}
