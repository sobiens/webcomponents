// VERSION 1.0.8.1


// ********************* ITEM SELECTION *****************************
var sobyCharts = new Array();

class SobyChartCalculatedValues {
    Chart: SobyChart = null;
    ValueLabelCount = 10;

    VerticalAxisLabelHeight = 0;
    VerticalAxisTitleWidth = 30;
    HorizontalAxisLabelWidth = 0;
    HorizontalAxisLabelHeight = 30;
    HorizontalAxisTitleHeight = 30;
    VerticalAxisLabelWidth = 50;
    VerticalAxisLabelPieceValue = 0;
    HorizontalAxisLabelPieceValue = 0;
    Padding = 20;
    PlotAreaWidth = 0;
    PlotAreaHeight = 0;
    LegendPanelWidth = 0;
    LegendPanelHeight = 0;

    MaxValue: number = null;
    MinValue: number = null;
    TotalValue: number = null;

    VerticalAxisLabelXStartPoint = 10;
    VerticalAxisLabelYStartPoint = 30;
    HorizontalAxisLabelXStartPoint = this.VerticalAxisLabelXStartPoint + 50;
    HorizontalAxisLabelYStartPoint = 10;

    VerticalAxisTitleXStartPoint = 0;
    VerticalAxisTitleYStartPoint = 0;
    HorizontalAxisTitleXStartPoint = 0;
    HorizontalAxisTitleYStartPoint = 0;

    xPlotAreaStartPixel = 30;
    yPlotAreaStartPixel = 30;

    constructor(chart: SobyChart) {
        this.Chart = chart;
    }

