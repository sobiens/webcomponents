// VERSION 1.0.8.1
if (!Object.setPrototypeOf) {
    // Only works in Chrome and FireFox, does not work in IE:
    (<any>Object.prototype).setPrototypeOf = function (obj, proto) {
        if (obj.__proto__) {
            obj.__proto__ = proto;
            return obj;
        } else {
            // If you want to return prototype of Object.create(null):
            var Fn = function () {
                for (var key in obj) {
                    Object.defineProperty(this, key, {
                        value: obj[key],
                    });
                }
            };
            Fn.prototype = proto;
            return new Fn();
        }
    }
}

var sobyLastReturnData = null;
function ajaxHelper(uri, method, data, args, successCallback, errorCallback) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        errorCallback(jqXHR, textStatus, errorThrown, args);
    }).done(function (item) {
        successCallback(item, args);
    });
}

enum SobyPaginationViewTypes {
    PageNumbers = 0,
    BasicButtons = 1,
    BasicButtons_PageNumbers = 2,
    AdvancedButtons = 3,
    AdvancedButtons_PageNumbers = 4,
    QuickButtons_PageNumbers = 5,
}

enum SobyPaginationVerticalAlign {
    Left = 0,
    Center = 1,
    Right = 2
}
// ********************* TRANSPORT *****************************
class soby_Transport {
    Read: soby_TransportRequest;
    Add: soby_TransportRequest;
    Update: soby_TransportRequest;
    Delete: soby_TransportRequest;
}

class soby_TransportRequest {
    constructor(url: string, dataType: string, contentType: string, type: string, includeCredentials?: boolean) {
        this.Url = url;
        this.DataType = dataType;
        this.ContentType = contentType;
        this.Type = type;
        this.IncludeCredentials = includeCredentials !== null ? includeCredentials:false;
    }
    Url: string;
    DataType: string;
    ContentType: string;
    Type: string;
    IncludeCredentials: boolean;
}
// ******************************************************************


// ********************* HELPER METHODS *****************************
var soby_FilterValueSeperator = "_SDX_";
class SobyFieldTypesObject{
    Text:number = 0;
    Number:number = 1;
    MultiChoice:number = 2;
    Lookup:number = 3;
    Boolean:number = 4;
    Choice:number = 5;
    ModStat:number = 6;
    User:number = 7;
    TaxonomyFieldType:number = 8;
    DateTime:number = 9;
    Integer:number = 10;
    CurrentUserGroups:number = 11;
    DateTimeNowDifferenceAsMinute:number = 12;
    DateTimeRange:number = 13;
    Object: number = 14;
}
class SobyFilterTypesObject {
    Equal:number = 0;
    NotEqual: number = 1;
    Contains: number = 2;
    In: number = 3;
    Greater: number = 4;
    Lower: number = 5;
    GreaterEqual: number = 6;
    LowerEqual: number = 7;
    BeginsWith: number = 8;
    Membership: number = 9;
    IsNull: number = 10;
    IsNotNull: number = 11;
}
class SobyAggregateTypesObject {
    Average: number = 0;
    Count: number = 1;
    Max: number = 2;
    Min: number = 3;
    Sum: number = 4;
    GetAggregateTypeName(aggregateType: number) {
        if (aggregateType === 0)
        {
            return "Average";
        }
        else if (aggregateType === 1)
        {
            return "Count";
        }
        else if (aggregateType === 2)
        {
            return "Max";
        }
        else if (aggregateType === 3)
        {
            return "Min";
        }
        else if (aggregateType === 4)
        {
            return "Sum";
        }

    }
}
class SobyWebServiceDataTypesObject
{
    QueryString: number = 0;
    Json: number = 1;
    Soap: number = 2;
}
var SobyWebServiceDataTypes = new SobyWebServiceDataTypesObject();
var SobyFieldTypes = new SobyFieldTypesObject();
var SobyFilterTypes = new SobyFilterTypesObject();
var SobyAggregateTypes = new SobyAggregateTypesObject();
interface ISobyFilter {
}

class SobyFilters implements ISobyFilter {
    IsOr: boolean;
    ShouldBeClearedOnUIFilterAction: boolean = false;
    constructor(isOr: boolean) {
        this.IsOr = isOr;
    }

    Filters = new Array();
    GetFiltersByFieldName(fieldName: string) {
        var filters = new Array();
        for (var i = 0; i < this.Filters.length; i++) {
            if (this.Filters[i].FieldName === fieldName)
                filters.push(this.Filters[i]);
        }

        return filters;
    }
    Clear() {
        this.Filters = new Array();
    }
    AddFilter(fieldName: string, filterValue: string, fieldType: number, filterType: number, lookupID: boolean, shouldBeClearedOnUIFilterAction: boolean) {
        var sobyFilter = new SobyFilter(fieldName, filterValue, fieldType, filterType, lookupID);
        sobyFilter.ShouldBeClearedOnUIFilterAction = shouldBeClearedOnUIFilterAction;
        this.Filters.push(sobyFilter);
    }

    AddFilterObject(filter: SobyFilter) {
        this.Filters.push(filter);
    }

    AddFilterCollection(sobyFilters: SobyFilters) {
        this.Filters.push(sobyFilters);
    }

    ToCaml(): string {
        var camlString = "";
        var filterCompareString = this.IsOr === true ? "Or" : "And";
        for (var i = 0; i < this.Filters.length; i++) {
            if (this.Filters.length === 1) {
                camlString += this.Filters[i].ToCaml();
            }
            else if (i === 1) {
                camlString += "<" + filterCompareString + ">" + this.Filters[i - 1].ToCaml() + this.Filters[i].ToCaml() + "</" + filterCompareString + ">";
            }
            else if (i % 2 === 1) {
                camlString = "<" + filterCompareString + ">" + camlString + "<" + filterCompareString + ">" + this.Filters[i - 1].ToCaml() + this.Filters[i].ToCaml() + "</" + filterCompareString + "></" + filterCompareString + ">";
            }
            else if (i === this.Filters.length - 1) {
                camlString = "<" + filterCompareString + ">" + camlString + this.Filters[i].ToCaml() + "</" + filterCompareString + ">"
            }
        }
        return camlString;
    }

    ToXml() {
        var xml = "";
        for (var i = 0; i < this.Filters.length; i++) {
            var argument = this.Filters[i];
            xml += "<" + argument.FieldName + ">" + argument.FilterValue + "</" + argument.FieldName + ">";
        }

        return xml;
    }

    ToJson() {
        var json = "";
        for (var i = 0; i < this.Filters.length; i++) {
            var argument = this.Filters[i];
            json += "\"" + argument.FieldName + "\": \"" + argument.FilterValue + "\",";
        }

        if (json !== "")
        {
            return json.substr(0, json.length - 1);
        }

        return json;
    }

    ToQueryString(_type: number /* 0 - Normal, 1 - SP Rest */) {
        if (this.Filters.length === 0)
        {
            return "";
        }

        var json = "(";
        for (var i = 0; i < this.Filters.length; i++) {
            var argument = this.Filters[i];
            json += argument.ToQueryString(_type);
            if (i < this.Filters.length-1) // Only if it is not last item
            {
                if (this.IsOr)
                {
                    json += " or "
                }
                else
                {
                    json += " and "
                }
            }
        }
        json += ")";

        return json;
    }

    ToSearch2010Xml()
    {
        if (this.Filters.length === 0)
        {
            return "";
        }

        var json = "(";
        for (var i = 0; i < this.Filters.length; i++)
        {
            var argument = this.Filters[i];
            if (i > 0) 
            {
                if (this.IsOr)
                {
                    json += " OR "
                }
                else
                {
                    json += " AND "
                }
            }
            json += argument.ToSearch2010Xml();
        }
        json += ")";

        return json;
    }

    Clone(): SobyFilters {
        var sobyFilters = new SobyFilters(this.IsOr);
        for (var i = 0; i < this.Filters.length; i++) {
            var filter = this.Filters[i];
            if (filter instanceof SobyFilter)
            {
                sobyFilters.AddFilter(filter.FieldName, filter.FilterValue, filter.FieldType, filter.FilterType, filter.LookupID, filter.ShouldBeClearedOnUIFilterAction);
            }
            else {
                sobyFilters.AddFilterCollection(filter.Clone());
            }
        }

        return sobyFilters;
    }
}
class SobyFilter implements ISobyFilter {
    FieldName: string;
    FilterValue: string;
    FieldType: number;
    FilterType: number;
    LookupID: boolean;
    ShouldBeClearedOnUIFilterAction: boolean = false;

