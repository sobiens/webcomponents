// VERSION 1.0.8.1
class soby_Validate {
    constructor() {
        this.ErrorMessages = {
            Url: {
                InvalidUrlFormat: "You can't enter an invalid url"
            },
            Email: {
                InvalidEmailFormat: "You can't enter an invalid email"
            },
            Pattern: {
                NotMatchingPattern: "You can't enter a value that is not matching the required pattern"
            },
            Numeric: {
                NotNumeric: "You can't enter non numeric value",
                GreaterThanMax: "You can't enter a value grater than maximum value",
                LessThanMin: "You can't enter a value less than minimum value"
            },
            Text: {
                GreaterThanMaxLength: "You can't enter a value grater than maximum length",
                LessThanMinLength: "You can't enter a value less than minimum length"
            },
            Date: {
                GreaterThanMaxValue: "You can't enter a value grater than maximum value",
                LessThanMinValue: "You can't enter a value less than minimum value",
                InvalidDate: "You can't enter an invalid date"
            },
            Presence: {
                Required: "You can't leave this blank."
            },
            Exclusion: {
                Required: "You can't leave this blank."
            },
            Inclusion: {
                Required: "You can't leave this blank."
            }
        };
        this.Validators = new Array();
        this.Validators.push(new soby_UrlValidator());
        this.Validators.push(new soby_EmailValidator());
        this.Validators.push(new soby_NumericValidator());
        this.Validators.push(new soby_TextValidator());
        this.Validators.push(new soby_PresenceValidator());
        this.Validators.push(new soby_DateValidator());
        this.Validators.push(new soby_ExclusionValidator());
    }
    GetValidator(type) {
        for (var i = 0; i < this.Validators.length; i++) {
            if (this.Validators[i].Type == type) {
                var validator = this.Validators[i].Clone();
                validator.SetDefaultErrorMessages();
                return validator;
            }
        }
        return null;
    }
    CheckIfEmpty(value) {
        if (value == null || value == undefined || value.trim() == "" || value == [] || value == {}) {
            return true;
        }
        return false;
    }
    ValidateForm(contentDivSelector) {
        var formValidator = new soby_FormValidator(contentDivSelector);
        return formValidator.Validate();
    }
}
class soby_PresenceValidator {
    constructor() {
        this.Required = false;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: ""
        };
        this.Name = "PresenceValidator";
        this.Type = soby_ValidatorTypes.Presence;
    }
    SetDefaultErrorMessages() {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Presence.Required;
    }
    Validate(value) {
        this.ErrorMessage = "";
        if (sobyValidate.CheckIfEmpty(value) == true) {
            this.ErrorMessage = this.ErrorMessages.Required;
            return false;
        }
        return true;
    }
    Clone() {
        var validator = new soby_PresenceValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    }
}
class soby_ExclusionValidator {
    constructor() {
        this.Required = false;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: ""
        };
        this.Name = "ExclusionValidator";
        this.Type = soby_ValidatorTypes.Exclusion;
        this.ExcludedValues = new Array();
    }
    SetDefaultErrorMessages() {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Exclusion.Required;
    }
    Validate(value) {
        this.ErrorMessage = "";
        if (sobyValidate.CheckIfEmpty(value) == true) {
            this.ErrorMessage = this.ErrorMessages.Required;
            return false;
        }
        for (var i = 0; i < this.ExcludedValues.length; i++) {
            if (this.ExcludedValues[i] == value)
                return false;
        }
        return true;
    }
    Clone() {
        var validator = new soby_ExclusionValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    }
}
class soby_InclusionValidator {
    constructor() {
        this.Required = false;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: ""
        };
        this.Name = "InclusionValidator";
        this.Type = soby_ValidatorTypes.Inclusion;
        this.IncludedValues = new Array();
    }
    SetDefaultErrorMessages() {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Exclusion.Required;
    }
    Validate(value) {
        this.ErrorMessage = "";
        if (sobyValidate.CheckIfEmpty(value) == true) {
            this.ErrorMessage = this.ErrorMessages.Required;
            return false;
        }
        for (var i = 0; i < this.IncludedValues.length; i++) {
            if (this.IncludedValues[i] == value)
                return true;
        }
        return false;
    }
    Clone() {
        var validator = new soby_InclusionValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    }
}
class soby_NumericValidator extends soby_PresenceValidator {
    constructor() {
        super();
        this.MinValue = null;
        this.MaxValue = null;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            NotNumeric: "",
            Required: "",
            GreaterThanMax: "",
            LessThanMin: ""
        };
        this.Name = "NumericValidator";
        this.Type = soby_ValidatorTypes.Numeric;
    }
    SetDefaultErrorMessages() {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.NotNumeric = sobyValidate.ErrorMessages.Numeric.NotNumeric;
        this.ErrorMessages.GreaterThanMax = sobyValidate.ErrorMessages.Numeric.GreaterThanMax;
        this.ErrorMessages.LessThanMin = sobyValidate.ErrorMessages.Numeric.LessThanMin;
    }
    Validate(value) {
        var isValid = super.Validate(value);
        if (isValid == false) {
            return false;
        }
        if (isNaN(value) == true) {
            this.ErrorMessage = this.ErrorMessages.NotNumeric;
        }
        else {
            if (this.MinValue != null && parseInt(value) < this.MinValue) {
                this.ErrorMessage = this.ErrorMessages.LessThanMin;
            }
            if (this.MaxValue != null && parseInt(value) > this.MaxValue) {
                this.ErrorMessage = this.ErrorMessages.GreaterThanMax;
            }
        }
        if (this.ErrorMessage != "") {
            return false;
        }
        return true;
    }
    Clone() {
        var validator = new soby_NumericValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.MinValue = this.MinValue;
        validator.MaxValue = this.MaxValue;
        return validator;
    }
}
class soby_DateValidator extends soby_PresenceValidator {
    constructor() {
        super();
        this.DateOnly = false;
        this.Min = null;
        this.Max = null;
        this.Format = "YYYY-MM-DD";
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: "",
            GreaterThanMaxValue: "",
            LessThanMinValue: "",
            InvalidDate: ""
        };
        this.Name = "DateValidator";
        this.Type = soby_ValidatorTypes.Date;
    }
    SetDefaultErrorMessages() {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.GreaterThanMaxValue = sobyValidate.ErrorMessages.Date.GreaterThanMaxValue;
        this.ErrorMessages.LessThanMinValue = sobyValidate.ErrorMessages.Date.LessThanMinValue;
        this.ErrorMessages.InvalidDate = sobyValidate.ErrorMessages.Date.InvalidDate;
    }
    Validate(value) {
        var isValid = super.Validate(value);
        if (isValid == false) {
            this.ErrorMessage = this.ErrorMessages.InvalidDate;
        }
        var date = soby_GetDateWithFormat(value, this.Format);
        if (date == null) {
            this.ErrorMessage = this.ErrorMessages.InvalidDate;
        }
        else {
            if (this.Min != null && date < this.Min) {
                this.ErrorMessage = this.ErrorMessages.LessThanMinValue;
            }
            if (this.Max != null && date > this.Max) {
                this.ErrorMessage = this.ErrorMessages.GreaterThanMaxValue;
            }
        }
        if (this.ErrorMessage != "") {
            return false;
        }
        return true;
    }
    Clone() {
        var validator = new soby_DateValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Min = this.Min;
        validator.Max = this.Max;
        return validator;
    }
}
class soby_TextValidator extends soby_PresenceValidator {
    constructor() {
        super();
        this.MinLength = null;
        this.MaxLength = null;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: "",
            GreaterThanMaxLength: "",
            LessThanMinLength: ""
        };
        this.Name = "TextValidator";
        this.Type = soby_ValidatorTypes.Text;
    }
    SetDefaultErrorMessages() {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
    }
    Validate(value) {
        var isValid = super.Validate(value);
        if (isValid == false) {
            return false;
        }
        if (this.MinLength != null && value.length < this.MinLength) {
            this.ErrorMessage = this.ErrorMessages.LessThanMinLength;
        }
        if (this.MaxLength != null && value.length > this.MaxLength) {
            this.ErrorMessage = this.ErrorMessages.GreaterThanMaxLength;
        }
        if (this.ErrorMessage != "") {
            return false;
        }
        return true;
    }
    Clone() {
        var validator = new soby_TextValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    }
}
class soby_PatternValidator extends soby_PresenceValidator {
    constructor() {
        super();
        this.MinLength = null;
        this.MaxLength = null;
        this.Pattern = null;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: "",
            GreaterThanMaxLength: "",
            LessThanMinLength: "",
            NotMatchingPattern: ""
        };
        this.Name = "PatternValidator";
        this.Type = soby_ValidatorTypes.Pattern;
    }
    SetDefaultErrorMessages() {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Pattern.NotMatchingPattern;
    }
    Validate(value) {
        var isValid = super.Validate(value);
        if (isValid == false) {
            return false;
        }
        if (this.MinLength != null && value.length < this.MinLength) {
            this.ErrorMessage = this.ErrorMessages.LessThanMinLength;
        }
        if (this.MaxLength != null && value.length > this.MaxLength) {
            this.ErrorMessage = this.ErrorMessages.GreaterThanMaxLength;
        }
        if (this.Pattern.test(value.toString()) == false) {
            this.ErrorMessage = this.ErrorMessages.NotMatchingPattern;
        }
        if (this.ErrorMessage != "") {
            return false;
        }
        return true;
    }
    Clone() {
        var validator = new soby_PatternValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Pattern = this.Pattern;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    }
}
class soby_EmailValidator extends soby_PatternValidator {
    constructor() {
        super();
        this.Name = "EmailValidator ";
        this.Type = soby_ValidatorTypes.Email;
        this.Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    SetDefaultErrorMessages() {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Email.InvalidEmailFormat;
    }
    Validate(value) {
        return super.Validate(value);
    }
    Clone() {
        var validator = new soby_EmailValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Pattern = this.Pattern;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    }
}
class soby_UrlValidator extends soby_PatternValidator {
    constructor() {
        super();
        this.Name = "UrlValidator ";
        this.Type = soby_ValidatorTypes.URL;
        /*
        this.Pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        */
        this.Pattern = new RegExp('(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?', 'i');
    }
    SetDefaultErrorMessages() {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Url.InvalidUrlFormat;
    }
    Validate(value) {
        return super.Validate(value);
    }
    Clone() {
        var validator = new soby_UrlValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Pattern = this.Pattern;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    }
}
var soby_ValidatorTypes;
(function (soby_ValidatorTypes) {
    soby_ValidatorTypes[soby_ValidatorTypes["Date"] = 1] = "Date";
    soby_ValidatorTypes[soby_ValidatorTypes["DateTime"] = 2] = "DateTime";
    soby_ValidatorTypes[soby_ValidatorTypes["Email"] = 3] = "Email";
    soby_ValidatorTypes[soby_ValidatorTypes["Exclusion"] = 4] = "Exclusion";
    soby_ValidatorTypes[soby_ValidatorTypes["Presence"] = 5] = "Presence";
    soby_ValidatorTypes[soby_ValidatorTypes["Inclusion"] = 6] = "Inclusion";
    soby_ValidatorTypes[soby_ValidatorTypes["Length"] = 7] = "Length";
    soby_ValidatorTypes[soby_ValidatorTypes["Numeric"] = 8] = "Numeric";
    soby_ValidatorTypes[soby_ValidatorTypes["Pattern"] = 9] = "Pattern";
    soby_ValidatorTypes[soby_ValidatorTypes["Text"] = 10] = "Text";
    soby_ValidatorTypes[soby_ValidatorTypes["URL"] = 11] = "URL";
})(soby_ValidatorTypes || (soby_ValidatorTypes = {}));
class soby_FormValidator {
    constructor(contentDivSelector) {
        this.ContentDivSelector = "";
        this.ContentDivSelector = contentDivSelector;
    }
    Validate() {
        $(this.ContentDivSelector + " .sobyerrormessage").hide();
        var isValid = true;
        var hasInValidData = false;
        var textBoxes = $(this.ContentDivSelector).find("textarea, input[type='text'], input[type='number'], input[type='email'], input[type='url']");
        textBoxes.removeClass("haserror");
        for (var i = 0; i < textBoxes.length; i++) {
            var textBox = $(textBoxes[i]);
            var textValidator = null;
            if (textBox.prop("tagName").toLowerCase() == "textarea" || textBox.attr("type") == "text") {
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Text);
            }
            else if (textBox.attr("type") == "number") {
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Numeric);
            }
            else if (textBox.attr("type") == "email") {
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Email);
            }
            else if (textBox.attr("type") == "url") {
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.URL);
            }
            var texBoxId = textBox.attr("id");
            var texBoxErrorMessageId = texBoxId + "_soby_errormessage";
            if ($("#" + texBoxErrorMessageId).length == 0) {
                var errorMessageSpan = $("<div class='sobyerrormessage'></div>");
                errorMessageSpan.attr("id", texBoxErrorMessageId);
                errorMessageSpan.insertAfter(textBox);
            }
            var value = textBox.val();
            if (textBox.attr("required") != null && textBox.attr("required") != undefined) {
                textValidator.Required = true;
            }
            if (textBox.attr("minlength") != null && textBox.attr("minlength") != undefined && isNaN(parseInt(textBox.attr("minlength"))) == false) {
                textValidator.MinLength = parseInt(textBox.attr("minlength"));
            }
            if (textBox.attr("maxlength") != null && textBox.attr("maxlength") != undefined && isNaN(parseInt(textBox.attr("maxlength"))) == false) {
                textValidator.MaxLength = parseInt(textBox.attr("maxlength"));
            }
            if (textBox.attr("min") != null && textBox.attr("min") != undefined && isNaN(parseInt(textBox.attr("min"))) == false) {
                textValidator.MinValue = parseInt(textBox.attr("min"));
            }
            if (textBox.attr("max") != null && textBox.attr("max") != undefined && isNaN(parseInt(textBox.attr("max"))) == false) {
                textValidator.MaxValue = parseInt(textBox.attr("max"));
            }
            var _isValid = textValidator.Validate(value);
            if (_isValid == false) {
                isValid = false;
                textBox.addClass("haserror");
                $("#" + texBoxErrorMessageId).text(textValidator.ErrorMessage);
                $("#" + texBoxErrorMessageId).show();
                if (hasInValidData == false) {
                    textBox.focus();
                    textBox.select();
                }
                hasInValidData = true;
            }
        }
        return isValid;
    }
}
var sobyValidate = new soby_Validate();
//# sourceMappingURL=soby.validator.js.map