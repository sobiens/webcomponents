<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master"  CodeBehind="General.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyWizard.General" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1><%: Title %>.</h1>
        <h2>Your app description page.</h2>
    </hgroup>

    <div class="article col-md-9">
        <script src="../../Scripts/soby.service.js"></script>
        <script src="../../Scripts/soby.ui.components.js"></script>
        <script src="../../Scripts/Tutorials/WebAPI/soby.customers.js"></script>
    </div>

    <div class="col-md-3">
        <h3>Aside Title</h3>
        <p>        
            Use this area to provide additional information.
        </p>
        <ul>
            <li><a runat="server" href="~/">Home</a></li>
            <li><a runat="server" href="~/About">About</a></li>
            <li><a runat="server" href="~/Contact">Contact</a></li>
        </ul>
    </div>
</asp:Content>
