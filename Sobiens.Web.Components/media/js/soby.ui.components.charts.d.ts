declare var soby_Charts: any[];
interface soby_ChartInterface {
}
declare class soby_ChartCalculatedValues {
    Dots: Array<soby_ChartDotValue>;
    ValueLabelCount: number;
    yLabelXStartPoint: number;
    yLabelYStartPoint: number;
    xLabelXStartPoint: number;
    xLabelYStartPoint: number;
    xInnerPaneStartPixel: number;
    yInnerPaneStartPixel: number;
    yLabelHeight: number;
    xLabelWidth: number;
    xLabelHeight: number;
    yLabelWidth: number;
    yLabelPieceValue: number;
    xLabelPieceValue: number;
    Padding: number;
    InnerPaneWidth: number;
    InnerPaneHeight: number;
    SeriesPanelWidth: number;
    SeriesPanelHeight: number;
    MaxValue: number;
    MinValue: number;
    TotalValue: number;
}
declare class soby_Chart implements soby_ChartInterface {
    ChartID: string;
    ChartTooltipID: string;
    ChartClassName: string;
    ContentDivSelector: string;
    Title: string;
    Height: number;
    Width: number;
    Labels: Array<string>;
    Datasets: Array<soby_ChartDataset>;
    EmptyDataHtml: string;
    ImagesFolderUrl: string;
    Type: SobyChartTypes;
    LabelPosition: SobyChartElementPosition;
    SeriesPosition: SobyChartElementPosition;
    SeriesVerticalAligment: SobyChartVerticalAligment;
    SeriesHorizontalAligment: SobyChartHorizontalAligment;
    Colours: Array<string>;
    CalculatedValues: soby_ChartCalculatedValues;
    constructor(type: SobyChartTypes, contentDivSelector: any, title: any, datasets: Array<soby_ChartDataset>, emptyDataHtml: any, labels: Array<string>);
    GetContext(): any;
    GetCanvas(): any;
    GetTooltipContext(): any;
    GetTooltipCanvas(): any;
    EnsureItemSelectionExistency(): void;
    HandleMouseMove(e: MouseEvent): void;
    CheckMouseHit(mouseX: number, mouseY: number, dot: soby_ChartDotValue): boolean;
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
declare class soby_LineChart extends soby_Chart {
    constructor(contentDivSelector: any, title: any, datasets: Array<soby_ChartDataset>, emptyDataHtml: any, labels: Array<string>);
    PopulateItems(): void;
    CheckMouseHit(mouseX: number, mouseY: number, dot: soby_ChartDotValue): boolean;
}
declare class soby_ColumnChart extends soby_Chart {
    ColumnWidth: number;
    constructor(contentDivSelector: any, title: any, datasets: Array<soby_ChartDataset>, emptyDataHtml: any, labels: Array<string>);
    PopulateItems(): void;
    CheckMouseHit(mouseX: number, mouseY: number, dot: soby_ChartDotValue): boolean;
}
declare class soby_BarChart extends soby_Chart {
    BarHeight: number;
    constructor(contentDivSelector: any, title: any, datasets: Array<soby_ChartDataset>, emptyDataHtml: any, labels: Array<string>);
    PopulateItems(): void;
    CheckMouseHit(mouseX: number, mouseY: number, dot: soby_ChartDotValue): boolean;
}
declare class soby_RadarChart extends soby_Chart {
    constructor(contentDivSelector: any, title: any, datasets: Array<soby_ChartDataset>, emptyDataHtml: any, labels: Array<string>);
    PopulateItems(): void;
}
declare class soby_PieChart extends soby_Chart {
    Offset: number;
    Radius: number;
    constructor(contentDivSelector: any, title: any, datasets: Array<soby_ChartDataset>, emptyDataHtml: any, labels: Array<string>);
    PopulateItems(): void;
}
declare class soby_PolarAreaChart extends soby_PieChart {
    constructor(contentDivSelector: any, title: any, datasets: Array<soby_ChartDataset>, emptyDataHtml: any, labels: Array<string>);
}
declare class soby_SeriesPanel {
    CTX: any;
    Height: number;
    Width: number;
    X: number;
    Y: number;
    Titles: Array<string>;
    Colours: Array<string>;
    TitleAligment: SobyChartAligment;
    VerticalAligment: SobyChartVerticalAligment;
    HorizontalAligment: SobyChartHorizontalAligment;
    constructor(ctx: any, titleAligment: SobyChartAligment, verticalAligment: SobyChartVerticalAligment, horizontalAligment: SobyChartHorizontalAligment, height: number, width: number, x: number, y: number, titles: Array<string>, colours: Array<string>);
    Paint(): void;
}
declare class soby_ChartDataset {
    Title: string;
    Data: Array<number>;
}
declare class soby_ChartDotValue {
    Label: string;
    Value: number;
    DatasetTitle: string;
    Colour: string;
    X: number;
    Y: number;
    r: number;
    rXr: number;
    constructor(label: string, value: number, datasetTitle: string, colour: string, x: number, y: number, r: number, rXr: number);
}
declare enum SobyChartTypes {
    LineChart = 0,
    BarChart = 1,
    RadarChart = 2,
    PieChart = 3,
    PolarAreaChart = 4,
    ColumnChart = 5
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
