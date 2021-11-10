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
// VERSION 1.0.8.1
// ********************* ITEM SELECTION *****************************
var soby_Charts = new Array();
var soby_ChartCalculatedValues = /** @class */ (function () {
    function soby_ChartCalculatedValues() {
        this.Dots = null;
        this.ValueLabelCount = 10;
        this.yLabelXStartPoint = 10;
        this.yLabelYStartPoint = 30;
        this.xLabelXStartPoint = this.yLabelXStartPoint + 50;
        this.xLabelYStartPoint = 10;
        this.xInnerPaneStartPixel = 30;
        this.yInnerPaneStartPixel = 30;
        this.yLabelHeight = 0;
        this.xLabelWidth = 0;
        this.xLabelHeight = 30;
        this.yLabelWidth = 50;
        this.yLabelPieceValue = 0;
        this.xLabelPieceValue = 0;
        this.Padding = 20;
        this.InnerPaneWidth = 0;
        this.InnerPaneHeight = 0;
        this.SeriesPanelWidth = 0;
        this.SeriesPanelHeight = 0;
        this.MaxValue = null;
        this.MinValue = null;
        this.TotalValue = null;
    }
    return soby_ChartCalculatedValues;
}());
var soby_Chart = /** @class */ (function () {
    function soby_Chart(type, contentDivSelector, title, datasets, emptyDataHtml, labels) {
        this.ChartID = "";
        this.ChartTooltipID = "";
        this.ChartClassName = "";
        this.ContentDivSelector = "";
        this.Title = "";
        this.Height = 100;
        this.Width = 200;
        this.Datasets = null;
        this.EmptyDataHtml = "";
        this.Type = null;
        this.LabelPosition = SobyChartElementPosition.Bottom;
        this.SeriesPosition = SobyChartElementPosition.Top;
        this.SeriesVerticalAligment = SobyChartVerticalAligment.Top;
        this.SeriesHorizontalAligment = SobyChartHorizontalAligment.Center;
        this.Colours = ["#4472c4", "#ed7d31", "#ffce3a", "#a5a5a5", "#5b9bd5", "#70ad47"];
        this.MouseOverDotIndex = null;
        this.CalculatedValues = new soby_ChartCalculatedValues();
        this.OnSelectionChanged = null;
        this.OnClick = null;
        this.ChartID = "soby_chart_" + soby_guid();
        this.ChartTooltipID = this.ChartID + "_tip";
        this.Type = type;
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.Labels = labels;
        this.Datasets = datasets;
        this.EmptyDataHtml = emptyDataHtml;
        this.CalculatedValues.Dots = new Array();
        this.EnsureItemSelectionExistency();
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
    }
    soby_Chart.prototype.GetContext = function () {
        return eval("document.getElementById('" + this.ChartID + "').getContext('2d');");
    };
    soby_Chart.prototype.GetCanvas = function () {
        return eval("document.getElementById('" + this.ChartID + "');");
    };
    /*
    GetTooltipContext() {
        return eval("document.getElementById('" + this.ChartTooltipID + "').getContext('2d');");
    }
    */
    soby_Chart.prototype.GetTooltipContainer = function () {
        return eval("document.getElementById('" + this.ChartTooltipID + "');");
    };
    soby_Chart.prototype.EnsureItemSelectionExistency = function () {
        for (var key in soby_Charts) {
            if (key === this.ChartID) {
                return;
            }
        }
        soby_Charts[this.ChartID] = this;
    };
    soby_Chart.prototype.RenderTooltip = function (tooltipContainer, dataItem, x, y) {
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
    soby_Chart.prototype.TransformLightenDarkenColor = function (col, amt) {
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
    soby_Chart.prototype.RestoreDotColours = function () {
        for (var i = 0; i < this.CalculatedValues.Dots.length; i++) {
            var dot = this.CalculatedValues.Dots[i];
            if (dot.CurrentColour !== dot.Colour) {
                dot.CurrentColour = dot.Colour;
                var ctx1 = this.GetContext();
                if (this.Type === SobyChartTypes.DoughnutChart) {
                    ctx1.lineWidth = 2 * dot.r / 5;
                    ctx1.strokeStyle = dot.Colour;
                    ctx1.stroke(dot.Path2D);
                }
                else if (this.Type === SobyChartTypes.LineChart) {
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
    soby_Chart.prototype.SetMouseOverColour = function (mouseOverDotIndex) {
        this.MouseOverDotIndex = mouseOverDotIndex;
        var dot = this.CalculatedValues.Dots[mouseOverDotIndex];
        dot.CurrentColour = this.TransformLightenDarkenColor(dot.Colour, 30);
        var ctx1 = this.GetContext();
        if (this.Type === SobyChartTypes.DoughnutChart) {
            ctx1.lineWidth = 2 * dot.r / 5;
            ctx1.strokeStyle = dot.CurrentColour;
            ctx1.stroke(dot.Path2D);
        }
        else if (this.Type === SobyChartTypes.LineChart) {
            ctx1.lineWidth = dot.r;
            ctx1.strokeStyle = dot.CurrentColour;
            ctx1.stroke(dot.Path2D);
        }
        else {
            ctx1.fillStyle = dot.CurrentColour;
            ctx1.fill(dot.Path2D);
        }
    };
    soby_Chart.prototype.HandleMouseMove = function (e) {
        var chart = soby_Charts[eval("e.target.id")];
        //const ctx1 = chart.GetContext();
        //const ctx = chart.GetTooltipContext();
        var tooltipContainer = chart.GetTooltipContainer();
        var canvasOffset = $("#" + chart.ChartID).offset();
        var tooltipOffsetX = canvasOffset.left - $(window).scrollLeft();
        var tooltipOffsetY = canvasOffset.top - $(window).scrollTop();
        var mouseX = e.clientX - tooltipOffsetX;
        var mouseY = e.clientY - tooltipOffsetY;
        for (var i = 0; i < chart.CalculatedValues.Dots.length; i++) {
            var dot = chart.CalculatedValues.Dots[i];
            if (chart.CheckMouseHit(mouseX, mouseY, dot) === true) {
                if (chart.MouseOverDotIndex === i)
                    return;
                chart.RestoreDotColours();
                chart.SetMouseOverColour(i);
                tooltipContainer.style.left = (mouseX + 5) + "px";
                tooltipContainer.style.top = (mouseY - 60) + "px";
                chart.RenderTooltip(tooltipContainer, dot, mouseX, mouseY);
                tooltipContainer.style.display = "block";
                return;
            }
        }
        chart.RestoreDotColours();
        chart.MouseOverDotIndex = null;
        tooltipContainer.style.display = "none";
    };
    soby_Chart.prototype.CheckMouseHit = function (mouseX, mouseY, dot) {
        var ctx = this.GetContext();
        if (this.Type === SobyChartTypes.LineChart) {
            return ctx.isPointInStroke(dot.Path2D, mouseX, mouseY);
        }
        else {
            return ctx.isPointInPath(dot.Path2D, mouseX, mouseY);
        }
    };
    soby_Chart.prototype.RoundedRect = function (x, y, width, height, color, radius) {
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
    soby_Chart.prototype.Initialize = function () {
        $(this.ContentDivSelector).addClass("soby_chart");
        $(this.ContentDivSelector).addClass(this.ChartClassName);
        this.PopulateItems();
    };
    soby_Chart.prototype.PopulateItems = function () {
        var canvas = $("<canvas id='" + this.ChartID + "' width='" + this.Width + "' height='" + this.Height + "' style='border: 1px solid;'></canvas>");
        var tooltipCanvas = $("<div id='" + this.ChartTooltipID + "' width='120' height='40' style='position: absolute;'></div>");
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(canvas);
        $(this.ContentDivSelector).append(tooltipCanvas);
        document.getElementById(this.ChartID).addEventListener('mousemove', this.HandleMouseMove);
    };
    soby_Chart.prototype.ClickNode = function (treeViewItemId) {
        if (this.OnClick !== null) {
            this.OnClick(this.ChartID, treeViewItemId);
        }
    };
    soby_Chart.prototype.CalculateValues = function () {
        if (this.SeriesPosition === SobyChartElementPosition.Top
            || this.SeriesPosition === SobyChartElementPosition.Bottom) {
            this.CalculatedValues.SeriesPanelWidth = this.Width;
            this.CalculatedValues.SeriesPanelHeight = 30;
        }
        if (this.SeriesPosition === SobyChartElementPosition.Left
            || this.SeriesPosition === SobyChartElementPosition.Right) {
            this.CalculatedValues.SeriesPanelWidth = 70;
            this.CalculatedValues.SeriesPanelHeight = this.Height;
        }
        this.CalculatedValues.MinValue = null;
        this.CalculatedValues.MaxValue = 0;
        this.CalculatedValues.TotalValue = 0;
        for (var x = 0; x < this.Datasets.length; x++) {
            for (var i = 0; i < this.Datasets[x].Data.length; i++) {
                var value = this.Datasets[x].Data[i];
                this.CalculatedValues.TotalValue += value;
                if (value > this.CalculatedValues.MaxValue)
                    this.CalculatedValues.MaxValue = value;
                if (this.CalculatedValues.MinValue === null || value < this.CalculatedValues.MinValue)
                    this.CalculatedValues.MinValue = value;
            }
        }
        this.CalculatedValues.yInnerPaneStartPixel = this.Height - this.CalculatedValues.Padding - this.CalculatedValues.xLabelHeight;
        this.CalculatedValues.xInnerPaneStartPixel = this.CalculatedValues.Padding + this.CalculatedValues.yLabelWidth;
        this.CalculatedValues.xLabelYStartPoint = this.Height - 20;
        if (this.SeriesPosition === SobyChartElementPosition.Bottom) {
            this.CalculatedValues.yInnerPaneStartPixel -= this.CalculatedValues.SeriesPanelHeight;
            this.CalculatedValues.xLabelYStartPoint -= this.CalculatedValues.SeriesPanelHeight;
        }
        else if (this.SeriesPosition === SobyChartElementPosition.Left) {
            this.CalculatedValues.xInnerPaneStartPixel += this.CalculatedValues.SeriesPanelWidth;
            this.CalculatedValues.yLabelXStartPoint += this.CalculatedValues.SeriesPanelWidth;
        }
        this.CalculatedValues.InnerPaneWidth = this.Width - this.CalculatedValues.Padding - this.CalculatedValues.xInnerPaneStartPixel;
        this.CalculatedValues.InnerPaneHeight = this.Height - (this.CalculatedValues.Padding * 2) - this.CalculatedValues.xLabelHeight;
        if (this.SeriesPosition === SobyChartElementPosition.Bottom) {
            this.CalculatedValues.InnerPaneHeight -= this.CalculatedValues.SeriesPanelHeight;
        }
        else if (this.SeriesPosition === SobyChartElementPosition.Top) {
            this.CalculatedValues.InnerPaneHeight -= this.CalculatedValues.SeriesPanelHeight;
        }
        else if (this.SeriesPosition === SobyChartElementPosition.Left) {
            this.CalculatedValues.InnerPaneWidth -= this.CalculatedValues.SeriesPanelWidth;
        }
        else if (this.SeriesPosition === SobyChartElementPosition.Right) {
            this.CalculatedValues.InnerPaneWidth -= this.CalculatedValues.SeriesPanelWidth;
        }
        if (this.LabelPosition === SobyChartElementPosition.Bottom) {
            this.CalculatedValues.yLabelHeight = (this.CalculatedValues.InnerPaneHeight) / (this.CalculatedValues.ValueLabelCount + 1);
            this.CalculatedValues.xLabelWidth = (this.CalculatedValues.InnerPaneWidth) / this.Labels.length;
            this.CalculatedValues.yLabelPieceValue = this.CalculatedValues.MaxValue / this.CalculatedValues.ValueLabelCount;
            this.CalculatedValues.xLabelPieceValue = 1;
        }
        else {
            this.CalculatedValues.yLabelHeight = this.CalculatedValues.InnerPaneHeight / this.Labels.length;
            this.CalculatedValues.xLabelWidth = this.CalculatedValues.InnerPaneHeight / (this.CalculatedValues.ValueLabelCount + 1);
            this.CalculatedValues.yLabelPieceValue = 1;
            this.CalculatedValues.xLabelPieceValue = this.CalculatedValues.MaxValue / this.CalculatedValues.ValueLabelCount;
        }
    };
    soby_Chart.prototype.DrawPane = function () {
        this.CalculateValues();
        var ctx = this.GetContext();
        ctx.fillStyle = this.Colours[0];
        if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart || this.Type === SobyChartTypes.DoughnutChart) {
        }
        else {
            if (this.LabelPosition === SobyChartElementPosition.Bottom) {
                for (var i = 0; i < this.Labels.length; i++) {
                    var xPoint_1 = i * this.CalculatedValues.xLabelWidth + this.CalculatedValues.xInnerPaneStartPixel;
                    ctx.font = "10px Arial";
                    ctx.fillStyle = "#FF0000";
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.Labels[i], xPoint_1, this.CalculatedValues.xLabelYStartPoint);
                    ctx.fillStyle = "#ebebeb";
                    ctx.lineWidth = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(xPoint_1, this.getYPixel(0));
                    ctx.lineTo(xPoint_1, this.getYPixel(this.CalculatedValues.MaxValue));
                    ctx.stroke();
                }
                var xPoint = (this.Labels.length) * this.CalculatedValues.xLabelWidth + this.CalculatedValues.xInnerPaneStartPixel;
                ctx.fillStyle = "#ebebeb";
                ctx.lineWidth = 0.2;
                ctx.beginPath();
                ctx.moveTo(xPoint, this.getYPixel(0));
                ctx.lineTo(xPoint, this.getYPixel(this.CalculatedValues.MaxValue));
                ctx.stroke();
                for (var i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    var yPoint = this.getYPixel(i * this.CalculatedValues.yLabelPieceValue);
                    ctx.fillStyle = "#FF0000";
                    ctx.lineWidth = 1;
                    ctx.font = "10px Arial";
                    ctx.strokeText(i * this.CalculatedValues.yLabelPieceValue, this.CalculatedValues.yLabelXStartPoint, yPoint);
                    ctx.fillStyle = "#ebebeb";
                    ctx.lineWidth = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(this.CalculatedValues.xInnerPaneStartPixel, yPoint);
                    ctx.lineTo(xPoint, yPoint); //this.Width - this.CalculatedValues.xInnerPaneStartPixel - this.CalculatedValues.Padding
                    ctx.stroke();
                }
            }
            else {
                for (var i = 0; i < this.Labels.length; i++) {
                    var yPoint = this.getYPixel(i);
                    var xPoint = this.CalculatedValues.Padding;
                    ctx.font = "10px Arial";
                    ctx.fillStyle = "#FF0000";
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.Labels[i], xPoint, yPoint);
                    ctx.fillStyle = "#ebebeb";
                    ctx.lineWidth = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(this.CalculatedValues.xInnerPaneStartPixel, yPoint);
                    ctx.lineTo(this.CalculatedValues.xInnerPaneStartPixel + this.CalculatedValues.InnerPaneWidth, yPoint);
                    ctx.stroke();
                }
                var yPoint1 = this.getYPixel(this.Labels.length);
                ctx.fillStyle = "#ebebeb";
                ctx.lineWidth = 0.2;
                ctx.beginPath();
                ctx.moveTo(this.CalculatedValues.xInnerPaneStartPixel, yPoint1);
                ctx.lineTo(this.CalculatedValues.xInnerPaneStartPixel + this.CalculatedValues.InnerPaneWidth, yPoint1);
                ctx.stroke();
                for (var i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    var yPoint = this.CalculatedValues.yInnerPaneStartPixel + this.CalculatedValues.yLabelHeight;
                    var xPoint = this.getXPixel(i * this.CalculatedValues.xLabelPieceValue);
                    ctx.fillStyle = "#FF0000";
                    ctx.lineWidth = 1;
                    ctx.font = "10px Arial";
                    ctx.strokeText(i * this.CalculatedValues.xLabelPieceValue, xPoint, yPoint);
                    ctx.fillStyle = "#ebebeb";
                    ctx.lineWidth = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(xPoint, this.CalculatedValues.yInnerPaneStartPixel);
                    ctx.lineTo(xPoint, this.CalculatedValues.yInnerPaneStartPixel - this.CalculatedValues.InnerPaneHeight);
                    ctx.stroke();
                }
            }
        }
        if (this.SeriesPosition !== SobyChartElementPosition.Hidden) {
            var titles = new Array();
            if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart || this.Type === SobyChartTypes.DoughnutChart) {
                for (var x = 0; x < this.Labels.length; x++) {
                    titles.push(this.Labels[x]);
                }
            }
            else {
                for (var x = 0; x < this.Datasets.length; x++) {
                    titles.push(this.Datasets[x].Title);
                }
            }
            var titleAligment = SobyChartAligment.Horizontally;
            if (this.SeriesPosition === SobyChartElementPosition.Left || this.SeriesPosition === SobyChartElementPosition.Right) {
                titleAligment = SobyChartAligment.Vertically;
            }
            var seriesPanelX = 10;
            var seriesPanelY = 10;
            if (this.SeriesPosition === SobyChartElementPosition.Bottom) {
                seriesPanelY = this.Height - 30;
            }
            if (this.SeriesPosition === SobyChartElementPosition.Right) {
                seriesPanelX = this.Width - 70;
            }
            var seriesPanel = new soby_SeriesPanel(ctx, titleAligment, this.SeriesVerticalAligment, this.SeriesHorizontalAligment, this.CalculatedValues.SeriesPanelHeight, this.CalculatedValues.SeriesPanelWidth, seriesPanelX, seriesPanelY, titles, this.Colours);
            seriesPanel.Paint();
        }
    };
    soby_Chart.prototype.getXPixel = function (val) {
        var maxValue = this.CalculatedValues.MaxValue;
        if (this.LabelPosition === SobyChartElementPosition.Bottom)
            maxValue = this.Labels.length + 1;
        return this.CalculatedValues.xInnerPaneStartPixel + ((this.CalculatedValues.InnerPaneWidth / maxValue) * val);
    };
    soby_Chart.prototype.getYPixel = function (val) {
        var maxValue = this.CalculatedValues.MaxValue;
        if (this.LabelPosition === SobyChartElementPosition.Left)
            maxValue = this.Labels.length;
        return this.CalculatedValues.yInnerPaneStartPixel - ((this.CalculatedValues.InnerPaneHeight / maxValue) * val);
    };
    return soby_Chart;
}());
var soby_LineChart = /** @class */ (function (_super) {
    __extends(soby_LineChart, _super);
    function soby_LineChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        return _super.call(this, SobyChartTypes.LineChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
    }
    soby_LineChart.prototype.PopulateItems = function () {
        _super.prototype.PopulateItems.call(this);
        _super.prototype.DrawPane.call(this);
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        this.CalculatedValues.Dots = new Array();
        for (var x = 0; x < this.Datasets.length; x++) {
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            var previousX = 0;
            var previousY = 0;
            for (var i = 0; i < this.Datasets[x].Data.length; i++) {
                var slice = new Path2D();
                //ctx.beginPath();
                var value = this.Datasets[x].Data[i];
                var currentX = this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth);
                var currentY = this.getYPixel(value);
                if (i === 0) {
                    //slice.moveTo(previousX, previousY);
                    //slice.lineTo(currentX, currentY);
                }
                else {
                    slice.moveTo(previousX, previousY);
                    slice.lineTo(currentX, currentY);
                }
                ctx.stroke(slice);
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16, slice));
                previousX = currentX;
                previousY = currentY;
            }
        }
        for (var i = 0; i < this.CalculatedValues.Dots.length; i++) {
            ctx.fillStyle = this.CalculatedValues.Dots[i].Colour;
            ctx.beginPath();
            ctx.arc(this.CalculatedValues.Dots[i].X, this.CalculatedValues.Dots[i].Y, 4, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };
    return soby_LineChart;
}(soby_Chart));
var soby_ColumnChart = /** @class */ (function (_super) {
    __extends(soby_ColumnChart, _super);
    function soby_ColumnChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        var _this_1 = _super.call(this, SobyChartTypes.ColumnChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this_1.ColumnWidth = null;
        return _this_1;
    }
    soby_ColumnChart.prototype.PopulateItems = function () {
        _super.prototype.PopulateItems.call(this);
        _super.prototype.DrawPane.call(this);
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        this.CalculatedValues.Dots = new Array();
        this.ColumnWidth = (this.CalculatedValues.xLabelWidth - 15) / this.Datasets.length;
        for (var x = 0; x < this.Datasets.length; x++) {
            for (var i = 0; i < this.Datasets[x].Data.length; i++) {
                ctx.fillStyle = this.Colours[x];
                ctx.strokeStyle = this.Colours[x];
                if (((x * this.Datasets[x].Data.length) + i) === this.MouseOverDotIndex) {
                    ctx.fillStyle = "purple";
                    ctx.strokeStyle = "purple";
                }
                var slice = new Path2D();
                var value = this.Datasets[x].Data[i];
                var currentX = this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth) + x * this.ColumnWidth;
                var currentY = this.getYPixel(0); //this.Height - value - this.CalculatedValues.xLabelYStartPoint - 50;
                slice.rect(currentX, currentY, this.ColumnWidth, this.getYPixel(value) - currentY);
                ctx.fill(slice);
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16, slice));
            }
        }
    };
    return soby_ColumnChart;
}(soby_Chart));
var soby_BarChart = /** @class */ (function (_super) {
    __extends(soby_BarChart, _super);
    function soby_BarChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        var _this_1 = _super.call(this, SobyChartTypes.BarChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this_1.BarHeight = null;
        _this_1.LabelPosition = SobyChartElementPosition.Left;
        return _this_1;
    }
    soby_BarChart.prototype.PopulateItems = function () {
        _super.prototype.PopulateItems.call(this);
        _super.prototype.DrawPane.call(this);
        var ctx = this.GetContext();
        ctx.fillStyle = this.Colours[0];
        ctx.strokeStyle = this.Colours[0];
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        this.BarHeight = (this.CalculatedValues.yLabelHeight - 15) / this.Datasets.length;
        this.CalculatedValues.Dots = new Array();
        for (var x = 0; x < this.Datasets.length; x++) {
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            for (var i = 0; i < this.Datasets[x].Data.length; i++) {
                var slice = new Path2D();
                var value = this.Datasets[x].Data[i];
                var currentX = this.getXPixel(0); //this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth);
                var currentY = this.CalculatedValues.yInnerPaneStartPixel - (i * this.CalculatedValues.yLabelHeight) - (this.BarHeight * (x + 1));
                slice.rect(currentX, currentY, this.getXPixel(value) - currentX, this.BarHeight);
                ctx.fill(slice);
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16, slice));
            }
            //ctx.stroke();
        }
    };
    return soby_BarChart;
}(soby_Chart));
var soby_RadarChart = /** @class */ (function (_super) {
    __extends(soby_RadarChart, _super);
    function soby_RadarChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        return _super.call(this, SobyChartTypes.RadarChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
    }
    soby_RadarChart.prototype.PopulateItems = function () {
        _super.prototype.PopulateItems.call(this);
        _super.prototype.DrawPane.call(this);
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        this.CalculatedValues.Dots = new Array();
        for (var i = 0; i < this.Datasets[0].Data.length; i++) {
            var value = this.Datasets[0].Data[i];
            var currentX = this.CalculatedValues.xLabelXStartPoint + (i * this.CalculatedValues.xLabelWidth);
            var currentY = this.Height - value - this.CalculatedValues.xLabelYStartPoint - 50;
            this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[0].Title, this.Colours[0], currentX, currentY, 4, 16, null));
            ctx.beginPath();
            ctx.rect(currentX, currentY + 30, 20, value);
            ctx.stroke();
            //ctx.strokeRect(currentX, currentX+20, 0, currentY);
        }
        ctx.stroke();
    };
    return soby_RadarChart;
}(soby_Chart));
var soby_PieChart = /** @class */ (function (_super) {
    __extends(soby_PieChart, _super);
    function soby_PieChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        var _this_1 = _super.call(this, SobyChartTypes.PieChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this_1.Offset = 0;
        _this_1.Radius = 0;
        return _this_1;
    }
    soby_PieChart.prototype.PopulateItems = function () {
        _super.prototype.PopulateItems.call(this);
        _super.prototype.DrawPane.call(this);
        this.Radius = (this.Height - (this.CalculatedValues.Padding * 2) - this.CalculatedValues.xLabelHeight) / 2;
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        var anglePieceValue = 2 / this.CalculatedValues.TotalValue;
        var anglePieceRadiusValue = this.Radius / this.CalculatedValues.MaxValue;
        var startX = (this.Width - this.Radius) / 2 + this.CalculatedValues.Padding;
        var startY = this.Height - this.Radius - this.CalculatedValues.Padding;
        var beginAngle = 0;
        var endAngle = 0;
        var offsetX, offsetY, medianAngle;
        this.CalculatedValues.Dots = new Array();
        for (var i = 0; i < this.Datasets[0].Data.length; i++) {
            var slice = new Path2D();
            var value = this.Datasets[0].Data[i];
            var radius = this.Offset === 0 ? this.Radius : anglePieceRadiusValue * value;
            beginAngle = endAngle;
            endAngle = endAngle + (Math.PI * anglePieceValue * value);
            medianAngle = (endAngle + beginAngle) / 2;
            offsetX = Math.cos(medianAngle) * this.Offset;
            offsetY = Math.sin(medianAngle) * this.Offset;
            ctx.fillStyle = this.Colours[i % this.Colours.length];
            ctx.strokeStyle = this.Colours[i % this.Colours.length];
            if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart) {
                ctx.beginPath();
                slice.moveTo(startX + offsetX, startY + offsetY);
                slice.arc(startX + offsetX, startY + offsetY, radius, beginAngle, endAngle);
                slice.lineTo(startX + offsetX, startY + offsetY);
                ctx.stroke();
                ctx.fill(slice);
                /*
                ctx.moveTo(startX + offsetX, startY + offsetY);
                ctx.arc(startX + offsetX, startY + offsetY, radius, beginAngle, endAngle);
                ctx.lineTo(startX + offsetX, startY + offsetY);
                ctx.stroke();
                ctx.fill();
                */
            }
            else {
                ctx.lineWidth = 2 * radius / 5;
                slice.arc(startX + offsetX, startY + offsetY, radius - ctx.lineWidth / 2, beginAngle, endAngle);
                ctx.stroke(slice);
            }
            this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[0].Title, this.Colours[i % this.Colours.length], startX + offsetX, startY + offsetY, radius, 16, slice));
        }
    };
    return soby_PieChart;
}(soby_Chart));
var soby_PolarAreaChart = /** @class */ (function (_super) {
    __extends(soby_PolarAreaChart, _super);
    function soby_PolarAreaChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        var _this_1 = _super.call(this, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this_1.Type = SobyChartTypes.PolarAreaChart;
        _this_1.Offset = 3;
        return _this_1;
    }
    return soby_PolarAreaChart;
}(soby_PieChart));
var soby_DoughnutChart = /** @class */ (function (_super) {
    __extends(soby_DoughnutChart, _super);
    function soby_DoughnutChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        var _this_1 = _super.call(this, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this_1.Type = SobyChartTypes.DoughnutChart;
        _this_1.Offset = 0;
        return _this_1;
    }
    return soby_DoughnutChart;
}(soby_PieChart));
var soby_SeriesPanel = /** @class */ (function () {
    function soby_SeriesPanel(ctx, titleAligment, verticalAligment, horizontalAligment, height, width, x, y, titles, colours) {
        this.CTX = null;
        this.Height = null;
        this.Width = null;
        this.X = null;
        this.Y = null;
        this.Titles = null;
        this.Colours = null;
        this.TitleAligment = SobyChartAligment.Horizontally;
        this.VerticalAligment = SobyChartVerticalAligment.Top;
        this.HorizontalAligment = SobyChartHorizontalAligment.Center;
        this.CTX = ctx;
        this.TitleAligment = titleAligment;
        this.VerticalAligment = verticalAligment;
        this.HorizontalAligment = horizontalAligment;
        this.Height = height;
        this.Width = width;
        this.X = x;
        this.Y = y;
        this.Titles = titles;
        this.Colours = colours;
    }
    soby_SeriesPanel.prototype.Paint = function () {
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
            this.CTX.strokeStyle = "black";
            this.CTX.fillStyle = "black";
            this.CTX.fillText(this.Titles[x], startXPosition + 13, startYPosition + 8);
            this.CTX.fillStyle = this.Colours[x];
            this.CTX.strokeStyle = this.Colours[x];
            this.CTX.fillRect(startXPosition, startYPosition, 10, 10);
            if (this.TitleAligment === SobyChartAligment.Horizontally) {
                startXPosition += 15 + (this.Titles[x].length * charachterFontPixel);
            }
            else {
                startYPosition -= 15;
            }
        }
    };
    return soby_SeriesPanel;
}());
var soby_ChartDataset = /** @class */ (function () {
    function soby_ChartDataset() {
        this.Title = "";
        this.Type = SobyChartTypes.BarChart;
    }
    return soby_ChartDataset;
}());
var soby_ChartDotValue = /** @class */ (function () {
    function soby_ChartDotValue(label, value, datasetTitle, colour, x, y, r, rXr, path2D) {
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
    return soby_ChartDotValue;
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
        var dataSet = new soby_ChartDataset();
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
    var chart = null;
    if (chartType === "PieChart") {
        chart = new soby_PieChart("#" + _this.attr("id"), "Pie Chart", datasets, "There is no record found.", labels);
    }
    else if (chartType === "ColumnChart") {
        chart = new soby_ColumnChart("#" + _this.attr("id"), "Column Chart", datasets, "There is no record found.", labels);
    }
    else if (chartType === "LineChart") {
        chart = new soby_LineChart("#" + _this.attr("id"), "Line Chart", datasets, "There is no record found.", labels);
    }
    else if (chartType === "DoughnutChart") {
        chart = new soby_DoughnutChart("#" + _this.attr("id"), "Doughnut Chart", datasets, "There is no record found.", labels);
    }
    else if (chartType === "BarChart") {
        chart = new soby_BarChart("#" + _this.attr("id"), "Bar Chart", datasets, "There is no record found.", labels);
    }
    else if (chartType === "PolarAreaChart") {
        chart = new soby_PolarAreaChart("#" + _this.attr("id"), "Polar Area Chart", datasets, "There is no record found.", labels);
    }
    chart.Width = _this.data("width");
    chart.Height = _this.data("height");
    chart.Initialize();
}
// ************************************************************
//# sourceMappingURL=soby.ui.components.charts.js.map