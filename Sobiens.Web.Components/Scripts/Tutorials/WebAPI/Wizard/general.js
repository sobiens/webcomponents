$(function () {
    soby_PopulateGeneralWizard();
});
function soby_PopulateGeneralWizard() {
    var wizard = new soby_Wizard("#soby_WizardDiv");
    wizard.EventBeforeStepChange = function (navigatedStepIndex) {
        // If completed once they can not navigate back and save it
        if (wizard.CurrentStepIndex == 2)
            return;
        // No validation is necessary for previous step
        if (wizard.CurrentStepIndex > navigatedStepIndex) {
            this.CommitToStep();
        }
        else if (navigatedStepIndex == 1) {
            if (sobyValidate.ValidateForm("#UserDetailsForm") == true)
                this.CommitToStep();
        }
        else if (navigatedStepIndex == 2) {
            if (sobyValidate.ValidateForm("#AddressDetailsForm") == true)
                this.CommitToStep();
        }
        else {
            this.CommitToStep();
        }
    };
    wizard.EventAfterStepChange = function (navigatedFromStepIndex, navigatedToStepIndex) {
        if (wizard.CurrentStepIndex == 2) {
            wizard.HideNavigationBar();
        }
        if (wizard.CurrentStepIndex == 1) {
            $("#soby_WizardDiv button.next").text("Save");
        }
        else {
            $("#soby_WizardDiv button.next").text("Next");
        }
    };
    wizard.Initialize();
}
//# sourceMappingURL=general.js.map