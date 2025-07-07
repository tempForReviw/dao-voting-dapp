import React from 'react';
import { useContract } from './hooks/useContract';
import WalletConnect from './components/WalletConnect';
import CreateProposal from './components/CreateProposal';
import VotingDashboard from './components/VotingDashboard';
import './App.css';

const App: React.FC = () => {
    const { isConnected } = useContract();

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">DAO Voting Platform</h1>
                        <div className="text-sm text-gray-600">
                            Decentralized Autonomous Organization
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <WalletConnect />
                        {isConnected && <CreateProposal />}
                    </div>
                    
                    <div className="lg:col-span-2">
                        <VotingDashboard />
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>Built with React, TypeScript, and Ethereum</p>
                        <p className="mt-2 text-sm">
                            Make sure to connect to the correct network and have some DAO tokens to participate!
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;