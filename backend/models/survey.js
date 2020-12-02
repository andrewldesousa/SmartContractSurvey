const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const surveySchema = new mongoose.Schema(
    {
        
        description: {
            type: String,
            default:'This a data collection survey powered by blockchains!',
            required: true
        },
        owner: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            default:'This a data collection survey powered by blockchains!',
            required: true
        },
        status: {
            type: Boolean,
            default: false,
            required:true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Survey', surveySchema);
