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
        this.ImagesFolderUrl = "/_layouts/1033/images";
        this.Type = null;
        this.LabelPosition = SobyChartLabelPosition.Bottom;
        this.Colours = ["#4472c4", "#ed7d31", "#ffce3a", "#a5a5a5", "#5b9bd5", "#70ad47"];
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
    }
    soby_Chart.prototype.GetContext = function () {
        return eval("document.getElementById('" + this.ChartID + "').getContext('2d');");
    };
    soby_Chart.prototype.GetCanvas = function () {
        return eval("document.getElementById('" + this.ChartID + "');");
    };
    soby_Chart.prototype.GetTooltipContext = function () {
        return eval("document.getElementById('" + this.ChartTooltipID + "').getContext('2d');");
    };
    soby_Chart.prototype.GetTooltipCanvas = function () {
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
    soby_Chart.prototype.HandleMouseMove = function (e) {
        var chart = soby_Charts[eval("e.target.id")];
        var ctx = chart.GetTooltipContext();
        var canvas = chart.GetTooltipCanvas();
        var canvasOffset = $("#" + chart.ChartID).offset();
        var tooltipOffsetX = canvasOffset.left - $(window).scrollLeft();
        var tooltipOffsetY = canvasOffset.top - $(window).scrollTop();
        var mouseX = e.clientX - tooltipOffsetX;
        var mouseY = e.clientY - tooltipOffsetY;
        for (var i = 0; i < chart.CalculatedValues.Dots.length; i++) {
            if (chart.CheckMouseHit(mouseX, mouseY, chart.CalculatedValues.Dots[i]) === true) {
                //var dotrXr = chart.CalculatedValues.Dots[i].rXr;
                //var dx = mouseX - chart.CalculatedValues.Dots[i].X;
                //var dy = mouseY - chart.CalculatedValues.Dots[i].Y;
                //if (dx * dx + dy * dy < dotrXr) {
                canvas.style.left = (chart.CalculatedValues.Dots[i].X) + "px";
                canvas.style.top = (chart.CalculatedValues.Dots[i].Y - 40) + "px";
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                chart.RoundedRect(0, 0, canvas.width, canvas.height, "black", 10);
                ctx.strokeStyle = "white";
                ctx.fillStyle = "white";
                ctx.fillText(chart.CalculatedValues.Dots[i].Label, 5, 15);
                ctx.fillText(chart.CalculatedValues.Dots[i].DatasetTitle + ": " + chart.CalculatedValues.Dots[i].Value, 25, 30);
                ctx.fillStyle = chart.CalculatedValues.Dots[i].Colour;
                ctx.strokeStyle = chart.CalculatedValues.Dots[i].Colour;
                ctx.fillRect(5, 20, 12, 12);
                canvas.style.display = "block";
                return;
            }
        }
        canvas.style.display = "none";
    };
    soby_Chart.prototype.CheckMouseHit = function (mouseX, mouseY, dot) {
        return false;
    };
    soby_Chart.prototype.RoundedRect = function (x, y, width, height, color, radius) {
        var ctx = this.GetTooltipContext();
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
        var tooltipCanvas = $("<canvas id='" + this.ChartTooltipID + "' width='120' height='40' style='position: absolute;'></canvas>");
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
        this.CalculatedValues.InnerPaneWidth = this.Width - this.CalculatedValues.Padding - this.CalculatedValues.xInnerPaneStartPixel;
        this.CalculatedValues.InnerPaneHeight = this.Height - (this.CalculatedValues.Padding * 2) - this.CalculatedValues.xLabelHeight;
        if (this.LabelPosition === SobyChartLabelPosition.Bottom) {
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
        if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart) {
        }
        else {
            if (this.LabelPosition === SobyChartLabelPosition.Bottom) {
                for (var i = 0; i < this.Labels.length; i++) {
                    var xPoint_1 = i * this.CalculatedValues.xLabelWidth + this.CalculatedValues.xInnerPaneStartPixel;
                    ctx.font = "10px Arial";
                    ctx.fillStyle = "#FF0000";
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.Labels[i], xPoint_1, this.Height - 10);
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
    };
    soby_Chart.prototype.getXPixel = function (val) {
        var maxValue = this.CalculatedValues.MaxValue;
        if (this.LabelPosition === SobyChartLabelPosition.Bottom)
            maxValue = this.Labels.length + 1;
        return this.CalculatedValues.xInnerPaneStartPixel + ((this.CalculatedValues.InnerPaneWidth / maxValue) * val);
    };
    soby_Chart.prototype.getYPixel = function (val) {
        var maxValue = this.CalculatedValues.MaxValue;
        if (this.LabelPosition === SobyChartLabelPosition.Left)
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
            ctx.beginPath();
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            for (var i = 0; i < this.Datasets[x].Data.length; i++) {
                var value = this.Datasets[x].Data[i];
                var currentX = this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth);
                var currentY = this.getYPixel(value);
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16));
                if (i === 0) {
                    ctx.moveTo(currentX, currentY);
                }
                else {
                    ctx.lineTo(currentX, currentY);
                }
            }
            ctx.stroke();
        }
        for (var i = 0; i < this.CalculatedValues.Dots.length; i++) {
            ctx.fillStyle = this.CalculatedValues.Dots[i].Colour;
            ctx.beginPath();
            ctx.arc(this.CalculatedValues.Dots[i].X, this.CalculatedValues.Dots[i].Y, 4, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };
    soby_LineChart.prototype.CheckMouseHit = function (mouseX, mouseY, dot) {
        var dx = mouseX - dot.X;
        var dy = mouseY - dot.Y;
        if (dx * dx + dy * dy < dot.rXr) {
            return true;
        }
        return false;
    };
    return soby_LineChart;
}(soby_Chart));
var soby_ColumnChart = /** @class */ (function (_super) {
    __extends(soby_ColumnChart, _super);
    function soby_ColumnChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        return _super.call(this, SobyChartTypes.ColumnChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
    }
    soby_ColumnChart.prototype.PopulateItems = function () {
        _super.prototype.PopulateItems.call(this);
        _super.prototype.DrawPane.call(this);
        var ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();
        this.CalculatedValues.Dots = new Array();
        var columnWidth = (this.CalculatedValues.xLabelWidth - 15) / this.Datasets.length;
        for (var x = 0; x < this.Datasets.length; x++) {
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            for (var i = 0; i < this.Datasets[x].Data.length; i++) {
                var value = this.Datasets[x].Data[i];
                var currentX = this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth) + x * columnWidth;
                var currentY = this.getYPixel(0); //this.Height - value - this.CalculatedValues.xLabelYStartPoint - 50;
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16));
                ctx.beginPath();
                ctx.fillRect(currentX, currentY, columnWidth, this.getYPixel(value) - currentY);
            }
            ctx.stroke();
        }
    };
    soby_ColumnChart.prototype.CheckMouseHit = function (mouseX, mouseY, dot) {
        var dx = mouseX - dot.X;
        var dy = mouseY - dot.Y;
        if (dx * dx + dy * dy < dot.rXr) {
            return true;
        }
        return false;
    };
    return soby_ColumnChart;
}(soby_Chart));
var soby_BarChart = /** @class */ (function (_super) {
    __extends(soby_BarChart, _super);
    function soby_BarChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        var _this = _super.call(this, SobyChartTypes.BarChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this.LabelPosition = SobyChartLabelPosition.Left;
        return _this;
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
        var barHeight = (this.CalculatedValues.yLabelHeight - 15) / this.Datasets.length;
        this.CalculatedValues.Dots = new Array();
        for (var x = 0; x < this.Datasets.length; x++) {
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            for (var i = 0; i < this.Datasets[x].Data.length; i++) {
                var value = this.Datasets[x].Data[i];
                var currentX = this.getXPixel(0); //this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth);
                var currentY = this.CalculatedValues.yInnerPaneStartPixel - (i * this.CalculatedValues.yLabelHeight) - (barHeight * (x + 1));
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16));
                ctx.beginPath();
                ctx.fillRect(currentX, currentY, this.getXPixel(value) - currentX, barHeight);
                //ctx.stroke();
                //ctx.strokeRect(currentX, currentX+20, 0, currentY);
            }
            ctx.stroke();
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
            this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[0].Title, this.Colours[0], currentX, currentY, 4, 16));
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
        var _this = _super.call(this, SobyChartTypes.PieChart, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this.Offset = 0;
        _this.Radius = 0;
        return _this;
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
            var value = this.Datasets[0].Data[i];
            var radius = this.Offset === 0 ? this.Radius : anglePieceRadiusValue * value;
            beginAngle = endAngle;
            endAngle = endAngle + (Math.PI * anglePieceValue * value);
            medianAngle = (endAngle + beginAngle) / 2;
            offsetX = Math.cos(medianAngle) * this.Offset;
            offsetY = Math.sin(medianAngle) * this.Offset;
            ctx.beginPath();
            ctx.fillStyle = this.Colours[i % this.Colours.length];
            ctx.moveTo(startX + offsetX, startY + offsetY);
            ctx.arc(startX + offsetX, startY + offsetY, radius, beginAngle, endAngle);
            ctx.lineTo(startX + offsetX, startY + offsetY);
            ctx.stroke();
            ctx.fill();
        }
    };
    return soby_PieChart;
}(soby_Chart));
var soby_PolarAreaChart = /** @class */ (function (_super) {
    __extends(soby_PolarAreaChart, _super);
    function soby_PolarAreaChart(contentDivSelector, title, datasets, emptyDataHtml, labels) {
        var _this = _super.call(this, contentDivSelector, title, datasets, emptyDataHtml, labels) || this;
        _this.Type = SobyChartTypes.PolarAreaChart;
        _this.Offset = 3;
        return _this;
    }
    return soby_PolarAreaChart;
}(soby_PieChart));
var soby_ChartDataset = /** @class */ (function () {
    function soby_ChartDataset() {
        this.Title = "";
    }
    return soby_ChartDataset;
}());
var soby_ChartDotValue = /** @class */ (function () {
    function soby_ChartDotValue(label, value, datasetTitle, colour, x, y, r, rXr) {
        this.Label = "";
        this.Value = null;
        this.DatasetTitle = "";
        this.Colour = "black";
        this.Label = label;
        this.Value = value;
        this.DatasetTitle = datasetTitle;
        this.Colour = colour;
        this.X = x;
        this.Y = y;
        this.r = r;
        this.rXr = rXr;
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
})(SobyChartTypes || (SobyChartTypes = {}));
var SobyChartLabelPosition;
(function (SobyChartLabelPosition) {
    SobyChartLabelPosition[SobyChartLabelPosition["Left"] = 0] = "Left";
    SobyChartLabelPosition[SobyChartLabelPosition["Bottom"] = 1] = "Bottom";
    SobyChartLabelPosition[SobyChartLabelPosition["Top"] = 2] = "Top";
    SobyChartLabelPosition[SobyChartLabelPosition["Right"] = 3] = "Right";
})(SobyChartLabelPosition || (SobyChartLabelPosition = {}));
// ************************************************************
//# sourceMappingURL=soby.ui.components.charts.js.map