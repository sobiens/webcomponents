$(function ()
{
    var textValidator: soby_TextValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Text) as soby_TextValidator;
    textValidator.MinLength = 10;
    textValidator.MaxLength = 20;
    alert("Hello is " + (textValidator.Validate("Hello") == true ? "valid" : "invalid"));
    alert("Hello World text is " + (textValidator.Validate("Hello World text") == true ? "valid" : "invalid"));
    alert("Hello World long long long text is " + (textValidator.Validate("Hello World long long long text") == true ? "valid" : "invalid"));
});

