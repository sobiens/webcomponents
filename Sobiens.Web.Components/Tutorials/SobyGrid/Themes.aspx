<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Themes.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.Themes" Title="Grid Themes Example" %>

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
    <script language="javascript">
        function soby_ChangeTheme(themeName) {
            for (var t in soby_WebGrids) {
                soby_WebGrids[t].ChangeTheme(themeName);
            }
        }
    </script>

    <div class="article" style="float: left;width: 74%;">
        <p style="color:orange;font-size: 18px;">
            <div class="row">
                <div class="col-md-2"><div style="background-color:#0072c6;width:50%;margin-left: auto ;margin-right: auto ;cursor: pointer;" onclick="soby_ChangeTheme('classic')">&nbsp;</div></div>
                <div class="col-md-2"><div style="background-color:#e9ebf2;width:50%;margin-left: auto ;margin-right: auto ;cursor: pointer;" onclick="soby_ChangeTheme('snow')">&nbsp;</div></div>
                <div class="col-md-2"><div style="background-color:#fcb796;width:50%;margin-left: auto ;margin-right: auto ;cursor: pointer;" onclick="soby_ChangeTheme('sunrise')">&nbsp;</div></div>
                <div class="col-md-2"><div style="background-color:#7bc833;width:50%;margin-left: auto ;margin-right: auto ;cursor: pointer;" onclick="soby_ChangeTheme('forest')">&nbsp;</div></div>
                <div class="col-md-2"><div style="background-color:#b20064;width:50%;margin-left: auto ;margin-right: auto ;cursor: pointer;" onclick="soby_ChangeTheme('raspberry')">&nbsp;</div></div>
                <div class="col-md-2"><div style="background-color:#fffadc;width:50%;margin-left: auto ;margin-right: auto ;cursor: pointer;" onclick="soby_ChangeTheme('autumn')">&nbsp;</div></div>
            </div>
            <div class="row">
                <div class="col-md-2" style="text-align:center">Classic</div>
                <div class="col-md-2" style="text-align:center">Snow</div>
                <div class="col-md-2" style="text-align:center">Sunrise</div>
                <div class="col-md-2" style="text-align:center">Forest</div>
                <div class="col-md-2" style="text-align:center">Raspberry</div>
                <div class="col-md-2" style="text-align:center">Autumn</div>
            </div></p>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.spservice.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Grid/themes.js"></script>
            <div id='soby_BooksDiv'></div><br />
        <p>Grid theme can be set either from defined themes or custom themes.</p>
        <p>To set a defined theme, you can use the following syntax to change theme. All defined themes listed on the top of the page.</p>
        <pre class="viewsource html" style="background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">language</span>=<span class="attr_value">"javascript"</span><span class="tag_start">&gt;</span>
    grid.ChangeTheme('forest')
