const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Array = mongoose.Schema.Types.Array;

const questionSchema = new mongoose.Schema(
    {
        survey_id: {
            type: ObjectId,
            ref: 'Survey',
            required: true,
        },
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
            default:[]
        },
        section:{
            type: Number,
            default:0,
            required:true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Question', questionSchema);
