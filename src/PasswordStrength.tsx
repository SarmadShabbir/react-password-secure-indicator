import "../style.css";
import React, { useEffect, useState, CSSProperties } from "react";
import { COLORS } from "./config";

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

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  errorMsg,
  errorMessages = {
    tooShort: "Password is too short",
    uppercase: "Password must contain at least one uppercase letter",
    lowercase: "Password must contain at least one lowercase letter",
    numeric: "Password must contain at least one numeric digit",
    specialChar: "Password must contain at least one special character",
    lengthRequirement: "Password Length must be greater than 8 characters.",
  },
  colors = {
    tooShort: COLORS.yellow,
    weak: COLORS.red,
    strong: COLORS.green,
    default: COLORS.grayLight,
  },
  isCustomValidations,
  className,
}: PasswordStrengthProps) => {
  const [info, setInfo] = useState<string>("");
  const [passwordColor, setPasswordColor] = useState<string>("");

  useEffect(() => {
    setPasswordColor(PasswordStrengthChecker(password));
    passwordValidationError(password);
  }, [password]);

  const passwordValidationError = (password: string) => {
    const repeatingCharsRegex = /(.)\1{2,}/;

    if (isCustomValidations) {
      if (!isCustomValidations.tooShort.regex.test(password)) {
        setInfo(isCustomValidations.tooShort.errorMessage || "N/A");
      } else if (!isCustomValidations.weak.regex.test(password)) {
        setInfo(isCustomValidations.weak.errorMessage || "N/A");
      } else if (!isCustomValidations.strong.regex.test(password)) {
        setInfo(isCustomValidations.strong.errorMessage || "N/A");
      } else {
        setInfo("");
      }
    } else {
      if (password.length > 7) {
        if (repeatingCharsRegex.test(password)) {
          setInfo("Password contains too many repeating characters");
        } else if (!/[A-Z]/.test(password)) {
          setInfo(errorMessages.uppercase || "N/A");
        } else if (!/[a-z]/.test(password)) {
          setInfo(errorMessages.lowercase || "N/A");
        } else if (!/[0-9]/.test(password)) {
          setInfo(errorMessages.numeric || "N/A");
        } else if (!/[!@#*$%^&+=]/.test(password)) {
          setInfo(errorMessages.specialChar || "N/A");
        } else if (
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password) &&
          /[0-9]/.test(password) &&
          /[!@#$*%^&+=]/.test(password)
        ) {
          setInfo("");
        }
      } else {
        setInfo(errorMessages.lengthRequirement || "N/A");
      }
    }
    if (password.length === 0) {
      setInfo("");
    }
  };

  const PasswordStrengthChecker = (password: string) => {
    if (password.length === 0) {
      return colors.default;
    }

    // Check custom validations first
    if (isCustomValidations) {
      if (!isCustomValidations.tooShort.regex.test(password)) {
        return colors.tooShort;
      } else if (!isCustomValidations.weak.regex.test(password)) {
        return colors.weak;
      } else if (!isCustomValidations.strong.regex.test(password)) {
        return colors.strong;
      }
    } else {
      // Default validation logic
      if (password.length < 8) {
        return colors.tooShort;
      } else if (
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[a-z]/.test(password) &&
        /[!@#$*%^&+=]/.test(password)
      ) {
        return colors.strong;
      } else {
        return colors.weak;
      }
    }

    // Default fallback (this should rarely be reached if conditions are covered)
    return colors.default;
  };

  // Adjust styles to use the passed color props
  const tooShortConditionStyles: CSSProperties =
    passwordColor === colors.tooShort
      ? { ...styles.tooShort, backgroundColor: colors.tooShort }
      : passwordColor === colors.weak
      ? { ...styles.weak, backgroundColor: colors.weak }
      : passwordColor === colors.strong
      ? { ...styles.strong, backgroundColor: colors.strong }
      : {};

  const weakConditionsStyles: CSSProperties =
    passwordColor === colors.weak
      ? { ...styles.weak, backgroundColor: colors.weak }
      : passwordColor === colors.strong
      ? { ...styles.strong, backgroundColor: colors.strong }
      : {};

  const strongConditionsStyles: CSSProperties =
    passwordColor === colors.strong
      ? { ...styles.strong, backgroundColor: colors.strong }
      : {};

  const getAriaValueNow = (strength: string) => {
    switch (strength) {
      case "Too Short":
        return 0;
      case "Weak":
        return 50;
      case "Strong":
        return 100;
      default:
        return 0;
    }
  };

  const PasswordStrengthTxtConditions =
    passwordColor === colors.tooShort
      ? "Too Short"
      : passwordColor === colors.weak
      ? "Weak"
      : passwordColor === colors.default
      ? ""
      : "Strong";

  const ariaValueNow = getAriaValueNow(PasswordStrengthTxtConditions);

  return (
    <div
      className={`passwordStrengthContainer ${className}`}
      aria-live="polite"
    >
      <div
        className="barContainer"
        role="progressbar"
        aria-valuenow={ariaValueNow}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="tooShort" style={tooShortConditionStyles}></div>
        <div className="weak" style={weakConditionsStyles}></div>
        <div className="strong" style={strongConditionsStyles}></div>
      </div>
      <div className="barBottom">
        {errorMsg ? (
          <p className="error-message" aria-live="assertive">
            {errorMsg}
          </p>
        ) : (
          info !== "" && (
            <p className="error-message" aria-live="assertive">
              {info}
            </p>
          )
        )}
        <div className="textWrapper">{PasswordStrengthTxtConditions}</div>
      </div>
    </div>
  );
};

export default PasswordStrength;

const styles = {
  tooShort: {
    backgroundColor: COLORS.yellow,
    transition: "background-color 0.5s ease",
    width: "33.1%",
  },
  weak: {
    backgroundColor: COLORS.red,
    transition: "background-color 0.5s ease",
    width: "33.1%",
  },
  strong: {
    backgroundColor: COLORS.green,
    transition: "background-color 0.5s ease",
    width: "33.1%",
  },
};
