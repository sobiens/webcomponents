<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Getting Started.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyValidator.GettingStarted" Title="Soby Validator" %>

<%@ Register Src="~/Controls/SobyValidatorViewSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyValidatorViewSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %></h1>
                <br />
                <h2>Validator Example</h2>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <script type="text/javascript">
        function sobyValidateValueExistence()
        {
            if (sobyValidate.GetValidator(soby_ValidatorTypes.Existence).Validate($("#soby_ExistenceValidationValueTextBox").val()) == true)
            {
                $("#soby_ExistenceValidationResult").text("valid");
                $("#soby_ExistenceValidationResult").css("color", "green");
            }
            else
            {
                $("#soby_ExistenceValidationResult").text("invalid");
                $("#soby_ExistenceValidationResult").css("color", "red");
            }

        }
    </script>
    <div class="article col-md-9">
        <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
        <link href="/media/css/soby.ui.components.validator.css" rel="stylesheet" type="text/css" media="all" />
        <script src="/media/js/soby.service.js"></script>
        <script src="/media/js/soby.ui.components.js"></script>
        <script src="/media/js/soby.validator.js"></script>
        <p>
            <strong>Soby Validator</strong> is a comprehensive validation library for web developers.
        It is designed to ease the exhausting process of implementing the necessary code for validating data model or form controls.
        By writing few lines of code, all of the functionality is implemented right away by <strong>Soby Validator</strong> for you.
        This allows time to be concentrated on other innovative software aspects.
        <strong>Soby Validator</strong> also comes with extensively customizable configuring options. You can also write and integrate your own validators.
        </p>
        <h3>Setting up your development environment</h3>
        <p>You can find the necessary information to set up your environment from <a href="/Tutorials/Setting Up.aspx">here</a>.</p>
        <div class="row">
            <div class="col-md-2">
                <ul>
                    <li><a href='#ValidationPanel_Date'>Date</a></li>
                    <li><a href='#ValidationPanel_DateTime'>DateTime</a></li>
                    <li><a href='#ValidationPanel_Email'>Email</a></li>
                    <li><a href='#ValidationPanel_Exclusion'>Exclusion</a></li>
                    <li><a href='#ValidationPanel_Existence'>Existence</a></li>
                    <li><a href='#ValidationPanel_Inclusion'>Inclusion</a></li>
                    <li><a href='#ValidationPanel_Length'>Length</a></li>
                    <li><a href='#ValidationPanel_Numeric'>Numeric</a></li>
                    <li><a href='#ValidationPanel_Pattern'>Pattern</a></li>
                    <li><a href='#ValidationPanel_Text'>Text</a></li>
                    <li><a href='#ValidationPanel_URL'>URL</a></li>
                </ul>
            </div>
            <div class="col-md-10" style="height: 400px;overflow: auto;">
                <div id="ValidationPanel_Existence" style="height: 400px">
                    <h4>Existence Validator</h4>
                    <p>
                        This example demonstrates how to use filtering in the Soby Data Grid.
                        <br />
                        "sobyValidate.GetValidator" method takes one parameter. The parameter is the type of the validator. This method returns the validator for the given type. "Validate" method of the validator, returns as invalid if the given value is one of the following empty, null or valid. It returns as valid if the given value is not any of those values.
        <pre class="js"> var isValid = sobyValidate.GetValidator(soby_ValidatorTypes.Existence).Validate(null);</pre>
                    </p>
                    <p>
                        Value <input type="text" id="soby_ExistenceValidationValueTextBox" /> is <span id="soby_ExistenceValidationResult"></span>
                        <input type="button" value="Validate" onclick="sobyValidateValueExistence()" />
                    </p>

                </div>
                <div id="ValidationPanel_Text" style="height: 400px">
                        <h4>Text Validator</h4>
                    <p>
                        This example demonstrates how to use filtering in the Soby Data Grid.
                        <br />
                        "AddFilterField" method takes four parameters. First one is the name of the field. Second one is filter value. Third one is type of the field. Fourth one is type of the filter. This method does not trigger data population, it just adds the filterfield which will be used on population.
        <pre class="js">bookGrid.AddFilterField("Genre", "Picaresque", SobyFieldTypes.Text, SobyFilterTypes.Equal); </pre>
                    </p>
                    <p>
                        Below functionality uses "FilterResult" method which takes four parameters. First one is the name of the field. Second one is filter value. Third one is type of the field. Fourth one is type of the filter. This method triggers the data population.
        <pre class="js">bookGrid.FilterResult("Genre", "Picaresque", SobyFieldTypes.Text, SobyFilterTypes.Equal); </pre>
                    </p>
                    <p>
                        Filter by 
        <select id="SortBySelectBox">
            <option value="Title">Title</option>
            <option value="Year" style="display: none">Year</option>
            <option value="Price" style="display: none">Price</option>
            <option value="Genre">Genre</option>
        </select>
                        as contains
                        <input type="text" id="FilterValueTextBox" />
                        <input type="button" value="Apply" onclick="sobyApplyFiltering()" />
                    </p>

                </div>

            </div>
        </div>

        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" />
            View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/Validator/general.js" style="display: none; background-color: ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.validator.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.validator.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/Scripts/Tutorials/Validator/general.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_CalendarDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
    </div>
    <div class="col-md-3">
        <uc1:SobyValidatorViewSideMenuControl runat="server" ID="SobyValidatorViewSideMenuControl" />
    </div>
</asp:Content>
