$(function () {
    var exclusionValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Exclusion);
    exclusionValidator.ExcludedValues = ["london", "tokyo", "paris"];
    alert("london is " + (exclusionValidator.Validate("london") == true ? "valid" : "invalid"));
    alert("athen is " + (exclusionValidator.Validate("athen") == true ? "valid" : "invalid"));
});
//# sourceMappingURL=valueexclusionvalidation.js.map