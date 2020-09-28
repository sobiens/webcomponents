$(function () {
    var presenceValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Presence);
    alert("null is " + (presenceValidator.Validate(null) == true ? "valid" : "invalid"));
    alert("undefined is " + (presenceValidator.Validate(undefined) == true ? "valid" : "invalid"));
    alert("empty string is " + (presenceValidator.Validate("") == true ? "valid" : "invalid"));
    alert("test is " + (presenceValidator.Validate("test") == true ? "valid" : "invalid"));
    alert("32 is " + (presenceValidator.Validate("32") == true ? "valid" : "invalid"));
    alert("!*/+ is " + (presenceValidator.Validate("! */+") == true ? "valid" : "invalid"));
});
//# sourceMappingURL=valuepresencevalidation.js.map