    constructor(fieldName: string, filterValue: string, fieldType: number, filterType: number, lookupID: boolean) {
        this.FieldName = fieldName;
        this.FieldType = fieldType;
        this.FilterType = filterType;
        this.FilterValue = filterValue;
        this.LookupID = lookupID;
    }


    ToCaml(): string {
        // <Eq><FieldRef Name='SessionNumber' /><Value Type='Number'>{1}</Value></Eq>
        var additionalFieldRefAttributes = "";
        var equvialentString = "";
        var valueString = "";
        if (this.LookupID === true) {
            additionalFieldRefAttributes = "LookupId=\"True\"";
        }

        var valueTypeString = "";
        switch (this.FieldType) {
            case SobyFieldTypes.Text:
                valueTypeString = "Text";
                break;
            case SobyFieldTypes.Number:
                valueTypeString = "Number";
                break;
            case SobyFieldTypes.DateTime:
                valueTypeString = "DateTime";
                break;
            case SobyFieldTypes.Integer:
                valueTypeString = "Integer";
                break;
            case SobyFieldTypes.MultiChoice:
                valueTypeString = "MultiChoice";
                break;
            case SobyFieldTypes.Choice:
                valueTypeString = "Choice";
                break;
            case SobyFieldTypes.Boolean:
                valueTypeString = "Boolean";
                break;
            case SobyFieldTypes.ModStat:
                valueTypeString = "ModStat";
                break;
            case SobyFieldTypes.Lookup:
                valueTypeString = "Lookup";
                break;
            case SobyFieldTypes.User:
                valueTypeString = "User";
                break;
            case SobyFieldTypes.CurrentUserGroups:
                valueTypeString = "CurrentUserGroups";
                break;
            case SobyFieldTypes.TaxonomyFieldType:
                valueTypeString = "TaxonomyFieldType";
            //return "<" + equvialentString + "><FieldRef Name=\"" + this.FieldName + "\" " + additionalFieldRefAttributes + " /><Values><Value Type=\"" + valueTypeString + "\">" + this.FilterValue + "</Value></Values></" + equvialentString + ">";
            //<In><FieldRef Name="Location" LookupId="TRUE"><Values><Value Type="Integer">13</Value><Value Type="Integer">3</Value><Value Type="Integer">9</Value></Values></In>
        }

        var value = this.FilterValue;
        if (value === "[*ME*]")
        {
            valueString = "<Value Type='" + valueTypeString + "'><UserID /></Value>";
        }
        else if (this.FieldType === SobyFieldTypes.DateTime || this.FieldType === SobyFieldTypes.Number)
        {
            valueString = "<Value Type='" + valueTypeString + "'>" + this.FilterValue + "</Value>";
        }
        else
        {
            valueString = "<Value Type='" + valueTypeString + "'><![CDATA[" + this.FilterValue + "]]></Value>";
        }
        switch (this.FilterType) {
            case SobyFilterTypes.Equal:
                equvialentString = "Eq";
                break;
            case SobyFilterTypes.NotEqual:
                equvialentString = "Neq";
                break;
            case SobyFilterTypes.Greater:
                equvialentString = "Gt";
                break;
            case SobyFilterTypes.Lower:
                equvialentString = "Lt";
                break;
            case SobyFilterTypes.GreaterEqual:
                equvialentString = "Geq";
                break;
            case SobyFilterTypes.LowerEqual:
                equvialentString = "Leq";
                break;
            case SobyFilterTypes.Contains:
                equvialentString = "Contains";
                break;
            case SobyFilterTypes.BeginsWith:
                equvialentString = "BeginsWith";
                break;
            case SobyFilterTypes.IsNull:
                equvialentString = "IsNull";
                valueString = "";
                break;
            case SobyFilterTypes.IsNotNull:
                equvialentString = "IsNotNull";
                valueString = "";
                break;
            case SobyFilterTypes.Membership:
                equvialentString = "Membership";
                valueString = "";
                break;
            case SobyFilterTypes.In:
                equvialentString = "In";
                var values = this.FilterValue.split(soby_FilterValueSeperator);
                valueString = "<Values>";
                for (var i = 0; i < values.length; i++) {
                    valueString += "<Value Type='" + valueTypeString + "'>";
                    if (this.FieldType !== SobyFieldTypes.DateTime && this.FieldType !== SobyFieldTypes.Number)
                    {
                        valueString += "<![CDATA[" + values[i] + "]]></Value>";
                    }
                    else
                    {
                        valueString += values[i] + "</Value>";
                    }
                }
                valueString += "</Values>";
                break;
        }
        return "<" + equvialentString + (this.FilterType === SobyFilterTypes.Membership ? " Type='" + valueTypeString + "'" : "") + "><FieldRef Name='" + this.FieldName + "' " + additionalFieldRefAttributes + " />" + valueString + "</" + equvialentString + ">";
    }

    ToSearch2010Xml(): string
    {
        // () AND ANY(*) (IsDocument=True) (scope:SPPortalCAS)
        var equvialentString = "";
        var value = this.FilterValue;
        switch (this.FilterType)
        {
            case SobyFilterTypes.Equal:
                equvialentString = "=";
                break;
            case SobyFilterTypes.NotEqual:
                equvialentString = "!=";
                break;
            case SobyFilterTypes.Contains:
                equvialentString = ":";
                break;
        }
        return this.FieldName + equvialentString + value;
    }

    ToQueryString(_type:number /* 0 - Normal, 1 - SP Rest */) {
        var json = "";
        var value = this.FilterValue;
        var valueFilterString = "";
        switch (this.FilterType) {
            case SobyFilterTypes.Equal:
                if (this.FieldType === SobyFieldTypes.Text)
                {
                    valueFilterString = this.FieldName + " eq '" + value + "'";
                }
                else if (this.FieldType === SobyFieldTypes.DateTime)
                {
                    valueFilterString = this.FieldName + " eq datetime'" + value + "'";
                }
                else
                {
                    valueFilterString = this.FieldName + " eq " + value;
                }
                break;
            case SobyFilterTypes.NotEqual:
                var comparisionText = "neq";
                if (_type === 1)
                {
                    comparisionText = "ne"
                }

                if (this.FieldType === SobyFieldTypes.Text)
                {
                    valueFilterString = this.FieldName + " " + comparisionText + " '" + value + "'";
                }
                else if (this.FieldType === SobyFieldTypes.DateTime)
                {
                    valueFilterString = this.FieldName + " " + comparisionText + " datetime'" + value + "'";
                }
                else
                {
                    valueFilterString = this.FieldName + " " + comparisionText + " " + value;
                }

                break;
            case SobyFilterTypes.Greater:
                if (this.FieldType === SobyFieldTypes.DateTime)
                {
                    valueFilterString = this.FieldName + " gt datetime'" + value + "'";
                }
                else
                {
                    valueFilterString = this.FieldName + " gt " + value;
                }

                break;
            case SobyFilterTypes.Lower:
                if (this.FieldType === SobyFieldTypes.DateTime)
                {
                    valueFilterString = this.FieldName + " lt datetime'" + value + "'";
                }
                else
                {
                    valueFilterString = this.FieldName + " lt " + value;
                }

                break;
            case SobyFilterTypes.GreaterEqual:
                if (this.FieldType === SobyFieldTypes.DateTime)
                {
                    valueFilterString = this.FieldName + " geq datetime'" + value + "'";
                }
                else
                {
                    valueFilterString = this.FieldName + " geq " + value;
                }

                break;
            case SobyFilterTypes.LowerEqual:
                if (this.FieldType === SobyFieldTypes.DateTime)
                {
                    valueFilterString = this.FieldName + " leq datetime'" + value + "'";
                }
                else
                {
                    valueFilterString = this.FieldName + " leq " + value;
                }

                break;
            case SobyFilterTypes.IsNull:
                    valueFilterString = this.FieldName + " eq null ";
                break;
            case SobyFilterTypes.IsNotNull:
                var comparisionText = "neq";
                if (_type === 1)
                {
                    comparisionText = "ne"
                }

                valueFilterString = this.FieldName + " " + comparisionText + " null ";
                break;
            case SobyFilterTypes.Contains:
                if (_type === 0)
                {
                    valueFilterString = "contains(" + this.FieldName + ", '" + value + "')";
                }
                else
                {
                    valueFilterString = "substringof('" + value + "', " + this.FieldName + ")";
                }

                break;
            case SobyFilterTypes.BeginsWith:
                if (_type === 0)
                {
                    valueFilterString = "beginswith";
                }
                else
                {
                    valueFilterString = "startsWith";
                }

                break;
        }

        json += valueFilterString;

        return json;
    }


}
class SobySchemaFields extends Array<SobySchemaField> {
    constructor(items?: Array<SobySchemaField>) {
        super();

        if (items) {
            this.push(...items);
        }
//        super(...items);
        Object.setPrototypeOf(this, Object.create(SobySchemaFields.prototype));
    }

