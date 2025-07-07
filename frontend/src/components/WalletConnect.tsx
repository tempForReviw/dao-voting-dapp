import React from 'react';
import { useContract } from '../hooks/useContract';

const WalletConnect: React.FC = () => {
    const { isConnected, account, balance, connectWallet, disconnectWallet } = useContract();

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Wallet Connection</h2>
            
            {!isConnected ? (
                <button
                    onClick={connectWallet}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Connect Wallet
                </button>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Account:</span>
                        <span className="font-mono text-sm">
                            {account.slice(0, 6)}...{account.slice(-4)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">DAO Token Balance:</span>
                        <span className="font-bold">{parseFloat(balance).toFixed(2)} DAO</span>
                    </div>
                    <button
                        onClick={disconnectWallet}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;