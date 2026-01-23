import React from 'react';
import './Badge.css';

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    pulse = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'badge';
    const variantClasses = `badge-${variant}`;
    const sizeClasses = `badge-${size}`;
    const pulseClasses = pulse ? 'badge-pulse' : '';

    return (
        <span
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${pulseClasses} ${className}`}
            {...props}
        >
            {pulse && <span className="badge-pulse-dot"></span>}
            {children}
        </span>
    );
};

export default Badge;
