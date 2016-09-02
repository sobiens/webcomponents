<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Grouping.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.Grouping" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>


<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>General Example</h2>
    </hgroup>
    <div class="article" style="float: left;width: 74%;">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.spservice.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Grid/grouping.js"></script>
            <div id='soby_BooksDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <div id="ViewSourceDiv" class="viewsource" codefile="/Scripts/Tutorials/WebAPI/Grid/grouping.js" style="display:none;background-color:ivory">
            &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;<br />            &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;<br />
            &lt;script src="/media/js/soby.spservice.js"&gt;&lt;/script&gt;<br />
            &lt;script src="/media/js/soby.ui.components.js"&gt;&lt;/script&gt;<br />
            &lt;div id='soby_BooksDiv'&gt;&lt;/div&gt;
            <div class="viewsourcecodefileoutput"></div>
        </div>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" id="SobyGridSideMenuControl" />
    </aside>
</asp:Content>