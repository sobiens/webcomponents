﻿<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master"  CodeBehind="General.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyMetroStyleGrid.General" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>General Example</h2>
            <p>We have just started to develop, so there will be lots of features soon.</p>
    </hgroup>
    <div>
            <link href="/Css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/Scripts/soby.service.js"></script>
            <script src="/Scripts/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/MetroStyleGrid/general.js"></script>
            <div id='soby_MetroStyleGridDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <div id="ViewSourceDiv" class="viewsource" codefile="/Scripts/Tutorials/WebAPI/MetroStyleGrid/general.js" style="display:none;background-color:ivory">
            &lt;link href="/Css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;<br />
            &lt;script src="/Scripts/soby.service.js"&gt;&lt;/script&gt;<br />
            &lt;script src="/Scripts/soby.ui.components.js"&gt;&lt;/script&gt;<br />
            &lt;div id='soby_MetroStyleGridDiv'&gt;&lt;/div&gt;
            <div class="viewsourcecodefileoutput"></div>
        </div>
    </div>


</asp:Content>
