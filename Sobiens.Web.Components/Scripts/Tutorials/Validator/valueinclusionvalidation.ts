$(function ()
{
    var inclusionValidator: soby_InclusionValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Inclusion) as soby_InclusionValidator;
    inclusionValidator.IncludedValues = ["london", "tokyo", "paris"];
    alert("london is " + (inclusionValidator.Validate("london") == true ? "valid" : "invalid"));
    alert("athen is " + (inclusionValidator.Validate("athen") == true ? "valid" : "invalid"));
});

