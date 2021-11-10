<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PieChart-Vue.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyChart.PieChartVue" Title="Pie Chart" %>

<%@ Register Src="~/Controls/SobyChartSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyChartSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %></h1>
                <br />
                <h2>Pie Chart JQuery Example</h2>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
        <div class="article" style="float: left; width: 74%;">
            <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
                                <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
                                <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
                                <script src="/media/js/soby.service.js"></script>
                                <script src="/media/js/soby.ui.components.js"></script>
                                <script src="/media/js/soby.ui.components.charts.js"></script>
                                <script src="/media/js/soby.ui.components.charts.jquery.js"></script>
            <script src="/media/js/soby.ui.components.charts.vue.js"></script>
            <script language="javascript">
                Vue.component('blog-post', {
                    props: ['title'],
                    template: '<h3>{{ title }}</h3>'
                })



            Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
            </script>

<div id="components-demo">
  <soby-chart id="soby_ChartDiv" width="600" height="300">
      <dataset type="PieChart" title="Chart1" data="14;#10;#17;#35;#50;#20"></dataset>
      <labels labels="January;#February;#March;#April;#May;#June"></labels>
  </soby-chart>
</div>
            <script language="javascript">
                new Vue({ el: '#components-demo' })
            </script>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/modules.html">API documentation</a>.
        </div>
    </div>
    <div class="col-md-3">
        <uc1:SobyChartSideMenuControl runat="server" ID="SobyChartSideMenuControl" />
    </div>
</asp:Content>
