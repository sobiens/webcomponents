<%@ Page Title="Getting Started" Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Getting Started.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyChart.GettingStarted" %>

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
    <div>
        <p>
            <strong>Soby Charts</strong> javaScript library contains many chart types such as column, line, pie, doughnut, bar and polar area. You can use these components to ease your development on transforming data into visual representation. 
            These library is available on the following javascript frameworks; javascript, jquery, vuejs, angularjs and react. Navigate through the demos and documentation to find out how you can use in your project.
            You can customize almost every visual property of this grid control.
        </p>
        <h3>Setting up your development environment</h3>
        <p>You can find the necessary information to set up your environment from <a href="/Tutorials/Setting Up.aspx">here</a>.</p>
        <h3>Chart Demos</h3>
        <p>
            <ul>
                <li><a href="/Tutorials/SobyChart/ColumnChart">Column Chart</a></li>
                <li><a href="/Tutorials/SobyChart/LineChart">Line Chart</a></li>
                <li><a href="/Tutorials/SobyChart/PieChart">Pie Chart</a></li>
                <li><a href="/Tutorials/SobyChart/DoughnutChart">Doughnut Chart</a></li>
                <li><a href="/Tutorials/SobyChart/BarChart">Bar Chart</a></li>
                <li><a href="/Tutorials/SobyChart/PolarAreaChart">Polar Area Chart</a></li>
                <li><a href="/Tutorials/SobyChart/MixedChartTypes">Mixed Chart Types</a></li>
</ul>
        </p>
    </div>

</asp:Content>