    Calculate() {
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
        for (let x = 0; x < this.Chart.Datasets.length; x++) {
            for (let i = 0; i < this.Chart.Datasets[x].Data.length; i++) {
                const value = this.Chart.Datasets[x].Data[i];
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
    }
}

class SobyAxisSettings {
    Title: string = null;
    TitleFont = "10px Arial";
    TitleColour = "#000000";
    LabelFont = "10px Arial";
    LabelColour = "#000000";
}

class SobyPlotAreaSettings {
    Colour = "#000000";
    //Colour = "#0d6efd";
    LineWidth: number = 0.2;
}

class SobyTitleSettings {
    Title = "";
    Font = "10px Arial";
    Colour = "#000000";
}

class SobyLabelSettings {
    LabelPosition: SobyChartElementPosition = SobyChartElementPosition.Bottom;
    Labels: Array<string>;
    Colours: Array<string> = ["#4472c4", "#ed7d31", "#ffce3a", "#a5a5a5", "#5b9bd5", "#70ad47"];
    Font = "10px Arial";
    DialogTextColour = "#000000";
    // $label - $value - $percentage
    Format = "$label";
}

class SobyChart {
    ChartID = "";
    ChartTooltipID = "";
    ChartClassName = "";
    ContentDivSelector = "";
    Title: SobyTitleSettings = null;
    Height: number = 100;
    Width: number = 200;
    Datasets: Array<SobyChartDataset> = null;
    EmptyDataHtml = "";
    Type: SobyChartTypes = null;
    Legend: SobyLegendPanel = null;
    Label: SobyLabelSettings = new SobyLabelSettings();
    PlotAreaSettings: SobyPlotAreaSettings = new SobyPlotAreaSettings();
    VerticalAxisSettings: SobyAxisSettings = new SobyAxisSettings();
    HorizontalAxisSettings: SobyAxisSettings = new SobyAxisSettings();
    ChartParts: Array<SobyChartPart> = new Array<SobyChartPart>();
    CalculatedValues: SobyChartCalculatedValues = new SobyChartCalculatedValues(this);
    MouseOverDotIndex: Array<number> = null;

    constructor(contentDivSelector, title, datasets: Array<SobyChartDataset>, emptyDataHtml, labels: Array<string>) {
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

        for (let i = 0; i < this.Datasets.length; i++) {
            this.ChartParts.push(sobyChartPartFactory.GetChartPart(this, this.Datasets[i]));
            this.Datasets[i].Colour = this.Label.Colours[i];
            this.Datasets[i].Index = i;
        }
    }

    GetContext() {
        return eval("document.getElementById('" + this.ChartID + "').getContext('2d');");
    }

    GetCanvas() {
        return eval("document.getElementById('" + this.ChartID + "');");
    }

    /*
    GetTooltipContext() {
        return eval("document.getElementById('" + this.ChartTooltipID + "').getContext('2d');");
    }
    */

    GetTooltipContainer() {
        return eval("document.getElementById('" + this.ChartTooltipID + "');");
    }

    EnsureItemSelectionExistency() {
        for (const key in sobyCharts) {
            if (key === this.ChartID) {
                return;
            }
        }

        sobyCharts[this.ChartID] = this;
    }

    RenderTooltip(tooltipContainer, dataItem, x, y) {
        tooltipContainer.style.border = "5px solid black";
        tooltipContainer.style.borderRadius = "10px";
        tooltipContainer.style.width = "125px";
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //chart.RoundedRect(0, 0, canvas.width, canvas.height, "black", 10);
        const rootContainer = $("<div></div>");
        const container = $("<div style='color:white;background-color: black;padding:5px;font-size:12px;font-family: \"Segoe UI\", \"Segoe UI Web(West European)\", \"Segoe UI\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif;'></div>");
        container.append(dataItem.Label);
        container.append("<br>");
        container.append("<div style='background-color: " + dataItem.Colour + ";width: 25px;float: left;'>&nbsp;</div>&nbsp;");
        container.append(dataItem.DatasetTitle + ": " + dataItem.Value);
        rootContainer.append(container);
        tooltipContainer.innerHTML = rootContainer.html();
    }

    TransformLightenDarkenColor(col, amt) {
        let usePound = false;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
        const num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        let g = (num & 0x0000FF) + amt;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    RestoreDotColours() {
        for (let i = 0; i < this.ChartParts.length; i++) {
            this.ChartParts[i].RestoreDotColours();
        }
    }

    HandleMouseMove(e: MouseEvent) {
        const chart = sobyCharts[eval("e.target.id")];
        //const ctx1 = chart.GetContext();
        //const ctx = chart.GetTooltipContext();
        const tooltipContainer = chart.GetTooltipContainer();
        const canvasOffset = $("#" + chart.ChartID).offset();
        const tooltipOffsetX = canvasOffset.left - $(window).scrollLeft();
        const tooltipOffsetY = canvasOffset.top - $(window).scrollTop();
        const mouseX = e.clientX - tooltipOffsetX;
        const mouseY = e.clientY - tooltipOffsetY;
        //for (let i = 0; i < chart.ChartParts.length; i++) {
        //    chart.ChartParts[i].RestoreDotColours();
        //}

        for (let i = 0; i < chart.ChartParts.length; i++) {
            if (chart.ChartParts[i].HandleMouseMove(mouseX, mouseY) === true) {
                return;
            }
        }
        //chart.RestoreDotColours();
        //chart.MouseOverDotIndex = null;
        tooltipContainer.style.display = "none"; 
    }


    RoundedRect(x, y, width, height, color, radius) {
        const ctx = this.GetTooltipContainer();
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
        this.DrawPane();
        for (let i = 0; i < this.ChartParts.length; i++) {
            this.ChartParts[i].PopulateItems();
        }

    }

    PopulateItems() {
        const canvas = $("<canvas id='" + this.ChartID + "' width='" + this.Width + "' height='" + this.Height + "' style='border: 1px solid;'></canvas>");
        const tooltipCanvas = $("<div id='" + this.ChartTooltipID + "' width='120' height='40' style='position: absolute;'></div>");
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(canvas);
        $(this.ContentDivSelector).append(tooltipCanvas);
        document.getElementById(this.ChartID).addEventListener('mousemove', this.HandleMouseMove);
    }

    ClickNode(treeViewItemId) {
        if (this.OnClick !== null) {
            this.OnClick(this.ChartID, treeViewItemId);
        }
    }

    CalculateValues() {
        this.CalculatedValues.Calculate();
    }

    DrawPane() {
        this.CalculateValues();
        const ctx = this.GetContext();
        ctx.fillStyle = this.Label.Colours[0];

        if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart || this.Type === SobyChartTypes.DoughnutChart) {
        }
        else {
            if (this.Label.LabelPosition === SobyChartElementPosition.Bottom) {
                for (let i = 0; i < this.Label.Labels.length; i++) {
                    const xPoint = i * this.CalculatedValues.HorizontalAxisLabelWidth + this.CalculatedValues.xPlotAreaStartPixel;
                    ctx.font = this.HorizontalAxisSettings.LabelFont;
                    ctx.strokeStyle = this.HorizontalAxisSettings.LabelColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.Label.Labels[i], xPoint, this.CalculatedValues.HorizontalAxisLabelYStartPoint);

                    ctx.beginPath();
                    ctx.strokeStyle = this.PlotAreaSettings.Colour;
                    ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                    ctx.moveTo(xPoint, this.getYPixel(0));
                    ctx.lineTo(xPoint, this.getYPixel(this.CalculatedValues.MaxValue));
                    ctx.stroke();
                }

                const xPoint = (this.Label.Labels.length) * this.CalculatedValues.HorizontalAxisLabelWidth + this.CalculatedValues.xPlotAreaStartPixel;
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

                for (let i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    const yPoint = this.getYPixel(i * this.CalculatedValues.VerticalAxisLabelPieceValue);
                    ctx.font = this.VerticalAxisSettings.LabelFont;
                    ctx.strokeStyle = this.VerticalAxisSettings.LabelColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(i * this.CalculatedValues.VerticalAxisLabelPieceValue, this.CalculatedValues.VerticalAxisLabelXStartPoint, yPoint);

                    ctx.beginPath();
                    ctx.strokeStyle = this.PlotAreaSettings.Colour;
                    ctx.lineWidth = this.PlotAreaSettings.LineWidth;
                    ctx.moveTo(this.CalculatedValues.xPlotAreaStartPixel, yPoint);
                    ctx.lineTo(xPoint, yPoint);//this.Width - this.CalculatedValues.xPlotAreaStartPixel - this.CalculatedValues.Padding
                    ctx.stroke();
                }
            }
            else {
                for (let i = 0; i < this.Label.Labels.length; i++) {
                    const yPoint = this.getYPixel(i);
                    const xPoint = this.CalculatedValues.VerticalAxisLabelXStartPoint;
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

                const yPoint1 = this.getYPixel(this.Label.Labels.length);
                if (this.HorizontalAxisSettings.Title !== null && this.HorizontalAxisSettings.Title !== "") {
                    ctx.font = this.HorizontalAxisSettings.TitleFont;
                    ctx.strokeStyle = this.HorizontalAxisSettings.TitleColour;
                    ctx.lineWidth = 1;
                    ctx.strokeText(this.HorizontalAxisSettings.Title, this.CalculatedValues.xPlotAreaStartPixel, this.CalculatedValues.yPlotAreaStartPixel + this.CalculatedValues.HorizontalAxisLabelHeight + this.CalculatedValues.HorizontalAxisTitleHeight);
                }

                if (this.VerticalAxisSettings.Title !== null && this.VerticalAxisSettings.Title !== "") {
                    ctx.save();
                    const titleWidth = ctx.measureText(this.VerticalAxisSettings.Title).width;
                    const radianAngle = Math.PI / 2;
                    const endingX = this.CalculatedValues.VerticalAxisTitleXStartPoint+20;
                    const centerY = this.CalculatedValues.yPlotAreaStartPixel-100;
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

                for (let i = 0; i < this.CalculatedValues.ValueLabelCount + 1; i++) {
                    const yPoint = this.CalculatedValues.yPlotAreaStartPixel + this.CalculatedValues.VerticalAxisLabelHeight;
                    const xPoint = this.getXPixel(i * this.CalculatedValues.HorizontalAxisLabelPieceValue);
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
            const titles: Array<string> = new Array<string>();
            if (this.Type === SobyChartTypes.PieChart || this.Type === SobyChartTypes.PolarAreaChart || this.Type === SobyChartTypes.DoughnutChart) {
                for (let x = 0; x < this.Label.Labels.length; x++) {
                    titles.push(this.Label.Labels[x]);
                }
            }
            else {
                for (let x = 0; x < this.Datasets.length; x++) {
                    titles.push(this.Datasets[x].Title);
                }
            }

            let titleAligment: SobyChartAligment = SobyChartAligment.Horizontally;
            if (this.Legend.Position === SobyChartElementPosition.Left || this.Legend.Position === SobyChartElementPosition.Right) {
                titleAligment = SobyChartAligment.Vertically;
            }

            let legendPanelX: number = 10;
            let legendPanelY: number = 10;
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
    }

    getXPixel(val) {
        let maxValue = this.CalculatedValues.MaxValue;
        if (this.Label.LabelPosition === SobyChartElementPosition.Bottom)
            maxValue = this.Label.Labels.length+1;

        return this.CalculatedValues.xPlotAreaStartPixel + ((this.CalculatedValues.PlotAreaWidth / maxValue) * val);
    }

    getYPixel(val) {
        let maxValue = this.CalculatedValues.MaxValue;
        if (this.Label.LabelPosition === SobyChartElementPosition.Left)
            maxValue = this.Label.Labels.length;

        return this.CalculatedValues.yPlotAreaStartPixel - ((this.CalculatedValues.PlotAreaHeight / maxValue) * val);
    }

    OnSelectionChanged = null;
    OnClick = null;
}

class SobyChartPartFactory {
    GetChartPart(chart: SobyChart, dataset: SobyChartDataset): SobyChartPart {
        let chartPart = null;
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
    }
}

class SobyChartPart {
    Chart: SobyChart;
    Type: SobyChartTypes = null;
    Dataset: SobyChartDataset;
    Dots: Array<SobyChartDotValue> = null;
    //MouseOverDotIndex: number = null;
    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        this.Chart = chart;
        this.Dataset = dataset;
        this.Dots = new Array<SobyChartDotValue>();
    }

    GetContext() {
        return this.Chart.GetContext();
    }

    GetCalculatedValues() {
        return this.Chart.CalculatedValues;
    }

    RestoreDotColours() {
        //this.MouseOverDotIndex = null;
        for (let i = 0; i < this.Dots.length; i++) {
            const dot = this.Dots[i];
            if (dot.CurrentColour !== dot.Colour) {
                dot.CurrentColour = dot.Colour;
                const ctx1 = this.GetContext();
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
    }

    SetMouseOverColour(mouseOverDotDatasetIndex: number, mouseOverDotIndex: number) {
        this.Chart.MouseOverDotIndex = [mouseOverDotDatasetIndex, mouseOverDotIndex];

        const dot = this.Dots[mouseOverDotIndex];
        dot.CurrentColour = this.Chart.TransformLightenDarkenColor(dot.Colour, 30);
        const ctx1 = this.GetContext();
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
    }

    CheckMouseHit(mouseX: number, mouseY: number, dot: SobyChartDotValue) {
        const ctx = this.GetContext();
        if (this.Type === SobyChartTypes.LineChart) {
            return ctx.isPointInStroke(dot.Path2D, mouseX, mouseY);
        }
        else {
            return ctx.isPointInPath(dot.Path2D, mouseX, mouseY);
        }
    }

    HandleMouseMove(mouseX, mouseY): boolean {
        //var chart = sobyCharts[eval("e.target.id")];
        //const ctx1 = chart.GetContext();
        //const ctx = chart.GetTooltipContext();
        const tooltipContainer = this.Chart.GetTooltipContainer();
        //var canvasOffset = $("#" + chart.ChartID).offset();
        //var tooltipOffsetX = canvasOffset.left - $(window).scrollLeft();
        //var tooltipOffsetY = canvasOffset.top - $(window).scrollTop();
        //var mouseX = e.clientX - tooltipOffsetX;
        //var mouseY = e.clientY - tooltipOffsetY;
        for (let i = 0; i < this.Dots.length; i++) {
            const dot = this.Dots[i];
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
    }

    GenerateLabelFromFormat(label: string, value: number, percentage: number) {
        return this.Chart.Label.Format.replace(/\$label/gi, label).replace(/\$value/gi, value.toString()).replace(/\$percentage/gi, percentage.toString());
    }

    PopulateItems() { }
}

class SobyLineChartPart extends SobyChartPart { 
    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        super(chart, dataset);
        this.Type = SobyChartTypes.LineChart;
    }

    PopulateItems() {
        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";

        this.Dots = new Array<SobyChartDotValue>();
        ctx.fillStyle = this.Dataset.Colour;
        ctx.strokeStyle = this.Dataset.Colour;

        let previousX = 0;
        let previousY = 0;

        for (let i = 0; i < this.Dataset.Data.length; i++) {
            const slice = new Path2D();
            const value = this.Dataset.Data[i];
            const currentX = this.GetCalculatedValues().xPlotAreaStartPixel + (i * this.GetCalculatedValues().HorizontalAxisLabelWidth);
            const currentY = this.Chart.getYPixel(value);
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

        for (let i = 0; i < this.Dots.length; i++) {
            ctx.fillStyle = this.Dots[i].Colour;
            ctx.beginPath();
            ctx.arc(this.Dots[i].X, this.Dots[i].Y, 4, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
}

class SobyColumnChartPart extends SobyChartPart {
    ColumnWidth: number = null;
    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        super(chart, dataset);
        this.Type = SobyChartTypes.ColumnChart;
    }

    PopulateItems() {
        //super.PopulateItems();
        //super.DrawPane();

        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        this.Dots = new Array<SobyChartDotValue>();
        this.ColumnWidth = (this.GetCalculatedValues().HorizontalAxisLabelWidth - 15) / this.Chart.Datasets.length;
        for (let i = 0; i < this.Dataset.Data.length; i++) {
            ctx.fillStyle = this.Dataset.Colour;
            ctx.strokeStyle = this.Dataset.Colour;
            if (this.Chart.MouseOverDotIndex !== null && this.Dataset.Index === this.Chart.MouseOverDotIndex[0] && i === this.Chart.MouseOverDotIndex[1]) {
                ctx.fillStyle = "purple";
                ctx.strokeStyle = "purple";
            }

            const slice = new Path2D();
            const value = this.Dataset.Data[i];
            const currentX = this.GetCalculatedValues().xPlotAreaStartPixel + (i * this.GetCalculatedValues().HorizontalAxisLabelWidth) + this.Dataset.Index * this.ColumnWidth;
            const currentY = this.Chart.getYPixel(0) //this.Height - value - this.CalculatedValues.horizontalAxisLabelYStartPoint - 50;
            slice.rect(currentX, currentY, this.ColumnWidth, this.Chart.getYPixel(value) - currentY);
            ctx.fill(slice);
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Dataset.Colour, currentX, currentY, 4, 16, slice));
        }
    }

    /*
    CheckMouseHit(mouseX: number, mouseY: number, dot: SobyChartDotValue) {
        
        if (
            mouseX >= dot.X && mouseX <= (dot.X + this.ColumnWidth)
            && mouseY <= this.getYPixel(0) && mouseY >= this.getYPixel(dot.Value)
        ) {
            return true;
        }

        return false;
    }
    */
}

class SobyBarChartPart extends SobyChartPart {
    BarHeight: number = null;
    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        super(chart, dataset);
        this.Type = SobyChartTypes.BarChart;
        this.Chart.Label.LabelPosition = SobyChartElementPosition.Left;
    }

    PopulateItems() {
        //super.PopulateItems();
        //super.DrawPane();

        const ctx = this.GetContext();
        ctx.fillStyle = this.Dataset.Colour;
        ctx.strokeStyle = this.Dataset.Colour;
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        this.BarHeight = (this.GetCalculatedValues().VerticalAxisLabelHeight - 15) / this.Chart.Datasets.length;
        this.Dots = new Array<SobyChartDotValue>();
        ctx.fillStyle = this.Dataset.Colour;
        ctx.strokeStyle = this.Dataset.Colour;
        for (let i = 0; i < this.Dataset.Data.length; i++) {
            const slice = new Path2D();
            const value = this.Dataset.Data[i];
            const currentX = this.Chart.getXPixel(0); //this.CalculatedValues.xPlotAreaStartPixel + (i * this.CalculatedValues.horizontalAxisLabelWidth);
            const currentY = this.GetCalculatedValues().yPlotAreaStartPixel - (i * this.GetCalculatedValues().VerticalAxisLabelHeight) - (this.BarHeight * (this.Dataset.Index + 1));
            slice.rect(currentX, currentY, this.Chart.getXPixel(value) - currentX, this.BarHeight);
            ctx.fill(slice);
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Dataset.Colour, currentX, currentY, 4, 16, slice));
        }
        //ctx.stroke();
    }
    /*
    CheckMouseHit(mouseX: number, mouseY: number, dot: SobyChartDotValue) {
        if (
            mouseX >= this.getXPixel(0) && mouseX <= this.getXPixel(dot.Value)
            && mouseY <= (dot.Y + this.BarHeight) && mouseY >= dot.Y
        ) {
            return true;
        }

        return false;
    }
    */
}

class SobyRadarChartPart extends SobyChartPart {
    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        super(chart, dataset);
        this.Type = SobyChartTypes.RadarChart;
    }

    PopulateItems() {
        //super.PopulateItems();
        //super.DrawPane();

        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        this.Dots = new Array<SobyChartDotValue>();
        for (let i = 0; i < this.Dataset.Data.length; i++) {
            const value = this.Dataset.Data[i];
            const currentX = this.GetCalculatedValues().HorizontalAxisLabelXStartPoint + (i * this.GetCalculatedValues().HorizontalAxisLabelWidth);
            const currentY = this.Chart.Height - value - this.GetCalculatedValues().HorizontalAxisLabelYStartPoint - 50;
            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Dataset.Colour, currentX, currentY, 4, 16, null));
            ctx.beginPath();
            ctx.rect(currentX, currentY + 30, 20, value);
            ctx.stroke();
            //ctx.strokeRect(currentX, currentX+20, 0, currentY);
        }
        ctx.stroke();
    }
}

class SobyPieChartPart extends SobyChartPart {
    Offset: number = 0;
    Radius: number = 0;

    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        super(chart, dataset);
        this.Type = SobyChartTypes.PieChart;
        this.GetCalculatedValues().Padding = 40;
    }

    PopulateItems() {
        //super.PopulateItems();
        //super.DrawPane();
        this.Radius = (this.Chart.Height - (this.GetCalculatedValues().Padding * 2) - this.GetCalculatedValues().HorizontalAxisLabelHeight) / 2;

        const ctx = this.GetContext();
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.beginPath();

        const anglePieceValue: number = 2 / this.GetCalculatedValues().TotalValue;
        const anglePieceRadiusValue: number = this.Radius / this.GetCalculatedValues().MaxValue;
        const startX: number = (this.Chart.Width - this.Radius) / 2 + this.GetCalculatedValues().Padding;
        const startY: number = this.Chart.Height - this.Radius - this.GetCalculatedValues().Padding;
        var beginAngle = 0;
        var endAngle = 0;
        var offsetX, offsetY, medianAngle;
        this.Dots = new Array<SobyChartDotValue>();
        for (let i = 0; i < this.Dataset.Data.length; i++) {
            const slice = new Path2D();
            const value = this.Dataset.Data[i];
            const radius = this.Offset === 0 ? this.Radius : anglePieceRadiusValue * value;
            beginAngle = endAngle;
            endAngle = endAngle + (Math.PI * anglePieceValue * value);
            medianAngle = (endAngle + beginAngle) / 2;
            const percentage = Math.round(100 * 100 * value / this.GetCalculatedValues().TotalValue) / 100;
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
                slice.arc(startX + offsetX, startY + offsetY, radius - ctx.lineWidth/2, beginAngle, endAngle);
                ctx.stroke(slice);
            }

            const centerAngle = ((beginAngle + endAngle) / 2);
            let labelXPoint = 0;
            let labelYPoint = 0;
            const ninetyDegreeValue = Math.PI / 2;
            const distanceFromCircle = 10;
            labelXPoint = startX + Math.cos(centerAngle) * (this.Radius + distanceFromCircle); //(this.Radius + distanceFromCircle) * Math.cos(pieceAngle);
            labelYPoint = startY + Math.sin(centerAngle) * (this.Radius + distanceFromCircle); //(this.Radius + distanceFromCircle) * Math.cos(pieceAngle);
            let labelRectX = labelXPoint;
            let labelRectY = labelYPoint;
            if (centerAngle < ninetyDegreeValue) {
            }
            else if (centerAngle < ninetyDegreeValue * 2) {
                labelXPoint -= 30;
                labelRectX = labelXPoint-100;
                labelRectY = labelYPoint-20;
            }
            else if (centerAngle < ninetyDegreeValue*3) {
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

            let labelWidth = 50;
            const label = this.GenerateLabelFromFormat(this.Chart.Label.Labels[i], value, percentage);
            if (label.length * 5.4 > labelWidth)
                labelWidth = label.length * 5.4;
            const slice1 = new Path2D();
            slice1.rect(labelRectX, labelRectY, labelWidth, 15);
            ctx.fillStyle = this.Chart.Label.Colours[i % this.Chart.Label.Colours.length];
            ctx.lineWidth = 0.3;
            ctx.font = "normal 10px Arial";
            ctx.strokeStyle = "#FFFFFF";
            ctx.fill(slice1);
            ctx.strokeText(label, labelRectX + 5, labelRectY+12);

            this.Dots.push(new SobyChartDotValue(this.Chart.Label.Labels[i], value, this.Dataset.Title, this.Chart.Label.Colours[i % this.Chart.Label.Colours.length], startX + offsetX, startY + offsetY, radius, 16, slice));
        }
    }
}

class SobyPolarAreaChartPart extends SobyPieChartPart {
    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        super(chart, dataset);
        this.Type = SobyChartTypes.PolarAreaChart;
        this.Offset = 3;
    }

}

