const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    proposalId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    proposer: {
        type: String,
        required: true
    },
    transactionHash: {
        type: String,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    forVotes: {
        type: String,
        default: '0'
    },
    againstVotes: {
        type: String,
        default: '0'
    },
    executed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Proposal', proposalSchema);