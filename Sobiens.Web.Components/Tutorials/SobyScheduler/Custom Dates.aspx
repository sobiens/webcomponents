<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Custom Dates.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.CustomDates" Title="Calendar View" %>

<%@ Register Src="~/Controls/SobyCalendarViewSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyCalendarViewSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Scheduler Custom Dates Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
<br />
    <div class="article" style="float: left;width: 74%;">
            <script src="/media/js/jquery-ui-1.12.0.min.js" type="text/javascript"></script>

            <link href="/media/css/soby.ui.components.scheduler.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.scheduler.js"></script>
            <script src="/Scripts/Tutorials/StaticData/Scheduler/scheduler.customdates.js"></script>
            <div id='soby_SchedulerDiv'></div>
            <div id='soby_SchedulerChangesDiv'></div>
        <input type="button" value="Get Changes" onclick="DisplayCustomDatesScheduleChanges()" />
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/StaticData/Scheduler/scheduler.customdates.js" style="display:none;background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_CalendarDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
    </div>

    <aside>
        <uc1:SobyCalendarViewSideMenuControl runat="server" Visible="false" ID="SobyCalendarViewSideMenuControl" />
    </aside>
</asp:Content>
