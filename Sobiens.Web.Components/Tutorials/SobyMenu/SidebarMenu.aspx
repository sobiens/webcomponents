<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="SidebarMenu.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyMenu.SidebarMenu" Title="Sidebar Menu" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Sidebar Menu Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
   <div>
        <div class="article" style="float: left;width: 100%;">
                        <div id='soby_CodeLanguagesTabsDiv'>
                <ul>
                    <li><a href="#tabs-1">Javascript</a></li>
                    <li><a href="#tabs-2">jQuery</a></li>
                    <li><a href="#tabs-3">VueJS</a></li>
                    <li><a href="#tabs-4">AngularJS</a></li>
                    <li><a href="#tabs-5">ReactJS</a></li>
                </ul>
                <div id="tabs-1">
                    <div class='soby_JavascriptCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Pie Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.service.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="soby_MenuDiv" &gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode">        var menu = new SobyMenu("#soby_MenuDiv", SobyMenuViewTypes.LeftSideBar);
                            menu.AddToggler(null, "", "/",  "/Images/Logo/Sobiens_Logo.gif", "");
                            menu.Add(null, "Overview", "/",  "&lt;svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-house-door-fill' viewBox='0 0 16 16'&gt;&lt;path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z'&gt;&lt;/path&gt;&lt;/svg&gt;", "");
                            menu.AddDivider();
                            menu.Add(null, "Components", "/",  "", "");
                            var menuItemDataGrid = menu.Add(null, "Data Grid", "/Tutorials/SobyGrid/Getting%20Started",  "", "");
                            var menuItemDataRepeater = menu.Add(null, "Data Repeater", "/Tutorials/SobyDataRepeater/Getting%20Started.aspx",  "", "");
                            var menuItemDataGrid = menu.Add(null, "Item Selection", "/Tutorials/SobyItemSelection/Getting%20Started.aspx",  "", "");
                            var menuItemDataGrid = menu.Add(null, "Tree View", "/Tutorials/SobyTreeView/Getting%20Started.aspx",  "", "");
                            var menuItemChart = menu.Add(null, "Chart", "/Tutorials/SobyChart/Getting%20Started.aspx",  "", "");
                            var menuItemChartGS = menu.Add(menuItemChart, "Getting Started", "/Tutorials/SobyChart/Getting Started.aspx",  "", "");
                            var menuItemChartCC = menu.Add(menuItemChart, "Column Chart", "/Tutorials/SobyChart/ColumnChart.aspx",  "", "");
                            var menuItemChartLC = menu.Add(menuItemChart, "Line Chart", "/Tutorials/SobyChart/LineChart.aspx",  "", "");
                            var menuItemChartPC = menu.Add(menuItemChart, "Pie Chart", "/Tutorials/SobyChart/PieChart.aspx",  "", "");
                            var menuItemChartDC = menu.Add(menuItemChart, "Doughnut Chart", "/Tutorials/SobyChart/DoughnutChart.aspx",  "", "");
                            var menuItemChartBC = menu.Add(menuItemChart, "Bar Chart", "/Tutorials/SobyChart/BarChart.aspx",  "", "");
                            var menuItemChartPAC = menu.Add(menuItemChart, "Polar Area Chart", "/Tutorials/SobyChart/PolarAreaChart.aspx",  "", "");
                            var menuItemChartGS = menu.Add(menuItemChart, "Getting Started", "/Tutorials/SobyChart/Getting Started.aspx",  "", "");


                            var menuItemDataGrid = menu.Add(null, "Calendar View", "/Tutorials/SobyCalendarView/Getting%20Started.aspx",  "", "");
                            var menuItemDataGrid = menu.Add(null, "Carousel", "/Tutorials/SobyCarousel/Getting%20Started.aspx",  "", "");
                            var menuItemDataGrid = menu.Add(null, "Wizard", "/Tutorials/SobyWizard/General.aspx",  "", "");
                            var menuItemDataGrid = menu.Add(null, "CheckBoxList", "/Tutorials/SobyCheckBoxList/Getting%20Started.aspx",  "", "");
                            var menuItemDataGrid = menu.Add(null, "SelectBox", "/Tutorials/SobySelectBox/Getting%20Started.aspx",  "", "");
                            var menuItemDataGrid = menu.Add(null, "Validation", "/Tutorials/SobyValidator/Getting%20Started.aspx",  "", "");
                            menu.AddDivider();
                            var menuItemDataGrid = menu.Add(null, "Setting Up", "/Tutorials/SobyValidator/Getting%20Started.aspx",  "&lt;svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-journal-code' viewBox='0 0 16 16'&gt;  &lt;path fill-rule='evenodd' d='M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z'&gt;&lt;/path&gt;  &lt;path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z'&gt;&lt;/path&gt;  &lt;path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z'&gt;&lt;/path&gt;&lt;/svg&gt;", "");
                            menu.AddDivider();
                            var menuItemDataGrid = menu.Add(null, "Download", "/Tutorials/SobyValidator/Getting%20Started.aspx",  "&lt;svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-cloud-download' viewBox='0 0 16 16'&gt;  &lt;path d='M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z'&gt;&lt;/path&gt;  &lt;path d='M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z'&gt;&lt;/path&gt;&lt;/svg&gt;", "");
                            var menuItemDataGrid = menu.Add(null, "Code Repository", "/Tutorials/SobyValidator/Getting%20Started.aspx",  "&lt;svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-code-slash' viewBox='0 0 16 16'&gt;  &lt;path d='M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z'&gt;&lt;/path&gt;&lt;/svg&gt;", "");
    menu.Initialize();
                        </div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>
                </div>
                <div id="tabs-2">
                    <div class='soby_JQueryCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Pie Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.service.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.extension.jquery.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="soby_MenuDiv" class="sobymenu leftsidebar"&gt;
	&lt;div&gt;
		&lt;a href="/"&gt;&lt;img src="/Images/Logo/Sobiens_Logo.gif"&gt;&nbsp;&lt;/a&gt;
	&lt;/div&gt;
	&lt;ul class="nav"&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/"&gt;&lt;svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16"&gt;&lt;path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"&gt;&lt;/path&gt;&lt;/svg&gt;&nbsp;Overview&lt;/a&gt;&lt;/li&gt;
		&lt;li class="divider"&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/"&gt;Components&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyGrid/Getting%20Started"&gt;Data Grid&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyDataRepeater/Getting%20Started.aspx"&gt;Data Repeater&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyItemSelection/Getting%20Started.aspx"&gt;Item Selection&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyTreeView/Getting%20Started.aspx"&gt;Tree View&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;
			&lt;button class="menutoggler"&gt;Chart&lt;/button&gt;
			&lt;ul class="nav expand"&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/Getting Started.aspx"&gt;Getting Started&lt;/a&gt;&lt;/li&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/ColumnChart.aspx"&gt;Column Chart&lt;/a&gt;&lt;/li&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/LineChart.aspx"&gt;Line Chart&lt;/a&gt;&lt;/li&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/PieChart.aspx"&gt;Pie Chart&lt;/a&gt;&lt;/li&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/DoughnutChart.aspx"&gt;Doughnut Chart&lt;/a&gt;&lt;/li&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/BarChart.aspx"&gt;Bar Chart&lt;/a&gt;&lt;/li&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/PolarAreaChart.aspx"&gt;Polar Area Chart&lt;/a&gt;&lt;/li&gt;
				&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyChart/Getting Started.aspx"&gt;Getting Started&lt;/a&gt;&lt;/li&gt;
			&lt;/ul&gt;
		&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyCalendarView/Getting%20Started.aspx"&gt;Calendar View&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyCarousel/Getting%20Started.aspx"&gt;Carousel&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyWizard/General.aspx"&gt;Wizard&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyCheckBoxList/Getting%20Started.aspx"&gt;CheckBoxList&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobySelectBox/Getting%20Started.aspx"&gt;SelectBox&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyValidator/Getting%20Started.aspx"&gt;Validation&lt;/a&gt;&lt;/li&gt;
		&lt;li class="divider"&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyValidator/Getting%20Started.aspx"&gt;&lt;svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-code" viewBox="0 0 16 16"&gt;  &lt;path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"&gt;&lt;/path&gt;  &lt;path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"&gt;&lt;/path&gt;  &lt;path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"&gt;&lt;/path&gt;&lt;/svg&gt;&nbsp;Setting Up&lt;/a&gt;&lt;/li&gt;
		&lt;li class="divider"&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyValidator/Getting%20Started.aspx"&gt;&lt;svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16"&gt;  &lt;path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"&gt;&lt;/path&gt;  &lt;path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"&gt;&lt;/path&gt;&lt;/svg&gt;&nbsp;Download&lt;/a&gt;&lt;/li&gt;
		&lt;li class='menuitem'&gt;&lt;a href="/Tutorials/SobyValidator/Getting%20Started.aspx"&gt;&lt;svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16"&gt;  &lt;path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"&gt;&lt;/path&gt;&lt;/svg&gt;&nbsp;Code Repository&lt;/a&gt;&lt;/li&gt;
	&lt;/ul&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode">$("#soby_MenuDiv").sobymenu();
                        </div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>
                </div>
                <div id="tabs-3">
                    <div class='soby_VueCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Pie Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="https://cdn.jsdelivr.net/npm/vue@2" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.ui.components.min.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.extension.vue.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="soby_ChartVueDiv"&gt;
    &lt;soby-chart id="soby_ChartDiv" width="600" height="300"&gt;
        &lt;dataset type="PieChart" title="Chart1" data="14;#10;#17;#35;#50;#20"&gt;&lt;/dataset&gt;
        &lt;labels labels="January;#February;#March;#April;#May;#June"&gt;&lt;/labels&gt;
    &lt;/soby-chart&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode">var app = new Vue({ el: '#soby_ChartVueDiv' })
                        </div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>
                </div>
                <div id="tabs-4">
                                        <div class='soby_AngularCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Pie Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.ui.components.min.js"&gt;&lt;/script&gt;
    &lt;script language="javascript"&gt;
          (function (angular) {
              'use strict';
              angular.module('sobyChartApp', []).controller('MainCtrl', function MainCtrl($scope) {
                  this.chart = {
                      id: 'sobyChartDiv_' + soby_guid(),
                      width: 400,
                      height: 200,
                      datasets: [{ type: "PieChart", title: "Chart1", data: "14;#10;#17;#35;#50;#20" }, { type: "PieChart", title: "Chart2", data: "14;#10;#17;#35;#50;#20" }],
                      labels: "January;#February;#March;#April;#May;#June"
                  };

                  var chartId = this.chart.id;
                  setTimeout(function () {
                      sobyGenerateChartFromHtmlElement(chartId);
                  }, 1000);
              });
          })(window.angular);
    &lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.extension.angular.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body ng-app="sobyChartApp" &gt;
