import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, DAO_TOKEN_ABI, DAO_VOTING_ABI } from '../utils/contracts';

export const useContract = () => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [account, setAccount] = useState<string>('');
    const [daoToken, setDaoToken] = useState<ethers.Contract | null>(null);
    const [daoVoting, setDaoVoting] = useState<ethers.Contract | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState<string>('0');

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask!');
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const account = await signer.getAddress();

            setProvider(provider);
            setSigner(signer);
            setAccount(account);
            setIsConnected(true);

            // Initialize contracts
            if (CONTRACT_ADDRESSES.daoToken && CONTRACT_ADDRESSES.daoVoting) {
                const tokenContract = new ethers.Contract(
                    CONTRACT_ADDRESSES.daoToken,
                    DAO_TOKEN_ABI,
                    signer
                );
                const votingContract = new ethers.Contract(
                    CONTRACT_ADDRESSES.daoVoting,
                    DAO_VOTING_ABI,
                    signer
                );

                setDaoToken(tokenContract);
                setDaoVoting(votingContract);

                // Get balance
                const balance = await tokenContract.balanceOf(account);
                setBalance(ethers.formatEther(balance));
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setAccount('');
        setDaoToken(null);
        setDaoVoting(null);
        setIsConnected(false);
        setBalance('0');
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else {
                    connectWallet();
                }
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    return {
        provider,
        signer,
        account,
        daoToken,
        daoVoting,
        isConnected,
        balance,
        connectWallet,
        disconnectWallet
    };
};