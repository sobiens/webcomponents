$(function () {
    var presenceValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Email);
    alert("test@sobiens.com is " + (presenceValidator.Validate("test@sobiens.com") == true ? "valid" : "invalid"));
    alert("test.sobiens.com is " + (presenceValidator.Validate("test.sobiens.com") == true ? "valid" : "invalid"));
    alert("test is " + (presenceValidator.Validate("test.sobiens.com") == true ? "valid" : "invalid"));
});
//# sourceMappingURL=valueemailvalidation.js.map