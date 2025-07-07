import React from 'react';
import { Proposal } from '../types';

interface ProposalCardProps {
  proposal: Proposal;
  onVote?: () => void | Promise<void>; // Add this line
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{proposal.title}</h3>
          <p className="text-gray-600">{proposal.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;