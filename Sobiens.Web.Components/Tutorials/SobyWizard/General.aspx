<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="General.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyWizard.General" %>

<%@ Register Src="~/Controls/SobyWizardSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyWizardSideMenuControl" %>

<asp:Content runat="server" ID="Content1" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
        <p>
            This example demonstrates how to use Soby Wizard control.
        </p>

        <div class="article" style="float: left; width: 74%;">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <script src="/media/js/jquery-ui-1.12.0.min.js" type="text/javascript"></script>
            <link href="/media/css/jquery-ui.min.css" rel="stylesheet" />
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/media/js/soby.validator.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Wizard/general.js"></script>
            <div id='soby_WizardDiv'>
                <ul>
                    <li><a href="#steps-1">Personal Details</a></li>
                    <li><a href="#steps-2">Address Details</a></li>
                    <li><a href="#steps-3">Finish</a></li>
                </ul>
                <div id="steps-1">
                    <div id="UserDetailsForm">
                        <table width="100%">
                            <tr>
                                <td>
                                    <label for="cname">Name (required, at least 2 characters)</label>
                                </td>
                                <td>
                                    <input id="cname" name="name" minlength="2" maxlength="6" type="text" required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="cemail">Age (required)</label>
                                </td>
                                <td>
                                    <input id="cnumber" type="number" name="number" min="0" max="180" required></td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="cemail">E-Mail (required)</label>
                                </td>
                                <td>
                                    <input id="cemail" type="email" name="email" required></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="steps-2">
                    <div id="AddressDetailsForm">
                        <table width="100%">
                            <tr>
                                <td>
                                    <label for="ccity">City (required)</label>
                                </td>
                                <td>
                                    <input id="ccity" name="name" minlength="2" type="text" required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="ctown">Town (required)</label>
                                </td>
                                <td>
                                    <input id="ctown" type="text" name="town" required></td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="caddress">Address (required)</label>
                                </td>
                                <td>
                                    <input id="caddress" type="text" name="address" required></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="steps-3">
                    <p style="color:green">Your records have been saved successfully. Click <a href="General.aspx">here</a> to return homepage.</p>
                </div>
                <div class="sobywizardnavigationbar">
                    <p style="text-align: right">
                        <button class="previous">Previous</button>&nbsp;
                        <button class="next">Next</button>
                    </p>
                </div>
            </div>
            <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
                <img src="/Images/viewsource.png" border="0" width="20px" />
                View source
            </a>
            <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/WebAPI/Wizard/general.js" style="display: none; background-color: ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_WizardDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
            <br />
            Want to learn more about the grid component? Check out the <a href="../../API Documentation/Wizard/Wizard.aspx">API documentation</a>.
        </div>
    </div>
    <div class="col-md-3">
        <uc1:SobyWizardSideMenuControl runat="server" ID="SobyWizardSideMenuControl" />
    </div>
</asp:Content>
