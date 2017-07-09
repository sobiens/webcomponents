class soby_Validate
{
    ErrorMessages = {
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
    }

    constructor()
    {
        this.Validators = new Array<soby_ValidatorInterface>();
        this.Validators.push(new soby_UrlValidator());
        this.Validators.push(new soby_EmailValidator());
        this.Validators.push(new soby_NumericValidator());
        this.Validators.push(new soby_TextValidator());
        this.Validators.push(new soby_ExistenceValidator());
    }


    Validators: Array<soby_ValidatorInterface>;
    GetValidator(type: soby_ValidatorTypes)
    {
        for (var i = 0; i < this.Validators.length; i++)
        {
            if (this.Validators[i].Type == type)
            {
                var validator = this.Validators[i].Clone();
                validator.SetDefaultErrorMessages();
                return validator;
            }
        }

        return null;
    }

    CheckIfEmpty(value: any): boolean
    {
        if (value == null || value == undefined || value.trim() == "" || value == [] || value == {})
            return true;

        return false;
    }

    ValidateForm(contentDivSelector: string)
    {
        var formValidator: soby_FormValidator = new soby_FormValidator(contentDivSelector);
        return formValidator.Validate();
    }
}

interface soby_ValidatorInterface
{
    Name: string;
    Type: soby_ValidatorTypes;
    ErrorMessage: string;
    Required: boolean;
    Validate(value: any): boolean;
    Clone(): soby_ValidatorInterface;
    SetDefaultErrorMessages();
}
class soby_ExistenceValidator implements soby_ValidatorInterface
{
    Name: string;
    Type: soby_ValidatorTypes;
    Required: boolean = false;
    ErrorMessage: string = "";
    ErrorMessages = {
        Required: ""
    }

    constructor()
    {
        this.Name = "ExistenceValidator";
        this.Type = soby_ValidatorTypes.Existence;
    }

    SetDefaultErrorMessages()
    {
        this.ErrorMessages.Required = sobyValidate.ErrorMessages.Existence.Required;
    }

    Validate(value: any): boolean
    {
        this.ErrorMessage = "";
        if (sobyValidate.CheckIfEmpty(value) == true)
        {
            this.ErrorMessage = this.ErrorMessages.Required;
            return false;
        }

        return true;
    }

    Clone(): soby_ValidatorInterface
    {
        var validator: soby_ExistenceValidator = new soby_ExistenceValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        return validator;
    }
}

class soby_NumericValidator extends soby_ExistenceValidator
{
    MinValue: number = null;
    MaxValue: number = null;
    ErrorMessage: string = "";
    ErrorMessages = {
        NotNumeric: "",
        Required: "",
        GreaterThanMax: "",
        LessThanMin: ""
    }

    constructor()
    {
        super();
        this.Name = "NumericValidator";
        this.Type = soby_ValidatorTypes.Numeric;
    }

    SetDefaultErrorMessages()
    {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.NotNumeric = sobyValidate.ErrorMessages.Numeric.NotNumeric;
        this.ErrorMessages.GreaterThanMax = sobyValidate.ErrorMessages.Numeric.GreaterThanMax;
        this.ErrorMessages.LessThanMin = sobyValidate.ErrorMessages.Numeric.LessThanMin;
    }

    Validate(value: any): boolean
    {
        console.log(value)
        var isValid = super.Validate(value);
        if (isValid == false)
            return false;

        if (isNaN(value) == true)
            this.ErrorMessage = this.ErrorMessages.NotNumeric;
        else
        {
            if (this.MinValue != null && parseInt(value) < this.MinValue)
                this.ErrorMessage = this.ErrorMessages.LessThanMin;

            if (this.MaxValue != null && parseInt(value) > this.MaxValue)
                this.ErrorMessage = this.ErrorMessages.GreaterThanMax;

        }

        if (this.ErrorMessage != "")
            return false;

        return true;
    }

    Clone(): soby_ValidatorInterface
    {
        var validator: soby_NumericValidator = new soby_NumericValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.MinValue = this.MinValue;
        validator.MaxValue = this.MaxValue;

        return validator;
    }

}


class soby_TextValidator extends soby_ExistenceValidator
{
    MinLength: number = null;
    MaxLength: number = null;
    ErrorMessage: string = "";
    ErrorMessages = {
        Required: "",
        GreaterThanMaxLength: "",
        LessThanMinLength: ""
    }

    constructor()
    {
        super();
        this.Name = "TextValidator";
        this.Type = soby_ValidatorTypes.Text;
    }

    SetDefaultErrorMessages()
    {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
    }

    Validate(value: any): boolean
    {
        var isValid = super.Validate(value);
        if (isValid == false)
            return false;

        if (this.MinLength != null && value.length < this.MinLength)
            this.ErrorMessage = this.ErrorMessages.LessThanMinLength;

        if (this.MaxLength != null && value.length > this.MaxLength)
            this.ErrorMessage = this.ErrorMessages.GreaterThanMaxLength;

        if (this.ErrorMessage != "")
            return false;

        return true;
    }

    Clone(): soby_ValidatorInterface
    {
        var validator: soby_TextValidator = new soby_TextValidator();
        validator.Name = this.Name;
        validator.Required = this.Required;
        validator.Type = this.Type;
        validator.ErrorMessage = this.ErrorMessage;
        validator.MinLength = this.MinLength;
        validator.MaxLength = this.MaxLength;

        return validator;
    }

}