    toWebAPIString() {
        let webAPIString = "";
        let expandString = "";
        for (let i = 0; i < this.length; i++) {
            webAPIString += "," + this[i].FieldName;
            if (this[i].FieldType === SobyFieldTypes.Lookup) {
                expandString += "," + this[i].Args.ModelName;
            }
            else if (this[i].FieldType === SobyFieldTypes.User)
            {
                expandString += "," + this[i].Args.ModelName;
            }
            else if (this[i].FieldType === SobyFieldTypes.Choice) {
                expandString += "," + this[i].Args.ModelName;
            }
        }

        if (expandString !== "")
        {
            expandString = "$expand=" + expandString.substr(1) + "&";
        }

        return expandString + "$select=" + webAPIString.substr(1);
    }
    GetByFieldName(fieldName:string): SobySchemaField {
        for (let i = 0; i < this.length; i++) {
            if (this[i].FieldName === fieldName)
                return this[i];
        }

        return null;
    }
}
class SobySchemaField {
    FieldName: string;
    FieldType: number;
    Args;
    constructor(fieldName: string, fieldType: number, args) {
        this.FieldName = fieldName;
        this.FieldType = fieldType;
        this.Args = args;
    }
}
class SobyNavigationInformation
{
    ViewType: SobyPaginationViewTypes;
    VerticalAlign:SobyPaginationVerticalAlign
    PageIndex: number = 0;
    constructor()
    {
        this.ViewType = SobyPaginationViewTypes.BasicButtons;
        this.VerticalAlign = SobyPaginationVerticalAlign.Center;
    }
}
class SobyOrderByFields extends Array<SobyOrderByField> {
    constructor(items?: Array<SobyOrderByField>) {
        super();

        if (items) {
            this.push(...items);
        }
        Object.setPrototypeOf(this, Object.create(SobyOrderByFields.prototype));
    }

    GetOrderFieldByName(fieldName: string) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() === fieldName.toLowerCase())
            {
                return this[i];
            }
        }

        return null;
    }
    ContainsField(fieldName: string) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() === fieldName.toLowerCase())
            {
                return true;
            }
        }

        return false;
    }
    ContainsFieldAsAsc(fieldName: string) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() === fieldName.toLowerCase())
            {
                return this[0].IsAsc;
            }
        }

        return false;
    }
}
class SobyOrderByField
{
    constructor(fieldName: string, isAsc: boolean) {
        this.FieldName = fieldName;
        this.IsAsc = isAsc;
    }
    FieldName: string;
    IsAsc: boolean = false;
}
class SobyAggregateFields extends Array<SobyAggregateField> {
    constructor(items?: Array<SobyAggregateField>) {
        super();

        if (items) {
            this.push(...items);
        }
        Object.setPrototypeOf(this, Object.create(SobyAggregateFields.prototype));
    }

    ContainsField(fieldName: string) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() === fieldName.toLowerCase())
            {
                return true;
            }
        }

        return false;
    }
}



class SobyKeyFields extends Array<SobyKeyField> {
    constructor(items?: Array<SobyKeyField>) {
        super();

        if (items) {
            this.push(...items);
        }
        Object.setPrototypeOf(this, Object.create(SobyKeyFields.prototype));
    }

    ContainsField(fieldName: string) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() === fieldName.toLowerCase()) {
                return true;
            }
        }

        return false;
    }
}
class SobyKeyField {
    constructor(fieldName: string, parameterName: string) {
        this.FieldName = fieldName;
        this.ParameterName = parameterName;
    }
    FieldName: string;
    ParameterName: string;
}





class SobyGroupByFields extends Array<SobyGroupByField> {
    constructor(items?: Array<SobyGroupByField>) {
        super();

        if (items) {
            this.push(...items);
        }
        Object.setPrototypeOf(this, Object.create(SobyGroupByFields.prototype));
    }

    ContainsField(fieldName: string) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() === fieldName.toLowerCase())
            {
                return true;
            }
        }

        return false;
    }
}
class SobyAggregateField{
    constructor(fieldName: string, aggregateType: number) {
        this.FieldName = fieldName;
        this.AggregateType = aggregateType;
    }
    FieldName: string;
    AggregateType: number = 0;
}

class SobyGroupByField {
    constructor(fieldName: string, isAsc: boolean, displayFunction) {
        this.FieldName = fieldName;
        this.IsAsc = isAsc;
        this.DisplayFunction = displayFunction;
    }
    FieldName: string;
    IsAsc: boolean = false;
    DisplayFunction = null;
}
class SobyHeaders extends Array<SobyHeader> {
    constructor(items?: Array<SobyHeader>) {
        super();

        if (items) {
            this.push(...items);
        }
        Object.setPrototypeOf(this, Object.create(SobyHeaders.prototype));
    }

}
class SobyHeader {
    constructor(key: string, value: string) {
        this.Key = key;
        this.Value = value;
    }
    Key: string;
    Value: string;
}
class SobyArguments extends Array<SobyArgument> {
    constructor(items?: Array<SobyArgument>) {
        super();

        if (items) {
            this.push(...items);
        }
        Object.setPrototypeOf(this, Object.create(SobyArguments.prototype));
    }

    ToJson() {
        return "";
    }
    ToQueryString() {
        return "";
    }
    Clone() {
        return null;
    }
}
class SobyArgument {
}

interface soby_ServiceInterface {
    DataSourceBuilder: soby_DataSourceBuilderAbstract;
    PageIndex: number;
    StartIndex: number;
    EndIndex: number;
    NextPageString: string;
    NextPageExist :boolean;
    Args: Array<any>;
    Transport: soby_Transport;
    GroupBy(orderFields: SobyGroupByFields);
    Sort(orderFields:SobyOrderByFields);
    Filter(filters:SobyFilters, clearOtherFilters:boolean);
    SortAndFilter(orderFields: SobyOrderByFields, filters: SobyFilters, clearOtherFilters: boolean);
    GoToPage(pageIndex: number);
    CanNavigateToNextPage();
    CanNavigateToPreviousPage();
    PopulateNavigationInformation();
    NavigationInformationBeingPopulated();
    NavigationInformationPopulated();
    PopulateItems(args: Array<any>);
    GetFieldNames();
    ItemPopulated(items: Array<soby_Item>);
    ItemBeingPopulated();
    ErrorThrown(errorMessage: string, errorTypeName: string);
    UpdateItem(keyNames: Array<string>, keyValues: Array<string>, objectInstance);
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>);
    AddItem(objectInstance);
    ItemUpdated(args);
    ItemAdded(args);
    ItemDeleted(args);
    SetRowLimit(rowLimit: number);
}


interface soby_DataSourceBuilderInterface {
    ViewName: string;
    RowLimit: number;
    ItemCount: number;
    PageIndex: number;
    NextPageString: string;
}

