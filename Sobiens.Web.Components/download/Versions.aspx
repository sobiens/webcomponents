<%@ Page Title="Downloads" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Versions.aspx.cs" Inherits="Sobiens.Web.Components.download.Versions" %>
<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Sobiens web components is available for download in a zip file, which can be downloaded below.</h2>
    </hgroup>
    <br />
    <div class="article" style="float: left;width: 74%;">
        <ul>
            <li><a href="Sobiens.Web.Components 1.0.3.2.zip">Sobiens.Web.Components 1.0.3.2</a></li>
            <li><a href="Sobiens.Web.Components 1.0.4.2.zip">Sobiens.Web.Components 1.0.4.2</a></li>
            <li><a href="Sobiens.Web.Components 1.0.4.8.zip">Sobiens.Web.Components 1.0.4.8</a></li>
            <li><a href="Sobiens.Web.Components 1.0.4.10.zip">Sobiens.Web.Components 1.0.4.10</a></li>
            <li><a href="Sobiens.Web.Components 1.0.5.2.zip">Sobiens.Web.Components 1.0.5.2</a></li>
            <li><a href="Sobiens.Web.Components 1.0.6.1.zip">Sobiens.Web.Components 1.0.6.1</a></li>
            <li><a href="Sobiens.Web.Components 1.0.7.2.zip">Sobiens.Web.Components 1.0.7.2</a></li>
            <li><a href="Sobiens.Web.Components 1.0.8.1.zip">Sobiens.Web.Components 1.0.8.1</a></li>
        </ul>
    </div>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" id="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
