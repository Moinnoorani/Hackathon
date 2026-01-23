// Legacy BlockchainProof component - replaced by BlockchainVerification
// This file is kept for backward compatibility

import React from 'react';
import { Card, Badge } from './ui';
import { Shield, Link as LinkIcon } from 'lucide-react';

const BlockchainProof = ({ blockchain }) => {
  if (!blockchain) return null;

  return (
    <Card variant="blockchain" style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <LinkIcon size={24} color="var(--color-blockchain)" />
        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Blockchain Proof</h3>
        <Badge variant="blockchain" pulse>
          <Shield size={12} />
          Verified
        </Badge>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <strong style={{ color: 'var(--color-muted)' }}>Record ID:</strong>
          <div style={{ color: 'var(--color-blockchain)', marginTop: '0.25rem' }}>{blockchain.recordId}</div>
        </div>
        <div>
          <strong style={{ color: 'var(--color-muted)' }}>TX Hash:</strong>
          <div style={{ color: 'var(--color-blockchain)', marginTop: '0.25rem', wordBreak: 'break-all' }}>{blockchain.txHash}</div>
        </div>
        <div>
          <strong style={{ color: 'var(--color-muted)' }}>Block:</strong>
          <div style={{ color: 'var(--color-blockchain)', marginTop: '0.25rem' }}>#{blockchain.blockNumber}</div>
        </div>
      </div>
    </Card>
  );
};

export default BlockchainProof;
