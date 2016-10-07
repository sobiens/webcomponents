<%@ Page Title="Soby Web Components" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Sobiens.Web.Components._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %>.</h1>
                <br />
                <h2>Very rich and powerful javascript component library.</h2>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <h3>Here are the components our library provides (Many more will come soon):</h3>
    <ol class="round">
        <li class="one">
            <div class="row">
                <div class="col-md-7">
                    <h5>Soby Grid</h5>
                    It is designed to ease the exhausting process of implementing the necessary code for sorting, navigation, grouping, searching and real time data editing in a simple data representation object.
            <a href="Tutorials/SobyGrid/Getting Started.aspx">Tutorials</a>
                </div>
                <div class="col-md-5">
                    <img src="Images/Tutorials/Soby_WebGrid_Aggregates.png" width="350px" /></div>
            </div>

        </li>
        <li class="two">
            <div class="row">
                <div class="col-md-7">
            <h5>Item Selection</h5>
            It allows user to select items from either quick search (auto complete) or advanced search (popup grid).
            <a href="Tutorials/SobyItemSelection/Getting Started.aspx">Item Selection</a>
                </div>
                <div class="col-md-5">
                    <img src="Images/Tutorials/Soby_ItemSelection_Autocomplete.png" width="350px" /></div>
            </div>
        </li>
        <li class="three">
            <div class="row">
                <div class="col-md-7">
            <h5>Soby Tree View</h5>
                    Interactive tree view component provides item selection in a tree view style.
            <a href="Tutorials/SobyTreeView/Getting Started.aspx">Tree View</a>
                </div>
                <div class="col-md-5">
                    <img src="Images/Tutorials/Soby_TreeView_Default.png" width="350px" /></div>
            </div>
        </li>
        <li class="four">
            <div class="row">
                <div class="col-md-7">
            <h5>Carousel</h5>
            It is still being implemented.
            <a href="Tutorials/SobyCarousel/General.aspx">Tutorials</a>
                </div>
                <div class="col-md-5"></div>
            </div>
        </li>

    </ol>
</asp:Content>
