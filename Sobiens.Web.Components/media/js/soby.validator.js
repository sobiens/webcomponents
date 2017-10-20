var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var soby_Validate = (function () {
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
            Existence: {
                Required: "You can't leave this blank."
            }
        };
        this.Validators = new Array();
        this.Validators.push(new soby_UrlValidator());
        this.Validators.push(new soby_EmailValidator());
        this.Validators.push(new soby_NumericValidator());
        this.Validators.push(new soby_TextValidator());
        this.Validators.push(new soby_ExistenceValidator());
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
        if (value == null || value == undefined || value.trim() == "" || value == [] || value == {})
            return true;
        return false;
    };
    soby_Validate.prototype.ValidateForm = function (contentDivSelector) {
        var formValidator = new soby_FormValidator(contentDivSelector);
        return formValidator.Validate();
    };
    return soby_Validate;
}());
var soby_ExistenceValidator = (function () {
    function soby_ExistenceValidator() {
        this.Required = false;
        this.ErrorMessage = "";
        this.ErrorMessages = {
            Required: ""
        };
        this.Name = "ExistenceValidator";
        this.Type = soby_ValidatorTypes.Existence;
    }
    soby_ExistenceValidator.prototype.SetDefaultErrorMessages = function () {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Existence.Required;
    };
    soby_ExistenceValidator.prototype.Validate = function (value) {
        this.ErrorMessage = "";
        if (sobyValidate.CheckIfEmpty(value) == true) {
            this.ErrorMessage = this.ErrorMessages.Required;
            return false;
        }
        return true;
    };
    soby_ExistenceValidator.prototype.Clone = function () {
        var validator = new soby_ExistenceValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    };
    return soby_ExistenceValidator;
}());
var soby_NumericValidator = (function (_super) {
    __extends(soby_NumericValidator, _super);
    function soby_NumericValidator() {
        _super.call(this);
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
    soby_NumericValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.NotNumeric = sobyValidate.ErrorMessages.Numeric.NotNumeric;
        this.ErrorMessages.GreaterThanMax = sobyValidate.ErrorMessages.Numeric.GreaterThanMax;
        this.ErrorMessages.LessThanMin = sobyValidate.ErrorMessages.Numeric.LessThanMin;
    };
    soby_NumericValidator.prototype.Validate = function (value) {
        var isValid = _super.prototype.Validate.call(this, value);
        if (isValid == false)
            return false;
        if (isNaN(value) == true)
            this.ErrorMessage = this.ErrorMessages.NotNumeric;
        else {
            if (this.MinValue != null && parseInt(value) < this.MinValue)
                this.ErrorMessage = this.ErrorMessages.LessThanMin;
            if (this.MaxValue != null && parseInt(value) > this.MaxValue)
                this.ErrorMessage = this.ErrorMessages.GreaterThanMax;
        }
        if (this.ErrorMessage != "")
            return false;
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
}(soby_ExistenceValidator));
var soby_TextValidator = (function (_super) {
    __extends(soby_TextValidator, _super);
    function soby_TextValidator() {
        _super.call(this);
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
    soby_TextValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
    };
    soby_TextValidator.prototype.Validate = function (value) {
        var isValid = _super.prototype.Validate.call(this, value);
        if (isValid == false)
            return false;
        if (this.MinLength != null && value.length < this.MinLength)
            this.ErrorMessage = this.ErrorMessages.LessThanMinLength;
        if (this.MaxLength != null && value.length > this.MaxLength)
            this.ErrorMessage = this.ErrorMessages.GreaterThanMaxLength;
        if (this.ErrorMessage != "")
            return false;
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
}(soby_ExistenceValidator));
var soby_PatternValidator = (function (_super) {
    __extends(soby_PatternValidator, _super);
    function soby_PatternValidator() {
        _super.call(this);
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
    soby_PatternValidator.prototype.SetDefaultErrorMessages = function () {
        _super.prototype.SetDefaultErrorMessages.call(this);
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Pattern.NotMatchingPattern;
    };
    soby_PatternValidator.prototype.Validate = function (value) {
        var isValid = _super.prototype.Validate.call(this, value);
        if (isValid == false)
            return false;
        if (this.MinLength != null && value.length < this.MinLength)
            this.ErrorMessage = this.ErrorMessages.LessThanMinLength;
        if (this.MaxLength != null && value.length > this.MaxLength)
            this.ErrorMessage = this.ErrorMessages.GreaterThanMaxLength;
        if (this.Pattern.test(value.toString()) == false)
            this.ErrorMessage = this.ErrorMessages.NotMatchingPattern;
        if (this.ErrorMessage != "")
            return false;
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
}(soby_ExistenceValidator));
var soby_EmailValidator = (function (_super) {
    __extends(soby_EmailValidator, _super);
    function soby_EmailValidator() {
        _super.call(this);
        this.Name = "EmailValidator ";
        this.Type = soby_ValidatorTypes.Email;
        this.Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
var soby_UrlValidator = (function (_super) {
    __extends(soby_UrlValidator, _super);
    function soby_UrlValidator() {
        _super.call(this);
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
    soby_ValidatorTypes[soby_ValidatorTypes["Existence"] = 5] = "Existence";
    soby_ValidatorTypes[soby_ValidatorTypes["Inclusion"] = 6] = "Inclusion";
    soby_ValidatorTypes[soby_ValidatorTypes["Length"] = 7] = "Length";
    soby_ValidatorTypes[soby_ValidatorTypes["Numeric"] = 8] = "Numeric";
    soby_ValidatorTypes[soby_ValidatorTypes["Pattern"] = 9] = "Pattern";
    soby_ValidatorTypes[soby_ValidatorTypes["Text"] = 10] = "Text";
    soby_ValidatorTypes[soby_ValidatorTypes["URL"] = 11] = "URL";
})(soby_ValidatorTypes || (soby_ValidatorTypes = {}));
var soby_FormValidator = (function () {
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
            if (textBox.prop("tagName").toLowerCase() == "textarea" || textBox.attr("type") == "text")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Text);
            else if (textBox.attr("type") == "number")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Numeric);
            else if (textBox.attr("type") == "email")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Email);
            else if (textBox.attr("type") == "url")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.URL);
            var texBoxId = textBox.attr("id");
            var texBoxErrorMessageId = texBoxId + "_soby_errormessage";
            if ($("#" + texBoxErrorMessageId).length == 0) {
                var errorMessageSpan = $("<div class='sobyerrormessage'></div>");
                errorMessageSpan.attr("id", texBoxErrorMessageId);
                errorMessageSpan.insertAfter(textBox);
            }
            var value = textBox.val();
            if (textBox.attr("required") != null && textBox.attr("required") != undefined)
                textValidator.Required = true;
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
    };
    return soby_FormValidator;
}());
var sobyValidate = new soby_Validate();
