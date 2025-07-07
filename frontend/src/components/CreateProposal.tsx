import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';

const CreateProposal: React.FC = () => {
    const { daoVoting, isConnected } = useContract();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!daoVoting || !title.trim() || !description.trim()) {
            alert('Please fill in all fields and connect your wallet');
            return;
        }

        setIsLoading(true);
        try {
            const tx = await daoVoting.createProposal(title, description);
            await tx.wait();
            
            alert('Proposal created successfully!');
            setTitle('');
            setDescription('');
        } catch (error: any) {
            console.error('Error creating proposal:', error);
            alert(`error.message `);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isConnected) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Create Proposal</h2>
                <p className="text-gray-600">Please connect your wallet to create proposals.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Proposal</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter proposal title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your proposal in detail"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    {isLoading ? 'Creating...' : 'Create Proposal'}
                </button>
            </form>
        </div>
    );
};

export default CreateProposal;