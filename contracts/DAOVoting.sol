// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DAOVoting is ReentrancyGuard {
    IERC20 public votingToken;

    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 deadline;
        bool executed;
        bool exists;
    }

    struct Vote {
        bool hasVoted;
        bool support;
        uint256 votingPower;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => Vote)) public votes;

    uint256 public proposalCount;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_VOTING_POWER = 1000 * 10**18; // 1000 tokens

    event ProposalCreated(
        uint256 indexed proposalId,
        string title,
        string description,
        address indexed proposer,
        uint256 deadline
    );

    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 votingPower
    );

    event ProposalExecuted(uint256 indexed proposalId);

    constructor(address _votingToken) {
        votingToken = IERC20(_votingToken);
    }

    function createProposal(
        string memory _title,
        string memory _description
    ) external {
        require(
            votingToken.balanceOf(msg.sender) >= MIN_VOTING_POWER,
            "Insufficient voting power to create proposal"
        );

        uint256 proposalId = proposalCount++;
        uint256 deadline = block.timestamp + VOTING_PERIOD;

        proposals[proposalId] = Proposal({
            id: proposalId,
            title: _title,
            description: _description,
            proposer: msg.sender,
            forVotes: 0,
            againstVotes: 0,
            deadline: deadline,
            executed: false,
            exists: true
        });

        emit ProposalCreated(proposalId, _title, _description, msg.sender, deadline);
    }

    function vote(uint256 _proposalId, bool _support) external nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.exists, "Proposal does not exist");
        require(block.timestamp < proposal.deadline, "Voting period has ended");
        require(!votes[_proposalId][msg.sender].hasVoted, "Already voted");

        uint256 votingPower = votingToken.balanceOf(msg.sender);
        require(votingPower > 0, "No voting power");

        votes[_proposalId][msg.sender] = Vote({
            hasVoted: true,
            support: _support,
            votingPower: votingPower
        });

        if (_support) {
            proposal.forVotes += votingPower;
        } else {
            proposal.againstVotes += votingPower;
        }

        emit VoteCast(_proposalId, msg.sender, _support, votingPower);
    }

    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.exists, "Proposal does not exist");
        require(block.timestamp >= proposal.deadline, "Voting period not ended");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.forVotes > proposal.againstVotes, "Proposal rejected");

        proposal.executed = true;

        emit ProposalExecuted(_proposalId);
    }

    function getProposal(uint256 _proposalId) external view returns (
        uint256 id,
        string memory title,
        string memory description,
        address proposer,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 deadline,
        bool executed,
        bool exists
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.proposer,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.deadline,
            proposal.executed,
            proposal.exists
        );
    }

    function hasVoted(uint256 _proposalId, address _voter) external view returns (bool) {
        return votes[_proposalId][_voter].hasVoted;
    }

    function getVote(uint256 _proposalId, address _voter) external view returns (
        bool hasVoted,
        bool support,
        uint256 votingPower
    ) {
        Vote storage vote = votes[_proposalId][_voter];
        return (vote.hasVoted, vote.support, vote.votingPower);
    }
}
