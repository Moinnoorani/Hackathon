import React, { useState } from 'react';
import { Card, Badge, Button } from './ui';
import { Link as LinkIcon, ExternalLink, Copy, Check, Shield, Clock } from 'lucide-react';
import './BlockchainVerification.css';

const BlockchainVerification = ({ blockchain }) => {
    const [copied, setCopied] = useState(false);

    if (!blockchain) return null;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const truncateHash = (hash) => {
        if (!hash) return 'N/A';
        return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
    };

    const getExplorerUrl = (txHash) => {
        // For localhost/Hardhat, this would be modified for actual testnet
        // Example: Polygon Mumbai or Ethereum Sepolia
        return `https://mumbai.polygonscan.com/tx/${txHash}`;
    };

    return (
        <Card variant="blockchain" className="blockchain-card">
            <Card.Header>
                <div className="blockchain-header">
                    <div className="blockchain-icon-container">
                        <LinkIcon size={24} />
                    </div>
                    <div>
                        <Card.Title>Blockchain Verification</Card.Title>
                        <Card.Description>
                            This prediction is permanently recorded on the blockchain
                        </Card.Description>
                    </div>
                    <Badge variant="blockchain" pulse>
                        <Shield size={12} />
                        Verified
                    </Badge>
                </div>
            </Card.Header>

            <Card.Content>
                <div className="verification-details">
                    {/* Record ID */}
                    <div className="detail-row">
                        <div className="detail-label">
                            <LinkIcon size={16} />
                            <span>Record ID</span>
                        </div>
                        <div className="detail-value">
                            <code className="hash-code">{blockchain.recordId}</code>
                        </div>
                    </div>

                    {/* Transaction Hash */}
                    <div className="detail-row">
                        <div className="detail-label">
                            <Shield size={16} />
                            <span>Transaction Hash</span>
                        </div>
                        <div className="detail-value">
                            <code className="hash-code">{truncateHash(blockchain.txHash)}</code>
                            <button
                                className="icon-button"
                                onClick={() => copyToClipboard(blockchain.txHash)}
                                title="Copy full hash"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                            <a
                                href={getExplorerUrl(blockchain.txHash)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-button"
                                title="View on block explorer"
                            >
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Block Number */}
                    <div className="detail-row">
                        <div className="detail-label">
                            <LinkIcon size={16} />
                            <span>Block Number</span>
                        </div>
                        <div className="detail-value">
                            <span className="block-number">#{blockchain.blockNumber}</span>
                        </div>
                    </div>

                    {/* Timestamp */}
                    <div className="detail-row">
                        <div className="detail-label">
                            <Clock size={16} />
                            <span>Timestamp</span>
                        </div>
                        <div className="detail-value">
                            <span className="timestamp">{formatTimestamp(blockchain.timestamp)}</span>
                        </div>
                    </div>
                </div>

                {/* Tamper Detection Status */}
                <div className="tamper-status">
                    <div className="tamper-icon">
                        <Shield size={20} />
                    </div>
                    <div className="tamper-message">
                        <strong>Tamper-Proof Guarantee</strong>
                        <p>This record is immutably stored on the blockchain and cannot be altered or deleted by anyone.</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="blockchain-actions">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(getExplorerUrl(blockchain.txHash), '_blank')}
                    >
                        <ExternalLink size={16} />
                        View on Explorer
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(blockchain.txHash)}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy TX Hash'}
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
};

export default BlockchainVerification;
