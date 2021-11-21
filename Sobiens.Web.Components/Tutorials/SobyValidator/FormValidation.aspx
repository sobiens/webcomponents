<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="FormValidation.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyValidator.FormValidation" Title="Soby Validator" %>

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
    <div>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/media/css/soby.ui.components.validator.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/media/js/soby.validator.js"></script>
<div id="sobyTestForm">
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
</td><td>      <input id="cemail" type="email" name="email"></td>
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
            <div id="ResultDiv"></div>
      <input type="button" value="Validate" onclick="soby_SaveForm()"></td>
    </tr>
    </table>
</div>
<script>
    function soby_SaveForm()
    {
        if (sobyValidate.ValidateForm("#sobyTestForm") == true)
        {
            $("#ResultDiv").html("<span style='color:green'>Validated successfully.</span>")
        }
        else
        {
            $("#ResultDiv").html("<span style='color:red'>Validation failed.</span>")
        }
    }
</script>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/Validator/formvalidator.txt" style="display:none;background-color:ivory">
            <div class="viewsourcecodefileoutput"></div>
        </pre>
    </div>


</asp:Content>
