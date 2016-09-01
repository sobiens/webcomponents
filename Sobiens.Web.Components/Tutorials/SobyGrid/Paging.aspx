<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Paging.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.Paging" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>


<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Paging Example</h2>
    </hgroup>
        <div class="article" style="float: left;width: 74%;">
            <link href="/Css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/Scripts/soby.spservice.js"></script>
            <script src="/Scripts/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Grid/paging.js"></script>
            <div id='soby_BooksDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <div id="ViewSourceDiv" class="viewsource" codefile="/Scripts/Tutorials/WebAPI/Grid/paging.js" style="display:none;background-color:ivory">
            &lt;link href="/Css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;<br />
            &lt;script src="/Scripts/soby.spservice.js"&gt;&lt;/script&gt;<br />
            &lt;script src="/Scripts/soby.ui.components.js"&gt;&lt;/script&gt;<br />
            &lt;div id='soby_BooksDiv'&gt;&lt;/div&gt;
            <div class="viewsourcecodefileoutput"></div>
        </div>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
