$(function () {
    var inclusionValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Inclusion);
    inclusionValidator.IncludedValues = ["london", "tokyo", "paris"];
    alert("london is " + (inclusionValidator.Validate("london") == true ? "valid" : "invalid"));
    alert("athen is " + (inclusionValidator.Validate("athen") == true ? "valid" : "invalid"));
});
//# sourceMappingURL=valueinclusionvalidation.js.map