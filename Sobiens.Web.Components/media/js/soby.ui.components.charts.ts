// VERSION 1.0.8.1
// ********************* ITEM SELECTION *****************************
var soby_Charts = new Array();

interface soby_ChartInterface
{
}

class soby_ChartCalculatedValues {
    Dots: Array<soby_ChartDotValue> = null;
    ValueLabelCount: number = 10;

    yLabelXStartPoint: number = 10;
    yLabelYStartPoint: number = 30;
    xLabelXStartPoint: number = this.yLabelXStartPoint + 50;
    xLabelYStartPoint: number = 10;
    xInnerPaneStartPixel: number = 30;
    yInnerPaneStartPixel: number = 30;

    yLabelHeight: number = 0;
    xLabelWidth: number = 0;
    xLabelHeight: number = 30;
    yLabelWidth: number = 50;
    yLabelPieceValue: number = 0;
    xLabelPieceValue: number = 0;
    Padding: number = 20;
    InnerPaneWidth: number = 0;
    InnerPaneHeight: number = 0;

    MaxValue: number = null;
    MinValue: number = null;
    TotalValue: number = null;
}


class soby_Chart implements soby_ChartInterface {
    ChartID: string = "";
    ChartTooltipID: string = "";
    ChartClassName:string = "";
    ContentDivSelector: string = "";
    Title: string = "";
    Height: number = 100;
    Width: number = 200;
    Labels: Array<string>;
    Datasets: Array<soby_ChartDataset> = null;
    EmptyDataHtml: string = "";
    ImagesFolderUrl: string = "/_layouts/1033/images";
    Type: SobyChartTypes = null;
    LabelPosition: SobyChartLabelPosition = SobyChartLabelPosition.Bottom;
    Colours: Array<string> = ["#4472c4", "#ed7d31", "#ffce3a", "#a5a5a5", "#5b9bd5", "#70ad47"];

    CalculatedValues: soby_ChartCalculatedValues = new soby_ChartCalculatedValues();