abstract class soby_DataSourceBuilderAbstract implements soby_DataSourceBuilderInterface {
    ViewName: string;
    RowLimit: number;
    ItemCount: number;
    PageIndex: number=0;
    NextPageString: string;
    NextPageExist:boolean = false;
    Filters: SobyFilters = new SobyFilters(false);
    SchemaFields: SobySchemaFields = new SobySchemaFields();
    OrderByFields: SobyOrderByFields = new SobyOrderByFields();
    Arguments: SobyArguments = new SobyArguments();
    Headers: SobyHeaders = new SobyHeaders();
    constructor() { }
    GetViewField(fieldName: string) {
        for (var i = 0; i < this.SchemaFields.length; i++) {
            if (this.SchemaFields[i].FieldName === fieldName)
            {
                return this.SchemaFields[i];
            }
        }

        return null;
    }
    GetViewFieldByPropertyName(propertyName: string) {
        for (var i = 0; i < this.SchemaFields.length; i++) {
            if (this.SchemaFields[i].FieldName === propertyName)
            {
                return this.SchemaFields[i];
            }
        }

        return null;
    }
    AddHeader(key: string, value: string) {
        var header: SobyHeader = new SobyHeader(key, value);
        this.Headers.push(header);
    }
    AddSchemaField(fieldName: string, fieldType: number, args) {
        var schemaField: SobySchemaField = new SobySchemaField(fieldName, fieldType, args);
        this.SchemaFields.push(schemaField);
    }
    AddOrderField(fieldName: string, isAsc: boolean) {
        this.OrderByFields.push(new SobyOrderByField(fieldName, isAsc));
    }
    AddOrderFields(orderFields: SobyOrderByFields) {
        for (var i = 0; i < orderFields.length; i++) {
            this.OrderByFields.push(orderFields[i]);
        }
    }
    GetCountQuery(transport: soby_TransportRequest): string {
        this.CountQueryBeingGenerated();
        return null;
    }
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery):string {
        this.MainQueryBeingGenerated();
        return "";
    }
    Clone(): soby_DataSourceBuilderAbstract {
        return null;
    }
    CountQueryBeingGenerated() {
    }
    MainQueryBeingGenerated() {
    }
    CountQueryGenerated = null;
    MainQueryGenerated = null;
    DataBeingParsed(data: any, parseCompleted: boolean  ): Array<soby_Item>
    {
        return data;
    }
    ParseData(value: string): Array<soby_Item> {
        return null;
    }
    GetData(data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType, contentType, includeCredentials) { }
}
// ******************************************************************

// ********************* HELPER METHODS *****************************
class soby_Filter {
    FieldName: string;
    Value: string;
    FieldType: number;
    FilterType: number;
    LookupID: boolean
}

class soby_Item {
}
// ******************************************************************

// ********************* HELPER METHODS *****************************
class soby_WebServiceService implements soby_ServiceInterface {
    DataSourceBuilder: soby_DataSourceBuilderAbstract;
    constructor(dataSourceBuilder: soby_DataSourceBuilderAbstract) {
        this.DataSourceBuilder = dataSourceBuilder;
        this.NextPageStrings = new Array<string>();
        this.NextPageStrings[0] = "";
        this.Transport = new soby_Transport();
    }
    NextPageString: string = "";
    PageIndex: number = 0;
    StartIndex: number = 0;
    EndIndex: number = 0;
    NextPageStrings: Array<string>;
    Args: Array<any>;
    Filters: SobyFilters = new SobyFilters(false);
    GroupByFields: SobyGroupByFields = new SobyGroupByFields();
    OrderByFields: SobyOrderByFields = new SobyOrderByFields();
    NextPageExist:boolean = false;
    Transport: soby_Transport;

    ItemBeingPopulated = function () { };
    SetRowLimit(rowLimit: number) {
        this.DataSourceBuilder.RowLimit = rowLimit;
    }
    PopulateNavigationInformation() {
        if (this.NavigationInformationBeingPopulated !== null)
        {
            this.NavigationInformationBeingPopulated();
        }

        const dataSourceBuilder = this.GetQueriesAppliedDataSourceBuilder();

        var service = this;
        service.DataSourceBuilder.PageIndex = this.PageIndex;
        service.DataSourceBuilder.NextPageString = this.NextPageString;
        var requestMethod = this.Transport.Read.Type;
        var dataType = this.Transport.Read.DataType;
        var contentType = this.Transport.Read.ContentType;

        var countServiceUrl = dataSourceBuilder.GetCountQuery(this.Transport.Read);
        if (countServiceUrl === null || countServiceUrl === undefined || countServiceUrl === "") {
            service.NextPageExist = this.DataSourceBuilder.NextPageExist;
            service.EndIndex = service.StartIndex + this.DataSourceBuilder.ItemCount-1;
            service.NavigationInformationPopulated();
            return;
        }

        var data = "";
        var mainQuery = dataSourceBuilder.GetMainQuery(this.Transport.Read, false);

        if (mainQuery !== null && mainQuery !== "")
        {
            if (requestMethod.toLowerCase() === "post")
            {
                data = mainQuery;
            }
            else
            {
                if (countServiceUrl.indexOf("?") === -1)
                {
                    countServiceUrl += "?";
                }
                else
                {
                    countServiceUrl += "&";
                }
                countServiceUrl += mainQuery;
            }
        }

        dataSourceBuilder.GetData(data,
            function (result) {
                const totalItemCount = result.length;
                let startIndex = (service.DataSourceBuilder.PageIndex * service.DataSourceBuilder.RowLimit) + 1;
                let endIndex = ((service.DataSourceBuilder.PageIndex+1) * service.DataSourceBuilder.RowLimit);
                if (service.DataSourceBuilder.RowLimit === 0) {
                    startIndex = 0;
                    endIndex = 0;
                }
                if (endIndex !== 0 && totalItemCount > endIndex) {
                    service.NextPageExist = true;
                }
                else {
                    service.NextPageExist = false;
                    endIndex = totalItemCount;
                }

                service.StartIndex = startIndex;
                service.EndIndex = endIndex;
                service.NavigationInformationPopulated();
            },
            function (XMLHttpRequest, textStatus, errorThrown) {
                var errorMessage = "An error occured on populating grid" + XMLHttpRequest + " --- " + textStatus + " --- " + errorThrown;
                if (service.ErrorThrown !== null)
                {
                    service.ErrorThrown(errorMessage, null);
                }

                soby_LogMessage(errorMessage);
            },
            function (XMLHttpRequest, textStatus, errorThrown) { }, true, countServiceUrl, service.DataSourceBuilder.Headers, requestMethod, dataType, contentType, this.Transport.Read.IncludeCredentials);
    }
    NavigationInformationBeingPopulated() { }
    NavigationInformationPopulated() { }
    GroupBy(groupByFields: SobyGroupByFields) {
        this.GroupByFields = groupByFields;
        this.PopulateItems(null);
    }
    Sort(orderByFields: SobyOrderByFields) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;

