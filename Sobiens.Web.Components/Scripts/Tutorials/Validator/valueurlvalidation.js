$(function () {
    var urlValidator = sobyValidate.GetValidator(soby_ValidatorTypes.URL);
    alert("http://www.sobiens.com is " + (urlValidator.Validate("http://www.sobiens.com") === true ? "valid" : "invalid"));
    alert("https://www.sobiens.com is " + (urlValidator.Validate("https://www.sobiens.com") === true ? "valid" : "invalid"));
    alert("https://sobiens.com is " + (urlValidator.Validate("https://sobiens.com") === true ? "valid" : "invalid"));
    alert("www.sobiens.com is " + (urlValidator.Validate("www.sobiens.com") === true ? "valid" : "invalid"));
});
//# sourceMappingURL=valueurlvalidation.js.map