$(function () {
    var numericValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Numeric);
    var isValid = numericValidator.Validate("32");
    alert(isValid);
});
