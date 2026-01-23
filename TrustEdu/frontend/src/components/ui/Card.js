import React from 'react';
import './Card.css';

const Card = ({
    children,
    variant = 'default',
    hover = true,
    glass = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'card';
    const variantClasses = `card-${variant}`;
    const hoverClasses = hover ? 'card-hover' : '';
    const glassClasses = glass ? 'card-glass' : '';

    return (
        <div
            className={`${baseClasses} ${variantClasses} ${hoverClasses} ${glassClasses} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// Card Sub-components for better composition
Card.Header = ({ children, className = '', ...props }) => (
    <div className={`card-header ${className}`} {...props}>
        {children}
    </div>
);

Card.Title = ({ children, className = '', ...props }) => (
    <h3 className={`card-title ${className}`} {...props}>
        {children}
    </h3>
);

Card.Description = ({ children, className = '', ...props }) => (
    <p className={`card-description ${className}`} {...props}>
        {children}
    </p>
);

Card.Content = ({ children, className = '', ...props }) => (
    <div className={`card-content ${className}`} {...props}>
        {children}
    </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
    <div className={`card-footer ${className}`} {...props}>
        {children}
    </div>
);

export default Card;