    constructor(type: SobyChartTypes, contentDivSelector, title, datasets: Array<soby_ChartDataset>, emptyDataHtml, labels: Array<string>) {
        this.ChartID = "soby_chart_" + soby_guid();
        this.ChartTooltipID = this.ChartID + "_tip";
        this.Type = type;
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.Labels = labels;
        this.Datasets = datasets;
        this.EmptyDataHtml = emptyDataHtml;
        this.CalculatedValues.Dots = new Array<soby_ChartDotValue>();
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

    GetContext() {
        return eval("document.getElementById('" + this.ChartID + "').getContext('2d');");
    }

    GetCanvas() {
        return eval("document.getElementById('" + this.ChartID + "');");
    }

    GetTooltipContext() {
        return eval("document.getElementById('" + this.ChartTooltipID + "').getContext('2d');");
    }

    GetTooltipCanvas() {
        return eval("document.getElementById('" + this.ChartTooltipID + "');");
    }

    EnsureItemSelectionExistency() {
        for (const key in soby_Charts) {
            if (key === this.ChartID) {
                return;
            }
        }

        soby_Charts[this.ChartID] = this;
    }

    HandleMouseMove(e: MouseEvent) {
        var chart = soby_Charts[eval("e.target.id")];
        const ctx = chart.GetTooltipContext();
        const canvas = chart.GetTooltipCanvas();
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
    }

    CheckMouseHit(mouseX: number, mouseY: number, dot: soby_ChartDotValue) {
        return false;
    }

    RoundedRect(x, y, width, height, color, radius) {
        const ctx = this.GetTooltipContext();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineJoin = "round";
        ctx.lineWidth = radius;

        ctx.strokeRect(
            x + (radius * .5),
            y + (radius * .5),
            width - radius,
            height - radius
        );

        ctx.fillRect(
            x + (radius * .5),
            y + (radius * .5),
            width - radius,
            height - radius
        );

        ctx.stroke();
        ctx.fill();
    }

    Initialize() {
        $(this.ContentDivSelector).addClass("soby_chart");
        $(this.ContentDivSelector).addClass(this.ChartClassName);
        this.PopulateItems();
    }

    PopulateItems() {
        const canvas = $("<canvas id='" + this.ChartID + "' width='" + this.Width + "' height='" + this.Height + "' style='border: 1px solid;'></canvas>");
        const tooltipCanvas = $("<canvas id='" + this.ChartTooltipID + "' width='120' height='40' style='position: absolute;'></canvas>");
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(canvas);
        $(this.ContentDivSelector).append(tooltipCanvas);
        document.getElementById(this.ChartID).addEventListener('mousemove', this.HandleMouseMove)
    }

    ClickNode(treeViewItemId) {
        if (this.OnClick !== null) {
            this.OnClick(this.ChartID, treeViewItemId);
        }
    }

    CalculateValues() {
        this.CalculatedValues.MinValue = null;
        this.CalculatedValues.MaxValue = 0;
        this.CalculatedValues.TotalValue = 0;
        for (let x = 0; x < this.Datasets.length; x++) {
            for (let i = 0; i < this.Datasets[x].Data.length; i++) {
                const value = this.Datasets[x].Data[i];
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
    }

    DrawPane() {
        this.CalculateValues();
        const ctx = this.GetContext();
        ctx.fillStyle = this.Colours[0];

        if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart) {
        }
        else {
            if (this.LabelPosition === SobyChartLabelPosition.Bottom) {
                for (let i = 0; i < this.Labels.length; i++) {
                    const xPoint = i * this.CalculatedValues.xLabelWidth + this.CalculatedValues.xInnerPaneStartPixel;
                    ctx.font = "10px Arial";
                    ctx.fillStyle = "#FF0000";
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.Labels[i], xPoint, this.Height - 10);

                    ctx.fillStyle = "#ebebeb";
                    ctx.lineWidth = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(xPoint, this.getYPixel(0));
                    ctx.lineTo(xPoint, this.getYPixel(this.CalculatedValues.MaxValue));
                    ctx.stroke();
                }

                const xPoint = (this.Labels.length) * this.CalculatedValues.xLabelWidth + this.CalculatedValues.xInnerPaneStartPixel;
                ctx.fillStyle = "#ebebeb";
                ctx.lineWidth = 0.2;
                ctx.beginPath();
                ctx.moveTo(xPoint, this.getYPixel(0));
                ctx.lineTo(xPoint, this.getYPixel(this.CalculatedValues.MaxValue));
                ctx.stroke();

                for (let i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    const yPoint = this.getYPixel(i * this.CalculatedValues.yLabelPieceValue);
                    ctx.fillStyle = "#FF0000";
                    ctx.lineWidth = 1;
                    ctx.font = "10px Arial";
                    ctx.strokeText(i * this.CalculatedValues.yLabelPieceValue, this.CalculatedValues.yLabelXStartPoint, yPoint);

                    ctx.fillStyle = "#ebebeb";
                    ctx.lineWidth = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(this.CalculatedValues.xInnerPaneStartPixel, yPoint);
                    ctx.lineTo(xPoint, yPoint);//this.Width - this.CalculatedValues.xInnerPaneStartPixel - this.CalculatedValues.Padding
                    ctx.stroke();
                }
            }
            else {
                for (let i = 0; i < this.Labels.length; i++) {
                    const yPoint = this.getYPixel(i);
                    const xPoint = this.CalculatedValues.Padding;
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

                const yPoint1 = this.getYPixel(this.Labels.length);
                ctx.fillStyle = "#ebebeb";
                ctx.lineWidth = 0.2;
                ctx.beginPath();
                ctx.moveTo(this.CalculatedValues.xInnerPaneStartPixel, yPoint1);
                ctx.lineTo(this.CalculatedValues.xInnerPaneStartPixel + this.CalculatedValues.InnerPaneWidth, yPoint1);
                ctx.stroke();

                for (let i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    const yPoint = this.CalculatedValues.yInnerPaneStartPixel + this.CalculatedValues.yLabelHeight;
                    const xPoint = this.getXPixel(i * this.CalculatedValues.xLabelPieceValue);
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
    }

    getXPixel(val) {
        let maxValue = this.CalculatedValues.MaxValue;
        if (this.LabelPosition === SobyChartLabelPosition.Bottom)
            maxValue = this.Labels.length+1;

        return this.CalculatedValues.xInnerPaneStartPixel + ((this.CalculatedValues.InnerPaneWidth / maxValue) * val);
    }

    getYPixel(val) {
        let maxValue = this.CalculatedValues.MaxValue;
        if (this.LabelPosition === SobyChartLabelPosition.Left)
            maxValue = this.Labels.length;

        return this.CalculatedValues.yInnerPaneStartPixel - ((this.CalculatedValues.InnerPaneHeight / maxValue) * val);
    }

    OnSelectionChanged = null;
    OnClick = null;
}


class soby_LineChart extends soby_Chart {
    constructor(contentDivSelector, title, datasets: Array<soby_ChartDataset>, emptyDataHtml, labels: Array<string>) {
        super(SobyChartTypes.LineChart, contentDivSelector, title, datasets, emptyDataHtml, labels);
    }

    PopulateItems() {
        super.PopulateItems();
        super.DrawPane();
        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";

        this.CalculatedValues.Dots = new Array<soby_ChartDotValue>();
        for (let x = 0; x < this.Datasets.length; x++) {
            ctx.beginPath();
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            for (let i = 0; i < this.Datasets[x].Data.length; i++) {
                const value = this.Datasets[x].Data[i];
                const currentX = this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth);
                const currentY = this.getYPixel(value);
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

        for (let i = 0; i < this.CalculatedValues.Dots.length; i++) {
            ctx.fillStyle = this.CalculatedValues.Dots[i].Colour;
            ctx.beginPath();
            ctx.arc(this.CalculatedValues.Dots[i].X, this.CalculatedValues.Dots[i].Y, 4, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }

    CheckMouseHit(mouseX: number, mouseY: number, dot: soby_ChartDotValue) {
        var dx = mouseX - dot.X;
        var dy = mouseY - dot.Y;
        if (dx * dx + dy * dy < dot.rXr) {
            return true;
        }

        return false;
    }

}

class soby_ColumnChart extends soby_Chart {
    constructor(contentDivSelector, title, datasets: Array<soby_ChartDataset>, emptyDataHtml, labels: Array<string>) {
        super(SobyChartTypes.ColumnChart, contentDivSelector, title, datasets, emptyDataHtml, labels);
    }

    PopulateItems() {
        super.PopulateItems();
        super.DrawPane();

        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        this.CalculatedValues.Dots = new Array<soby_ChartDotValue>();
        const columnWidth = (this.CalculatedValues.xLabelWidth-15) / this.Datasets.length;
        for (let x = 0; x < this.Datasets.length; x++) {
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            for (let i = 0; i < this.Datasets[x].Data.length; i++) {
                const value = this.Datasets[x].Data[i];
                const currentX = this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth) + x * columnWidth;
                const currentY = this.getYPixel(0) //this.Height - value - this.CalculatedValues.xLabelYStartPoint - 50;
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16));
                ctx.beginPath();
                ctx.fillRect(currentX, currentY, columnWidth, this.getYPixel(value) - currentY);
            }
            ctx.stroke();
        }
    }

    CheckMouseHit(mouseX: number, mouseY: number, dot: soby_ChartDotValue) {
        var dx = mouseX - dot.X;
        var dy = mouseY - dot.Y;
        if (dx * dx + dy * dy < dot.rXr) {
            return true;
        }

        return false;
    }

}

class soby_BarChart extends soby_Chart {
    constructor(contentDivSelector, title, datasets: Array<soby_ChartDataset>, emptyDataHtml, labels: Array<string>) {
        super(SobyChartTypes.BarChart, contentDivSelector, title, datasets, emptyDataHtml, labels);
        this.LabelPosition = SobyChartLabelPosition.Left;
    }

    PopulateItems() {
        super.PopulateItems();
        super.DrawPane();

        const ctx = this.GetContext();
        ctx.fillStyle = this.Colours[0];
        ctx.strokeStyle = this.Colours[0];
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        const barHeight = (this.CalculatedValues.yLabelHeight-15) / this.Datasets.length;
        this.CalculatedValues.Dots = new Array<soby_ChartDotValue>();
        for (let x = 0; x < this.Datasets.length; x++) {
            ctx.fillStyle = this.Colours[x];
            ctx.strokeStyle = this.Colours[x];
            for (let i = 0; i < this.Datasets[x].Data.length; i++) {
                const value = this.Datasets[x].Data[i];
                const currentX = this.getXPixel(0); //this.CalculatedValues.xInnerPaneStartPixel + (i * this.CalculatedValues.xLabelWidth);
                const currentY = this.CalculatedValues.yInnerPaneStartPixel - (i * this.CalculatedValues.yLabelHeight) - (barHeight*(x+1));
                this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[x].Title, this.Colours[x], currentX, currentY, 4, 16));
                ctx.beginPath();
                ctx.fillRect(currentX, currentY, this.getXPixel(value) - currentX, barHeight);
                //ctx.stroke();
                //ctx.strokeRect(currentX, currentX+20, 0, currentY);
            }
            ctx.stroke();
        }
    }
}

class soby_RadarChart extends soby_Chart {
    constructor(contentDivSelector, title, datasets: Array<soby_ChartDataset>, emptyDataHtml, labels: Array<string>) {
        super(SobyChartTypes.RadarChart, contentDivSelector, title, datasets, emptyDataHtml, labels);
    }

    PopulateItems() {
        super.PopulateItems();
        super.DrawPane();

        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        this.CalculatedValues.Dots = new Array<soby_ChartDotValue>();
        for (let i = 0; i < this.Datasets[0].Data.length; i++) {
            const value = this.Datasets[0].Data[i];
            const currentX = this.CalculatedValues.xLabelXStartPoint + (i * this.CalculatedValues.xLabelWidth);
            const currentY = this.Height - value - this.CalculatedValues.xLabelYStartPoint - 50;
            this.CalculatedValues.Dots.push(new soby_ChartDotValue(this.Labels[i], value, this.Datasets[0].Title, this.Colours[0], currentX, currentY, 4, 16));
            ctx.beginPath();
            ctx.rect(currentX, currentY + 30, 20, value);
            ctx.stroke();
            //ctx.strokeRect(currentX, currentX+20, 0, currentY);
        }
        ctx.stroke();
    }
}

class soby_PieChart extends soby_Chart {
    Offset: number = 0;
    Radius: number = 0;

    constructor(contentDivSelector, title, datasets: Array<soby_ChartDataset>, emptyDataHtml, labels: Array<string>) {
        super(SobyChartTypes.PieChart, contentDivSelector, title, datasets, emptyDataHtml, labels);
    }

    PopulateItems() {
        super.PopulateItems();
        super.DrawPane();
        this.Radius = (this.Height - (this.CalculatedValues.Padding * 2) - this.CalculatedValues.xLabelHeight)/2;

        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        const anglePieceValue: number = 2 / this.CalculatedValues.TotalValue;
        const anglePieceRadiusValue: number = this.Radius / this.CalculatedValues.MaxValue;
        const startX: number = (this.Width - this.Radius) / 2 + this.CalculatedValues.Padding;
        const startY: number = this.Height - this.Radius - this.CalculatedValues.Padding;
        var beginAngle = 0;
        var endAngle = 0;
        var offsetX, offsetY, medianAngle;
        this.CalculatedValues.Dots = new Array<soby_ChartDotValue>();
        for (let i = 0; i < this.Datasets[0].Data.length; i++) {
            const value = this.Datasets[0].Data[i];
            const radius = this.Offset === 0 ? this.Radius : anglePieceRadiusValue * value;
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
    }
}

class soby_PolarAreaChart extends soby_PieChart {
    constructor(contentDivSelector, title, datasets: Array<soby_ChartDataset>, emptyDataHtml, labels: Array<string>) {
        super(contentDivSelector, title, datasets, emptyDataHtml, labels);
        this.Type = SobyChartTypes.PolarAreaChart;
        this.Offset = 3;
    }
    /*
    PopulateItems() {
        super.PopulateItems();
        super.DrawPane();
    }
    */
}

class soby_ChartDataset {
    Title: string = "";
    Data: Array<number>;
}
class soby_ChartDotValue {
    Label: string = "";
    Value: number = null;
    DatasetTitle: string = "";
    Colour: string = "black";
    X: number;
    Y: number;
    r: number;
    rXr: number;

    constructor(label: string, value: number, datasetTitle: string, colour: string, x: number, y: number, r: number, rXr: number) {
        this.Label = label;
        this.Value = value;
        this.DatasetTitle = datasetTitle;
        this.Colour = colour;
        this.X = x;
        this.Y = y;
        this.r = r;
        this.rXr = rXr;
    }
}

enum SobyChartTypes {
    LineChart = 0,
    BarChart = 1,
    RadarChart = 2,
    PieChart = 3,
    PolarAreaChart = 4,
    ColumnChart = 5
}

enum SobyChartLabelPosition {
    Left = 0,
    Bottom = 1,
    Top = 2,
    Right = 3
}

// ************************************************************