<span class="tag_start">&lt;/script&gt;</span>
        </pre>
        <p>
            Custom theme can be defined as below.<br />
            First you should find a name for your theme. Lets say "sky". You need to modify the following css with your color scheme and css attributes then include it into your page.
            </p>
        <pre id="ViewSourceDiv" class="viewsource css" style="background-color:ivory">
    <span class="code_comment">/**************** Sky Theme **************/</span>
    <span class="class_name">.soby_grid.sky.active</span>{<span class="attr_name">border</span>:<span class="attr_value">solid 1px blue</span> } 
    <span class="class_name">.soby_grid.sky .soby_griddatarow.alt</span> {  } 
    <span class="class_name">.soby_grid.sky .soby_griddatarow.selected</span> { <span class="attr_name">background-color</span>: <span class="attr_value">#4666a6</span>; <span class="attr_name">color</span>:<span class="attr_value">white</span>;}
    <span class="class_name">.soby_grid.sky tbody</span> { <span class="attr_name">border</span>: <span class="attr_value">1px solid #2d4d7c</span>; }
    <span class="class_name">.soby_grid.sky .soby_gridcell, .soby_grid.sky .soby_selectitemcell</span> {    <span class="attr_name">overflow</span>: <span class="attr_value">hidden</span>;    <span class="attr_name">border-bottom</span>: <span class="attr_value">1px solid #2d4d7c</span>;    <span class="attr_name">border-right</span>: <span class="attr_value">1px solid #2d4d7c</span>;    <span class="attr_name">border-top-width</span>: <span class="attr_value">0</span>;    <span class="attr_name">border-left-width</span>: <span class="attr_value">0</span>;    <span class="attr_name">padding</span>: <span class="attr_value">3px 6px</span>;}
    <span class="class_name">.soby_grid.sky .soby_gridcell.selected</span> { <span class="attr_name">background-color</span>: <span class="attr_value">#89abd9</span>; <span class="attr_name">color</span>:<span class="attr_value">white</span>;} 
    <span class="class_name">.soby_grid.sky .soby_tabletitle</span> { <span class="attr_name">color</span>:<span class="attr_value">#89abd9</span>; } 
    <span class="class_name">.soby_grid.sky .soby_tabheader</span> { <span class="attr_name">background-color</span>:<span class="attr_value">#89abd9</span>;<span class="attr_name">border</span>:<span class="attr_value">1px solid #aaaaaa</span>; } 
    <span class="class_name">.soby_grid.sky .soby_tabheader.active</span> {<span class="attr_name">background-color</span>:<span class="attr_value">white</span>;} 
    <span class="class_name">.soby_grid.sky .soby_gridheadercell:hover, .soby_grid.sky .soby_gridheadercell:hover a</span> { <span class="attr_name">background-color</span>:<span class="attr_value">#ba7284</span>; }
    <span class="class_name">.soby_grid.sky .soby_tabcontent</span> {<span class="attr_name">border</span>:<span class="attr_value">1px solid #aaaaaa</span>;} 
    <span class="class_name">.soby_grid.sky .soby-itmHoverEnabled:hover</span> { <span class="attr_name">background-color</span>:<span class="attr_value">#fcb796</span>;}
    <span class="class_name">.soby_grid.sky .soby_griddatarow.selected .soby-itmHoverEnabled:hover</span> { <span class="attr_name">background-color</span>:<span class="attr_value">#2d4d7c</span>; }
    <span class="class_name">.soby_grid.sky .soby_griddatarow.selected .soby_selectitemcell, .soby_grid.sky .soby_gridheadercell</span> { <span class="attr_name">background-color</span>:<span class="attr_value">#fcb796</span>;}
    <span class="class_name">.soby_grid.sky .soby_gridheaderlink</span> { <span class="attr_name">color</span>:<span class="attr_value">white</span>;}
    <span class="class_name">.sobygridmenu.sky</span>{<span class="attr_name">position</span>:<span class="attr_value">absolute</span>;<span class="attr_name">display</span>:<span class="attr_value">none</span>;<span class="attr_name">background-color</span>: <span class="attr_value">white</span>;<span class="attr_name">border</span>: <span class="attr_value">1px solid</span>;<span class="attr_name">padding</span>:<span class="attr_value">10px</span>;}
    <span class="class_name">.sobyitemdialog.sky</span> { <span class="attr_name">position</span>:<span class="attr_value">absolute</span>;<span class="attr_name">display</span>:<span class="attr_value">none</span>;<span class="attr_name">background-color</span>: <span class="attr_value">white</span>;<span class="attr_name">border</span>: <span class="attr_value">1px solid</span>;<span class="attr_name">padding</span>:<span class="attr_value">10px</span>;}
    <span class="code_comment">/*********************************************/</span>
        </pre>
            <p>Now use the following code to set your grid theme</p>
        <pre class="viewsource html" style="background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">language</span>=<span class="attr_value">"javascript"</span><span class="tag_start">&gt;</span>
    grid.ChangeTheme('sky')
<span class="tag_start">&lt;/script&gt;</span>
        </pre>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