class SobyDoughnutChartPart extends SobyPieChartPart {
    constructor(chart: SobyChart, dataset: SobyChartDataset) {
        super(chart, dataset);
        this.Type = SobyChartTypes.DoughnutChart;
        this.Offset = 0;
    }
}

class SobyLegendPanel {
    Chart: SobyChart = null;
    Height: number = null;
    Width: number = null;
    X: number = null;
    Y: number = null;
    Titles: Array<string> = null;
    Colours: Array<string> = null;
    Position: SobyChartElementPosition = SobyChartElementPosition.Top;
    TitleAligment: SobyChartAligment = SobyChartAligment.Horizontally;
    VerticalAligment: SobyChartVerticalAligment = SobyChartVerticalAligment.Top;
    HorizontalAligment: SobyChartHorizontalAligment = SobyChartHorizontalAligment.Center;

    /*
    LegendVerticalAligment: SobyChartVerticalAligment = SobyChartVerticalAligment.Top;
    LegendHorizontalAligment: SobyChartHorizontalAligment = SobyChartHorizontalAligment.Center;
    */
    //constructor(ctx, titleAligment: SobyChartAligment, verticalAligment: SobyChartVerticalAligment, horizontalAligment: SobyChartHorizontalAligment, height: number, width: number, x: number, y: number, titles: Array<string>, colours: Array<string>) {
    constructor(chart: SobyChart, titles: Array<string>, colours: Array<string>) {
        this.Chart = chart;
        this.Titles = titles;
        this.Colours = colours;
    }

