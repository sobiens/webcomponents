<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Single Selection.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyItemSelection.SingleSelection" Title="Item Selection Single" %>

<%@ Register Src="~/Controls/SobyItemSelectionSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyItemSelectionSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Item Selection - Data Grid Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
<br />
    <p>This example demonstrates how to use Soby Item Selection as single selection. <br />
        Setting item selector "AllowMultipleSelections" property as false will make it work as single selection. 
        <pre class="js">itemSelection = new soby_ItemSelection("#soby_BooksDiv", "Meters", <strong>SobyItemSelectorTypes.GridView</strong>, autoCompleteBookDataService, advancedSearchBookDataService, "No record", "BookSelectionDialog", "/Management/CustomerSelection.html", "Id", "Title"); 
            itemSelection.AllowMultipleSelections = false;
            itemSelection.ImagesFolderUrl = "/media/images";
            itemSelection.Initialize();
        </pre>
    </p>

        <div class="article" style="float: left;width: 74%;">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>            <script src="/media/js/jquery-ui-1.12.0.min.js" type="text/javascript"></script>
            <link href="/media/css/jquery-ui.min.css" rel="stylesheet" />            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/ItemSelection/singleselection.js"></script>
            <div id='soby_BooksDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/WebAPI/ItemSelection/selection.js" style="display:none;background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_BooksDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>

    <aside>
        <uc1:SobyItemSelectionSideMenuControl runat="server" ID="SobyItemSelectionSideMenuControl" />
    </aside>
</asp:Content>
