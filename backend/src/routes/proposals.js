const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');

// Get all proposals
router.get('/', async (req, res) => {
    try {
        const proposals = await Proposal.find().sort({ createdAt: -1 });
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get proposal by ID
router.get('/:id', async (req, res) => {
    try {
        const proposal = await Proposal.findOne({ proposalId: req.params.id });
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        res.json(proposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new proposal (called by event listener)
router.post('/', async (req, res) => {
    try {
        const proposal = new Proposal(req.body);
        await proposal.save();
        res.status(201).json(proposal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update proposal votes
router.patch('/:id/votes', async (req, res) => {
    try {
        const { forVotes, againstVotes } = req.body;
        const proposal = await Proposal.findOneAndUpdate(
            { proposalId: req.params.id },
            { forVotes, againstVotes },
            { new: true }
        );
        
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        
        res.json(proposal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update proposal execution status
router.patch('/:id/execute', async (req, res) => {
    try {
        const proposal = await Proposal.findOneAndUpdate(
            { proposalId: req.params.id },
            { executed: true },
            { new: true }
        );
        
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        
        res.json(proposal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});