&lt;div ng-controller="MainCtrl as ctrl" &gt;
  &lt;soby-chart chart="ctrl.chart"&gt;&lt;/soby-chart&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode"></div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>



                </div>
                <div id="tabs-5">Not implemented yet</div>
                            </div>


            <script src="/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/media/js/soby.ui.components.codeview.js"></script>
            <script language="javascript">
                $(function () {
                    soby_PopulateCustomizedCodeView();
                });

                function soby_PopulateCustomizedCodeView() {
                    /*
                    var codeView1 = new soby_CodeView(".soby_JavascriptCodeDiv", "javascript Examples", SobyCodeViewTypes.HtmlParts);
                    codeView1.ActiveView = SobyCodeViews.Js;
                    codeView1.Initialize();
                    */
                    var codeView2 = new soby_CodeView(".soby_JQueryCodeDiv", "jQuery Examples", SobyCodeViewTypes.HtmlParts);
                    codeView2.ActiveView = SobyCodeViews.Js;
                    codeView2.Initialize();
                    /*

                    var codeView3 = new soby_CodeView(".soby_VueCodeDiv", "VueJS Examples", SobyCodeViewTypes.HtmlParts);
                    codeView3.ActiveView = SobyCodeViews.Html;
                    codeView3.Initialize();

                    var codeView4 = new soby_CodeView(".soby_AngularCodeDiv", "AngularJS Examples", SobyCodeViewTypes.HtmlParts);
                    codeView4.ActiveView = SobyCodeViews.Html;
                    codeView4.Initialize();
                    */

                    var tabs = new soby_Tab("#soby_CodeLanguagesTabsDiv");
                    tabs.Initialize();
                }
            </script>

        <br />Want to learn more about the chart component? Check out the <a href="../../API Documentation/modules.html">API documentation</a>.
    </div>
        </div>

</asp:Content>
