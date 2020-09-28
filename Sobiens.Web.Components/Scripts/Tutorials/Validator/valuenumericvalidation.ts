$(function ()
{
    var numericValidator: soby_NumericValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Numeric) as soby_NumericValidator;
    alert("32 is " + (numericValidator.Validate("32") == true ? "valid" : "invalid"));
    alert("t21 is " + (numericValidator.Validate("t21") == true ? "valid" : "invalid"));
    alert("test string is " + (numericValidator.Validate("test") == true ? "valid" : "invalid"));
});

