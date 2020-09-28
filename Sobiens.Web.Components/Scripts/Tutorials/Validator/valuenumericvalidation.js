$(function () {
    var numericValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Numeric);
    alert("32 is " + (numericValidator.Validate("32") == true ? "valid" : "invalid"));
    alert("t21 is " + (numericValidator.Validate("t21") == true ? "valid" : "invalid"));
    alert("test string is " + (numericValidator.Validate("test") == true ? "valid" : "invalid"));
});
//# sourceMappingURL=valuenumericvalidation.js.map