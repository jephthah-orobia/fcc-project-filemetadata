'use strict';
import { Schema, model } from "mongoose";

const fileMetaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
}, { collection: 'Files_Meta' });


export default new model('FileMeta', fileMetaSchema);