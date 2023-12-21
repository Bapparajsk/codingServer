const { Schema, model } = require("mongoose");

const schema = new Schema({
    language: {
        required: true,
        type: String,
    },
    problemName: {
        required: true,
        type: String,
    },
    problemOptions: {
        no_1: {
            type: String,
            required: true,
        },
        no_2: {
            type: String,
            required: true,
        },
        no_3: {
            type: String,
            required: true,
        },
        no_4: {
            type: String,
            required: true,
        },
    },
    problemAnswer: {
        type: Number,
        required: true
    },
    data:{
        type: Buffer,
        required: true,
    },
    contentType: {
        type: String,
        required: true
    }
});

const problemModel = model('problemDetail', schema);
module.exports = problemModel;