        this.PopulateItems(null);
    };
    Filter(filters:SobyFilters, clearOtherFilters: boolean) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        if (clearOtherFilters === true)
        {
            this.Filters = new SobyFilters(filters.IsOr);
        }

        if (filters.Filters.length > 0)
        {
            this.Filters.AddFilterCollection(filters);
        }
        this.PopulateItems(null);
    };
    SortAndFilter(orderByFields: SobyOrderByFields, filters: SobyFilters, clearOtherFilters: boolean)
    {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;
        if (clearOtherFilters === true)
        {
            this.Filters = new SobyFilters(filters.IsOr);
        }

        if (filters.Filters.length > 0)
        {
            this.Filters.AddFilterCollection(filters);
        }

        this.PopulateItems(null);
    }
    GoToPage(pageIndex:number) {
        this.DataSourceBuilder.PageIndex = pageIndex;
        this.PageIndex = pageIndex;

        this.PopulateItems(null);
    };
    CanNavigateToNextPage() {
        if (this.NextPageExist === false)
        {
            return false;
        }

        return true;
    };
    CanNavigateToPreviousPage() {
        if (this.DataSourceBuilder.PageIndex === 0)
        {
            return false;
        }

        return true;
    };

    GetQueriesAppliedDataSourceBuilder() {
        const dataSourceBuilder = this.DataSourceBuilder.Clone();
        for (var i = 0; i < this.GroupByFields.length; i++) {
            dataSourceBuilder.AddOrderField(this.GroupByFields[i].FieldName, this.GroupByFields[i].IsAsc);

        }
        if (this.OrderByFields.length > 0) {
            dataSourceBuilder.AddOrderFields(this.OrderByFields);
        }

        if (this.Filters.Filters.length > 0) {
            dataSourceBuilder.Filters.AddFilterCollection(this.Filters);
        }

        dataSourceBuilder.PageIndex = this.PageIndex;
        dataSourceBuilder.NextPageString = this.NextPageString;

        return dataSourceBuilder;
    }

    PopulateItems(args: Array<any>)
    {
        this.Args = args;
        if (this.ItemBeingPopulated !== null)
        {
            this.ItemBeingPopulated();
        }

        soby_LogMessage("this.DataSourceBuilder.PageIndex:" + this.DataSourceBuilder.PageIndex);
        soby_LogMessage("this.DataSourceBuilder.RowLimit:" + this.DataSourceBuilder.RowLimit);
        const dataSourceBuilder = this.GetQueriesAppliedDataSourceBuilder();
        soby_LogMessage("dataSourceBuilder.PageIndex:" + dataSourceBuilder.PageIndex);
        soby_LogMessage("dataSourceBuilder.RowLimit:" + dataSourceBuilder.RowLimit);

        var service = this;
        var serviceUrl = this.Transport.Read.Url;
        var requestMethod = this.Transport.Read.Type;
        var dataType = this.Transport.Read.DataType;
        var contentType = this.Transport.Read.ContentType;
        var data = "";
        var mainQuery = dataSourceBuilder.GetMainQuery(this.Transport.Read, false);
        if (mainQuery !== null && mainQuery !== "")
        {
            if (requestMethod.toLowerCase() === "post")
            {
                data = mainQuery;
            }
            else {
                if (serviceUrl.indexOf("?") === -1)
                {
                    serviceUrl += "?";
                }
                else
                {
                    serviceUrl += "&";
                }
                serviceUrl += mainQuery;
            }
        }
        
        dataSourceBuilder.GetData(data,
            function (result) {
                soby_LogMessage(result);
                var items = service.DataSourceBuilder.ParseData(result);
                //soby_LogMessage("Total item count:" + totalItemCount);
                soby_LogMessage("service.DataSourceBuilder.PageIndex:" + service.DataSourceBuilder.PageIndex);
                soby_LogMessage("service.DataSourceBuilder.RowLimit:" + service.DataSourceBuilder.RowLimit);
                soby_LogMessage("service.DataSourceBuilder.ItemCount :" + service.DataSourceBuilder.ItemCount );

                soby_LogMessage(items);

                soby_LogMessage(service);

                var startIndex = (service.DataSourceBuilder.PageIndex * service.DataSourceBuilder.RowLimit) + 1;
                var endIndex = startIndex + service.DataSourceBuilder.ItemCount - 1;
                soby_LogMessage("startIndex :" + startIndex);
                soby_LogMessage("endIndex :" + endIndex);
                if (service.DataSourceBuilder.ItemCount === 0) {
                    startIndex = 0;
                    endIndex = 0;
                }
                service.StartIndex = startIndex;
                service.EndIndex = endIndex;
                service.ItemPopulated(items);
            },
            function (XMLHttpRequest, textStatus, errorThrown) {
                var errorMessage = "An error occured on populating grid" + XMLHttpRequest + " --- " + textStatus + " --- " + errorThrown;
                if (service.ErrorThrown !== null)
                {
                    service.ErrorThrown(errorMessage, null);
                }

                soby_LogMessage(errorMessage);
            },
            function (XMLHttpRequest, textStatus, errorThrown) { }, true, serviceUrl, service.DataSourceBuilder.Headers, requestMethod, dataType, contentType, this.Transport.Read.IncludeCredentials);
    }

    Parse() {

    }

    GetFieldNames() {
        var fieldNames = new Array();
        for (var i = 0; i < this.DataSourceBuilder.SchemaFields.length; i++) {
            fieldNames[fieldNames.length] = { FieldName: this.DataSourceBuilder.SchemaFields[i].FieldName }
        }

        return fieldNames;
    }
    ItemPopulated(items: Array<soby_Item>) { }
    ErrorThrown(errorMessage: string, errorTypeName: string) { }
    UpdateItem(keyNames: Array<string>, keyValues: Array<string>, objectInstance) {
        var updateUrl = this.Transport.Update.Url;
        for (var i = 0; i < keyValues.length; i++) {
            var regExp = new RegExp(keyNames[i], "gi");
            updateUrl = updateUrl.replace(regExp, keyValues[i]);
        }
        ajaxHelper(updateUrl, this.Transport.Update.Type, objectInstance, [this, keyValues], function (item, args) {
            var service = args[0];
            service.ItemUpdated(args);
        }, function (errorThrown) {
        })
    }
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>){
        var deleteUrl = this.Transport.Delete.Url;
        for (var i = 0; i < keyValues.length; i++) {
            var regExp = new RegExp(keyNames[i], "gi");
            deleteUrl = deleteUrl.replace(regExp, keyValues[i]);
        }

        ajaxHelper(deleteUrl, this.Transport.Delete.Type, null, [this, keyValues], function (item, args) {
            var service = args[0];
            service.ItemDeleted(args);
        }, function (errorThrown) {
        });
    }
    AddItem(objectInstance) {
        ajaxHelper(this.Transport.Add.Url, this.Transport.Add.Type, objectInstance, [this], function (item, args) {
            var service = args[0];
            service.ItemAdded(args);
        }, function (errorThrown) {
        });
    }
    ItemUpdated(args) { }
    ItemAdded(args) { }
    ItemDeleted(args) { }
}
// ******************************************************************

// ********************* HELPER METHODS *****************************

class soby_StaticDataBuilder extends soby_DataSourceBuilderAbstract {
    constructor() {
        super();
        this.RowLimit = 100;
    }

    Clone() {
        var builder = new soby_WSBuilder();
        builder.RowLimit = this.RowLimit;
        for (var i = 0; i < this.SchemaFields.length; i++) {
            var viewField = this.SchemaFields[i];
            builder.AddSchemaField(viewField.FieldName, viewField.FieldType, viewField.Args);
        }

        builder.Filters = this.Filters.Clone();

        for (var i = 0; i < this.Headers.length; i++) {
            var header = this.Headers[i];
            builder.AddHeader(header.Key, header.Value);
        }

        for (var i = 0; i < this.OrderByFields.length; i++) {
            var orderByField = this.OrderByFields[i];
            builder.AddOrderField(orderByField.FieldName, orderByField.IsAsc);
        }

        builder.Arguments = this.Arguments !== null ? this.Arguments.Clone() : null;

        return builder;
    }

