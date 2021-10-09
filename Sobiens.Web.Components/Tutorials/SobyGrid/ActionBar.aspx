﻿<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="ActionBar.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.ActionBar" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>ActionBar Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
    <p>This example demonstrates how to use action bar panel in the Soby Data Grid. <br />
        "ActionPaneButtons.Add" method takes the following parameters. <br />
        <strong>1. key:</strong> Key string<br />
        <strong>2. text:</strong> Text to display<br />
        <strong>3. index:</strong> Index which states on which order to be displayed<br />
        <strong>4. imageUrl:</strong> Url of the image<br />
        <strong>5. className:</strong> Class name of the image<br />
        <strong>6. visible:</strong> States whether it is visible or not<br />
        <strong>7. onClick:</strong> The function which will be triggered on click<br />
        <strong>8. enabilityFunction:</strong>The function which should return boolean value to state if it is enabled or not. This function is executed to make button visible/hidden on all grid events.<br />
        <pre class="js">    bookGrid.ActionPaneButtons.Add("CustomAction", "show selected items", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-warning", true
        , function (grid)
        {
            var text = "Selected items: ";
            var selectedItems = grid.GetSelectedDataItems();
            for (var i = 0; i < selectedItems.length; i++)
            {
                text += selectedItems[i].Title + ",";
            }
            alert(text);
        }
        , function (grid) {
            return grid.GetSelectedRowIDs().length > 0?true:false;
        });
    bookGrid.ActionPaneButtons.Add("CustomAction", "&lt;span style='color:red;font-weight:bold'&gt;please select an item&lt;/span&gt;", 0, null, null, true
        , null
        , function (grid)
        {
            return grid.GetSelectedRowIDs().length == 0 ? true : false;
        });
</pre>
    </p>
    <div class="article" style="float: left;width: 74%;">
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Grid/actionbar.js"></script>
            <div id='soby_BooksDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/WebAPI/Grid/actionbar.js" style="display:none;background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_BooksDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>
        </div>
    <div class="col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </div>
</asp:Content>
