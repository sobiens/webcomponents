var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// VERSION 1.0.8.1
var soby_Validate = /** @class */ (function () {
    function soby_Validate() {
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
    soby_Validate.prototype.GetValidator = function (type) {
        for (var i = 0; i < this.Validators.length; i++) {
            if (this.Validators[i].Type == type) {
                var validator = this.Validators[i].Clone();
                validator.SetDefaultErrorMessages();
                return validator;
            }
        }
        return null;
    };
    soby_Validate.prototype.CheckIfEmpty = function (value) {
        if (value == null || value == undefined || value.trim() == "" || value == [] || value == {}) {
            return true;
        }
        return false;
    };
    soby_Validate.prototype.ValidateForm = function (contentDivSelector) {
        var formValidator = new soby_FormValidator(contentDivSelector);
        return formValidator.Validate();
    };
    return soby_Validate;
}());
var soby_PresenceValidator = /** @class */ (function () {
    function soby_PresenceValidator() {
        this.Required = false;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: ""
        };
        this.Name = "PresenceValidator";
        this.Type = soby_ValidatorTypes.Presence;
    }
    soby_PresenceValidator.prototype.SetDefaultErrorMessages = function () {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Presence.Required;
    };
    soby_PresenceValidator.prototype.Validate = function (value) {
        this.ErrorMessage = "";
        if (this.Required == true && sobyValidate.CheckIfEmpty(value) == true) {
            this.ErrorMessage = this.ErrorMessages.Required;
            return false;
        }
        return true;
    };
    soby_PresenceValidator.prototype.Clone = function () {
        var validator = new soby_PresenceValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    };
    return soby_PresenceValidator;
}());
var soby_ExclusionValidator = /** @class */ (function () {
    function soby_ExclusionValidator() {
        this.Required = false;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: ""
        };
        this.Name = "ExclusionValidator";
        this.Type = soby_ValidatorTypes.Exclusion;
        this.ExcludedValues = new Array();
    }
    soby_ExclusionValidator.prototype.SetDefaultErrorMessages = function () {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Exclusion.Required;
    };
    soby_ExclusionValidator.prototype.Validate = function (value) {
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
    };
    soby_ExclusionValidator.prototype.Clone = function () {
        var validator = new soby_ExclusionValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    };
    return soby_ExclusionValidator;
}());
var soby_InclusionValidator = /** @class */ (function () {
    function soby_InclusionValidator() {
        this.Required = false;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: ""
        };
        this.Name = "InclusionValidator";
        this.Type = soby_ValidatorTypes.Inclusion;
        this.IncludedValues = new Array();
    }
    soby_InclusionValidator.prototype.SetDefaultErrorMessages = function () {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Exclusion.Required;
    };
    soby_InclusionValidator.prototype.Validate = function (value) {
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
    };
    soby_InclusionValidator.prototype.Clone = function () {
        var validator = new soby_InclusionValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    };
    return soby_InclusionValidator;
}());
var soby_NumericValidator = /** @class */ (function (_super) {
    __extends(soby_NumericValidator, _super);
    function soby_NumericValidator() {
        var _this = _super.call(this) || this;
        _this.MinValue = null;
        _this.MaxValue = null;
        _this.ErrorMessage = "";
        _this.ErrorMessages = {
            NotNumeric: "",
            Required: "",
            GreaterThanMax: "",
            LessThanMin: ""
        };
        _this.Name = "NumericValidator";
        _this.Type = soby_ValidatorTypes.Numeric;
        return _this;
    }
    soby_NumericValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.NotNumeric = sobyValidate.ErrorMessages.Numeric.NotNumeric;
        this.ErrorMessages.GreaterThanMax = sobyValidate.ErrorMessages.Numeric.GreaterThanMax;
        this.ErrorMessages.LessThanMin = sobyValidate.ErrorMessages.Numeric.LessThanMin;
    };
    soby_NumericValidator.prototype.Validate = function (value) {
        var isValid = _super.prototype.Validate.call(this, value);
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
    };
    soby_NumericValidator.prototype.Clone = function () {
        var validator = new soby_NumericValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.MinValue = this.MinValue;
        validator.MaxValue = this.MaxValue;
        return validator;
    };
    return soby_NumericValidator;
}(soby_PresenceValidator));
var soby_DateValidator = /** @class */ (function (_super) {
    __extends(soby_DateValidator, _super);
    function soby_DateValidator() {
        var _this = _super.call(this) || this;
        _this.DateOnly = false;
        _this.Min = null;
        _this.Max = null;
        _this.Format = "YYYY-MM-DD";
        _this.ErrorMessage = "";
        _this.ErrorMessages = {
            Required: "",
            GreaterThanMaxValue: "",
            LessThanMinValue: "",
            InvalidDate: ""
        };
        _this.Name = "DateValidator";
        _this.Type = soby_ValidatorTypes.Date;
        return _this;
    }
    soby_DateValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.GreaterThanMaxValue = sobyValidate.ErrorMessages.Date.GreaterThanMaxValue;
        this.ErrorMessages.LessThanMinValue = sobyValidate.ErrorMessages.Date.LessThanMinValue;
        this.ErrorMessages.InvalidDate = sobyValidate.ErrorMessages.Date.InvalidDate;
    };
    soby_DateValidator.prototype.Validate = function (value) {
        var isValid = _super.prototype.Validate.call(this, value);
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
    };
    soby_DateValidator.prototype.Clone = function () {
        var validator = new soby_DateValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Min = this.Min;
        validator.Max = this.Max;
        return validator;
    };
    return soby_DateValidator;
}(soby_PresenceValidator));
var soby_TextValidator = /** @class */ (function (_super) {
    __extends(soby_TextValidator, _super);
    function soby_TextValidator() {
        var _this = _super.call(this) || this;
        _this.MinLength = null;
        _this.MaxLength = null;
        _this.ErrorMessage = "";
        _this.ErrorMessages = {
            Required: "",
            GreaterThanMaxLength: "",
            LessThanMinLength: ""
        };
        _this.Name = "TextValidator";
        _this.Type = soby_ValidatorTypes.Text;
        return _this;
    }
    soby_TextValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
    };
    soby_TextValidator.prototype.Validate = function (value) {
        var isValid = _super.prototype.Validate.call(this, value);
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
    };
    soby_TextValidator.prototype.Clone = function () {
        var validator = new soby_TextValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    };
    return soby_TextValidator;
}(soby_PresenceValidator));
var soby_PatternValidator = /** @class */ (function (_super) {
    __extends(soby_PatternValidator, _super);
    function soby_PatternValidator() {
        var _this = _super.call(this) || this;
        _this.MinLength = null;
        _this.MaxLength = null;
        _this.Pattern = null;
        _this.ErrorMessage = "";
        _this.ErrorMessages = {
            Required: "",
            GreaterThanMaxLength: "",
            LessThanMinLength: "",
            NotMatchingPattern: ""
        };
        _this.Name = "PatternValidator";
        _this.Type = soby_ValidatorTypes.Pattern;
        return _this;
    }
    soby_PatternValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Pattern.NotMatchingPattern;
    };
    soby_PatternValidator.prototype.Validate = function (value) {
        var isValid = _super.prototype.Validate.call(this, value);
        if (isValid === false) {
            return false;
        }
        if (this.Required === true || value !== "") {
            if (this.MinLength !== null && value.length < this.MinLength) {
                this.ErrorMessage = this.ErrorMessages.LessThanMinLength;
            }
            if (this.MaxLength !== null && value.length > this.MaxLength) {
                this.ErrorMessage = this.ErrorMessages.GreaterThanMaxLength;
            }
            if (this.Pattern.test(value.toString()) === false) {
                this.ErrorMessage = this.ErrorMessages.NotMatchingPattern;
            }
        }
        if (this.ErrorMessage !== "") {
            return false;
        }
        return true;
    };
    soby_PatternValidator.prototype.Clone = function () {
        var validator = new soby_PatternValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Pattern = this.Pattern;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    };
    return soby_PatternValidator;
}(soby_PresenceValidator));
var soby_EmailValidator = /** @class */ (function (_super) {
    __extends(soby_EmailValidator, _super);
    function soby_EmailValidator() {
        var _this = _super.call(this) || this;
        _this.Name = "EmailValidator ";
        _this.Type = soby_ValidatorTypes.Email;
        _this.Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return _this;
    }
    soby_EmailValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Email.InvalidEmailFormat;
    };
    soby_EmailValidator.prototype.Validate = function (value) {
        return _super.prototype.Validate.call(this, value);
    };
    soby_EmailValidator.prototype.Clone = function () {
        var validator = new soby_EmailValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Pattern = this.Pattern;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    };
    return soby_EmailValidator;
}(soby_PatternValidator));
var soby_UrlValidator = /** @class */ (function (_super) {
    __extends(soby_UrlValidator, _super);
    function soby_UrlValidator() {
        var _this = _super.call(this) || this;
        _this.Name = "UrlValidator ";
        _this.Type = soby_ValidatorTypes.URL;
        /*
        this.Pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        */
        _this.Pattern = new RegExp('(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?', 'i');
        return _this;
    }
    soby_UrlValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Url.InvalidUrlFormat;
    };
    soby_UrlValidator.prototype.Validate = function (value) {
        return _super.prototype.Validate.call(this, value);
    };
    soby_UrlValidator.prototype.Clone = function () {
        var validator = new soby_UrlValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.Pattern = this.Pattern;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;
        return validator;
    };
    return soby_UrlValidator;
}(soby_PatternValidator));
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
var soby_FormValidator = /** @class */ (function () {
    function soby_FormValidator(contentDivSelector) {
        this.ContentDivSelector = "";
        this.ContentDivSelector = contentDivSelector;
    }
    soby_FormValidator.prototype.Validate = function () {
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
            if (textBox[0].hasAttribute("required") == true) {
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
                if (hasInValidData == false && textBox.is(":visible") == true) {
                    textBox.focus();
                    textBox.select();
                }
                hasInValidData = true;
            }
        }
        return isValid;
    };
    return soby_FormValidator;
}());
var sobyValidate = new soby_Validate();
//# sourceMappingURL=soby.validator.js.map