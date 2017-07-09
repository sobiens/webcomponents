<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="SPDataBinding.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.SPDataBinding" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>SP Data Binding Implementation</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
    <p>This example demonstrates how to use SharePoint Rest Service in the Soby Data Grid. <br />
    <br /><strong>SP Data Binding</strong>
    <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('SPDataBindingViewSourceDiv', '/Scripts/Tutorials/WebAPI/Grid/spdatabinding.js')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
    <pre id="SPDataBindingViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory">
&lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript" &gt;&lt;/script&gt;
&lt;script src='/media/js/jquery-ui-1.12.0.min.js'&gt;&lt;/script&gt;
&lt;link href='/media/css/jquery-ui.min.css' rel='stylesheet' /&gt;&lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
&lt;script src="/media/js/soby.service.js" &gt;&lt;/script&gt;
&lt;script src="/media/js/soby.ui.components.js" &gt;&lt;/script&gt;
&lt;div id='soby_BooksDiv' &gt;&lt;/div&gt;
&lt;script&gt;
<div class="viewsourcecodefileoutput"></div>
&lt;/script&gt;
</pre>
    <br />Want to learn more about the grid component? Check out the <a href="/API Documentation/Grid/Grid.aspx">API documentation</a>.
        </p>
        </div>
    <div class="article col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </div>
</asp:Content>
