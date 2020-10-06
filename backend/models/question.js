const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
            default: []
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Question', questionSchema);
