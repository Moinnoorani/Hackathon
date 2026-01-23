import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from './ui';
import { Shield, ExternalLink, Clock, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import './AuditTrail.css';

const AuditTrail = ({ studentId, limit }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!studentId) return;

        const fetchLogs = async () => {
            try {
                // If limit is provided, use it. Otherwise default to 100 for full view.
                const url = limit
                    ? `http://localhost:5000/api/audit/${studentId}?limit=${limit}`
                    : `http://localhost:5000/api/audit/${studentId}?limit=100`;

                const res = await axios.get(url);
                setLogs(res.data);
            } catch (err) {
                console.error("Failed to fetch audit logs", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [studentId, limit]);

    const getExplorerUrl = (txHash) => `https://sepolia.etherscan.io/tx/${txHash}`;

    const getIcon = (recordId) => {
        if (recordId.includes('CHAT')) return <MessageSquare size={16} />;
        return <FileText size={16} />;
    };

    const getTitle = (recordId) => {
        if (recordId.includes('CHAT')) return "AI Tutor Interaction";
        return "Learning Record Update";
    };

    if (loading) return <div className="text-center p-4">Loading Audit Trail...</div>;
    if (logs.length === 0) return null;

    return (
        <div className="audit-trail">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-bold flex items-center gap-2">
                    <Shield className="text-primary" />
                    {limit ? "Recent Activity" : "Full Audit Trail"}
                </h3>
                {limit && (
                    <Button variant="ghost" size="sm" onClick={() => navigate('/audit')} className="text-muted hover:text-white">
                        View All <ArrowRight size={16} className="ml-1" />
                    </Button>
                )}
            </div>

            <div className="timeline">
                {logs.map((log) => (
                    <div className="timeline-item" key={log._id}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="timeline-header">
                                <span className="timeline-date">
                                    <Clock size={12} className="inline mr-1" />
                                    {new Date(log.createdAt).toLocaleString()}
                                </span>
                                <Badge variant="blockchain" size="sm">Verified</Badge>
                            </div>

                            <h4 className="timeline-title flex items-center gap-2">
                                {getIcon(log.recordId)}
                                {getTitle(log.recordId)}
                            </h4>

                            <a
                                href={getExplorerUrl(log.txHash)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="timeline-hash"
                            >
                                {log.txHash.substring(0, 20)}...
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {limit && logs.length >= limit && (
                <div className="text-center mt-4">
                    <Button variant="outline" onClick={() => navigate('/audit')}>View Full History</Button>
                </div>
            )}
        </div>
    );
};

export default AuditTrail;
