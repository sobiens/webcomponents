$(function ()
{
    var exclusionValidator: soby_ExclusionValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Exclusion) as soby_ExclusionValidator;
    exclusionValidator.ExcludedValues = ["london", "tokyo", "paris"];
    alert("london is " + (exclusionValidator.Validate("london") == true ? "valid" : "invalid"));
    alert("athen is " + (exclusionValidator.Validate("athen") == true ? "valid" : "invalid"));
});

