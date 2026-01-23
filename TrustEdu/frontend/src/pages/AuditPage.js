import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import AuditTrail from '../components/AuditTrail';
import { Button, Badge } from '../components/ui';
import { ChevronLeft, Shield } from 'lucide-react';

const AuditPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.user) {
            setCurrentUser(user.user);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!currentUser) return null;

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container">
                <Button
                    variant="ghost"
                    className="mb-8 pl-0 hover:bg-transparent hover:text-primary"
                    onClick={() => navigate('/dashboard')}
                >
                    <ChevronLeft size={20} className="mr-2" />
                    Back to Dashboard
                </Button>

                <div className="mb-10">
                    <Badge variant="blockchain" className="mb-4">
                        <Shield size={14} />
                        Blockchain Ledger
                    </Badge>
                    <h1 className="text-4xl font-heading font-bold mb-4">
                        Full Audit <span className="gradient-text">History</span>
                    </h1>
                    <p className="text-muted text-lg max-w-2xl">
                        A complete, immutable record of your academic journey and AI interactions.
                        Verified on Sepolia Testnet.
                    </p>
                </div>

                <div className="bg-surface/50 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                    <AuditTrail studentId={currentUser.username} />
                </div>
            </div>
        </div>
    );
};

export default AuditPage;
