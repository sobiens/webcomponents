<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master"  CodeBehind="Getting Started.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyCarousel.GettingStarted" %>
<%@ Register Src="~/Controls/SobyCarouselSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyCarouselSideMenuControl" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Carousel/general.js"></script>
            <div id='soby_CarouselDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <div id="ViewSourceDiv" class="viewsource" codefile="/Scripts/Tutorials/WebAPI/Carousel/general.js" style="display:none;background-color:ivory">
            &lt;link href="/Css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;<br />
            &lt;script src="/Scripts/soby.service.js"&gt;&lt;/script&gt;<br />
            &lt;script src="/Scripts/soby.ui.components.js"&gt;&lt;/script&gt;<br />
            &lt;div id='soby_CarouselDiv'&gt;&lt;/div&gt;
            <div class="viewsourcecodefileoutput"></div>
        </div>
    </div>

    <div class="col-md-3">
        <uc1:SobyCarouselSideMenuControl runat="server" id="SobyCarouselSideMenuControl" />
    </div>
</asp:Content>
