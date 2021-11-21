<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master"  CodeBehind="MVCSample.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.MVCSample" Title="DataGrid - MVC Integration Example" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>MVC Integration Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div>
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/Css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/Scripts/soby.service.js"></script>
            <script src="/Scripts/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Grid/general.js"></script>
            <div id='soby_BooksDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource('mvc')">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <div id="ViewSourceDiv" class="viewsource" codefile="/Scripts/Tutorials/WebAPI/Grid/mvcsample.txt" style="display:none;background-color:ivory">
            <div class="viewsourcecodefileoutput"></div>
        </div>
    </div>


</asp:Content>
