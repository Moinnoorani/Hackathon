import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
    label,
    error,
    helperText,
    className = '',
    containerClassName = '',
    type = 'text',
    leftIcon,
    rightIcon,
    variant = 'default', // 'default' or 'floating'
    placeholder,
    ...props
}, ref) => {
    const isFloating = variant === 'floating';
    const wrapperClass = isFloating ? 'input-floating-wrapper' : 'input-wrapper';

    return (
        <div className={`input-container ${containerClassName}`}>
            {!isFloating && label && (
                <label className="input-label">
                    {label}
                    {props.required && <span className="input-required">*</span>}
                </label>
            )}

            <div className={wrapperClass}>
                {leftIcon && (
                    <div className="input-icon input-icon-left">
                        {leftIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    className={`
                        input 
                        ${error ? 'input-error' : ''} 
                        ${isFloating ? 'input-floating' : ''}
                        ${leftIcon ? 'input-has-left-icon' : ''}
                        ${rightIcon ? 'input-has-right-icon' : ''}
                        ${className}
                    `}
                    placeholder={isFloating ? " " : placeholder}
                    {...props}
                />

                {isFloating && label && (
                    <label className="input-floating-label">
                        {label}
                        {props.required && " *"}
                    </label>
                )}

                {rightIcon && (
                    <div className="input-icon input-icon-right">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && <span className="input-error-text">{error}</span>}
            {helperText && !error && <span className="input-helper-text">{helperText}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
