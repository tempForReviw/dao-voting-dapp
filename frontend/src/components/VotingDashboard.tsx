import React, { useState, useEffect } from 'react';
import { useContract } from '../hooks/useContract';
import { Proposal } from '../types';
import ProposalCard from './ProposalCard';

const VotingDashboard: React.FC = () => {
    const { daoVoting, isConnected } = useContract();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'executed'>('all');

    useEffect(() => {
        if (daoVoting) {
            loadProposals();
        }
    }, [daoVoting]);

    const loadProposals = async () => {
        if (!daoVoting) return;

        setIsLoading(true);
        try {
            const proposalCount = await daoVoting.proposalCount();
            const loadedProposals: Proposal[] = [];

            for (let i = 0; i < proposalCount; i++) {
                try {
                    const proposal = await daoVoting.getProposal(i);
                    if (proposal[8]) {
                        loadedProposals.push({
                            id: Number(proposal[0]),
                            title: proposal[1],
                            description: proposal[2],
                            proposer: proposal[3],
                            forVotes: proposal[4].toString(),
                            againstVotes: proposal[5].toString(),
                            deadline: Number(proposal[6]),
                            executed: proposal[7],
                            exists: proposal[8]
                        });
                    }
                } catch (error) {
                    console.error(`Error loading proposal ${i}:`, error);
                }
            }

            loadedProposals.sort((a, b) => b.id - a.id);
            setProposals(loadedProposals);
        } catch (error) {
            console.error('Error loading proposals:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredProposals = proposals.filter(proposal => {
        const now = Date.now();
        const deadline = proposal.deadline * 1000;

        switch (filter) {
            case 'active':
                return !proposal.executed && now < deadline;
            case 'expired':
                return !proposal.executed && now >= deadline;
            case 'executed':
                return proposal.executed;
            default:
                return true;
        }
    });

    if (!isConnected) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Voting Dashboard</h2>
                <p className="text-gray-600">Please connect your wallet to view proposals.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Voting Dashboard</h2>
                    <button
                        onClick={loadProposals}
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        {isLoading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>

                <div className="flex gap-2 mb-4">
                    {(['all', 'active', 'expired', 'executed'] as const).map(filterType => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                filter === filterType
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="text-sm text-gray-600">
                    Showing {filteredProposals.length} of {proposals.length} proposals
                </div>
            </div>

            {isLoading ? (
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading proposals...</p>
                </div>
            ) : filteredProposals.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <p className="text-gray-600">No proposals found.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredProposals.map(proposal => (
                        <ProposalCard
                            key={proposal.id}
                            proposal={proposal}
                            onVote={loadProposals}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VotingDashboard;
