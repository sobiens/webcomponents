declare class soby_Validate {
    ErrorMessages: {
        Url: {
            InvalidUrlFormat: string;
        };
        Email: {
            InvalidEmailFormat: string;
        };
        Pattern: {
            NotMatchingPattern: string;
        };
        Numeric: {
            NotNumeric: string;
            GreaterThanMax: string;
            LessThanMin: string;
        };
        Text: {
            GreaterThanMaxLength: string;
            LessThanMinLength: string;
        };
        Date: {
            GreaterThanMaxValue: string;
            LessThanMinValue: string;
            InvalidDate: string;
        };
        Presence: {
            Required: string;
        };
        Exclusion: {
            Required: string;
        };
        Inclusion: {
            Required: string;
        };
    };
    constructor();
    Validators: Array<soby_ValidatorInterface>;
    GetValidator(type: soby_ValidatorTypes): soby_ValidatorInterface;
    CheckIfEmpty(value: any): boolean;
    ValidateForm(contentDivSelector: string): boolean;
}
interface soby_ValidatorInterface {
    Name: string;
    Type: soby_ValidatorTypes;
    ErrorMessage: string;
    Required: boolean;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
    SetDefaultErrorMessages(): any;
}
declare class soby_PresenceValidator implements soby_ValidatorInterface {
    Name: string;
    Type: soby_ValidatorTypes;
    Required: boolean;
    ErrorMessage: string;
    ErrorMessages: {
        Required: string;
    };
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_ExclusionValidator implements soby_PresenceValidator {
    Name: string;
    Type: soby_ValidatorTypes;
    Required: boolean;
    ErrorMessage: string;
    ErrorMessages: {
        Required: string;
    };
    ExcludedValues: Array<string>;
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_InclusionValidator implements soby_PresenceValidator {
    Name: string;
    Type: soby_ValidatorTypes;
    Required: boolean;
    ErrorMessage: string;
    ErrorMessages: {
        Required: string;
    };
    IncludedValues: Array<string>;
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_NumericValidator extends soby_PresenceValidator {
    MinValue: number;
    MaxValue: number;
    ErrorMessage: string;
    ErrorMessages: {
        NotNumeric: string;
        Required: string;
        GreaterThanMax: string;
        LessThanMin: string;
    };
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_DateValidator extends soby_PresenceValidator {
    DateOnly: boolean;
    Min: number;
    Max: number;
    Format: string;
    ErrorMessage: string;
    ErrorMessages: {
        Required: string;
        GreaterThanMaxValue: string;
        LessThanMinValue: string;
        InvalidDate: string;
    };
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_TextValidator extends soby_PresenceValidator {
    MinLength: number;
    MaxLength: number;
    ErrorMessage: string;
    ErrorMessages: {
        Required: string;
        GreaterThanMaxLength: string;
        LessThanMinLength: string;
    };
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_PatternValidator extends soby_PresenceValidator {
    MinLength: number;
    MaxLength: number;
    Pattern: RegExp;
    ErrorMessage: string;
    ErrorMessages: {
        Required: string;
        GreaterThanMaxLength: string;
        LessThanMinLength: string;
        NotMatchingPattern: string;
    };
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_EmailValidator extends soby_PatternValidator {
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare class soby_UrlValidator extends soby_PatternValidator {
    constructor();
    SetDefaultErrorMessages(): void;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
}
declare enum soby_ValidatorTypes {
    Date = 1,
    DateTime = 2,
    Email = 3,
    Exclusion = 4,
    Presence = 5,
    Inclusion = 6,
    Length = 7,
    Numeric = 8,
    Pattern = 9,
    Text = 10,
    URL = 11
}
declare class soby_FormValidator {
    ContentDivSelector: string;
    constructor(contentDivSelector: string);
    Validate(): boolean;
}
declare var sobyValidate: soby_Validate;
