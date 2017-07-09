<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Customer Orders.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.CustomerOrders" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Sorting Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Grid/customerorders.js"></script>
            <div id='soby_CustomersDiv'></div>
            <div class="row">
                <div class="col-md-6">
                    <div id='soby_OrdersDiv'></div>
                </div>
                <div class="col-md-6">
                    <div id='soby_AddressesDiv'></div>
                    <div id='soby_PhonesDiv'></div>
                </div>
            </div>


            <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/WebAPI/Grid/customerorders.js" style="display:none;background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_CustomersDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">class</span>=<span class="attr_value">'row'</span><span class="tag_start">&gt;</span>
    <span class="tag_start">&lt;div</span> <span class="attr_name">class</span>=<span class="attr_value">'col-md-6'</span><span class="tag_start">&gt;</span>
        <span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_OrdersDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
    <span class="tag_start">&lt;/div&gt;</span>
    <span class="tag_start">&lt;div</span> <span class="attr_name">class</span>=<span class="attr_value">'col-md-6'</span><span class="tag_start">&gt;</span>
        <span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_AddressesDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
        <span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_PhonesDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
    <span class="tag_start">&lt;/div&gt;</span>
<span class="tag_start">&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>

    <div class="col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </div>
</asp:Content>
