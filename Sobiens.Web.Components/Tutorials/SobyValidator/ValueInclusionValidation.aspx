<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="ValueInclusionValidation.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyValidator.ValueInclusionValidation" Title="Soby Validator" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %></h1>
                <br />
                <h2>Numeric Validator Example</h2>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div>
        <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
        <link href="/media/css/soby.ui.components.validator.css" rel="stylesheet" type="text/css" media="all" />
        <script src="/media/js/soby.service.js"></script>
        <script src="/media/js/soby.ui.components.js"></script>
        <script src="/media/js/soby.validator.js"></script>
        <div class="row">
            <div class="col-md-12" style="height: 400px;overflow: auto;">
                <div id="ValidationPanel_Presence" style="height: 400px">
                    <h4>Inclusion Validator</h4>
                    <p>
                        This example demonstrates how to use inclusion validator in the Soby Validator.
                        <br />
                        "sobyValidate.GetValidator" method takes one parameter. The parameter is the type of the validator. This method returns the validator for the given type. "Validate" method of the validator, returns as invalid if the given value is not contained by IncludedValues. It returns as valid if the given value is contained by IncludedValues.
                        <pre class="js">
 var inclusionValidator = sobyValidate.GetValidator(soby_ValidatorTypes.Inclusion);
 inclusionValidator.IncludedValues = ["london", "tokyo", "paris"];
 inclusionValidator.Validate("london");<br /> Output:true<br />
 inclusionValidator.Validate("tokyo");<br /> Output:false<br />
                        </pre>
                </div>
            </div>
        </div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" />
            View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/Validator/valuenumericvalidation.js" style="display: none; background-color: ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.validator.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.validator.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/Scripts/Tutorials/Validator/valuenumericvalidation.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_CalendarDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
    </div>

</asp:Content>
