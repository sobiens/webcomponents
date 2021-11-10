<%@ Page Title="Downloads" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Versions.aspx.cs" Inherits="Sobiens.Web.Components.download.Versions" %>
<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Sobiens web components is available for download in a zip file, which can be downloaded below.</h2>
    </hgroup>
    <br />
   <div class="article col-md-9">
        <ul>
            <li><a href="Sobiens.Web.Components 1.0.9.4.zip">Sobiens.Web.Components 1.0.9.4</a></li>
        </ul>
    </div>
   <div class="col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" id="SobyGridSideMenuControl" />
    </div>
</asp:Content>
