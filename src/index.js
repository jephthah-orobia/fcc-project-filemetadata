import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import { fileURLToPath } from "node:url";
import FileMeta from './Models/FileMeta.js';

dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Successfully connected to", mongoose.connection.name))
  .catch(err => console.log("There was an error in connection to the database: " + err));

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage, preservePath: false });

app.use(cors());
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(fileURLToPath(new URL('../views/index.html', import.meta.url)));
});

/**
 * # Task from fcc
 * > You can submit a form that includes a file upload.
 * > The form file input field has the name attribute set to upfile.
 * > When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  new FileMeta({ name: req.file.filename, type: req.file.mimetype, size: req.file.size })
    .save((err, doc) => {
      if (err && err.code != 11000)
        res.json({ error: "There was an error in uploading your file.", error_message: err + '' });
      else if (err && err.code == 11000)
        FileMeta.findOne({ name: req.file.filename }, (err1, doc1) => {
          if (err1)
            res.json({ error: "There was an error in uploading your file.", error_message: err1 + '' });
          else
            res.json(doc1);
        });
      else
        res.json(doc);
    });
  /* new FileModel({

  }); */
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
