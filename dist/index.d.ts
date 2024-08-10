import React from 'react';

interface PasswordStrengthProps {
    password: string;
    errorMsg?: string;
    className?: string;
    errorMessages?: {
        tooShort?: string;
        uppercase?: string;
        lowercase?: string;
        numeric?: string;
        specialChar?: string;
        lengthRequirement?: string;
    };
    isCustomValidations?: {
        tooShort: {
            regex: RegExp;
            errorMessage: string;
        };
        weak: {
            regex: RegExp;
            errorMessage: string;
        };
        strong: {
            regex: RegExp;
            errorMessage: string;
        };
    };
    colors?: {
        tooShort: string;
        weak: string;
        strong: string;
        default: string;
    };
}
declare const PasswordStrength: React.FC<PasswordStrengthProps>;

export { PasswordStrength as default };
