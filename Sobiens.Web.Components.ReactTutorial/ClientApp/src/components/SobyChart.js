import React, { Component } from 'react';
import { config } from '../config';
import { SobyMainLibrary } from './SobyMainLibrary';

let sobyMainLibrary = new SobyMainLibrary();

export class SobyChart extends Component {
    constructor(props) {
        super(props);
        const jsCode = "$(function () { \n " +
            "     soby_PopulatePieChartRefreshData(); \n " +
            "    }); \n " +
            "function soby_PopulatePieChartRefreshData() { \n " +
            "     var dataSet = new soby_ChartDataset(); \n " +
            "     dataSet.Title = 'Chart1'; \n " +
                "     dataSet.Data = [14, 10, 17, 35, 50, 20]; \n " +
            "     var pieChart = new soby_PieChart('#soby_ChartDiv', 'Pie Chart', [dataSet], 'There is no record found.', ['January', 'February', 'March', 'April', 'May', 'June']); \n " +
                "     pieChart.Width = 600; \n " +
                "     pieChart.Height = 300; \n " +
                //"     pieChart.Initialize(); \n " +
            "}";
        const jsCode1 = "$(function () { \n " +
            "     $('#soby_ChartDiv').sobychart() \n " +
            "    }); \n " +
        sobyMainLibrary.IncludeChartLibrary(function () {
            sobyMainLibrary.IncludeJSSection('chartscript', jsCode1);
        });
    }

    componentDidUpdate(prevProps) {
    }
    componentDidMount() {
    }
    render(props) {
        return (<div id='soby_ChartDiv' >
            {this.props.children}
        </div>)
    }
}