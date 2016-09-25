<%@ Page Title="Soby Web Components" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Sobiens.Web.Components._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %>.</h1><br />
                <h2>Very rich and powerful javascript component library.</h2>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <h3>Here are the components our library provides (Many more will come soon):</h3>
    <ol class="round">
        <li class="one">
            <h5>Soby Grid</h5>
            It is designed to ease the exhausting process of implementing the necessary code for sorting, navigation, grouping, searching and real time data editing in a simple data representation object.
            <a href="Tutorials/SobyGrid/Getting Started.aspx">Tutorials</a>
        </li>
        <li class="two">
            <h5>Metro Style Grid</h5>
            It is still being implemented.
            <a href="Tutorials/SobyMetroStyleGrid/General.aspx">Tutorials</a>
        </li>
        <li class="three">
            <h5>Carousel</h5>
            You can easily find a web hosting company that offers the right mix of features and price for your applications.
            It is still being implemented.
            <a href="Tutorials/SobyCarousel/General.aspx">Tutorials</a>
        </li>
        <li class="four">
            <h5>Item Selection</h5>
            You can easily find a web hosting company that offers the right mix of features and price for your applications.
            It is still being implemented.
            <a href="Tutorials/SobyItemSelection/Getting Started.aspx">Item Selection</a>
        </li>

    </ol>
</asp:Content>
