import { ethers } from 'ethers';

export const CONTRACT_ADDRESSES = {
    daoToken: process.env.REACT_APP_DAO_TOKEN_ADDRESS || '',
    daoVoting: process.env.REACT_APP_DAO_VOTING_ADDRESS || ''
};

export const DAO_TOKEN_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address, uint256) returns (bool)",
    "function mint(address, uint256) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export const DAO_VOTING_ABI = [
    "function createProposal(string memory, string memory)",
    "function vote(uint256, bool)",
    "function executeProposal(uint256)",
    "function getProposal(uint256) view returns (uint256, string, string, address, uint256, uint256, uint256, bool, bool)",
    "function hasVoted(uint256, address) view returns (bool)",
    "function getVote(uint256, address) view returns (bool, bool, uint256)",
    "function proposalCount() view returns (uint256)",
    "function votingToken() view returns (address)",
    "event ProposalCreated(uint256 indexed proposalId, string title, string description, address indexed proposer, uint256 deadline)",
    "event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 votingPower)",
    "event ProposalExecuted(uint256 indexed proposalId)"
];

export const formatEther = (value: string | number) => {
    return ethers.formatEther(value.toString());
};

export const parseEther = (value: string) => {
    return ethers.parseEther(value);
};