    GetPagingQuery(transport: soby_TransportRequest) {
        if (transport.Type === "POST")
        {
            return "'pageIndex': " + this.PageIndex + "," + "'pageItemCount': " + this.RowLimit;
        }
        else {
            return "$skip=" + (this.PageIndex * this.RowLimit) + "&$top=" + this.RowLimit;
        }
    }
    GetViewFieldsQuery(transport: soby_TransportRequest) {
        if (transport.Type === "POST")
        {
            return this.SchemaFields.toWebAPIString();
        }
        else
        {
            return this.SchemaFields.toWebAPIString();
        }
    }
    GetOrderByFieldsQuery(transport: soby_TransportRequest) {
        var jsonString = "";
        for (var i = 0; i < this.OrderByFields.length; i++) {
            jsonString += this.OrderByFields[i].FieldName + " " + (this.OrderByFields[i].IsAsc === true ? "asc" : "desc") + ",";
        }

        if (jsonString !== "")
        {
            jsonString = jsonString.substr(0, jsonString.length - 1);
        }

        if (transport.Type === "POST")
        {
            if (jsonString === "")
            {
                jsonString = "null";
            }

            jsonString = "'orderByString': \"" + jsonString + "\"";
        }
        else if (jsonString !== "")
        {
            jsonString = "$orderby=" + jsonString;
        }

        return jsonString;
    }
    GetWhereQuery(transport: soby_TransportRequest) {
        var query = "";
        if (transport.Type === "POST") {
            query = this.Filters.ToJson();
        }
        else {
            query = this.Filters.ToQueryString(0);
            if (query !== "")
            {
                query = "$filter=" + query;
            }
        }
        return query;
    }
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: boolean)
    {
        this.MainQueryBeingGenerated();
        var selectFieldsEnvelope = this.GetViewFieldsQuery(transport);
        var whereQuery = this.GetWhereQuery(transport);
        var orderByFieldsQuery = this.GetOrderByFieldsQuery(transport);
        var pagingQuery = "";
        if (excludePagingQuery === false)
        {
            pagingQuery = this.GetPagingQuery(transport);
        }
        var mainEnvelope = "";;
        if (transport.Type === "POST")
        {
            if (excludePagingQuery === true)
            {
                pagingQuery = "''";
            }

            var envelope = "{" + (whereQuery !== "" ? whereQuery + ", " : "") + (orderByFieldsQuery !== "" ? orderByFieldsQuery + ", " : "") + pagingQuery + "}";
            if (this.MainQueryGenerated !== null) {
                mainEnvelope = this.MainQueryGenerated(envelope);
            }
        }
        else {
            var envelope = whereQuery;
            if (envelope !== "" && selectFieldsEnvelope !== "")
            {
                envelope += "&";
            }

            envelope += selectFieldsEnvelope;

            if (envelope !== "" && orderByFieldsQuery !== "")
            {
                envelope += "&";
            }

            envelope += orderByFieldsQuery;
            if (envelope !== "" && pagingQuery !== "")
            {
                envelope += "&";
            }

            mainEnvelope += pagingQuery;
            if (this.MainQueryGenerated !== null) {
                mainEnvelope = this.MainQueryGenerated(envelope);
            }
        }

        return envelope;
    }
    GetCountQuery(transport: soby_TransportRequest) {
        this.CountQueryBeingGenerated();
        var mainQuery = this.GetMainQuery(transport, true);
        var countServiceUrl = transport.Url + "/$count?" + mainQuery;
        if (transport.Type === "POST") {
            return "{" + mainQuery + "}";
        }
        else {
            return countServiceUrl;
        }
    }
    ParseData(result) {
        var result = (result.value !=null?result.value:result);
        for (var i = 0; i < result.length; i++) {
            for (var x = 0; x < this.SchemaFields.length; x++) {
                if (this.SchemaFields[x].FieldType === SobyFieldTypes.DateTime)
                {
                    var propertyName = this.SchemaFields[x].FieldName;
                    var value = result[i][propertyName];
                    if (value !== null && value !== "")
                    {
                        result[i][propertyName] = new Date(value.match(/\d+/)[0] * 1);
                    }
                }
            }
        }
        return result;
    }
    GetData(data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType, includeCredentials) {
        if (requestMethod === null || requestMethod === "") {
            requestMethod = "POST";
        }
        if (includeCredentials === null) {
            includeCredentials = false;
        }

        $.ajax({
            async: (async !== null ? async : true),
            url: wsUrl,
            type: requestMethod,
            dataType: dataType,
            data: data,
            processData: false,
            contentType: "application/json; charset=utf-8",
            xhrFields: (includeCredentials === true ? {
                withCredentials: true
            } : {}),
            complete: function (XMLHttpRequest) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (errorcallback)
                {
                    errorcallback(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function (data) {
                var data = data;
                if (data.d !== null)
                {
                    data = data.d;
                }

                if (callback)
                {
                    callback(data);
                }
            },
            beforeSend: function (xhr) {
                if (headers === null)
                {
                    return;
                }

                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].Key, headers[i].Value);
                }
            }
        });
    };
}


class soby_StaticDataService implements soby_ServiceInterface {
    DataSourceBuilder: soby_DataSourceBuilderAbstract;
    DataSourceBuilderTemp: soby_DataSourceBuilderAbstract;
    constructor(fields: Array<SobySchemaField>, items: Array<soby_Item>) {
        this.Items = items;

        const dataSourceBuilder = new soby_StaticDataBuilder();
        dataSourceBuilder.Filters = new SobyFilters(false);
        for (let i = 0; i < fields.length; i++) {
            dataSourceBuilder.AddSchemaField(fields[i].FieldName, fields[i].FieldType, fields[i].Args);
        }
        this.DataSourceBuilder = dataSourceBuilder;
        this.DataSourceBuilder = this.DataSourceBuilder.Clone();
        this.NextPageStrings = new Array<string>();
        this.NextPageStrings[0] = "";
    }

    
    Items: Array<soby_Item>
    NextPageString: string = "";
    PageIndex: number = 0;
    StartIndex: number = 0;
    EndIndex: number = 0;
    NextPageStrings: Array<string>;
    Args: Array<any>;
    Filters: SobyFilters = new SobyFilters(false);
    GroupByFields: SobyGroupByFields = new SobyGroupByFields();
    OrderByFields: SobyOrderByFields = new SobyOrderByFields();
    NextPageExist: boolean = false;
    Transport: soby_Transport;
    GroupBy(groupByFields: SobyGroupByFields) {
        this.GroupByFields = groupByFields;
        this.PopulateItems(null);
    }

    NavigationInformationBeingPopulated() { }
    NavigationInformationPopulated() { }
    ItemPopulated(items: Array<soby_Item>) { }
    ItemBeingPopulated() { }
    ErrorThrown(errorMessage: string) { }
    ItemUpdated(args) { }
    ItemAdded(args) { }
    ItemDeleted(args) { }
    SetRowLimit(rowLimit:number) {
        this.DataSourceBuilder.RowLimit = rowLimit;
    }

    PopulateNavigationInformation() {
        if (this.NavigationInformationBeingPopulated !== null)
        {
            this.NavigationInformationBeingPopulated();
        }

        const totalItemCount = this.Items.length;
        let startIndex = (this.DataSourceBuilder.PageIndex * this.DataSourceBuilder.RowLimit) + 1;
        let endIndex = ((this.DataSourceBuilder.PageIndex + 1) * this.DataSourceBuilder.RowLimit);
        if (this.DataSourceBuilder.RowLimit === 0) {
            startIndex = 0;
            endIndex = 0;
        }
        if (endIndex !== 0 && totalItemCount > endIndex) {
            this.NextPageExist = true;
        }
        else {
            this.NextPageExist = false;
            endIndex = totalItemCount;
        }
        soby_LogMessage("NextPageExist:" + this.NextPageExist);

        this.StartIndex = startIndex;
        this.EndIndex = endIndex;
        this.NavigationInformationPopulated();
    }

    Sort(orderByFields: SobyOrderByFields) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;

