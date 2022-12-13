import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { fileURLToPath } from "node:url";

dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING);

var app = express();

app.use(cors());
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(fileURLToPath(new URL('../views/index.html', import.meta.url)));
});

/**
 * # Task from fcc
 * > You can submit a form that includes a file upload.
 * > Waiting:The form file input field has the name attribute set to upfile.
 * > Waiting:When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
 */


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
