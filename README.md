# react-password-secure-indicator

`react-password-secure-indicator` is a customizable React component for displaying password strength and validation feedback. It provides visual indicators for different password strength levels and allows for custom validation rules and styles.

## Features

- **Password Strength Indicator**: Visual feedback for password strength with color-coded bars.
- **Customizable Validations**: Define custom validation rules and error messages.
- **Color Customization**: Customize the color scheme for different strength levels.
- **Accessibility**: Includes ARIA attributes for better accessibility.
- **Error Messaging**: Displays error messages for invalid passwords.

## Installation

You can install this package using one of these commands:
> `npm i --save react-password-indicator`

> `yarn add react-password-indicator`

This package also depends on `react`. Please make sure you have it installed as well.

## Usage

Here's a basic example of how to use the PasswordStrength component:

```
import React, { useState } from 'react';
import PasswordStrength from 'react-password-secure-indicator';

const MyComponent = () => {
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <PasswordStrength
        password={password}
        errorMsg="Password is required"
        errorMessages={{
          tooShort: "Password is too short",
          uppercase: "Password must contain at least one uppercase letter",
          lowercase: "Password must contain at least one lowercase letter",
          numeric: "Password must contain at least one numeric digit",
          specialChar: "Password must contain at least one special character",
          lengthRequirement: "Password length must be greater than 8 characters.",
        }}
        colors={{
          tooShort: '#FFCC00', // Example color for "Too Short"
          weak: '#FF3333',    // Example color for "Weak"
          strong: '#33CC33',  // Example color for "Strong"
          default: '#CCCCCC', // Example color for "Default"
        }}
        isCustomValidations={{
          tooShort: {
            regex: /^.{0,7}$/,
            errorMessage: "Password is too short",
          },
          weak: {
            regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#*$%^&+=]).{8,}$/,
            errorMessage: "Password is weak",
          },
          strong: {
            regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#*$%^&+=]).{12,}$/,
            errorMessage: "Password is strong",
          },
        }}
      />
    </div>
  );
};

export default MyComponent;
```

## Props

### password
> `string` | _required_

The password string that needs to be evaluated.

### errorMsg
> `string` | _optional_

An optional custom error message to display if the password is empty or invalid.

### className
> `string` | _optional_

Optional custom CSS class name for styling.

### errorMessages
> `object` | _optional_

Custom error messages for different validation criteria.
- `tooShort`: Message for passwords shorter than 8 characters.
- `uppercase`: Message for missing uppercase letters.
- `lowercase`: Message for missing lowercase letters.
- `numeric`: Message for missing numeric digits.
- `specialChar`: Message for missing special characters.
- `lengthRequirement`: Message for passwords that don't meet the length requirement.

### isCustomValidations
> `object` | _optional_

Custom validation rules for password strength.
- `tooShort`: `{ regex: RegExp; errorMessage: string }` - Rule for passwords that are too short.
- `weak`: `{ regex: RegExp; errorMessage: string }` - Rule for weak passwords.
- `strong`: `{ regex: RegExp; errorMessage: string }` - Rule for strong passwords.

### colors
> `object` | _optional_

Custom colors for different password strength levels.
- `tooShort`: Color for "Too Short" indication.
- `weak`: Color for "Weak" indication.
- `strong`: Color for "Strong" indication.
- `default`: Color for default state.

## License

This package is licensed under the MIT License. See the LICENSE file for more information.