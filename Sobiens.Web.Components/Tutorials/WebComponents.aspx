<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master"  CodeBehind="WebComponents.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.WebComponents" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1><%: Title %>.</h1>
        <h2>Soby Web Components</h2>
    </hgroup>

    <article>
        <ul>
            <li><a href="SobyGrid/General.aspx">Grid</a></li>
            <li><a href="SobyCarousel/General.aspx">Carousel</a></li>
            <li><a href="SobyMetroStyleGrid/General.aspx">Metro Style Grid</a></li>
            <li><a href="SobyWizard/General.aspx">Wizard</a></li>
            <li><a href="SobyItemSelection/Getting Started.aspx">Item Selection</a></li>
        </ul>

    </article>

    <aside>
        <h3>Aside Title</h3>
        <p>        
            Use this area to provide additional information.
        </p>
        <ul>
            <li><a runat="server" href="~/">Home</a></li>
            <li><a runat="server" href="~/About">About</a></li>
            <li><a runat="server" href="~/Contact">Contact</a></li>
        </ul>
    </aside>
</asp:Content>
