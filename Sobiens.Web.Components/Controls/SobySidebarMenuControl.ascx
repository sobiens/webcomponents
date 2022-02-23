<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SobySidebarMenuControl.ascx.cs" Inherits="Sobiens.Web.Components.Controls.SobySidebarMenuControl" %>
<div id="soby_MenuDiv" class="sobymenu leftsidebar">
    <ul class="menu">
        <li class='toggler'><a><svg  width="30" height="30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 1-7 7 7 7 0 0 1 7-7m0-1a8 8 0 1 0 8 8 8 8 0 0 0-8-8z"/><path d="M4 6h8v1H4zM4 8h8v1H4zM4 10h8v1H4z"/></svg> Soby Web Components</a></li>
        <li class='menuitem'><a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"></path></svg>
            Overview</a></li>
        <li class="divider"></li>
        <li class='menuitem'>
            <a class="menutoggler">Data Grid</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyGrid/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/CodeGenerationWizard">Code Generation Wizard</a></li>
                <li class='menuitem'>
                    <a class="menutoggler">Data Binding</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/StaticDataBinding">Static Data Binding</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/WebAPIOData">Web API and OData Implementation</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/SPDataBinding">SP Data Binding</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/ExtendingDataBinding">Extending Data Binding</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/CustomDataBinding">Custom Data Binding</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/MVCSample">MVC Sample</a></li>
                    </ul>
                </li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/Paging">Paging</a></li>
                
                <li class='menuitem'>
                    <a class="menutoggler">Editing</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Row Editing">Row Editing</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Custom Edit Form">Custom Edit Form</a></li>
                    </ul>
                </li>
                <li class='menuitem'>
                    <a class="menutoggler">Filtering and Sorting</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Sorting">Sorting</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Filtering">Filtering</a></li>
                    </ul>
                </li>

                <li class='menuitem' style="display: none"><a href="/Tutorials/SobyGrid/Localization">Localization</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/Grouping">Grouping</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/ActionBar">Action Bar</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/RefreshData">Refresh Data</a></li>
                <li class='menuitem'>
                    <a class="menutoggler">Export Data</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/ExportToExcel">Export To Excel</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/ExportToXml">Export To Xml</a></li>
                    </ul>
                </li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/Aggregates">Aggregates</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/ResponsiveDesign">Responsive Design</a></li>
                <li class='menuitem' style="display: none"><a href="/Tutorials/SobyGrid/Columns">Columns</a></li>
                <li class='menuitem'>
                    <a class="menutoggler">Selection</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/SingleSelection">Single Selection</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/MultipleSelection">Multiple Selection</a></li>
                    </ul>
                </li>
                <li class='menuitem'>
                    <a class="menutoggler">Columns</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/CellTemplate">Cell Template</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Cell Styles">Cell Styles</a></li>
                    </ul>
                </li>
                <li class='menuitem'>
                    <a class="menutoggler">Master-Detail</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/NestedGrids">Nested Grids</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Master-Details">Master-Details</a></li>
                    </ul>
                </li>
                <li class='menuitem' style="display: none"><a href="/Tutorials/SobyGrid/DragDrop">Drag Drop</a></li>
                <li class='menuitem' style="display: none"><a href="/Tutorials/SobyGrid/ContextMenu">Context Menu</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/KeyboardNavigation">Keyboard Navigation</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyGrid/Themes">Themes</a></li>
                <li class='menuitem'>
                    <a class="menutoggler">Labs</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Sales Report Sample">Sales Report</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyGrid/Customer Orders">Customer Orders</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <li class='menuitem'>
            <a class="menutoggler">Data Repeater</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyDataRepeater/Custom Format">Custom Format</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyDataRepeater/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyDataRepeater/Paging">Paging</a></li>
            </ul>

        </li>
        <li class='menuitem'>
            <a class="menutoggler">Item Selection</a>


            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyItemSelection/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyItemSelection/Single Selection">Single Selection</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyItemSelection/Treeview Selection">Treeview Selection</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyItemSelection/Autocomplete watermark">Autocomplete Watermark</a></li>
            </ul>

        </li>
        <li class='menuitem'><a href="/Tutorials/SobyTreeView/Getting Started">Tree View</a></li>
        <li class='menuitem'>
            <a class="menutoggler">Chart</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyChart/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyChart/ColumnChart">Column Chart</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyChart/LineChart">Line Chart</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyChart/PieChart">Pie Chart</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyChart/DoughnutChart">Doughnut Chart</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyChart/BarChart">Bar Chart</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyChart/PolarAreaChart">Polar Area Chart</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyChart/MixedChartTypes">Mixed Chart Types</a></li>
            </ul>
        </li>

        <li class='menuitem'>
            <a class="menutoggler">Range Selection</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyRangeSelection/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyRangeSelection/DateRangeSelection">Date Range Selection</a></li>
            </ul>
        </li>


        <li class='menuitem'><a href="/Tutorials/SobyCalendarView/Getting Started">Calendar View</a></li>
        <li class='menuitem'><a href="/Tutorials/SobyCarousel/Getting Started">Carousel</a></li>
        <li class='menuitem'><a href="/Tutorials/SobyWizard/General">Wizard</a></li>
        <li class='menuitem'><a href="/Tutorials/SobyCheckBoxList/Getting Started">CheckBoxList</a></li>
        <li class='menuitem'>
            <a class="menutoggler">SelectBox</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobySelectBox/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobySelectBox/SearchOnDemand">Search On Demand</a></li>
                <li class='menuitem'><a href="/Tutorials/SobySelectBox/Getting Started">Static Data Binding</a></li>
            </ul>
        </li>
        <li class='menuitem'><a href="/Tutorials/SobyTabs/Getting Started">Tabs</a></li>


        <li class='menuitem'>
            <a class="menutoggler">Validation</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyValidator/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyValidator/FormValidation">Form Validation</a></li>
                <li class='menuitem'>
                    <a class="menutoggler">Value Validation</a>
                    <ul class="menu expand">
                        <li class='menuitem'><a href="/Tutorials/SobyValidator/ValueDateValidation">Date Validator</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyValidator/ValueEmailValidation">Email Validator</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyValidator/ValueExclusionValidation">Exclusion Validator</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyValidator/ValuePresenceValidation">Presence Validator</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyValidator/ValueNumericValidation">Numeric Validator</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyValidator/ValueTextValidation">Text Validator</a></li>
                        <li class='menuitem'><a href="/Tutorials/SobyValidator/ValueURLValidation">URL Validator</a></li>
                    </ul>

                </li>
            </ul>

        </li>


        <li class='menuitem'>
            <a class="menutoggler">Scheduler</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyScheduler/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyScheduler/Custom Dates">Custom Dates</a></li>
            </ul>
        </li>

        <li class='menuitem'>
            <a class="menutoggler">Code Editor</a>
            <ul class="menu expand">
                <li class='menuitem'><a href="/Tutorials/SobyCodeView/Getting Started">Getting Started</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyCodeView/CustomizedTemplate1">Vertical display</a></li>
                <li class='menuitem'><a href="/Tutorials/SobyCodeView/CustomizedTemplate2">Horizontal display</a></li>
            </ul>
        </li>

        <li class="divider"></li>
        <li class='menuitem'><a href="/Tutorials/Setting Up">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-code" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path>
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path></svg>
            Setting Up</a></li>
        <li class="divider"></li>
        <li class='menuitem'><a href="/download/versions">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
                <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"></path>
                <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"></path></svg>
            Download</a></li>
        <li class='menuitem'><a href="https://github.com/sobiens/webcomponents">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"></path></svg>
            Code Repository</a></li>
    </ul>
</div>
