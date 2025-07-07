export interface Proposal {
    id: number;
    title: string;
    description: string;
    proposer: string;
    forVotes: string;
    againstVotes: string;
    deadline: number;
    executed: boolean;
    exists: boolean;
}

export interface Vote {
    hasVoted: boolean;
    support: boolean;
    votingPower: string;
}

export interface ContractAddresses {
    daoToken: string;
    daoVoting: string;
}