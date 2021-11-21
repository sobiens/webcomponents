declare var sobyCharts: any[];
declare class SobyChartCalculatedValues {
    Chart: SobyChart;
    ValueLabelCount: number;
    VerticalAxisLabelHeight: number;
    VerticalAxisTitleWidth: number;
    HorizontalAxisLabelWidth: number;
    HorizontalAxisLabelHeight: number;
    HorizontalAxisTitleHeight: number;
    VerticalAxisLabelWidth: number;
    VerticalAxisLabelPieceValue: number;
    HorizontalAxisLabelPieceValue: number;
    Padding: number;
    PlotAreaWidth: number;
    PlotAreaHeight: number;
    LegendPanelWidth: number;
    LegendPanelHeight: number;
    MaxValue: number;
    MinValue: number;
    TotalValue: number;
    VerticalAxisLabelXStartPoint: number;
    VerticalAxisLabelYStartPoint: number;
    HorizontalAxisLabelXStartPoint: number;
    HorizontalAxisLabelYStartPoint: number;
    VerticalAxisTitleXStartPoint: number;
    VerticalAxisTitleYStartPoint: number;
    HorizontalAxisTitleXStartPoint: number;
    HorizontalAxisTitleYStartPoint: number;
    xPlotAreaStartPixel: number;
    yPlotAreaStartPixel: number;
    constructor(chart: SobyChart);
    Calculate(): void;
}
declare class SobyAxisSettings {
    Title: string;
    TitleFont: string;
    TitleColour: string;
    LabelFont: string;
    LabelColour: string;
}
declare class SobyPlotAreaSettings {
    Colour: string;
    LineWidth: number;
}
declare class SobyTitleSettings {
    Title: string;
    Font: string;
    Colour: string;
}
declare class SobyLabelSettings {
    LabelPosition: SobyChartElementPosition;
    Labels: Array<string>;
    Colours: Array<string>;
    Font: string;
    DialogTextColour: string;
    Format: string;
}
declare class SobyChart {
    ChartID: string;
    ChartTooltipID: string;
    ChartClassName: string;
    ContentDivSelector: string;
    Title: SobyTitleSettings;
    Height: number;
    Width: number;
    Datasets: Array<SobyChartDataset>;
    EmptyDataHtml: string;
    Type: SobyChartTypes;
    Legend: SobyLegendPanel;
    Label: SobyLabelSettings;
    PlotAreaSettings: SobyPlotAreaSettings;
    VerticalAxisSettings: SobyAxisSettings;
    HorizontalAxisSettings: SobyAxisSettings;
    ChartParts: Array<SobyChartPart>;
    CalculatedValues: SobyChartCalculatedValues;
    MouseOverDotIndex: Array<number>;
    constructor(contentDivSelector: any, title: any, datasets: Array<SobyChartDataset>, emptyDataHtml: any, labels: Array<string>);
    GetContext(): any;
    GetCanvas(): any;
    GetTooltipContainer(): any;
    EnsureItemSelectionExistency(): void;
    RenderTooltip(tooltipContainer: any, dataItem: any, x: any, y: any): void;
    TransformLightenDarkenColor(col: any, amt: any): string;
    RestoreDotColours(): void;
    HandleMouseMove(e: MouseEvent): void;
    RoundedRect(x: any, y: any, width: any, height: any, color: any, radius: any): void;
    Initialize(): void;
    PopulateItems(): void;
    ClickNode(treeViewItemId: any): void;
    CalculateValues(): void;
    DrawPane(): void;
    getXPixel(val: any): number;
    getYPixel(val: any): number;
    OnSelectionChanged: any;
    OnClick: any;
}
declare class SobyChartPartFactory {
    GetChartPart(chart: SobyChart, dataset: SobyChartDataset): SobyChartPart;
}
declare class SobyChartPart {
    Chart: SobyChart;
    Type: SobyChartTypes;
    Dataset: SobyChartDataset;
    Dots: Array<SobyChartDotValue>;
    constructor(chart: SobyChart, dataset: SobyChartDataset);
    GetContext(): any;
    GetCalculatedValues(): SobyChartCalculatedValues;
    RestoreDotColours(): void;
    SetMouseOverColour(mouseOverDotDatasetIndex: number, mouseOverDotIndex: number): void;
    CheckMouseHit(mouseX: number, mouseY: number, dot: SobyChartDotValue): any;
    HandleMouseMove(mouseX: any, mouseY: any): boolean;
    GenerateLabelFromFormat(label: string, value: number, percentage: number): string;
    PopulateItems(): void;
}
declare class SobyLineChartPart extends SobyChartPart {
    constructor(chart: SobyChart, dataset: SobyChartDataset);
    PopulateItems(): void;
}
declare class SobyColumnChartPart extends SobyChartPart {
    ColumnWidth: number;
    constructor(chart: SobyChart, dataset: SobyChartDataset);
    PopulateItems(): void;
}
declare class SobyBarChartPart extends SobyChartPart {
    BarHeight: number;
    constructor(chart: SobyChart, dataset: SobyChartDataset);
    PopulateItems(): void;
}
declare class SobyRadarChartPart extends SobyChartPart {
    constructor(chart: SobyChart, dataset: SobyChartDataset);
    PopulateItems(): void;
}
declare class SobyPieChartPart extends SobyChartPart {
    Offset: number;
    Radius: number;
    constructor(chart: SobyChart, dataset: SobyChartDataset);
    PopulateItems(): void;
}
declare class SobyPolarAreaChartPart extends SobyPieChartPart {
    constructor(chart: SobyChart, dataset: SobyChartDataset);
}
declare class SobyDoughnutChartPart extends SobyPieChartPart {
    constructor(chart: SobyChart, dataset: SobyChartDataset);
}
declare class SobyLegendPanel {
    Chart: SobyChart;
    Height: number;
    Width: number;
    X: number;
    Y: number;
    Titles: Array<string>;
    Colours: Array<string>;
    Position: SobyChartElementPosition;
    TitleAligment: SobyChartAligment;
    VerticalAligment: SobyChartVerticalAligment;
    HorizontalAligment: SobyChartHorizontalAligment;
    constructor(chart: SobyChart, titles: Array<string>, colours: Array<string>);
    Paint(): void;
}
declare class SobyChartDataset {
    Title: string;
    Type: SobyChartTypes;
    Data: Array<number>;
    Colour: string;
    Index: number;
}
declare class SobyChartDotValue {
    Label: string;
    Value: number;
    DatasetTitle: string;
    Colour: string;
    CurrentColour: string;
    X: number;
    Y: number;
    r: number;
    rXr: number;
    Path2D: Path2D;
    constructor(label: string, value: number, datasetTitle: string, colour: string, x: number, y: number, r: number, rXr: number, path2D: any);
}
declare enum SobyChartTypes {
    LineChart = 0,
    BarChart = 1,
    RadarChart = 2,
    PieChart = 3,
    PolarAreaChart = 4,
    ColumnChart = 5,
    DoughnutChart = 6
}
declare enum SobyChartElementPosition {
    Left = 0,
    Bottom = 1,
    Right = 2,
    Top = 3,
    Hidden = 4
}
declare enum SobyChartAligment {
    Vertically = 0,
    Horizontally = 1
}
declare enum SobyChartVerticalAligment {
    Top = 0,
    Middle = 1,
    Bottom = 2
}
declare enum SobyChartHorizontalAligment {
    Left = 0,
    Center = 1,
    Right = 2
}
declare function sobyGenerateChartFromHtmlElement(containerId: any): void;
declare let sobyChartPartFactory: SobyChartPartFactory;
