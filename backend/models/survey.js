const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const surveySchema = new mongoose.Schema(
    {
        owner: {
            type: ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        questionList: {
            type: Array,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Survey', surveySchema);
