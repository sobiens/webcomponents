<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="FormValidation.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyValidator.FormValidation" Title="Soby Validator" %>

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
    <div class="article col-md-9">
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/media/css/soby.ui.components.validator.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/media/js/soby.validator.js"></script>
<div id="sobyTestForm">
    <legend>Please provide your name, email address (won't be published) and a comment</legend>
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
      <label for="cemail">Number (required)</label>
</td><td>      <input id="cnumber" type="number" name="number" min="90" max="180" required></td>
    </tr>
    <tr>
        <td>
      <label for="cemail">E-Mail (required)</label>
</td><td>      <input id="cemail" type="email" name="email" required></td>
    </tr>
    <tr>
        <td>
      <label for="curl">URL (optional)</label>
</td><td>      <input id="curl" type="url" name="url"></td>
    </tr>
    <tr>
        <td>
      <label for="ccomment">Your comment (required)</label></td><td>
      <textarea id="ccomment" name="comment" rows="3" cols="30" required></textarea></td>
    </tr>
    <tr>
        <td colspan="2">
      <input type="button" value="Save" onclick="soby_SaveForm()"></td>
    </tr>
    </table>
</div>
<script>
    function soby_SaveForm()
    {
        sobyValidate.ValidateForm("#sobyTestForm");
    }
</script>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/Validator/general.js" style="display:none;background-color:ivory">
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