        this.PopulateItems(null);
    };
    Filter(filters: SobyFilters, clearOtherFilters: boolean) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        if (clearOtherFilters === true)
        {
            this.Filters = new SobyFilters(filters.IsOr);
        }

        this.Filters.AddFilterCollection(filters);
        this.PopulateItems(null);
    };
    SortAndFilter(orderByFields: SobyOrderByFields, filters: SobyFilters, clearOtherFilters: boolean)
    {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;
        if (clearOtherFilters === true)
        {
            this.Filters = new SobyFilters(filters.IsOr);
        }

        if (filters.Filters.length > 0)
        {
            this.Filters.AddFilterCollection(filters);
        }

        this.PopulateItems(null);
    }

    GoToPage(pageIndex: number) {
        this.DataSourceBuilder.PageIndex = pageIndex;
        this.PageIndex = pageIndex;

        this.PopulateItems(null);
    };
    CanNavigateToNextPage() {
        if (this.NextPageExist === false) {
            return false;
        }

        return true;
    };
    CanNavigateToPreviousPage() {
        if (this.DataSourceBuilder.PageIndex === 0) {
            return false;
        }

        return true;
    };
    PopulateItems(args: Array<any>) {
        this.Args = args;
        if (this.ItemBeingPopulated !== null)
        {
            this.ItemBeingPopulated();
        }
        this.DataSourceBuilder.PageIndex = this.PageIndex;
        this.DataSourceBuilder.NextPageString = this.NextPageString;

        var items = JSON.parse(JSON.stringify(this.Items));
        if (this.Filters.Filters.length > 0) {
            for (let i = items.length - 1; i > -1; i--) {
                if (this.CheckIfMatchFilters(items[i], this.Filters) === false) {
                    items.splice(i, 1);
                }
            }
        }

        if (this.OrderByFields.length > 0) {
            var orderByFields = this.OrderByFields;
            items.sort(
                function (x: soby_Item, y: soby_Item) {
                    var result = 0;
                    for (let i = 0; i < orderByFields.length; i++) {
                        if (x[orderByFields[i].FieldName] > y[orderByFields[i].FieldName]) {
                            if (orderByFields[i].IsAsc === true) {
                                return 1;
                            }
                            else {
                                return -1;
                            }
                        }
                        else if (x[orderByFields[i].FieldName] < y[orderByFields[i].FieldName]) {
                            if (orderByFields[i].IsAsc === true) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        }
                    }

                    return result;
                }
            );
        }

        let _items = new Array();
        if (this.DataSourceBuilder.RowLimit > 0) {
            for (let i = this.PageIndex * this.DataSourceBuilder.RowLimit; i < ((this.PageIndex + 1) * this.DataSourceBuilder.RowLimit); i++) {
                if (i > items.length - 1)
                    break;

                _items.push(items[i]);
            }
        }
        else {
            _items = items;
        }

        this.ItemPopulated(_items);
    }
    CheckIfMatchFilter(value, filter): boolean {
        if (filter.FilterType === SobyFilterTypes.Equal) {
            if (value !== filter.FilterValue) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.BeginsWith) {
            if (value === null || value === undefined) {
                return false;
            }

            if (value.toString().startsWith(filter.FilterValue) === false) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.Contains) {
            if (value === null || value === undefined) {
                return false;
            }

            if (value.toString().indexOf(filter.FilterValue) === -1) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.Greater) {
            if (value > filter.FilterValue) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.GreaterEqual) {
            if (value >= filter.FilterValue) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.IsNotNull) {
            if (value === null || value === undefined) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.IsNull) {
            if (value !== null || value !== undefined) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.Lower) {
            if (value < filter.FilterValue) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.LowerEqual) {
            if (value <= filter.FilterValue) {
                return false;
            }
        }
        else if (filter.FilterType === SobyFilterTypes.NotEqual) {
            if (value === filter.FilterValue) {
                return false;
            }
        }

        return true;
    }

    CheckIfMatchFilters(item: soby_Item, filters: SobyFilters): boolean {
        for (let x = 0; x < filters.Filters.length; x++) {
            if (filters.Filters[x] instanceof SobyFilters) {
                if (this.CheckIfMatchFilters(item, filters.Filters[x]) === false) {
                    return false;
                }
            }
            else if (this.CheckIfMatchFilter(item[filters.Filters[x].FieldName], filters.Filters[x]) === false) {
                return false;
            }
        }

        return true;
    }
    GetFieldNames() {
        var fieldNames = new Array();
        return fieldNames;
    }
    UpdateItem(keyNames: Array<string>, keyValues: Array<string>, objectInstance) {
        if (keyValues === null || keyValues === undefined || keyValues.length === 0)
            return;

        for (var i = 0; i < this.Items.length; i++) {
            var matchItem = true;
            for (var x = 0; x < keyNames.length; x++) {
                if (this.Items[i][keyNames[x]] !== keyValues[0][keyNames[x]]) {
                    matchItem = false;
                    break;
                }
            }

            if (matchItem === true)
            {
                this.Items[i] = objectInstance;
            }
        }
        this.ItemUpdated(null);
        //this.ItemPopulated(this.Items);
    }
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>) {
        var newArray = new Array();
        for (var i = this.Items.length - 1; i > -1; i--) {
            var isAllEqual = true;
            for (var t = 0; t < keyNames.length; t++) {
                if (this.Items[i][keyNames[t]] !== keyValues[t])
                {
                    isAllEqual = false;
                }
            }

            if (isAllEqual === false)
            {
                newArray[newArray.length] = this.Items[i];
            }
        }
        this.Items = newArray;
        this.ItemDeleted(null);
        //this.ItemPopulated(this.Items);
    }
    AddItem(objectInstance) {
        this.Items[this.Items.length] = objectInstance;
        this.ItemAdded(null);
        //this.ItemPopulated(this.Items);
    }
}
// ******************************************************************
function WSArgument(fieldName, filterValue) {
    this.FieldName = fieldName;
    this.FilterValue = filterValue;
}

function WSHeader(key, value) {
    this.Key = key;
    this.Value = value;
}

class soby_WSBuilder extends soby_DataSourceBuilderAbstract
{
    WebServiceDataTypes: number = SobyWebServiceDataTypes.Json;
    MethodName: string = "";
    CountQuerySupported: boolean = true;
    constructor() {
        super();
        this.RowLimit = 100;
    }

    Clone() {
        var builder = new soby_WSBuilder();
        for (var attribut in this) {
            if (typeof this[attribut] === "function")
                builder[attribut.toString()] = this[attribut];
        }
        builder.RowLimit = this.RowLimit;
        builder.PageIndex = this.PageIndex;
        builder.NextPageExist = this.NextPageExist;

        for (var i = 0; i < this.SchemaFields.length; i++) {
            var viewField = this.SchemaFields[i];
            builder.AddSchemaField(viewField.FieldName, viewField.FieldType, viewField.Args);
        }

        builder.Filters = this.Filters.Clone();

        for (var i = 0; i < this.Headers.length; i++) {
            var header = this.Headers[i];
            builder.AddHeader(header.Key, header.Value);
        }

        for (var i = 0; i < this.OrderByFields.length; i++) {
            var orderByField = this.OrderByFields[i];
            builder.AddOrderField(orderByField.FieldName, orderByField.IsAsc);
        }

        if (this.Arguments !== null) {
            builder.Arguments = new SobyArguments();
            for (var i = 0; i < this.Arguments.length; i++) {
                var argument = this.Arguments[i];
                builder.Arguments.push(argument);
            }
        }

        builder.DataBeingParsed = this.DataBeingParsed;
        builder.WebServiceDataTypes = this.WebServiceDataTypes;
        builder.MethodName = this.MethodName;
        builder.CountQuerySupported = this.CountQuerySupported;
        builder.MainQueryBeingGenerated = this.MainQueryBeingGenerated;
        builder.CountQueryBeingGenerated = this.CountQueryBeingGenerated;

        return builder;
    }