class soby_PatternValidator extends soby_ExistenceValidator
{
    MinLength: number = null;
    MaxLength: number = null;
    Pattern: RegExp = null;
    ErrorMessage: string = "";
    ErrorMessages = {
        Required: "",
        GreaterThanMaxLength: "",
        LessThanMinLength: "",
        NotMatchingPattern: ""
    }

    constructor()
    {
        super();
        this.Name = "PatternValidator";
        this.Type = soby_ValidatorTypes.Pattern;
    }

    SetDefaultErrorMessages()
    {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.GreaterThanMaxLength = sobyValidate.ErrorMessages.Text.GreaterThanMaxLength;
        this.ErrorMessages.LessThanMinLength = sobyValidate.ErrorMessages.Text.LessThanMinLength;
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Pattern.NotMatchingPattern;
    }

    Validate(value: any): boolean
    {
        var isValid = super.Validate(value);
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
    }

    Clone(): soby_ValidatorInterface
    {
        var validator: soby_PatternValidator = new soby_PatternValidator();
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

class soby_EmailValidator extends soby_PatternValidator
{
    constructor()
    {
        super();
        this.Name = "EmailValidator ";
        this.Type = soby_ValidatorTypes.Email;
        this.Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    SetDefaultErrorMessages()
    {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Email.InvalidEmailFormat;
    }

    Validate(value: any): boolean
    {
        return super.Validate(value);
    }

    Clone(): soby_ValidatorInterface
    {
        var validator: soby_EmailValidator = new soby_EmailValidator();
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

class soby_UrlValidator extends soby_PatternValidator
{
    constructor()
    {
        super();
        this.Name = "UrlValidator ";
        this.Type = soby_ValidatorTypes.URL;
        this.Pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    }

    SetDefaultErrorMessages()
    {
        super.SetDefaultErrorMessages();
        this.ErrorMessages.NotMatchingPattern = sobyValidate.ErrorMessages.Url.InvalidUrlFormat;
    }

    Validate(value: any): boolean
    {
        return super.Validate(value);
    }

    Clone(): soby_ValidatorInterface
    {
        var validator: soby_UrlValidator = new soby_UrlValidator();
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

enum soby_ValidatorTypes
{
    Date = 1,
    DateTime=2,
    Email=3,
    Exclusion = 4,
    Existence =5,
    Inclusion = 6,
    Length = 7,
    Numeric = 8,
    Pattern = 9,
    Text = 10,
    URL=11
}


class soby_FormValidator
{
    ContentDivSelector: string = "";
    constructor(contentDivSelector: string)
    {
        this.ContentDivSelector = contentDivSelector;
    }

    Validate(): boolean
    {
        $(this.ContentDivSelector + " .sobyerrormessage").hide();
        var isValid: boolean = true;
        var hasInValidData: boolean = false;
        var textBoxes = $(this.ContentDivSelector).find("input[type='text'], input[type='number'], input[type='email'], input[type='url']");
        textBoxes.removeClass("haserror");
        for (var i = 0; i < textBoxes.length; i++)
        {
            var textBox = $(textBoxes[i]);
            var textValidator: soby_ExistenceValidator = null;
            if (textBox.attr("type") == "text")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Text) as soby_TextValidator;
            else if (textBox.attr("type") == "number")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Numeric) as soby_NumericValidator;
            else if (textBox.attr("type") == "email")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Email) as soby_EmailValidator;
            else if (textBox.attr("type") == "url")
                textValidator = sobyValidate.GetValidator(soby_ValidatorTypes.URL) as soby_UrlValidator;
            console.log(textValidator)
            var texBoxId = textBox.attr("id");
            var texBoxErrorMessageId = texBoxId + "_soby_errormessage";
            if ($("#" + texBoxErrorMessageId).length == 0)
            {
                var errorMessageSpan = $("<div class='sobyerrormessage'></div>");
                errorMessageSpan.attr("id", texBoxErrorMessageId);
                errorMessageSpan.insertAfter(textBox);
            }
            var value = textBox.val();
            if (textBox.attr("required") != null && textBox.attr("required") != undefined)
                textValidator.Required = true;

            if (textBox.attr("minlength") != null && textBox.attr("minlength") != undefined && isNaN(parseInt(textBox.attr("minlength"))) == false)
            {
                (textValidator as soby_TextValidator).MinLength = parseInt(textBox.attr("minlength"));
            }

            if (textBox.attr("maxlength") != null && textBox.attr("maxlength") != undefined && isNaN(parseInt(textBox.attr("maxlength"))) == false)
            {
                (textValidator as soby_TextValidator).MaxLength = parseInt(textBox.attr("maxlength"));
            }

            if (textBox.attr("min") != null && textBox.attr("min") != undefined && isNaN(parseInt(textBox.attr("min"))) == false)
            {
                (textValidator as soby_NumericValidator).MinValue = parseInt(textBox.attr("min"));
            }

            if (textBox.attr("max") != null && textBox.attr("max") != undefined && isNaN(parseInt(textBox.attr("max"))) == false)
            {
                (textValidator as soby_NumericValidator).MaxValue = parseInt(textBox.attr("max"));
            }

            console.log(textValidator)
            var isValid = textValidator.Validate(value);
            if (isValid == false)
            {
                textBox.addClass("haserror");
                $("#" + texBoxErrorMessageId).text(textValidator.ErrorMessage);
                $("#" + texBoxErrorMessageId).show();
                if (hasInValidData == false)
                {
                    textBox.focus();
                    textBox.select();
                }

                hasInValidData = true;
            }
        }

        return isValid;
    }
}
var sobyValidate: soby_Validate = new soby_Validate();