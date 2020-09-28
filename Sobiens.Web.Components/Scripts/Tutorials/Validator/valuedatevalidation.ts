$(function ()
{
    var dateValidator: soby_DateValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Date) as soby_DateValidator;
    var isValid = dateValidator.Validate("12/12/2020");
    alert(isValid)
});

