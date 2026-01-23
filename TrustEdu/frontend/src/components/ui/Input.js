import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
    label,
    error,
    helperText,
    className = '',
    containerClassName = '',
    type = 'text',
    ...props
}, ref) => {
    return (
        <div className={`input-container ${containerClassName}`}>
            {label && (
                <label className="input-label">
                    {label}
                    {props.required && <span className="input-required">*</span>}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                className={`input ${error ? 'input-error' : ''} ${className}`}
                {...props}
            />
            {error && <span className="input-error-text">{error}</span>}
            {helperText && !error && <span className="input-helper-text">{helperText}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
