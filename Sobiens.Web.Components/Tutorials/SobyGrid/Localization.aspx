<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Localization.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.Localization" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>


<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Master Details Example</h2>
    </hgroup>
    <div class="article" style="float: left;width: 74%;">
        <p style="color:orange;font-size: 18px;">This is not documented yet</p>
    </div>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
