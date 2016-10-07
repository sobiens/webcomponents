<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Setting Up.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SettingUp" Title="Setting Up" %>
<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Please follow the below instructions to setup your environment.</h2>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article" style="float: left;width: 74%;">
        <ul style="list-style-type: decimal;">
            <li>Download the suitable package for you from <a href="/download/Versions.aspx">here</a>.</li>
            <li>Extract the zip file and copy the folders into your project</li>
            <li>
                Include the following syntax into your page<br />
                <pre class="html">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_ComponentContainer'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
                </pre>
            </li>
            <li>All the components require container id as a parameter. As an example usage of it in grid component is below<br />
                <pre class="js"><span class="code_keyword">var</span> sampleGrid = <span class="code_keyword">new</span> soby_WebGrid("#soby_ComponentContainer", "Sample Title", sampleService, "There is no record found."); </pre>
            </li>
            <li>Also components require image folder url. As an example usage of it in grid component is below. This is where you copy the image folder in your project.<br />
                <pre class="js">sampleGrid.ImagesFolderUrl = "/media/images"; </pre>
            </li>
            <li>Now you are ready to have some fun with our data components. Please check the <a href="/Default.aspx">Tutorials and documentations</a></li>
        </ul>
    </div>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" id="SobyGridSideMenuControl" />
    </aside>
</asp:Content>