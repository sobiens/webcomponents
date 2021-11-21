// VERSION 1.0.8.1
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ********************* ITEM SELECTION *****************************
var sobyCharts = new Array();
var SobyChartCalculatedValues = /** @class */ (function () {
    function SobyChartCalculatedValues(chart) {
        this.Chart = null;
        this.ValueLabelCount = 10;
        this.VerticalAxisLabelHeight = 0;
        this.VerticalAxisTitleWidth = 30;
        this.HorizontalAxisLabelWidth = 0;
        this.HorizontalAxisLabelHeight = 30;
        this.HorizontalAxisTitleHeight = 30;
        this.VerticalAxisLabelWidth = 50;
        this.VerticalAxisLabelPieceValue = 0;
        this.HorizontalAxisLabelPieceValue = 0;
        this.Padding = 20;
        this.PlotAreaWidth = 0;
        this.PlotAreaHeight = 0;
        this.LegendPanelWidth = 0;
        this.LegendPanelHeight = 0;
        this.MaxValue = null;
        this.MinValue = null;
        this.TotalValue = null;
        this.VerticalAxisLabelXStartPoint = 10;
        this.VerticalAxisLabelYStartPoint = 30;
        this.HorizontalAxisLabelXStartPoint = this.VerticalAxisLabelXStartPoint + 50;
        this.HorizontalAxisLabelYStartPoint = 10;
        this.VerticalAxisTitleXStartPoint = 0;
        this.VerticalAxisTitleYStartPoint = 0;
        this.HorizontalAxisTitleXStartPoint = 0;
        this.HorizontalAxisTitleYStartPoint = 0;
        this.xPlotAreaStartPixel = 30;
        this.yPlotAreaStartPixel = 30;
        this.Chart = chart;
    }
    SobyChartCalculatedValues.prototype.Calculate = function () {
        this.VerticalAxisLabelXStartPoint = 10;
        this.VerticalAxisLabelYStartPoint = 30;
        this.HorizontalAxisLabelXStartPoint = this.VerticalAxisLabelXStartPoint + 50;
        this.HorizontalAxisLabelYStartPoint = 10;
        this.xPlotAreaStartPixel = 30;
        this.yPlotAreaStartPixel = 30;
        if (this.Chart.Legend.Position === SobyChartElementPosition.Top
            || this.Chart.Legend.Position === SobyChartElementPosition.Bottom) {
            this.LegendPanelWidth = this.Chart.Width;
            this.LegendPanelHeight = 30;
        }
        if (this.Chart.Legend.Position === SobyChartElementPosition.Left
            || this.Chart.Legend.Position === SobyChartElementPosition.Right) {
            this.LegendPanelWidth = 70;
            this.LegendPanelHeight = this.Chart.Height;
        }
        this.MinValue = null;
        this.MaxValue = 0;
        this.TotalValue = 0;
        for (var x = 0; x < this.Chart.Datasets.length; x++) {
            for (var i = 0; i < this.Chart.Datasets[x].Data.length; i++) {
                var value = this.Chart.Datasets[x].Data[i];
                this.TotalValue += value;
                if (value > this.MaxValue)
                    this.MaxValue = value;
                if (this.MinValue === null || value < this.MinValue)
                    this.MinValue = value;
            }
        }
        this.yPlotAreaStartPixel = this.Chart.Height - this.Padding - this.HorizontalAxisLabelHeight;
        this.xPlotAreaStartPixel = this.Padding + this.VerticalAxisLabelWidth;
        this.HorizontalAxisLabelYStartPoint = this.Chart.Height - 20;
        if (this.Chart.Legend.Position === SobyChartElementPosition.Bottom) {
            this.yPlotAreaStartPixel -= this.LegendPanelHeight;
            this.HorizontalAxisLabelYStartPoint -= this.LegendPanelHeight;
        }
        else if (this.Chart.Legend.Position === SobyChartElementPosition.Left) {
            this.xPlotAreaStartPixel += this.LegendPanelWidth;
            this.VerticalAxisLabelXStartPoint += this.LegendPanelWidth;
        }
        if (this.Chart.HorizontalAxisSettings.Title !== null && this.Chart.HorizontalAxisSettings.Title !== "") {
            this.yPlotAreaStartPixel -= this.HorizontalAxisTitleHeight;
            this.HorizontalAxisLabelYStartPoint -= this.HorizontalAxisTitleHeight;
        }
        if (this.Chart.VerticalAxisSettings.Title !== null && this.Chart.VerticalAxisSettings.Title !== "") {
            this.xPlotAreaStartPixel += this.VerticalAxisTitleWidth;
            this.VerticalAxisLabelXStartPoint += this.VerticalAxisTitleWidth;
        }
        this.PlotAreaWidth = this.Chart.Width - this.Padding - this.xPlotAreaStartPixel;
        this.PlotAreaHeight = this.yPlotAreaStartPixel - this.Padding;
        if (this.Chart.Legend.Position === SobyChartElementPosition.Bottom) {
            this.PlotAreaHeight -= this.LegendPanelHeight;
        }
        else if (this.Chart.Legend.Position === SobyChartElementPosition.Top) {
            this.PlotAreaHeight -= this.LegendPanelHeight;
        }
        else if (this.Chart.Legend.Position === SobyChartElementPosition.Left) {
            this.PlotAreaWidth -= this.LegendPanelWidth;
        }
        else if (this.Chart.Legend.Position === SobyChartElementPosition.Right) {
            this.PlotAreaWidth -= this.LegendPanelWidth;
        }
        if (this.Chart.Label.LabelPosition === SobyChartElementPosition.Bottom) {
            this.VerticalAxisLabelHeight = (this.PlotAreaHeight) / (this.ValueLabelCount + 1);
            this.HorizontalAxisLabelWidth = (this.PlotAreaWidth) / this.Chart.Label.Labels.length;
            this.VerticalAxisLabelPieceValue = this.MaxValue / this.ValueLabelCount;
            this.HorizontalAxisLabelPieceValue = 1;
        }
        else {
            this.VerticalAxisLabelHeight = this.PlotAreaHeight / this.Chart.Label.Labels.length;
            this.HorizontalAxisLabelWidth = this.PlotAreaHeight / (this.ValueLabelCount + 1);
            this.VerticalAxisLabelPieceValue = 1;
            this.HorizontalAxisLabelPieceValue = this.MaxValue / this.ValueLabelCount;
        }
    };
    return SobyChartCalculatedValues;
}());
var SobyAxisSettings = /** @class */ (function () {
    function SobyAxisSettings() {
        this.Title = null;
        this.TitleFont = "10px Arial";
        this.TitleColour = "#000000";
        this.LabelFont = "10px Arial";
        this.LabelColour = "#000000";
    }
    return SobyAxisSettings;
}());
var SobyPlotAreaSettings = /** @class */ (function () {
    function SobyPlotAreaSettings() {
        this.Colour = "#000000";
        //Colour = "#0d6efd";
        this.LineWidth = 0.2;
    }
    return SobyPlotAreaSettings;
}());
var SobyTitleSettings = /** @class */ (function () {
    function SobyTitleSettings() {
        this.Title = "";
        this.Font = "10px Arial";
        this.Colour = "#000000";
    }
    return SobyTitleSettings;
}());
var SobyLabelSettings = /** @class */ (function () {
    function SobyLabelSettings() {
        this.LabelPosition = SobyChartElementPosition.Bottom;
        this.Colours = ["#4472c4", "#ed7d31", "#ffce3a", "#a5a5a5", "#5b9bd5", "#70ad47"];
        this.Font = "10px Arial";
        this.DialogTextColour = "#000000";
        // $label - $value - $percentage
        this.Format = "$label";
    }
    return SobyLabelSettings;
}());
var SobyChart = /** @class */ (function () {
    function SobyChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        this.ChartID = "";
        this.ChartTooltipID = "";
        this.ChartClassName = "";
        this.ContentDivSelector = "";
        this.Title = null;
        this.Height = 100;
        this.Width = 200;
        this.Datasets = null;
        this.EmptyDataHtml = "";
        this.Type = null;
        this.Legend = null;
        this.Label = new SobyLabelSettings();
        this.PlotAreaSettings = new SobyPlotAreaSettings();
        this.VerticalAxisSettings = new SobyAxisSettings();
        this.HorizontalAxisSettings = new SobyAxisSettings();
        this.ChartParts = new Array();
        this.CalculatedValues = new SobyChartCalculatedValues(this);
        this.MouseOverDotIndex = null;
        this.OnSelectionChanged = null;
        this.OnClick = null;
        this.ChartID = "soby_chart_" + soby_guid();
        this.ChartTooltipID = this.ChartID + "_tip";
        this.Type = datasets[0].Type;
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.Label.Labels = labels;
        this.Datasets = datasets;
        this.EmptyDataHtml = emptyDataHtml;
        this.EnsureItemSelectionExistency();
        this.VerticalAxisSettings.TitleFont = "bold 12px Arial";
        this.Legend = new SobyLegendPanel(this, labels, this.Label.Colours);
        if (this.Type === SobyChartTypes.LineChart) {
            this.ChartClassName = "soby_linechart";
        }
        else if (this.Type === SobyChartTypes.BarChart) {
            this.ChartClassName = "soby_barchart";
        }
        else if (this.Type === SobyChartTypes.ColumnChart) {
            this.ChartClassName = "soby_columnchart";
        }
        else if (this.Type === SobyChartTypes.PieChart) {
            this.ChartClassName = "soby_piechart";
        }
        else if (this.Type === SobyChartTypes.RadarChart) {
            this.ChartClassName = "soby_radarchart";
        }
        else if (this.Type === SobyChartTypes.PolarAreaChart) {
            this.ChartClassName = "soby_polarareachart";
        }
        else if (this.Type === SobyChartTypes.DoughnutChart) {
            this.ChartClassName = "soby_doughnutchart";
        }
        for (var i = 0; i < this.Datasets.length; i++) {
            this.ChartParts.push(sobyChartPartFactory.GetChartPart(this, this.Datasets[i]));
            this.Datasets[i].Colour = this.Label.Colours[i];
            this.Datasets[i].Index = i;
        }
    }
    SobyChart.prototype.GetContext = function () {
        return eval("document.getElementById('" + this.ChartID + "').getContext('2d');");
    };
    SobyChart.prototype.GetCanvas = function () {
        return eval("document.getElementById('" + this.ChartID + "');");
    };
    /*
    GetTooltipContext() {
        return eval("document.getElementById('" + this.ChartTooltipID + "').getContext('2d');");
    }
    */
    SobyChart.prototype.GetTooltipContainer = function () {
        return eval("document.getElementById('" + this.ChartTooltipID + "');");
    };
    SobyChart.prototype.EnsureItemSelectionExistency = function () {
        for (var key in sobyCharts) {
            if (key === this.ChartID) {
                return;
            }
        }
        sobyCharts[this.ChartID] = this;
    };
    SobyChart.prototype.RenderTooltip = function (tooltipContainer, dataItem, x, y) {
        tooltipContainer.style.border = "5px solid black";
        tooltipContainer.style.borderRadius = "10px";
        tooltipContainer.style.width = "125px";
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //chart.RoundedRect(0, 0, canvas.width, canvas.height, "black", 10);
        var rootContainer = $("<div></div>");
        var container = $("<div style='color:white;background-color: black;padding:5px;font-size:12px;font-family: \"Segoe UI\", \"Segoe UI Web(West European)\", \"Segoe UI\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif;'></div>");
        container.append(dataItem.Label);
        container.append("<br>");
        container.append("<div style='background-color: " + dataItem.Colour + ";width: 25px;float: left;'>&nbsp;</div>&nbsp;");
        container.append(dataItem.DatasetTitle + ": " + dataItem.Value);
        rootContainer.append(container);
        tooltipContainer.innerHTML = rootContainer.html();
    };
    SobyChart.prototype.TransformLightenDarkenColor = function (col, amt) {
        var usePound = false;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        if (r > 255) {
            r = 255;
        }
        else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) {
            b = 255;
        }
        else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000FF) + amt;
        if (g > 255) {
            g = 255;
        }
        else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    };
    SobyChart.prototype.RestoreDotColours = function () {
        for (var i = 0; i < this.ChartParts.length; i++) {
            this.ChartParts[i].RestoreDotColours();
        }
    };
    SobyChart.prototype.HandleMouseMove = function (e) {
        var chart = sobyCharts[eval("e.target.id")];
        //const ctx1 = chart.GetContext();
        //const ctx = chart.GetTooltipContext();
        var tooltipContainer = chart.GetTooltipContainer();
        var canvasOffset = $("#" + chart.ChartID).offset();
        var tooltipOffsetX = canvasOffset.left - $(window).scrollLeft();
        var tooltipOffsetY = canvasOffset.top - $(window).scrollTop();
        var mouseX = e.clientX - tooltipOffsetX;
        var mouseY = e.clientY - tooltipOffsetY;
        //for (let i = 0; i < chart.ChartParts.length; i++) {
        //    chart.ChartParts[i].RestoreDotColours();
        //}
        for (var i = 0; i < chart.ChartParts.length; i++) {
            if (chart.ChartParts[i].HandleMouseMove(mouseX, mouseY) === true) {
                return;
            }
        }
        //chart.RestoreDotColours();
        //chart.MouseOverDotIndex = null;
        tooltipContainer.style.display = "none";
    };
    SobyChart.prototype.RoundedRect = function (x, y, width, height, color, radius) {
        var ctx = this.GetTooltipContainer();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineJoin = "round";
        ctx.lineWidth = radius;
        ctx.strokeRect(x + (radius * .5), y + (radius * .5), width - radius, height - radius);
        ctx.fillRect(x + (radius * .5), y + (radius * .5), width - radius, height - radius);
        ctx.stroke();
        ctx.fill();
    };
    SobyChart.prototype.Initialize = function () {
        $(this.ContentDivSelector).addClass("soby_chart");
        $(this.ContentDivSelector).addClass(this.ChartClassName);
        this.PopulateItems();
        this.DrawPane();
        for (var i = 0; i < this.ChartParts.length; i++) {
            this.ChartParts[i].PopulateItems();
        }
    };
    SobyChart.prototype.PopulateItems = function () {
        var canvas = $("<canvas id='" + this.ChartID + "' width='" + this.Width + "' height='" + this.Height + "' style='border: 1px solid;'></canvas>");
        var tooltipCanvas = $("<div id='" + this.ChartTooltipID + "' width='120' height='40' style='position: absolute;'></div>");
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(canvas);
        $(this.ContentDivSelector).append(tooltipCanvas);
        document.getElementById(this.ChartID).addEventListener('mousemove', this.HandleMouseMove);
    };
    SobyChart.prototype.ClickNode = function (treeViewItemId) {
        if (this.OnClick !== null) {
            this.OnClick(this.ChartID, treeViewItemId);
        }
    };
    SobyChart.prototype.CalculateValues = function () {
        this.CalculatedValues.Calculate();
    };
    SobyChart.prototype.DrawPane = function () {
        this.CalculateValues();
        var ctx = this.GetContext();
        ctx.fillStyle = this.Label.Colours[0];
        if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart || this.Type === SobyChartTypes.DoughnutChart) {
        }
        else {
            if (this.Label.LabelPosition === SobyChartElementPosition.Bottom) {
                for (var i = 0; i < this.Label.Labels.length; i++) {
                    var xPoint_1 = i * this.CalculatedValues.HorizontalAxisLabelWidth + this.CalculatedValues.xPlotAreaStartPixel;
                    ctx.font = this.HorizontalAxisSettings.LabelFont;
                    ctx.strokeStyle = this.HorizontalAxisSettings.LabelColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.Label.Labels[i], xPoint_1, this.CalculatedValues.HorizontalAxisLabelYStartPoint);
                    ctx.beginPath();
                    ctx.strokeStyle = this.PlotAreaSettings.Colour;
                    ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                    ctx.moveTo(xPoint_1, this.getYPixel(0));
                    ctx.lineTo(xPoint_1, this.getYPixel(this.CalculatedValues.MaxValue));
                    ctx.stroke();
                }
                var xPoint = (this.Label.Labels.length) * this.CalculatedValues.HorizontalAxisLabelWidth + this.CalculatedValues.xPlotAreaStartPixel;
                if (this.HorizontalAxisSettings.Title !== null && this.HorizontalAxisSettings.Title !== "") {
                    ctx.font = this.HorizontalAxisSettings.TitleFont;
                    ctx.strokeStyle = this.HorizontalAxisSettings.TitleColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.HorizontalAxisSettings.Title, xPoint, this.CalculatedValues.HorizontalAxisLabelYStartPoint);
                }
                ctx.beginPath();
                ctx.strokeStyle = this.PlotAreaSettings.Colour;
                ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                ctx.moveTo(xPoint, this.getYPixel(0));
                ctx.lineTo(xPoint, this.getYPixel(this.CalculatedValues.MaxValue));
                ctx.stroke();
                for (var i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    var yPoint = this.getYPixel(i * this.CalculatedValues.VerticalAxisLabelPieceValue);
                    ctx.font = this.VerticalAxisSettings.LabelFont;
                    ctx.strokeStyle = this.VerticalAxisSettings.LabelColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(i * this.CalculatedValues.VerticalAxisLabelPieceValue, this.CalculatedValues.VerticalAxisLabelXStartPoint, yPoint);
                    ctx.beginPath();
                    ctx.strokeStyle = this.PlotAreaSettings.Colour;
                    ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                    ctx.moveTo(this.CalculatedValues.xPlotAreaStartPixel, yPoint);
                    ctx.lineTo(xPoint, yPoint); //this.Width - this.CalculatedValues.xPlotAreaStartPixel - this.CalculatedValues.Padding
                    ctx.stroke();
                }
            }
            else {
                for (var i = 0; i < this.Label.Labels.length; i++) {
                    var yPoint = this.getYPixel(i);
                    var xPoint = this.CalculatedValues.VerticalAxisLabelXStartPoint;
                    ctx.font = this.VerticalAxisSettings.LabelFont;
                    ctx.strokeStyle = this.VerticalAxisSettings.LabelColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.Label.Labels[i], xPoint, yPoint);
                    ctx.strokeStyle = this.PlotAreaSettings.Colour;
                    ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                    ctx.beginPath();
                    ctx.moveTo(this.CalculatedValues.xPlotAreaStartPixel, yPoint);
                    ctx.lineTo(this.CalculatedValues.xPlotAreaStartPixel + this.CalculatedValues.PlotAreaWidth, yPoint);
                    ctx.stroke();
                }
                var yPoint1 = this.getYPixel(this.Label.Labels.length);
                if (this.HorizontalAxisSettings.Title !== null && this.HorizontalAxisSettings.Title !== "") {
                    ctx.font = this.HorizontalAxisSettings.TitleFont;
                    ctx.strokeStyle = this.HorizontalAxisSettings.TitleColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.HorizontalAxisSettings.Title, this.CalculatedValues.xPlotAreaStartPixel, this.CalculatedValues.yPlotAreaStartPixel + this.CalculatedValues.HorizontalAxisLabelHeight + this.CalculatedValues.HorizontalAxisTitleHeight);
                }
                if (this.VerticalAxisSettings.Title !== null && this.VerticalAxisSettings.Title !== "") {
                    ctx.save();
                    var titleWidth = ctx.measureText(this.VerticalAxisSettings.Title).width;
                    var radianAngle = Math.PI / 2;
                    var endingX = this.CalculatedValues.VerticalAxisTitleXStartPoint + 20;
                    var centerY = this.CalculatedValues.yPlotAreaStartPixel - 100;
                    ctx.translate(endingX, centerY);
                    ctx.rotate(-radianAngle);
                    ctx.textBaseline = 'middle';
                    ctx.font = this.VerticalAxisSettings.TitleFont;
                    ctx.strokeStyle = this.VerticalAxisSettings.TitleColour;
                    ctx.fillStyle = this.VerticalAxisSettings.TitleColour;
                    ctx.lineWidth = 1;
                    ctx.fillText(this.VerticalAxisSettings.Title, -titleWidth, 0);
                    //.strokeText(this.VerticalAxisSettings.Title, ,);
                    ctx.restore();
                }
                ctx.strokeStyle = this.PlotAreaSettings.Colour;
                ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                ctx.beginPath();
                ctx.moveTo(this.CalculatedValues.xPlotAreaStartPixel, yPoint1);
                ctx.lineTo(this.CalculatedValues.xPlotAreaStartPixel + this.CalculatedValues.PlotAreaWidth, yPoint1);
                ctx.stroke();
                for (var i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    var yPoint = this.CalculatedValues.yPlotAreaStartPixel + this.CalculatedValues.VerticalAxisLabelHeight;
                    var xPoint = this.getXPixel(i * this.CalculatedValues.HorizontalAxisLabelPieceValue);
                    ctx.font = this.HorizontalAxisSettings.LabelFont;
                    ctx.strokeStyle = this.HorizontalAxisSettings.LabelColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(i * this.CalculatedValues.HorizontalAxisLabelPieceValue, xPoint, yPoint);
                    ctx.strokeStyle = this.PlotAreaSettings.Colour;
                    ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                    ctx.beginPath();
                    ctx.moveTo(xPoint, this.CalculatedValues.yPlotAreaStartPixel);
                    ctx.lineTo(xPoint, this.CalculatedValues.yPlotAreaStartPixel - this.CalculatedValues.PlotAreaHeight);
                    ctx.stroke();
                }
            }
        }
        if (this.Legend.Position !== SobyChartElementPosition.Hidden) {
            var titles = new Array();
            if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart || this.Type === SobyChartTypes.DoughnutChart) {
                for (var x = 0; x < this.Label.Labels.length; x++) {
                    titles.push(this.Label.Labels[x]);
                }
            }
            else {
                for (var x = 0; x < this.Datasets.length; x++) {
                    titles.push(this.Datasets[x].Title);
                }
            }
            var titleAligment = SobyChartAligment.Horizontally;
            if (this.Legend.Position === SobyChartElementPosition.Left || this.Legend.Position === SobyChartElementPosition.Right) {
                titleAligment = SobyChartAligment.Vertically;
            }
            var legendPanelX = 10;
            var legendPanelY = 10;
            if (this.Legend.Position === SobyChartElementPosition.Bottom) {
                legendPanelY = this.Height - 30;
            }
            if (this.Legend.Position === SobyChartElementPosition.Right) {
                legendPanelX = this.Width - 70;
            }
            this.Legend.Height = this.CalculatedValues.LegendPanelHeight;
            this.Legend.Width = this.CalculatedValues.LegendPanelWidth;
            this.Legend.X = legendPanelX;
            this.Legend.Y = legendPanelY;
            this.Legend.Paint();
        }
    };
    SobyChart.prototype.getXPixel = function (val) {
        var maxValue = this.CalculatedValues.MaxValue;
        if (this.Label.LabelPosition === SobyChartElementPosition.Bottom)
            maxValue = this.Label.Labels.length + 1;
        return this.CalculatedValues.xPlotAreaStartPixel + ((this.CalculatedValues.PlotAreaWidth / maxValue) * val);
    };
    SobyChart.prototype.getYPixel = function (val) {
        var maxValue = this.CalculatedValues.MaxValue;
        if (this.Label.LabelPosition === SobyChartElementPosition.Left)
            maxValue = this.Label.Labels.length;
        return this.CalculatedValues.yPlotAreaStartPixel - ((this.CalculatedValues.PlotAreaHeight / maxValue) * val);
    };
    return SobyChart;
}());
var SobyChartPartFactory = /** @class */ (function () {
    function SobyChartPartFactory() {
    }
    SobyChartPartFactory.prototype.GetChartPart = function (chart, dataset) {
        var chartPart = null;
        if (dataset.Type === SobyChartTypes.BarChart) {
            chartPart = new SobyBarChartPart(chart, dataset);
        }
        else if (dataset.Type === SobyChartTypes.ColumnChart) {
            chartPart = new SobyColumnChartPart(chart, dataset);
        }
        else if (dataset.Type === SobyChartTypes.DoughnutChart) {
            chartPart = new SobyDoughnutChartPart(chart, dataset);
        }
        else if (dataset.Type === SobyChartTypes.LineChart) {
            chartPart = new SobyLineChartPart(chart, dataset);
        }
        else if (dataset.Type === SobyChartTypes.PieChart) {
            chartPart = new SobyPieChartPart(chart, dataset);
        }
        else if (dataset.Type === SobyChartTypes.PolarAreaChart) {
            chartPart = new SobyPolarAreaChartPart(chart, dataset);
        }
        else if (dataset.Type === SobyChartTypes.RadarChart) {
            chartPart = new SobyRadarChartPart(chart, dataset);
        }
        return chartPart;
    };
    return SobyChartPartFactory;
}());
var SobyChartPart = /** @class */ (function () {
    //MouseOverDotIndex: number = null;
    function SobyChartPart(chart, dataset) {
        this.Type = null;
        this.Dots = null;
        this.Chart = chart;
        this.Dataset = dataset;
        this.Dots = new Array();
    }
    SobyChartPart.prototype.GetContext = function () {
        return this.Chart.GetContext();
    };
    SobyChartPart.prototype.GetCalculatedValues = function () {
        return this.Chart.CalculatedValues;
    };
    SobyChartPart.prototype.RestoreDotColours = function () {
        //this.MouseOverDotIndex = null;
        for (var i = 0; i < this.Dots.length; i++) {
            var dot = this.Dots[i];
            if (dot.CurrentColour !== dot.Colour) {
                dot.CurrentColour = dot.Colour;
                var ctx1 = this.GetContext();
                if (this.Chart.Type === SobyChartTypes.DoughnutChart) {
                    ctx1.lineWidth = 2 * dot.r / 5;
                    ctx1.strokeStyle = dot.Colour;
                    ctx1.stroke(dot.Path2D);
                }
                else if (this.Chart.Type === SobyChartTypes.LineChart) {
                    ctx1.lineWidth = dot.r;
                    ctx1.strokeStyle = dot.Colour;
                    ctx1.stroke(dot.Path2D);
                }
                else {
                    ctx1.fillStyle = dot.Colour;
                    ctx1.fill(dot.Path2D);
                }
            }
        }
    };
    SobyChartPart.prototype.SetMouseOverColour = function (mouseOverDotDatasetIndex, mouseOverDotIndex) {
        this.Chart.MouseOverDotIndex = [mouseOverDotDatasetIndex, mouseOverDotIndex];
        var dot = this.Dots[mouseOverDotIndex];
        dot.CurrentColour = this.Chart.TransformLightenDarkenColor(dot.Colour, 30);
        var ctx1 = this.GetContext();
        if (this.Chart.Type === SobyChartTypes.DoughnutChart) {
            ctx1.lineWidth = 2 * dot.r / 5;
            ctx1.strokeStyle = dot.CurrentColour;
            ctx1.stroke(dot.Path2D);
        }
        else if (this.Chart.Type === SobyChartTypes.LineChart) {
            ctx1.lineWidth = dot.r;
            ctx1.strokeStyle = dot.CurrentColour;
            ctx1.stroke(dot.Path2D);
        }
        else {
            ctx1.fillStyle = dot.CurrentColour;
            ctx1.fill(dot.Path2D);
        }
    };
    SobyChartPart.prototype.CheckMouseHit = function (mouseX, mouseY, dot) {
        var ctx = this.GetContext();
        if (this.Type === SobyChartTypes.LineChart) {
            return ctx.isPointInStroke(dot.Path2D, mouseX, mouseY);
        }
        else {
            return ctx.isPointInPath(dot.Path2D, mouseX, mouseY);
        }
    };
    SobyChartPart.prototype.HandleMouseMove = function (mouseX, mouseY) {
        //var chart = sobyCharts[eval("e.target.id")];
        //const ctx1 = chart.GetContext();
        //const ctx = chart.GetTooltipContext();
        var tooltipContainer = this.Chart.GetTooltipContainer();
        //var canvasOffset = $("#" + chart.ChartID).offset();
        //var tooltipOffsetX = canvasOffset.left - $(window).scrollLeft();
        //var tooltipOffsetY = canvasOffset.top - $(window).scrollTop();
        //var mouseX = e.clientX - tooltipOffsetX;
        //var mouseY = e.clientY - tooltipOffsetY;
        for (var i = 0; i < this.Dots.length; i++) {
            var dot = this.Dots[i];
            if (this.CheckMouseHit(mouseX, mouseY, dot) === true) {
                if (this.Chart.MouseOverDotIndex !== null && this.Dataset.Index === this.Chart.MouseOverDotIndex[0] && this.Chart.MouseOverDotIndex[1] === i)
                    return true;
                this.RestoreDotColours();
                this.SetMouseOverColour(this.Dataset.Index, i);
                tooltipContainer.style.left = (mouseX + 5) + "px";
                tooltipContainer.style.top = (mouseY - 60) + "px";
                this.Chart.RenderTooltip(tooltipContainer, dot, mouseX, mouseY);
                tooltipContainer.style.display = "block";
                return true;
            }
        }
        return false;
        /*
        chart.RestoreDotColours();
        chart.MouseOverDotIndex = null;
        tooltipContainer.style.display = "none";
        */
    };
    SobyChartPart.prototype.GenerateLabelFromFormat = function (label, value, percentage) {
        return this.Chart.Label.Format.replace(/\$label/gi, label).replace(/\$value/gi, value.toString()).replace(/\$percentage/gi, percentage.toString());
    };
    SobyChartPart.prototype.PopulateItems = function () { };
    return SobyChartPart;
}());
var SobyLineChartPart = /** @class */ (function (_super) {
    __extends(SobyLineChartPart, _super);
    function SobyLineChartPart(chart, dataset) {
        var _this_1 = _super.call(this, chart, dataset) || this;
        _this_1.Type = SobyChartTypes.LineChart;
        return _this_1;
    }
    SobyLineChartPart.prototype.PopulateItems = function () {
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        this.Dots = new Array();
        ctx.fillStyle = this.Dataset.Colour;
        ctx.strokeStyle = this.Dataset.Colour;
        var previousX = 0;
        var previousY = 0;
        for (var i = 0; i < this.Dataset.Data.length; i++) {
            var slice = new Path2D();
            var value = this.Dataset.Data[i];
            var currentX = this.GetCalculatedValues().xPlotAreaStartPixel + (i * this.GetCalculatedValues().HorizontalAxisLabelWidth);
            var currentY = this.Chart.getYPixel(value);
            if (i === 0) {
                //slice.moveTo(previousX, previousY);
                //slice.lineTo(currentX, currentY);
            }
            else {
                slice.moveTo(previousX, previousY);
                slice.lineTo(currentX, currentY);
            }
            ctx.stroke(slice);
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Dataset.Colour, currentX, currentY, 4, 16, slice));
            previousX = currentX;
            previousY = currentY;
        }
        for (var i = 0; i < this.Dots.length; i++) {
            ctx.fillStyle = this.Dots[i].Colour;
            ctx.beginPath();
            ctx.arc(this.Dots[i].X, this.Dots[i].Y, 4, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };
    return SobyLineChartPart;
}(SobyChartPart));
var SobyColumnChartPart = /** @class */ (function (_super) {
    __extends(SobyColumnChartPart, _super);
    function SobyColumnChartPart(chart, dataset) {
        var _this_1 = _super.call(this, chart, dataset) || this;
        _this_1.ColumnWidth = null;
        _this_1.Type = SobyChartTypes.ColumnChart;
        return _this_1;
    }
    SobyColumnChartPart.prototype.PopulateItems = function () {
        //super.PopulateItems();
        //super.DrawPane();
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        this.Dots = new Array();
        this.ColumnWidth = (this.GetCalculatedValues().HorizontalAxisLabelWidth - 15) / this.Chart.Datasets.length;
        for (var i = 0; i < this.Dataset.Data.length; i++) {
            ctx.fillStyle = this.Dataset.Colour;
            ctx.strokeStyle = this.Dataset.Colour;
            if (this.Chart.MouseOverDotIndex !== null && this.Dataset.Index === this.Chart.MouseOverDotIndex[0] && i === this.Chart.MouseOverDotIndex[1]) {
                ctx.fillStyle = "purple";
                ctx.strokeStyle = "purple";
            }
            var slice = new Path2D();
            var value = this.Dataset.Data[i];
            var currentX = this.GetCalculatedValues().xPlotAreaStartPixel + (i * this.GetCalculatedValues().HorizontalAxisLabelWidth) + this.Dataset.Index * this.ColumnWidth;
            var currentY = this.Chart.getYPixel(0); //this.Height - value - this.CalculatedValues.horizontalAxisLabelYStartPoint - 50;
            slice.rect(currentX, currentY, this.ColumnWidth, this.Chart.getYPixel(value) - currentY);
            ctx.fill(slice);
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Dataset.Colour, currentX, currentY, 4, 16, slice));
        }
    };
    return SobyColumnChartPart;
}(SobyChartPart));
var SobyBarChartPart = /** @class */ (function (_super) {
    __extends(SobyBarChartPart, _super);
    function SobyBarChartPart(chart, dataset) {
        var _this_1 = _super.call(this, chart, dataset) || this;
        _this_1.BarHeight = null;
        _this_1.Type = SobyChartTypes.BarChart;
        _this_1.Chart.Label.LabelPosition = SobyChartElementPosition.Left;
        return _this_1;
    }
    SobyBarChartPart.prototype.PopulateItems = function () {
        //super.PopulateItems();
        //super.DrawPane();
        var ctx = this.GetContext();
        ctx.fillStyle = this.Dataset.Colour;
        ctx.strokeStyle = this.Dataset.Colour;
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        this.BarHeight = (this.GetCalculatedValues().VerticalAxisLabelHeight - 15) / this.Chart.Datasets.length;
        this.Dots = new Array();
        ctx.fillStyle = this.Dataset.Colour;
        ctx.strokeStyle = this.Dataset.Colour;
        for (var i = 0; i < this.Dataset.Data.length; i++) {
            var slice = new Path2D();
            var value = this.Dataset.Data[i];
            var currentX = this.Chart.getXPixel(0); //this.CalculatedValues.xPlotAreaStartPixel + (i * this.CalculatedValues.horizontalAxisLabelWidth);
            var currentY = this.GetCalculatedValues().yPlotAreaStartPixel - (i * this.GetCalculatedValues().VerticalAxisLabelHeight) - (this.BarHeight * (this.Dataset.Index + 1));
            slice.rect(currentX, currentY, this.Chart.getXPixel(value) - currentX, this.BarHeight);
            ctx.fill(slice);
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Dataset.Colour, currentX, currentY, 4, 16, slice));
        }
        //ctx.stroke();
    };
    return SobyBarChartPart;
}(SobyChartPart));
var SobyRadarChartPart = /** @class */ (function (_super) {
    __extends(SobyRadarChartPart, _super);
    function SobyRadarChartPart(chart, dataset) {
        var _this_1 = _super.call(this, chart, dataset) || this;
        _this_1.Type = SobyChartTypes.RadarChart;
        return _this_1;
    }
    SobyRadarChartPart.prototype.PopulateItems = function () {
        //super.PopulateItems();
        //super.DrawPane();
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        this.Dots = new Array();
        for (var i = 0; i < this.Dataset.Data.length; i++) {
            var value = this.Dataset.Data[i];
            var currentX = this.GetCalculatedValues().HorizontalAxisLabelXStartPoint + (i * this.GetCalculatedValues().HorizontalAxisLabelWidth);
            var currentY = this.Chart.Height - value - this.GetCalculatedValues().HorizontalAxisLabelYStartPoint - 50;
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Dataset.Colour, currentX, currentY, 4, 16, null));
            ctx.beginPath();
            ctx.rect(currentX, currentY + 30, 20, value);
            ctx.stroke();
            //ctx.strokeRect(currentX, currentX+20, 0, currentY);
        }
        ctx.stroke();
    };
    return SobyRadarChartPart;
}(SobyChartPart));
var SobyPieChartPart = /** @class */ (function (_super) {
    __extends(SobyPieChartPart, _super);
    function SobyPieChartPart(chart, dataset) {
        var _this_1 = _super.call(this, chart, dataset) || this;
        _this_1.Offset = 0;
        _this_1.Radius = 0;
        _this_1.Type = SobyChartTypes.PieChart;
        _this_1.GetCalculatedValues().Padding = 40;
        return _this_1;
    }
    SobyPieChartPart.prototype.PopulateItems = function () {
        //super.PopulateItems();
        //super.DrawPane();
        this.Radius = (this.Chart.Height - (this.GetCalculatedValues().Padding * 2) - this.GetCalculatedValues().HorizontalAxisLabelHeight) / 2;
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        var anglePieceValue = 2 / this.GetCalculatedValues().TotalValue;
        var anglePieceRadiusValue = this.Radius / this.GetCalculatedValues().MaxValue;
        var startX = (this.Chart.Width - this.Radius) / 2 + this.GetCalculatedValues().Padding;
        var startY = this.Chart.Height - this.Radius - this.GetCalculatedValues().Padding;
        var beginAngle = 0;
        var endAngle = 0;
        var offsetX, offsetY, medianAngle;
        this.Dots = new Array();
        for (var i = 0; i < this.Dataset.Data.length; i++) {
            var slice = new Path2D();
            var value = this.Dataset.Data[i];
            var radius = this.Offset === 0 ? this.Radius : anglePieceRadiusValue * value;
            beginAngle = endAngle;
            endAngle = endAngle + (Math.PI * anglePieceValue * value);
            medianAngle = (endAngle + beginAngle) / 2;
            var percentage = Math.round(100 * 100 * value / this.GetCalculatedValues().TotalValue) / 100;
            offsetX = Math.cos(medianAngle) * this.Offset;
            offsetY = Math.sin(medianAngle) * this.Offset;
            ctx.fillStyle = this.Chart.Label.Colours[i % this.Chart.Label.Colours.length];
            ctx.strokeStyle = this.Chart.Label.Colours[i % this.Chart.Label.Colours.length];
            if (this.Chart.Type === SobyChartTypes.PieChart || this.Chart.Type === SobyChartTypes.PolarAreaChart) {
                ctx.beginPath();
                slice.moveTo(startX + offsetX, startY + offsetY);
                slice.arc(startX + offsetX, startY + offsetY, radius, beginAngle, endAngle);
                slice.lineTo(startX + offsetX, startY + offsetY);
                ctx.stroke();
                ctx.fill(slice);
            }
            else {
                ctx.lineWidth = 2 * radius / 5;
                slice.arc(startX + offsetX, startY + offsetY, radius - ctx.lineWidth / 2, beginAngle, endAngle);
                ctx.stroke(slice);
            }
            var centerAngle = ((beginAngle + endAngle) / 2);
            var labelXPoint = 0;
            var labelYPoint = 0;
            var ninetyDegreeValue = Math.PI / 2;
            var distanceFromCircle = 10;
            labelXPoint = startX + Math.cos(centerAngle) * (this.Radius + distanceFromCircle); //(this.Radius + distanceFromCircle) * Math.cos(pieceAngle);
            labelYPoint = startY + Math.sin(centerAngle) * (this.Radius + distanceFromCircle); //(this.Radius + distanceFromCircle) * Math.cos(pieceAngle);
            var labelRectX = labelXPoint;
            var labelRectY = labelYPoint;
            if (centerAngle < ninetyDegreeValue) {
            }
            else if (centerAngle < ninetyDegreeValue * 2) {
                labelXPoint -= 30;
                labelRectX = labelXPoint - 100;
                labelRectY = labelYPoint - 20;
            }
            else if (centerAngle < ninetyDegreeValue * 3) {
                labelXPoint -= 30;
                labelRectX = labelXPoint - 100;
                labelRectY = labelYPoint - 15;
            }
            else {
            }
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.strokeStyle = this.Chart.Label.Colours[i % this.Chart.Label.Colours.length];
            ctx.moveTo(startX, startY);
            ctx.lineTo(labelRectX, labelRectY);
            ctx.stroke();
            var labelWidth = 50;
            var label = this.GenerateLabelFromFormat(this.Chart.Label.Labels[i], value, percentage);
            if (label.length * 5.4 > labelWidth)
                labelWidth = label.length * 5.4;
            var slice1 = new Path2D();
            slice1.rect(labelRectX, labelRectY, labelWidth, 15);
            ctx.fillStyle = this.Chart.Label.Colours[i % this.Chart.Label.Colours.length];
            ctx.lineWidth = 0.3;
            ctx.font = "normal 10px Arial";
            ctx.strokeStyle = "#FFFFFF";
            ctx.fill(slice1);
            ctx.strokeText(label, labelRectX + 5, labelRectY + 12);
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Chart.Label.Colours[i % this.Chart.Label.Colours.length], startX + offsetX, startY + offsetY, radius, 16, slice));
        }
    };
    return SobyPieChartPart;
}(SobyChartPart));
var SobyPolarAreaChartPart = /** @class */ (function (_super) {
    __extends(SobyPolarAreaChartPart, _super);
    function SobyPolarAreaChartPart(chart, dataset) {
        var _this_1 = _super.call(this, chart, dataset) || this;
        _this_1.Type = SobyChartTypes.PolarAreaChart;
        _this_1.Offset = 3;
        return _this_1;
    }
    return SobyPolarAreaChartPart;
}(SobyPieChartPart));
var SobyDoughnutChartPart = /** @class */ (function (_super) {
    __extends(SobyDoughnutChartPart, _super);
    function SobyDoughnutChartPart(chart, dataset) {
        var _this_1 = _super.call(this, chart, dataset) || this;
        _this_1.Type = SobyChartTypes.DoughnutChart;
        _this_1.Offset = 0;
        return _this_1;
    }
    return SobyDoughnutChartPart;
}(SobyPieChartPart));
var SobyLegendPanel = /** @class */ (function () {
    /*
    LegendVerticalAligment: SobyChartVerticalAligment = SobyChartVerticalAligment.Top;
    LegendHorizontalAligment: SobyChartHorizontalAligment = SobyChartHorizontalAligment.Center;
    */
    //constructor(ctx, titleAligment: SobyChartAligment, verticalAligment: SobyChartVerticalAligment, horizontalAligment: SobyChartHorizontalAligment, height: number, width: number, x: number, y: number, titles: Array<string>, colours: Array<string>) {
    function SobyLegendPanel(chart, titles, colours) {
        this.Chart = null;
        this.Height = null;
        this.Width = null;
        this.X = null;
        this.Y = null;
        this.Titles = null;
        this.Colours = null;
        this.Position = SobyChartElementPosition.Top;
        this.TitleAligment = SobyChartAligment.Horizontally;
        this.VerticalAligment = SobyChartVerticalAligment.Top;
        this.HorizontalAligment = SobyChartHorizontalAligment.Center;
        this.Chart = chart;
        this.Titles = titles;
        this.Colours = colours;
    }
    SobyLegendPanel.prototype.Paint = function () {
        var ctx = this.Chart.GetContext();
        var charachterFontPixel = 6;
        var totalCharachterLength = 0;
        for (var x = 0; x < this.Titles.length; x++) {
            totalCharachterLength += this.Titles[x].length;
        }
        var startXPosition = this.X - 20;
        var startYPosition = this.Y;
        if (this.TitleAligment === SobyChartAligment.Horizontally) {
            if (this.HorizontalAligment === SobyChartHorizontalAligment.Left) {
                startXPosition += 30;
            }
            else if (this.HorizontalAligment === SobyChartHorizontalAligment.Center) {
                startXPosition += (this.Width - (totalCharachterLength * charachterFontPixel) - (this.Titles.length * 15)) / 2;
            }
            else if (this.HorizontalAligment === SobyChartHorizontalAligment.Right) {
                startXPosition += (this.Width - (totalCharachterLength * charachterFontPixel) - (this.Titles.length * 15));
            }
        }
        else {
            if (this.VerticalAligment === SobyChartVerticalAligment.Top) {
                startYPosition += 40;
            }
            else if (this.VerticalAligment === SobyChartVerticalAligment.Middle) {
                startYPosition += (this.Height - (this.Titles.length * 15)) / 2;
            }
            else if (this.VerticalAligment === SobyChartVerticalAligment.Bottom) {
                startYPosition += (this.Height - (this.Titles.length * 15));
            }
        }
        for (var x = 0; x < this.Titles.length; x++) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.fillText(this.Titles[x], startXPosition + 13, startYPosition + 8);
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            ctx.fillRect(startXPosition, startYPosition, 10, 10);
            if (this.TitleAligment === SobyChartAligment.Horizontally) {
                startXPosition += 15 + (this.Titles[x].length * charachterFontPixel);
            }
            else {
                startYPosition -= 15;
            }
        }
    };
    return SobyLegendPanel;
}());
/*
class SobyLegendPanel {
    Title = "";
    CTX = null;
    Height: number = null;
    Width: number = null;
    X: number = null;
    Y: number = null;
    Paint() {
    }
}
*/
var SobyChartDataset = /** @class */ (function () {
    function SobyChartDataset() {
        this.Title = "";
        this.Type = SobyChartTypes.BarChart;
    }
    return SobyChartDataset;
}());
var SobyChartDotValue = /** @class */ (function () {
    function SobyChartDotValue(label, value, datasetTitle, colour, x, y, r, rXr, path2D) {
        this.Label = "";
        this.Value = null;
        this.DatasetTitle = "";
        this.Colour = "black";
        this.CurrentColour = "black";
        this.Label = label;
        this.Value = value;
        this.DatasetTitle = datasetTitle;
        this.Colour = colour;
        this.CurrentColour = colour;
        this.X = x;
        this.Y = y;
        this.r = r;
        this.rXr = rXr;
        this.Path2D = path2D;
    }
    return SobyChartDotValue;
}());
var SobyChartTypes;
(function (SobyChartTypes) {
    SobyChartTypes[SobyChartTypes["LineChart"] = 0] = "LineChart";
    SobyChartTypes[SobyChartTypes["BarChart"] = 1] = "BarChart";
    SobyChartTypes[SobyChartTypes["RadarChart"] = 2] = "RadarChart";
    SobyChartTypes[SobyChartTypes["PieChart"] = 3] = "PieChart";
    SobyChartTypes[SobyChartTypes["PolarAreaChart"] = 4] = "PolarAreaChart";
    SobyChartTypes[SobyChartTypes["ColumnChart"] = 5] = "ColumnChart";
    SobyChartTypes[SobyChartTypes["DoughnutChart"] = 6] = "DoughnutChart";
})(SobyChartTypes || (SobyChartTypes = {}));
var SobyChartElementPosition;
(function (SobyChartElementPosition) {
    SobyChartElementPosition[SobyChartElementPosition["Left"] = 0] = "Left";
    SobyChartElementPosition[SobyChartElementPosition["Bottom"] = 1] = "Bottom";
    SobyChartElementPosition[SobyChartElementPosition["Right"] = 2] = "Right";
    SobyChartElementPosition[SobyChartElementPosition["Top"] = 3] = "Top";
    SobyChartElementPosition[SobyChartElementPosition["Hidden"] = 4] = "Hidden";
})(SobyChartElementPosition || (SobyChartElementPosition = {}));
var SobyChartAligment;
(function (SobyChartAligment) {
    SobyChartAligment[SobyChartAligment["Vertically"] = 0] = "Vertically";
    SobyChartAligment[SobyChartAligment["Horizontally"] = 1] = "Horizontally";
})(SobyChartAligment || (SobyChartAligment = {}));
var SobyChartVerticalAligment;
(function (SobyChartVerticalAligment) {
    SobyChartVerticalAligment[SobyChartVerticalAligment["Top"] = 0] = "Top";
    SobyChartVerticalAligment[SobyChartVerticalAligment["Middle"] = 1] = "Middle";
    SobyChartVerticalAligment[SobyChartVerticalAligment["Bottom"] = 2] = "Bottom";
})(SobyChartVerticalAligment || (SobyChartVerticalAligment = {}));
var SobyChartHorizontalAligment;
(function (SobyChartHorizontalAligment) {
    SobyChartHorizontalAligment[SobyChartHorizontalAligment["Left"] = 0] = "Left";
    SobyChartHorizontalAligment[SobyChartHorizontalAligment["Center"] = 1] = "Center";
    SobyChartHorizontalAligment[SobyChartHorizontalAligment["Right"] = 2] = "Right";
})(SobyChartHorizontalAligment || (SobyChartHorizontalAligment = {}));
function sobyGenerateChartFromHtmlElement(containerId) {
    var _this = $("#" + containerId);
    var datasets = [];
    var datasetElements = _this.find(".dataset");
    var chartType = "";
    for (var i = 0; i < datasetElements.length; i++) {
        var datasetElement = $(datasetElements[i]);
        var dataSet = new SobyChartDataset();
        dataSet.Title = datasetElement.data("title");
        chartType = datasetElement.data("type");
        var data = new Array();
        var dataStringArray = datasetElement.data("data").split(";#");
        for (var x = 0; x < dataStringArray.length; x++) {
            var numberData = 0;
            if (dataStringArray[x] !== null || dataStringArray[x] !== undefined || dataStringArray[x] !== "")
                numberData = parseFloat(dataStringArray[x]);
            data.push(numberData);
        }
        dataSet.Data = data;
        datasets.push(dataSet);
    }
    var labels = _this.find(".labels").data("labels").split(";#");
    var chart = new SobyChart("#" + _this.attr("id"), chartType, datasets, "There is no record found.", labels);
    ;
    chart.Width = _this.data("width");
    chart.Height = _this.data("height");
    chart.Initialize();
}
var sobyChartPartFactory = new SobyChartPartFactory();
// ************************************************************
//# sourceMappingURL=soby.ui.components.charts.js.map