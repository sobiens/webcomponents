<%@ Page Title="Getting Started" Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Getting Started.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.GettingStarted" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2></h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>        <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
        <script src="/media/js/soby.service.js"></script>
        <script src="/media/js/soby.ui.components.js"></script>
        <script src="/Scripts/Tutorials/WebAPI/Grid/general.js"></script>
        <p>
            <strong>Soby WebGrid</strong> is a comprehensive AJAX data grid component for web developers.
        It is designed to ease the exhausting process of implementing the necessary code for sorting, navigation, grouping, searching and real time data editing in a simple data representation object.
        By writing few lines of code, all of the functionality is implemented right away by <strong>Soby WebGrid</strong> for you.
        This allows time to be concentrated on other innovative software aspects.
        <strong>Soby WebGrid</strong> also comes with extensively customizable formatting options, which is a must for appealing web pages.
        You can customize almost every visual property of this grid control.
        </p>
        <h3>Setting up your development environment</h3>
        <p>You can find the necessary information to set up your environment from <a href="/Tutorials/Setting Up.aspx">here</a>.</p>
        <h3>Grouping</h3>
        <p>
            <strong>Soby WebGrid</strong> allows user to group and un-group rows by dragging and dropping the column header to the group-by pane.<br /><br />
            <img src="/Images/Tutorials/Soby_WebGrid_Grouping.png" />
            <a href="Grouping.aspx"><strong>View demo and tutorial</strong></a>
        </p>
        <h3>Aggregates</h3>
        <p>
            <strong>Soby WebGrid</strong> allows user to display aggregate values on grouped view.<br /><br />
            <img src="/Images/Tutorials/Soby_WebGrid_Aggregates.png" />
            <a href="Aggregates.aspx"><strong>View demo and tutorial</strong></a>
        </p>
    </div>

    <div class="col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </div>
</asp:Content>
