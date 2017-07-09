$(function ()
{
    var numericValidator: soby_NumericValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Numeric) as soby_NumericValidator;
    var isValid = numericValidator.Validate("32");
    alert(isValid)
});