    GetPagingQuery(transport: soby_TransportRequest)
    {
        if (this.WebServiceDataTypes === SobyWebServiceDataTypes.Soap)
        {
        }
        else if (transport.Type === "POST")
        {
            return "'pageIndex': " + this.PageIndex + "," + "'pageItemCount': " + this.RowLimit;
        }
        else
        {
            if (this.RowLimit > 0)
            {
                return "$skip=" + (this.PageIndex * this.RowLimit) + "&$top=" + this.RowLimit;
            }
            else
            {
                return "";
            }
        }
    }
    GetViewFieldsQuery(transport: soby_TransportRequest) {
        if (transport.Type === "POST")
        {
            return this.SchemaFields.toWebAPIString();
        }
        else
        {
            return this.SchemaFields.toWebAPIString();
        }
    }
    GetOrderByFieldsQuery(transport: soby_TransportRequest) {
        var jsonString = "";
        for (var i = 0; i < this.OrderByFields.length; i++) {
            jsonString += this.OrderByFields[i].FieldName + " " + (this.OrderByFields[i].IsAsc === true ? "asc" : "desc") + ",";
        }

        if (jsonString !== "")
        {
            jsonString = jsonString.substr(0, jsonString.length - 1);
        }

        if (transport.Type === "POST")
        {
            if (jsonString === "")
            {
                jsonString = "null";
            }

            jsonString = "'orderByString': \"" + jsonString + "\"";
        }
        else if (jsonString !== "")
        {
            jsonString = "$orderby=" + jsonString;
        }

        return jsonString;
    }
    GetWhereQuery(transport: soby_TransportRequest) {
        var query = "";
        if (this.WebServiceDataTypes === SobyWebServiceDataTypes.Soap)
        {
            query = this.Filters.ToXml();
        }
        if (transport.Type === "POST") {
            query = this.Filters.ToJson();
        }
        else {
            query = this.Filters.ToQueryString(0);
            if (query !== "")
            {
                query = "$filter=" + query;
            }
        }
        return query;
    }
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: boolean)
    {
        this.MainQueryBeingGenerated();
        if (this.WebServiceDataTypes === SobyWebServiceDataTypes.Soap)
        {
            var envelope = "<?xml version= '1.0' encoding= 'utf-8' ?>" +
                "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
                "<soap:Body>" +
                "<" + this.MethodName + " xmlns= 'http://tempuri.org/'> " +
                this.Filters.ToXml() +
                //this.OrderByFields.ToXml() +
                "</" + this.MethodName + ">" +
                "</soap:Body>" +
                "</soap:Envelope>";

            return envelope;
        }
        var mainEnvelope = "";
        var selectFieldsEnvelope = this.GetViewFieldsQuery(transport);
        var whereQuery = this.GetWhereQuery(transport);
        var orderByFieldsQuery = this.GetOrderByFieldsQuery(transport);
        var pagingQuery = "";
        if (excludePagingQuery === false)
        {
            pagingQuery = this.GetPagingQuery(transport);
        }

        if (transport.Type === "POST")
        {
            if (excludePagingQuery === true)
            {
                pagingQuery = "''";
            }

            mainEnvelope = "{" + (whereQuery !== "" ? whereQuery + ", " : "") + (orderByFieldsQuery !== "" ? orderByFieldsQuery + ", " : "") + pagingQuery + "}";
            if (this.MainQueryGenerated !== null) {
                mainEnvelope = this.MainQueryGenerated(mainEnvelope);
            }
        }
        else {
            var envelope = whereQuery;
            if (envelope !== "" && selectFieldsEnvelope !== "")
            {
                envelope += "&";
            }

            envelope += selectFieldsEnvelope;
            if (envelope !== "" && orderByFieldsQuery !== "")
            {
                envelope += "&";
            }

            envelope += orderByFieldsQuery;
            if (envelope !== "" && pagingQuery !== "")
            {
                envelope += "&";
            }

            envelope += pagingQuery;
            mainEnvelope = envelope;
            if (this.MainQueryGenerated !== null) {
                mainEnvelope = this.MainQueryGenerated(mainEnvelope);
            }
        }

        return mainEnvelope;
    }
    GetCountQuery(transport: soby_TransportRequest)
    {
        if (this.CountQuerySupported === false)
            return "";

        this.CountQueryBeingGenerated();
        var mainQuery = this.GetMainQuery(transport, true);
        var countServiceUrl = transport.Url + "/$count?";// + mainQuery;
        if (transport.Type === "POST") {
            return "{" + mainQuery + "}";
        }
        else {
            return countServiceUrl;
        }
    }
    ParseData(result1)
    {
        var result = ((result1.value !== null && result1.value !== undefined) ? result1.value : result1);
        var parseCompleted:boolean = false;
        result = this.DataBeingParsed(result, parseCompleted);

        if (parseCompleted === false) {
            for (var i = 0; i < result.length; i++) {
                for (var x = 0; x < this.SchemaFields.length; x++) {
                    if (this.SchemaFields[x].FieldType === SobyFieldTypes.DateTime) {
                        var propertyName = this.SchemaFields[x].FieldName;
                        var value = result[i][propertyName];
                        if (value !== null) {
                            if (value instanceof Date === true) {
                                result[i][propertyName] = value;
                            }
                            else if (value !== "") {
                                if (value.indexOf("20") === 0 || value.indexOf("19") === 0) {
                                    result[i][propertyName] = new Date(value);
                                }
                                else {
                                    result[i][propertyName] = new Date(value.match(/\d+/)[0] * 1);
                                }
                            }
                        }
                    }
                }
            }
        }

        return result;
    }
    GetData(data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType, contentType, includeCredentials) {
        if (requestMethod === null || requestMethod === "")
        {
            requestMethod = "POST";
        }
        if (contentType === null || contentType === "")
        {
            contentType = "application/json; charset=utf-8";
        }

        if (requestMethod === "GET") {
            contentType = "";
        }

        $.ajax({
            async: (async !== null ? async : true),
            url: wsUrl,
            type: requestMethod,
            dataType: dataType,
            data: data,
            processData: false,
            contentType: contentType,
            xhrFields: (includeCredentials === true ? {
                withCredentials: true
            } : {}),
            complete: function (XMLHttpRequest) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (errorcallback)
                {
                    errorcallback(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function (data)
            {
                sobyLastReturnData = data;
                var data = data;
                if (data.d !== null && data.d !== undefined)
                {
                    data = data.d;
                }

                if (data.results !== null && data.results !== undefined)
                {
                    data = data.results;
                }

                if (callback)
                {
                    callback(data);
                }
            },
            beforeSend: function (xhr) {
                if (headers === null)
                {
                    return;
                }

                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].Key, headers[i].Value);
                }
            }
        });
    };
}


// ********************* HELPER METHODS *****************************
if (!Date.prototype.toISOString)
{
    (function ()
    {
        function pad(number)
        {
            var r = String(number);
            if (r.length === 1)
            {
                r = '0' + r;
            }
            return r;
        }
        Date.prototype.toISOString = function ()
        {
            return this.getUTCFullYear()
                + '-' + pad(this.getUTCMonth() + 1)
                + '-' + pad(this.getUTCDate())
                + 'T' + pad(this.getUTCHours())
                + ':' + pad(this.getUTCMinutes())
                + ':' + pad(this.getUTCSeconds())
                + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                + 'Z';
        };
    } ());
}

var soby_guid = (function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

function soby_LogMessage(message) {
    try {
        console.log(message);
    } catch (err) { }
}

function soby_DateToIso(d) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(d - tzoffset)).toISOString();
}

function soby_DateFromISO(d) {
    var xDate = d.split(" ")[0];
    var xTime = d.split(" ")[1];

    // split apart the hour, minute, & second
    var xTimeParts = xTime.split(":");
    var xHour = xTimeParts[0];
    var xMin = xTimeParts[1];
    var xSec = xTimeParts[2];

    // split apart the year, month, & day
    var xDateParts = xDate.split("-");
    var xYear = xDateParts[0];
    var xMonth = xDateParts[1] - 1;
    var xDay = xDateParts[2];

    var dDate = new Date(xYear, xMonth, xDay, xHour, xMin, xSec);
    return dDate;
    /*
    s = s.split(/\D/);
    return new Date(Date.UTC(s[0], --s[1] || '', s[2] || '', s[3] || '', s[4] || '', s[5] || '', s[6] || ''))
    */
}
function soby_GetFormatedDateString(date) {
    var dateOptions = { year: "numeric", month: "short", day: "numeric" };
    return (date !== null ? date.toLocaleDateString("en-gb", dateOptions) : "")
}
function soby_GetDateWithFormat(dateString, format): Date {
    var delimiter:string = "";
    if (format.indexOf(".") > 0) {
        delimiter = ".";
    }
    else if (format.indexOf("\\") > 0) {
        delimiter = "\\";
    }
    else if (format.indexOf("\/") > 0) {
        delimiter = "\/";
    }
    else if (format.indexOf("-") > 0) {
        delimiter = "-";
    }

    if (delimiter === "")
        return null;

    var formatLowerCase:string = format.toLowerCase();
    var formatItems = formatLowerCase.split(delimiter);
    var dateItems = dateString.split(delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");

    if (dayIndex === -1)
        return null;
    if (monthIndex === -1)
        return null;
    if (yearIndex === -1)
        return null;

    var d = dateItems[dayIndex];
    var month = parseInt(dateItems[monthIndex])-1;
    var formatedDate: Date = new Date(dateItems[yearIndex], month, d);
    return formatedDate;
};

function soby_TicksFromDate(date): number {
    return ((date.getTime() * 10000) + 621355968000000000);
}

function soby_DateFromTicks(ticks): Date {
    return new Date((ticks - 621355968000000000)/10000);
}

function soby_IsNullOrEmpty(value): boolean {
    if (value === null || value === undefined || value === "")
        return true;
    else
        return false;
}
// ************************************************************
