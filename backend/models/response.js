const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const responseSchema = new mongoose.Schema(
    {
        question_id: {
            type: ObjectId,
            ref: 'Question',
            required: true
        },
        answer: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Response', responseSchema);
