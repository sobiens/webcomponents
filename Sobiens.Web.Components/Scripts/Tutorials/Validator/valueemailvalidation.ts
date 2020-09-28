$(function ()
{
    var presenceValidator: soby_EmailValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Email) as soby_EmailValidator;
    alert("test@sobiens.com is " + (presenceValidator.Validate("test@sobiens.com") == true ? "valid" : "invalid"));
    alert("test.sobiens.com is " + (presenceValidator.Validate("test.sobiens.com") == true ? "valid" : "invalid"));
    alert("test is " + (presenceValidator.Validate("test.sobiens.com") == true ? "valid" : "invalid"));
});