    Paint() {
        const ctx = this.Chart.GetContext();
        const charachterFontPixel = 6;

        let totalCharachterLength: number = 0;
        for (let x = 0; x < this.Titles.length; x++) {
            totalCharachterLength += this.Titles[x].length;
        }
        let startXPosition = this.X-20;
        let startYPosition = this.Y;

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

        for (let x = 0; x < this.Titles.length; x++) {
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
                startYPosition -= 15 ;
            }
        }
    }
}
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
class SobyChartDataset {
    Title = "";
    Type: SobyChartTypes = SobyChartTypes.BarChart;
    Data: Array<number>;
    Colour: string;
    Index: number;
}
class SobyChartDotValue {
    Label = "";
    Value: number = null;
    DatasetTitle = "";
    Colour = "black";
    CurrentColour = "black";
    X: number;
    Y: number;
    r: number;
    rXr: number;
    Path2D: Path2D;

    constructor(label: string, value: number, datasetTitle: string, colour: string, x: number, y: number, r: number, rXr: number, path2D) {
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
}

enum SobyChartTypes {
    LineChart = 0,
    BarChart = 1,
    RadarChart = 2,
    PieChart = 3,
    PolarAreaChart = 4,
    ColumnChart = 5,
    DoughnutChart = 6
}
enum SobyChartElementPosition {
    Left = 0,
    Bottom = 1,
    Right = 2,
    Top = 3,
    Hidden=4
}
enum SobyChartAligment {
    Vertically = 0,
    Horizontally = 1
}
enum SobyChartVerticalAligment {
    Top = 0,
    Middle = 1,
    Bottom = 2
}
enum SobyChartHorizontalAligment {
    Left = 0,
    Center = 1,
    Right = 2
}

function sobyGenerateChartFromHtmlElement(containerId){
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

    const labels = _this.find(".labels").data("labels").split(";#");
    const chart = new SobyChart("#" + _this.attr("id"), chartType, datasets, "There is no record found.", labels);;
    chart.Width = _this.data("width");
    chart.Height = _this.data("height");
    chart.Initialize();
}
let sobyChartPartFactory = new SobyChartPartFactory();
// ************************************************************
