# DAO Voting dApp

A complete decentralized voting platform built with React, TypeScript, Solidity, and Node.js.

## Features

- 🗳️ Create and vote on proposals
- 🏛️ DAO governance with token-based voting
- 🔍 Real-time voting results
- 💎 ERC-20 token integration
- 🌐 Web3 wallet connection
- 📊 Voting analytics and history
- 🔐 Secure smart contract architecture

## Tech Stack

- **Frontend**: React, TypeScript, Ethers.js, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Blockchain**: Solidity, Hardhat, OpenZeppelin
- **Network**: Ethereum (testnet/mainnet compatible)

## Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB
- MetaMask or Web3 wallet
- Git

### Installation

1. **Clone and install dependencies**
   \`\`\`bash
   git clone <repository-url>
   cd dao-voting-dapp
   npm run install-all
   \`\`\`

2. **Start local blockchain**
   \`\`\`bash
   npm run node
   \`\`\`

3. **Deploy contracts**
   \`\`\`bash
   npm run deploy:localhost
   \`\`\`

4. **Update environment variables**
   - Copy contract addresses from deployment output
   - Update \`frontend/.env\` with contract addresses
   - Update \`backend/.env\` with contract addresses

5. **Start the application**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Configure MetaMask**
   - Add localhost network (RPC: http://localhost:8545, Chain ID: 31337)
   - Import account using private key from Hardhat node
   - Connect to the application

### Deployment to Testnet

1. **Configure environment**
   \`\`\`bash
   # Add to .env file
   PRIVATE_KEY=your_private_key
   SEPOLIA_URL=https://sepolia.infura.io/v3/your_project_id
   \`\`\`

2. **Deploy to Sepolia**
   \`\`\`bash
   npm run deploy:sepolia
   \`\`\`

3. **Update frontend configuration**
   \`\`\`bash
   # Update frontend/.env
   REACT_APP_DAO_TOKEN_ADDRESS=deployed_token_address
   REACT_APP_DAO_VOTING_ADDRESS=deployed_voting_address
   REACT_APP_NETWORK_NAME=sepolia
   REACT_APP_NETWORK_ID=11155111
   \`\`\`

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to connect MetaMask
2. **Get Tokens**: You'll need DAO tokens to create proposals and vote
3. **Create Proposals**: Fill out the proposal form and submit
4. **Vote**: Click "Vote For" or "Vote Against" on any active proposal
5. **Execute**: Once voting period ends, proposals can be executed if they pass

## Smart Contract Architecture

### DAOToken.sol
- ERC-20 token used for voting
- Mintable by owner
- Burnable by token holders

### DAOVoting.sol
- Main voting contract
- Proposal management
- Vote tracking and execution
- Time-locked voting periods

## API Endpoints

- \`GET /api/proposals\` - Get all proposals
- \`GET /api/proposals/:id\` - Get specific proposal
- \`POST /api/proposals\` - Create new proposal
- \`PATCH /api/proposals/:id/votes\` - Update vote counts
- \`PATCH /api/proposals/:id/execute\` - Mark proposal as executed

## Security Features

- ReentrancyGuard protection
- Minimum voting power requirements
- Time-locked voting periods
- Secure vote tracking
- Owner-only token minting

## Testing

\`\`\`bash
# Test smart contracts
npx hardhat test

# Test frontend
cd frontend && npm test

# Test backend
cd backend && npm test
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the smart contract code

---

Built with ❤️ using modern Web3 technologies`;

console.log(\`
=============================================================================
DAO VOTING DAPP - COMPLETE PACKAGE
=============================================================================

This package includes all the files needed to run a complete DAO voting dApp:


🚀 QUICK START:
1. Create project directory and save all files
2. Run: npm run install-all
3. Run: npm run node (start local blockchain)
4. Run: npm run deploy:localhost
5. Update .env files with contract addresses
6. Run: npm run dev

🔧 FEATURES:
- Complete DAO governance system
- Token-based voting mechanism
- Real-time voting results
- Web3 wallet integration
- Responsive UI with Tailwind CSS
- MongoDB backend for proposal storage
- Testnet deployment ready

📚 DOCUMENTATION:
- Comprehensive README with setup instructions
- Smart contract documentation
- API endpoint documentation
- Security best practices

The dApp is production-ready and can be deployed to any Ethereum network!
\`);
