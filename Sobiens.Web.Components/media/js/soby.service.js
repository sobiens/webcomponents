var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// VERSION 1.0.8.1
if (!Object.setPrototypeOf) {
    // Only works in Chrome and FireFox, does not work in IE:
    Object.prototype.setPrototypeOf = function (obj, proto) {
        if (obj.__proto__) {
            obj.__proto__ = proto;
            return obj;
        }
        else {
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
    };
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
// ********************* TRANSPORT *****************************
var soby_Transport = /** @class */ (function () {
    function soby_Transport() {
    }
    return soby_Transport;
}());
var soby_TransportRequest = /** @class */ (function () {
    function soby_TransportRequest(url, dataType, contentType, type) {
        this.Url = url;
        this.DataType = dataType;
        this.ContentType = contentType;
        this.Type = type;
    }
    return soby_TransportRequest;
}());
// ******************************************************************
// ********************* HELPER METHODS *****************************
var soby_FilterValueSeperator = "_SDX_";
var SobyFieldTypesObject = /** @class */ (function () {
    function SobyFieldTypesObject() {
        this.Text = 0;
        this.Number = 1;
        this.MultiChoice = 2;
        this.Lookup = 3;
        this.Boolean = 4;
        this.Choice = 5;
        this.ModStat = 6;
        this.User = 7;
        this.TaxonomyFieldType = 8;
        this.DateTime = 9;
        this.Integer = 10;
        this.CurrentUserGroups = 11;
        this.DateTimeNowDifferenceAsMinute = 12;
        this.DateTimeRange = 13;
    }
    return SobyFieldTypesObject;
}());
var SobyFilterTypesObject = /** @class */ (function () {
    function SobyFilterTypesObject() {
        this.Equal = 0;
        this.NotEqual = 1;
        this.Contains = 2;
        this.In = 3;
        this.Greater = 4;
        this.Lower = 5;
        this.GreaterEqual = 6;
        this.LowerEqual = 7;
        this.BeginsWith = 8;
        this.Membership = 9;
        this.IsNull = 10;
        this.IsNotNull = 11;
    }
    return SobyFilterTypesObject;
}());
var SobyAggregateTypesObject = /** @class */ (function () {
    function SobyAggregateTypesObject() {
        this.Average = 0;
        this.Count = 1;
        this.Max = 2;
        this.Min = 3;
        this.Sum = 4;
    }
    SobyAggregateTypesObject.prototype.GetAggregateTypeName = function (aggregateType) {
        if (aggregateType == 0) {
            return "Average";
        }
        else if (aggregateType == 1) {
            return "Count";
        }
        else if (aggregateType == 2) {
            return "Max";
        }
        else if (aggregateType == 3) {
            return "Min";
        }
        else if (aggregateType == 4) {
            return "Sum";
        }
    };
    return SobyAggregateTypesObject;
}());
var SobyWebServiceDataTypesObject = /** @class */ (function () {
    function SobyWebServiceDataTypesObject() {
        this.QueryString = 0;
        this.Json = 1;
        this.Soap = 2;
    }
    return SobyWebServiceDataTypesObject;
}());
var SobyWebServiceDataTypes = new SobyWebServiceDataTypesObject();
var SobyFieldTypes = new SobyFieldTypesObject();
var SobyFilterTypes = new SobyFilterTypesObject();
var SobyAggregateTypes = new SobyAggregateTypesObject();
var SobyFilters = /** @class */ (function () {
    function SobyFilters(isOr) {
        this.ShouldBeClearedOnUIFilterAction = false;
        this.Filters = new Array();
        this.IsOr = isOr;
    }
    SobyFilters.prototype.Clear = function () {
        this.Filters = new Array();
    };
    SobyFilters.prototype.AddFilter = function (fieldName, filterValue, fieldType, filterType, lookupID, shouldBeClearedOnUIFilterAction) {
        var sobyFilter = new SobyFilter(fieldName, filterValue, fieldType, filterType, lookupID);
        sobyFilter.ShouldBeClearedOnUIFilterAction = shouldBeClearedOnUIFilterAction;
        this.Filters.push(sobyFilter);
    };
    SobyFilters.prototype.AddFilterObject = function (filter) {
        this.Filters.push(filter);
    };
    SobyFilters.prototype.AddFilterCollection = function (sobyFilters) {
        this.Filters.push(sobyFilters);
    };
    SobyFilters.prototype.ToCaml = function () {
        var camlString = "";
        var filterCompareString = this.IsOr == true ? "Or" : "And";
        for (var i = 0; i < this.Filters.length; i++) {
            if (this.Filters.length == 1) {
                camlString += this.Filters[i].ToCaml();
            }
            else if (i == 1) {
                camlString += "<" + filterCompareString + ">" + this.Filters[i - 1].ToCaml() + this.Filters[i].ToCaml() + "</" + filterCompareString + ">";
            }
            else if (i % 2 == 1) {
                camlString = "<" + filterCompareString + ">" + camlString + "<" + filterCompareString + ">" + this.Filters[i - 1].ToCaml() + this.Filters[i].ToCaml() + "</" + filterCompareString + "></" + filterCompareString + ">";
            }
            else if (i == this.Filters.length - 1) {
                camlString = "<" + filterCompareString + ">" + camlString + this.Filters[i].ToCaml() + "</" + filterCompareString + ">";
            }
        }
        return camlString;
    };
    SobyFilters.prototype.ToXml = function () {
        var xml = "";
        for (var i = 0; i < this.Filters.length; i++) {
            var argument = this.Filters[i];
            xml += "<" + argument.FieldName + ">" + argument.FilterValue + "</" + argument.FieldName + ">";
        }
        return xml;
    };
    SobyFilters.prototype.ToJson = function () {
        var json = "";
        for (var i = 0; i < this.Filters.length; i++) {
            var argument = this.Filters[i];
            json += "\"" + argument.FieldName + "\": \"" + argument.FilterValue + "\",";
        }
        if (json != "") {
            return json.substr(0, json.length - 1);
        }
        return json;
    };
    SobyFilters.prototype.ToQueryString = function (_type /* 0 - Normal, 1 - SP Rest */) {
        if (this.Filters.length == 0) {
            return "";
        }
        var json = "(";
        for (var i = 0; i < this.Filters.length; i++) {
            var argument = this.Filters[i];
            json += argument.ToQueryString(_type);
            if (i < this.Filters.length - 1) // Only if it is not last item
             {
                if (this.IsOr) {
                    json += " or ";
                }
                else {
                    json += " and ";
                }
            }
        }
        json += ")";
        return json;
    };
    SobyFilters.prototype.ToSearch2010Xml = function () {
        if (this.Filters.length == 0) {
            return "";
        }
        var json = "(";
        for (var i = 0; i < this.Filters.length; i++) {
            var argument = this.Filters[i];
            if (i > 0) {
                if (this.IsOr) {
                    json += " OR ";
                }
                else {
                    json += " AND ";
                }
            }
            json += argument.ToSearch2010Xml();
        }
        json += ")";
        return json;
    };
    SobyFilters.prototype.Clone = function () {
        var sobyFilters = new SobyFilters(this.IsOr);
        for (var i = 0; i < this.Filters.length; i++) {
            var filter = this.Filters[i];
            if (filter instanceof SobyFilter) {
                sobyFilters.AddFilter(filter.FieldName, filter.FilterValue, filter.FieldType, filter.FilterType, filter.LookupID, filter.ShouldBeClearedOnUIFilterAction);
            }
            else {
                sobyFilters.AddFilterCollection(filter.Clone());
            }
        }
        return sobyFilters;
    };
    return SobyFilters;
}());
var SobyFilter = /** @class */ (function () {
    function SobyFilter(fieldName, filterValue, fieldType, filterType, lookupID) {
        this.ShouldBeClearedOnUIFilterAction = false;
        this.FieldName = fieldName;
        this.FieldType = fieldType;
        this.FilterType = filterType;
        this.FilterValue = filterValue;
        this.LookupID = lookupID;
    }
    SobyFilter.prototype.ToCaml = function () {
        // <Eq><FieldRef Name='SessionNumber' /><Value Type='Number'>{1}</Value></Eq>
        var additionalFieldRefAttributes = "";
        var equvialentString = "";
        var valueString = "";
        if (this.LookupID == true) {
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
        if (value == "[*ME*]") {
            valueString = "<Value Type='" + valueTypeString + "'><UserID /></Value>";
        }
        else if (this.FieldType == SobyFieldTypes.DateTime || this.FieldType == SobyFieldTypes.Number) {
            valueString = "<Value Type='" + valueTypeString + "'>" + this.FilterValue + "</Value>";
        }
        else {
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
                    if (this.FieldType != SobyFieldTypes.DateTime && this.FieldType != SobyFieldTypes.Number) {
                        valueString += "<![CDATA[" + values[i] + "]]></Value>";
                    }
                    else {
                        valueString += values[i] + "</Value>";
                    }
                }
                valueString += "</Values>";
                break;
        }
        return "<" + equvialentString + (this.FilterType == SobyFilterTypes.Membership ? " Type='" + valueTypeString + "'" : "") + "><FieldRef Name='" + this.FieldName + "' " + additionalFieldRefAttributes + " />" + valueString + "</" + equvialentString + ">";
    };
    SobyFilter.prototype.ToSearch2010Xml = function () {
        // () AND ANY(*) (IsDocument=True) (scope:SPPortalCAS)
        var equvialentString = "";
        var value = this.FilterValue;
        switch (this.FilterType) {
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
    };
    SobyFilter.prototype.ToQueryString = function (_type /* 0 - Normal, 1 - SP Rest */) {
        var json = "";
        var value = this.FilterValue;
        var valueFilterString = "";
        switch (this.FilterType) {
            case SobyFilterTypes.Equal:
                if (this.FieldType == SobyFieldTypes.Text) {
                    valueFilterString = this.FieldName + " eq '" + value + "'";
                }
                else if (this.FieldType == SobyFieldTypes.DateTime) {
                    valueFilterString = this.FieldName + " eq datetime'" + value + "'";
                }
                else {
                    valueFilterString = this.FieldName + " eq " + value;
                }
                break;
            case SobyFilterTypes.NotEqual:
                var comparisionText = "neq";
                if (_type == 1) {
                    comparisionText = "ne";
                }
                if (this.FieldType == SobyFieldTypes.Text) {
                    valueFilterString = this.FieldName + " " + comparisionText + " '" + value + "'";
                }
                else if (this.FieldType == SobyFieldTypes.DateTime) {
                    valueFilterString = this.FieldName + " " + comparisionText + " datetime'" + value + "'";
                }
                else {
                    valueFilterString = this.FieldName + " " + comparisionText + " " + value;
                }
                break;
            case SobyFilterTypes.Greater:
                if (this.FieldType == SobyFieldTypes.DateTime) {
                    valueFilterString = this.FieldName + " gt datetime'" + value + "'";
                }
                else {
                    valueFilterString = this.FieldName + " gt " + value;
                }
                break;
            case SobyFilterTypes.Lower:
                if (this.FieldType == SobyFieldTypes.DateTime) {
                    valueFilterString = this.FieldName + " lt datetime'" + value + "'";
                }
                else {
                    valueFilterString = this.FieldName + " lt " + value;
                }
                break;
            case SobyFilterTypes.GreaterEqual:
                if (this.FieldType == SobyFieldTypes.DateTime) {
                    valueFilterString = this.FieldName + " geq datetime'" + value + "'";
                }
                else {
                    valueFilterString = this.FieldName + " geq " + value;
                }
                break;
            case SobyFilterTypes.LowerEqual:
                if (this.FieldType == SobyFieldTypes.DateTime) {
                    valueFilterString = this.FieldName + " leq datetime'" + value + "'";
                }
                else {
                    valueFilterString = this.FieldName + " leq " + value;
                }
                break;
            case SobyFilterTypes.IsNull:
                valueFilterString = this.FieldName + " eq null ";
                break;
            case SobyFilterTypes.IsNotNull:
                var comparisionText = "neq";
                if (_type == 1) {
                    comparisionText = "ne";
                }
                valueFilterString = this.FieldName + " " + comparisionText + " null ";
                break;
            case SobyFilterTypes.Contains:
                if (_type == 0) {
                    valueFilterString = "contains(" + this.FieldName + ", '" + value + "')";
                }
                else {
                    valueFilterString = "substringof('" + value + "', " + this.FieldName + ")";
                }
                break;
            case SobyFilterTypes.BeginsWith:
                if (_type == 0) {
                    valueFilterString = "beginswith";
                }
                else {
                    valueFilterString = "startsWith";
                }
                break;
        }
        json += valueFilterString;
        return json;
    };
    return SobyFilter;
}());
var SobySchemaFields = /** @class */ (function (_super) {
    __extends(SobySchemaFields, _super);
    function SobySchemaFields(items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(SobySchemaFields.prototype));
        return _this;
    }
    SobySchemaFields.prototype.toWebAPIString = function () {
        var webAPIString = "";
        var expandString = "";
        for (var i = 0; i < this.length; i++) {
            webAPIString += "," + this[i].FieldName;
            if (this[i].FieldType == SobyFieldTypes.Lookup) {
                expandString += "," + this[i].Args.ModelName;
            }
            else if (this[i].FieldType == SobyFieldTypes.User) {
                expandString += "," + this[i].Args.ModelName;
            }
        }
        if (expandString != "") {
            expandString = "$expand=" + expandString.substr(1) + "&";
        }
        return expandString + "$select=" + webAPIString.substr(1);
    };
    return SobySchemaFields;
}(Array));
var SobySchemaField = /** @class */ (function () {
    function SobySchemaField(fieldName, fieldType, args) {
        this.FieldName = fieldName;
        this.FieldType = fieldType;
        this.Args = args;
    }
    return SobySchemaField;
}());
var SobyNavigationInformation = /** @class */ (function () {
    function SobyNavigationInformation() {
        this.PageIndex = 0;
        this.ViewType = SobyPaginationViewTypes.BasicButtons;
        this.VerticalAlign = SobyPaginationVerticalAlign.Center;
    }
    return SobyNavigationInformation;
}());
var SobyOrderByFields = /** @class */ (function (_super) {
    __extends(SobyOrderByFields, _super);
    function SobyOrderByFields(items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(SobyOrderByFields.prototype));
        return _this;
    }
    SobyOrderByFields.prototype.GetOrderFieldByName = function (fieldName) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() == fieldName.toLowerCase()) {
                return this[i];
            }
        }
        return null;
    };
    SobyOrderByFields.prototype.ContainsField = function (fieldName) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() == fieldName.toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    SobyOrderByFields.prototype.ContainsFieldAsAsc = function (fieldName) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() == fieldName.toLowerCase()) {
                return this[0].IsAsc;
            }
        }
        return false;
    };
    return SobyOrderByFields;
}(Array));
var SobyOrderByField = /** @class */ (function () {
    function SobyOrderByField(fieldName, isAsc) {
        this.IsAsc = false;
        this.FieldName = fieldName;
        this.IsAsc = isAsc;
    }
    return SobyOrderByField;
}());
var SobyAggregateFields = /** @class */ (function (_super) {
    __extends(SobyAggregateFields, _super);
    function SobyAggregateFields(items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(SobyAggregateFields.prototype));
        return _this;
    }
    SobyAggregateFields.prototype.ContainsField = function (fieldName) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() == fieldName.toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    return SobyAggregateFields;
}(Array));
var SobyGroupByFields = /** @class */ (function (_super) {
    __extends(SobyGroupByFields, _super);
    function SobyGroupByFields(items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(SobyGroupByFields.prototype));
        return _this;
    }
    SobyGroupByFields.prototype.ContainsField = function (fieldName) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].FieldName.toLowerCase() == fieldName.toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    return SobyGroupByFields;
}(Array));
var SobyAggregateField = /** @class */ (function () {
    function SobyAggregateField(fieldName, aggregateType) {
        this.AggregateType = 0;
        this.FieldName = fieldName;
        this.AggregateType = aggregateType;
    }
    return SobyAggregateField;
}());
var SobyGroupByField = /** @class */ (function () {
    function SobyGroupByField(fieldName, isAsc, displayFunction) {
        this.IsAsc = false;
        this.DisplayFunction = null;
        this.FieldName = fieldName;
        this.IsAsc = isAsc;
        this.DisplayFunction = displayFunction;
    }
    return SobyGroupByField;
}());
var SobyHeaders = /** @class */ (function (_super) {
    __extends(SobyHeaders, _super);
    function SobyHeaders(items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(SobyHeaders.prototype));
        return _this;
    }
    return SobyHeaders;
}(Array));
var SobyHeader = /** @class */ (function () {
    function SobyHeader(key, value) {
        this.Key = key;
        this.Value = value;
    }
    return SobyHeader;
}());
var SobyArguments = /** @class */ (function (_super) {
    __extends(SobyArguments, _super);
    function SobyArguments(items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(SobyArguments.prototype));
        return _this;
    }
    SobyArguments.prototype.ToJson = function () {
        return "";
    };
    SobyArguments.prototype.ToQueryString = function () {
        return "";
    };
    SobyArguments.prototype.Clone = function () {
        return null;
    };
    return SobyArguments;
}(Array));
var SobyArgument = /** @class */ (function () {
    function SobyArgument() {
    }
    return SobyArgument;
}());
var soby_DataSourceBuilderAbstract = /** @class */ (function () {
    function soby_DataSourceBuilderAbstract() {
        this.NextPageExist = false;
        this.Filters = new SobyFilters(false);
        this.SchemaFields = new SobySchemaFields();
        this.OrderByFields = new SobyOrderByFields();
        this.Arguments = new SobyArguments();
        this.Headers = new SobyHeaders();
    }
    soby_DataSourceBuilderAbstract.prototype.GetViewField = function (fieldName) {
        for (var i = 0; i < this.SchemaFields.length; i++) {
            if (this.SchemaFields[i].FieldName == fieldName) {
                return this.SchemaFields[i];
            }
        }
        return null;
    };
    soby_DataSourceBuilderAbstract.prototype.GetViewFieldByPropertyName = function (propertyName) {
        for (var i = 0; i < this.SchemaFields.length; i++) {
            if (this.SchemaFields[i].FieldName == propertyName) {
                return this.SchemaFields[i];
            }
        }
        return null;
    };
    soby_DataSourceBuilderAbstract.prototype.AddHeader = function (key, value) {
        var header = new SobyHeader(key, value);
        this.Headers.push(header);
    };
    soby_DataSourceBuilderAbstract.prototype.AddSchemaField = function (fieldName, fieldType, args) {
        var schemaField = new SobySchemaField(fieldName, fieldType, args);
        this.SchemaFields.push(schemaField);
    };
    soby_DataSourceBuilderAbstract.prototype.AddOrderField = function (fieldName, isAsc) {
        this.OrderByFields.push(new SobyOrderByField(fieldName, isAsc));
    };
    soby_DataSourceBuilderAbstract.prototype.AddOrderFields = function (orderFields) {
        for (var i = 0; i < orderFields.length; i++) {
            this.OrderByFields.push(orderFields[i]);
        }
    };
    soby_DataSourceBuilderAbstract.prototype.GetCountQuery = function (transport) {
        return null;
    };
    soby_DataSourceBuilderAbstract.prototype.GetMainQuery = function (transport, excludePagingQuery) {
        return "";
    };
    soby_DataSourceBuilderAbstract.prototype.Clone = function () {
        return null;
    };
    soby_DataSourceBuilderAbstract.prototype.DataBeingParsed = function (data, parseCompleted) {
        return data;
    };
    soby_DataSourceBuilderAbstract.prototype.ParseData = function (value) {
        return null;
    };
    soby_DataSourceBuilderAbstract.prototype.GetData = function (data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType, contentType) { };
    return soby_DataSourceBuilderAbstract;
}());
// ******************************************************************
// ********************* HELPER METHODS *****************************
var soby_Filter = /** @class */ (function () {
    function soby_Filter() {
    }
    return soby_Filter;
}());
var soby_Item = /** @class */ (function () {
    function soby_Item() {
    }
    return soby_Item;
}());
// ******************************************************************
// ********************* HELPER METHODS *****************************
var soby_WebServiceService = /** @class */ (function () {
    function soby_WebServiceService(dataSourceBuilder) {
        this.NextPageString = "";
        this.PageIndex = 0;
        this.StartIndex = 0;
        this.EndIndex = 0;
        this.Filters = new SobyFilters(false);
        this.GroupByFields = new SobyGroupByFields();
        this.OrderByFields = new SobyOrderByFields();
        this.NextPageExist = false;
        this.ItemBeingPopulated = function () { };
        this.DataSourceBuilder = dataSourceBuilder;
        this.DataSourceBuilderTemp = this.DataSourceBuilder.Clone();
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.Transport = new soby_Transport();
    }
    soby_WebServiceService.prototype.PopulateNavigationInformation = function () {
        if (this.NavigationInformationBeingPopulated != null) {
            this.NavigationInformationBeingPopulated();
        }
        var service = this;
        var requestMethod = this.Transport.Read.Type;
        var dataType = this.Transport.Read.DataType;
        var contentType = this.Transport.Read.ContentType;
        var countServiceUrl = this.DataSourceBuilderTemp.GetCountQuery(this.Transport.Read);
        if (countServiceUrl == null || countServiceUrl == "") {
            service.NextPageExist = this.DataSourceBuilderTemp.NextPageExist;
            service.EndIndex = service.StartIndex + this.DataSourceBuilderTemp.ItemCount;
            service.NavigationInformationPopulated();
            return;
        }
        var data = "";
        var mainQuery = service.DataSourceBuilderTemp.GetMainQuery(this.Transport.Read, false);
        if (mainQuery != null && mainQuery != "") {
            if (requestMethod.toLowerCase() == "post") {
                data = mainQuery;
            }
            else {
                if (countServiceUrl.indexOf("?") == -1) {
                    countServiceUrl += "?";
                }
                else {
                    countServiceUrl += "&";
                }
                countServiceUrl += mainQuery;
            }
        }
        this.DataSourceBuilderTemp.GetData(data, function (result) {
            var totalItemCount = parseInt(result);
            soby_LogMessage("Total item count:" + totalItemCount);
            var startIndex = (service.DataSourceBuilderTemp.PageIndex * service.DataSourceBuilderTemp.RowLimit) + 1;
            var endIndex = ((service.DataSourceBuilderTemp.PageIndex + 1) * service.DataSourceBuilderTemp.RowLimit);
            if (service.DataSourceBuilderTemp.RowLimit == 0) {
                startIndex = 0;
                endIndex = 0;
            }
            if (endIndex != 0 && totalItemCount > endIndex) {
                service.NextPageExist = true;
            }
            else {
                service.NextPageExist = false;
                endIndex = totalItemCount;
            }
            soby_LogMessage("NextPageExist:" + service.NextPageExist);
            service.StartIndex = startIndex;
            service.EndIndex = endIndex;
            service.NavigationInformationPopulated();
        }, function (XMLHttpRequest, textStatus, errorThrown) {
            var errorMessage = "An error occured on populating grid" + XMLHttpRequest + " --- " + textStatus + " --- " + errorThrown;
            if (service.ErrorThrown != null) {
                service.ErrorThrown(errorMessage, null);
            }
            soby_LogMessage(errorMessage);
        }, function (XMLHttpRequest, textStatus, errorThrown) { }, true, countServiceUrl, service.DataSourceBuilderTemp.Headers, requestMethod, dataType, contentType);
    };
    soby_WebServiceService.prototype.NavigationInformationBeingPopulated = function () { };
    soby_WebServiceService.prototype.NavigationInformationPopulated = function () { };
    soby_WebServiceService.prototype.GroupBy = function (groupByFields) {
        this.GroupByFields = groupByFields;
        this.PopulateItems(null);
    };
    soby_WebServiceService.prototype.Sort = function (orderByFields) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;
        this.PopulateItems(null);
    };
    ;
    soby_WebServiceService.prototype.Filter = function (filters, clearOtherFilters) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        if (clearOtherFilters == true) {
            this.Filters = new SobyFilters(filters.IsOr);
        }
        if (filters.Filters.length > 0) {
            this.Filters.AddFilterCollection(filters);
        }
        this.PopulateItems(null);
    };
    ;
    soby_WebServiceService.prototype.SortAndFilter = function (orderByFields, filters, clearOtherFilters) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;
        if (clearOtherFilters == true) {
            this.Filters = new SobyFilters(filters.IsOr);
        }
        if (filters.Filters.length > 0) {
            this.Filters.AddFilterCollection(filters);
        }
        this.PopulateItems(null);
    };
    soby_WebServiceService.prototype.GoToPage = function (pageIndex) {
        this.DataSourceBuilderTemp.PageIndex = pageIndex;
        this.PageIndex = pageIndex;
        this.PopulateItems(null);
    };
    ;
    soby_WebServiceService.prototype.CanNavigateToNextPage = function () {
        if (this.NextPageExist == false) {
            return false;
        }
        return true;
    };
    ;
    soby_WebServiceService.prototype.CanNavigateToPreviousPage = function () {
        if (this.DataSourceBuilderTemp.PageIndex == 0) {
            return false;
        }
        return true;
    };
    ;
    soby_WebServiceService.prototype.PopulateItems = function (args) {
        this.Args = args;
        if (this.ItemBeingPopulated != null) {
            this.ItemBeingPopulated();
        }
        this.DataSourceBuilderTemp = this.DataSourceBuilder.Clone();
        for (var i = 0; i < this.GroupByFields.length; i++) {
            this.DataSourceBuilderTemp.AddOrderField(this.GroupByFields[i].FieldName, this.GroupByFields[i].IsAsc);
        }
        if (this.OrderByFields.length > 0) {
            this.DataSourceBuilderTemp.AddOrderFields(this.OrderByFields);
        }
        if (this.Filters.Filters.length > 0) {
            this.DataSourceBuilderTemp.Filters.AddFilterCollection(this.Filters);
        }
        this.DataSourceBuilderTemp.PageIndex = this.PageIndex;
        this.DataSourceBuilderTemp.NextPageString = this.NextPageString;
        var service = this;
        var serviceUrl = this.Transport.Read.Url;
        var requestMethod = this.Transport.Read.Type;
        var dataType = this.Transport.Read.DataType;
        var contentType = this.Transport.Read.ContentType;
        var data = "";
        var mainQuery = service.DataSourceBuilderTemp.GetMainQuery(this.Transport.Read, false);
        if (mainQuery != null && mainQuery != "") {
            if (requestMethod.toLowerCase() == "post") {
                data = mainQuery;
            }
            else {
                if (serviceUrl.indexOf("?") == -1) {
                    serviceUrl += "?";
                }
                else {
                    serviceUrl += "&";
                }
                serviceUrl += mainQuery;
            }
        }
        this.DataSourceBuilderTemp.GetData(data, function (result) {
            soby_LogMessage(result);
            var items = service.DataSourceBuilderTemp.ParseData(result);
            soby_LogMessage(items);
            soby_LogMessage(service);
            var startIndex = (service.DataSourceBuilderTemp.PageIndex * service.DataSourceBuilderTemp.RowLimit) + 1;
            var endIndex = startIndex + service.DataSourceBuilderTemp.ItemCount - 1;
            if (service.DataSourceBuilderTemp.ItemCount == 0) {
                startIndex = 0;
                endIndex = 0;
            }
            service.StartIndex = startIndex;
            service.EndIndex = endIndex;
            service.ItemPopulated(items);
        }, function (XMLHttpRequest, textStatus, errorThrown) {
            var errorMessage = "An error occured on populating grid" + XMLHttpRequest + " --- " + textStatus + " --- " + errorThrown;
            if (service.ErrorThrown != null) {
                service.ErrorThrown(errorMessage, null);
            }
            soby_LogMessage(errorMessage);
        }, function (XMLHttpRequest, textStatus, errorThrown) { }, true, serviceUrl, service.DataSourceBuilderTemp.Headers, requestMethod, dataType, contentType);
    };
    soby_WebServiceService.prototype.Parse = function () {
    };
    soby_WebServiceService.prototype.GetFieldNames = function () {
        var fieldNames = new Array();
        for (var i = 0; i < this.DataSourceBuilderTemp.SchemaFields.length; i++) {
            fieldNames[fieldNames.length] = { FieldName: this.DataSourceBuilderTemp.SchemaFields[i].FieldName };
        }
        return fieldNames;
    };
    soby_WebServiceService.prototype.ItemPopulated = function (items) { };
    soby_WebServiceService.prototype.ErrorThrown = function (errorMessage, errorTypeName) { };
    soby_WebServiceService.prototype.UpdateItem = function (key, objectInstance) {
        var updateUrl = this.Transport.Update.Url.replace(/#key/gi, key);
        ajaxHelper(updateUrl, this.Transport.Update.Type, objectInstance, [this, key], function (item, args) {
            var service = args[0];
            service.ItemUpdated(args);
        }, function (errorThrown) {
        });
    };
    soby_WebServiceService.prototype.DeleteItem = function (keyNames, keyValues) {
        var deleteUrl = this.Transport.Delete.Url.replace(/#key/gi, keyValues[0]);
        ajaxHelper(deleteUrl, this.Transport.Delete.Type, null, [this, keyValues[0]], function (item, args) {
            var service = args[0];
            service.ItemDeleted(args);
        }, function (errorThrown) {
        });
    };
    soby_WebServiceService.prototype.AddItem = function (objectInstance) {
        ajaxHelper(this.Transport.Add.Url, this.Transport.Add.Type, objectInstance, [this], function (item, args) {
            var service = args[0];
            service.ItemAdded(args);
        }, function (errorThrown) {
        });
    };
    soby_WebServiceService.prototype.ItemUpdated = function (args) { };
    soby_WebServiceService.prototype.ItemAdded = function (args) { };
    soby_WebServiceService.prototype.ItemDeleted = function (args) { };
    return soby_WebServiceService;
}());
// ******************************************************************
// ********************* HELPER METHODS *****************************
var soby_StaticDataBuilder = /** @class */ (function (_super) {
    __extends(soby_StaticDataBuilder, _super);
    function soby_StaticDataBuilder() {
        var _this = _super.call(this) || this;
        _this.RowLimit = 100;
        return _this;
    }
    soby_StaticDataBuilder.prototype.Clone = function () {
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
        builder.Arguments = this.Arguments != null ? this.Arguments.Clone() : null;
        return builder;
    };
    soby_StaticDataBuilder.prototype.GetPagingQuery = function (transport) {
        if (transport.Type == "POST") {
            return "'pageIndex': " + this.PageIndex + "," + "'pageItemCount': " + this.RowLimit;
        }
        else {
            return "$skip=" + (this.PageIndex * this.RowLimit) + "&$top=" + this.RowLimit;
        }
    };
    soby_StaticDataBuilder.prototype.GetViewFieldsQuery = function (transport) {
        if (transport.Type == "POST") {
            return this.SchemaFields.toWebAPIString();
        }
        else {
            return this.SchemaFields.toWebAPIString();
        }
    };
    soby_StaticDataBuilder.prototype.GetOrderByFieldsQuery = function (transport) {
        var jsonString = "";
        for (var i = 0; i < this.OrderByFields.length; i++) {
            jsonString += this.OrderByFields[i].FieldName + " " + (this.OrderByFields[i].IsAsc == true ? "asc" : "desc") + ",";
        }
        if (jsonString != "") {
            jsonString = jsonString.substr(0, jsonString.length - 1);
        }
        if (transport.Type == "POST") {
            if (jsonString == "") {
                jsonString = "null";
            }
            jsonString = "'orderByString': \"" + jsonString + "\"";
        }
        else if (jsonString != "") {
            jsonString = "$orderby=" + jsonString;
        }
        return jsonString;
    };
    soby_StaticDataBuilder.prototype.GetWhereQuery = function (transport) {
        var query = "";
        if (transport.Type == "POST") {
            query = this.Filters.ToJson();
        }
        else {
            query = this.Filters.ToQueryString(0);
            if (query != "") {
                query = "$filter=" + query;
            }
        }
        return query;
    };
    soby_StaticDataBuilder.prototype.GetMainQuery = function (transport, excludePagingQuery) {
        var selectFieldsEnvelope = this.GetViewFieldsQuery(transport);
        var whereQuery = this.GetWhereQuery(transport);
        var orderByFieldsQuery = this.GetOrderByFieldsQuery(transport);
        var pagingQuery = "";
        if (excludePagingQuery == false) {
            pagingQuery = this.GetPagingQuery(transport);
        }
        if (transport.Type == "POST") {
            if (excludePagingQuery == true) {
                pagingQuery = "''";
            }
            return "{" + (whereQuery != "" ? whereQuery + ", " : "") + (orderByFieldsQuery != "" ? orderByFieldsQuery + ", " : "") + pagingQuery + "}";
        }
        else {
            var envelope = whereQuery;
            if (envelope != "" && selectFieldsEnvelope != "") {
                envelope += "&";
            }
            envelope += selectFieldsEnvelope;
            if (envelope != "" && orderByFieldsQuery != "") {
                envelope += "&";
            }
            envelope += orderByFieldsQuery;
            if (envelope != "" && pagingQuery != "") {
                envelope += "&";
            }
            envelope += pagingQuery;
            return envelope;
        }
    };
    soby_StaticDataBuilder.prototype.GetCountQuery = function (transport) {
        var mainQuery = this.GetMainQuery(transport, true);
        var countServiceUrl = transport.Url + "/$count?" + mainQuery;
        if (transport.Type == "POST") {
            return "{" + mainQuery + "}";
        }
        else {
            return countServiceUrl;
        }
    };
    soby_StaticDataBuilder.prototype.ParseData = function (result) {
        var result = (result.value != null ? result.value : result);
        for (var i = 0; i < result.length; i++) {
            for (var x = 0; x < this.SchemaFields.length; x++) {
                if (this.SchemaFields[x].FieldType == SobyFieldTypes.DateTime) {
                    var propertyName = this.SchemaFields[x].FieldName;
                    var value = result[i][propertyName];
                    if (value != null && value != "") {
                        result[i][propertyName] = new Date(value.match(/\d+/)[0] * 1);
                    }
                }
            }
        }
        return result;
    };
    soby_StaticDataBuilder.prototype.GetData = function (data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType) {
        if (requestMethod == null || requestMethod == "") {
            requestMethod = "POST";
        }
        $.ajax({
            async: (async != null ? async : true),
            url: wsUrl,
            type: requestMethod,
            dataType: dataType,
            data: data,
            processData: false,
            contentType: "application/json; charset=utf-8",
            complete: function (XMLHttpRequest) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (errorcallback) {
                    errorcallback(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function (data) {
                var data = data;
                if (data.d != null) {
                    data = data.d;
                }
                if (callback) {
                    callback(data);
                }
            },
            beforeSend: function (xhr) {
                if (headers == null) {
                    return;
                }
                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].Key, headers[i].Value);
                }
            }
        });
    };
    ;
    return soby_StaticDataBuilder;
}(soby_DataSourceBuilderAbstract));
var soby_StaticDataService = /** @class */ (function () {
    function soby_StaticDataService(dataSourceBuilder, items) {
        this.NextPageString = "";
        this.PageIndex = 0;
        this.StartIndex = 0;
        this.EndIndex = 0;
        this.Filters = new SobyFilters(false);
        this.GroupByFields = new SobyGroupByFields();
        this.OrderByFields = new SobyOrderByFields();
        this.NextPageExist = false;
        this.Items = items;
        this.DataSourceBuilder = dataSourceBuilder;
        this.DataSourceBuilderTemp = this.DataSourceBuilder.Clone();
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
    }
    soby_StaticDataService.prototype.GroupBy = function (groupByFields) {
        this.GroupByFields = groupByFields;
        this.PopulateItems(null);
    };
    soby_StaticDataService.prototype.NavigationInformationBeingPopulated = function () { };
    soby_StaticDataService.prototype.NavigationInformationPopulated = function () { };
    soby_StaticDataService.prototype.ItemPopulated = function (items) { };
    soby_StaticDataService.prototype.ItemBeingPopulated = function () { };
    soby_StaticDataService.prototype.ErrorThrown = function (errorMessage) { };
    soby_StaticDataService.prototype.ItemUpdated = function (args) { };
    soby_StaticDataService.prototype.ItemAdded = function (args) { };
    soby_StaticDataService.prototype.ItemDeleted = function (args) { };
    soby_StaticDataService.prototype.PopulateNavigationInformation = function () {
        if (this.NavigationInformationBeingPopulated != null) {
            this.NavigationInformationBeingPopulated();
        }
    };
    soby_StaticDataService.prototype.Sort = function (orderByFields) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;
        this.PopulateItems(null);
    };
    ;
    soby_StaticDataService.prototype.Filter = function (filters, clearOtherFilters) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        if (clearOtherFilters == true) {
            this.Filters = new SobyFilters(filters.IsOr);
        }
        this.Filters.AddFilterCollection(filters);
        this.PopulateItems(null);
    };
    ;
    soby_StaticDataService.prototype.SortAndFilter = function (orderByFields, filters, clearOtherFilters) {
        this.PageIndex = 0;
        this.NextPageString = "";
        this.NextPageStrings = new Array();
        this.NextPageStrings[0] = "";
        this.OrderByFields = orderByFields;
        if (clearOtherFilters == true) {
            this.Filters = new SobyFilters(filters.IsOr);
        }
        if (filters.Filters.length > 0) {
            this.Filters.AddFilterCollection(filters);
        }
        this.PopulateItems(null);
    };
    soby_StaticDataService.prototype.GoToPage = function (pageIndex) {
        this.PopulateItems(null);
    };
    ;
    soby_StaticDataService.prototype.CanNavigateToNextPage = function () {
        return true;
    };
    ;
    soby_StaticDataService.prototype.CanNavigateToPreviousPage = function () {
        return true;
    };
    ;
    soby_StaticDataService.prototype.PopulateItems = function (args) {
        this.Args = args;
        if (this.ItemBeingPopulated != null) {
            this.ItemBeingPopulated();
        }
        if (this.OrderByFields.length > 0) {
            var orderByFields = this.OrderByFields;
            this.Items.sort(function (x, y) {
                var result = 0;
                for (var i = 0; i < orderByFields.length; i++) {
                    if (x[orderByFields[i].FieldName] > y[orderByFields[i].FieldName]) {
                        if (orderByFields[i].IsAsc == true) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                    else if (x[orderByFields[i].FieldName] < y[orderByFields[i].FieldName]) {
                        if (orderByFields[i].IsAsc == true) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                }
                return result;
            });
        }
        this.ItemPopulated(this.Items);
    };
    soby_StaticDataService.prototype.GetFieldNames = function () {
        var fieldNames = new Array();
        return fieldNames;
    };
    soby_StaticDataService.prototype.UpdateItem = function (key, objectInstance) {
        for (var i = 0; i < this.Items.length; i++) {
            if (this.Items[i]["ID"] == key) {
                this.Items[i] = objectInstance;
            }
        }
        this.ItemPopulated(this.Items);
    };
    soby_StaticDataService.prototype.DeleteItem = function (keyNames, keyValues) {
        var newArray = new Array();
        for (var i = this.Items.length - 1; i > -1; i--) {
            var isAllEqual = true;
            for (var t = 0; t < keyNames.length; t++) {
                if (this.Items[i][keyNames[t]] != keyValues[t]) {
                    isAllEqual = false;
                }
            }
            if (isAllEqual == false) {
                newArray[newArray.length] = this.Items[i];
            }
        }
        this.Items = newArray;
        this.ItemPopulated(this.Items);
    };
    soby_StaticDataService.prototype.AddItem = function (objectInstance) {
        this.Items[this.Items.length] = objectInstance;
        this.ItemPopulated(this.Items);
    };
    return soby_StaticDataService;
}());
// ******************************************************************
function WSArgument(fieldName, filterValue) {
    this.FieldName = fieldName;
    this.FilterValue = filterValue;
}
function WSHeader(key, value) {
    this.Key = key;
    this.Value = value;
}
var soby_WSBuilder = /** @class */ (function (_super) {
    __extends(soby_WSBuilder, _super);
    function soby_WSBuilder() {
        var _this = _super.call(this) || this;
        _this.WebServiceDataTypes = SobyWebServiceDataTypes.Json;
        _this.MethodName = "";
        _this.CountQuerySupported = true;
        _this.RowLimit = 100;
        return _this;
    }
    soby_WSBuilder.prototype.Clone = function () {
        var builder = new soby_WSBuilder();
        builder.RowLimit = this.RowLimit;
        builder.PageIndex = this.PageIndex;
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
        builder.Arguments = this.Arguments != null ? this.Arguments.Clone() : null;
        builder.DataBeingParsed = this.DataBeingParsed;
        builder.WebServiceDataTypes = this.WebServiceDataTypes;
        builder.MethodName = this.MethodName;
        builder.CountQuerySupported = this.CountQuerySupported;
        return builder;
    };
    soby_WSBuilder.prototype.GetPagingQuery = function (transport) {
        if (this.WebServiceDataTypes == SobyWebServiceDataTypes.Soap) {
        }
        else if (transport.Type == "POST") {
            return "'pageIndex': " + this.PageIndex + "," + "'pageItemCount': " + this.RowLimit;
        }
        else {
            if (this.RowLimit > 0) {
                return "$skip=" + (this.PageIndex * this.RowLimit) + "&$top=" + this.RowLimit;
            }
            else {
                return "";
            }
        }
    };
    soby_WSBuilder.prototype.GetViewFieldsQuery = function (transport) {
        if (transport.Type == "POST") {
            return this.SchemaFields.toWebAPIString();
        }
        else {
            return this.SchemaFields.toWebAPIString();
        }
    };
    soby_WSBuilder.prototype.GetOrderByFieldsQuery = function (transport) {
        var jsonString = "";
        for (var i = 0; i < this.OrderByFields.length; i++) {
            jsonString += this.OrderByFields[i].FieldName + " " + (this.OrderByFields[i].IsAsc == true ? "asc" : "desc") + ",";
        }
        if (jsonString != "") {
            jsonString = jsonString.substr(0, jsonString.length - 1);
        }
        if (transport.Type == "POST") {
            if (jsonString == "") {
                jsonString = "null";
            }
            jsonString = "'orderByString': \"" + jsonString + "\"";
        }
        else if (jsonString != "") {
            jsonString = "$orderby=" + jsonString;
        }
        return jsonString;
    };
    soby_WSBuilder.prototype.GetWhereQuery = function (transport) {
        var query = "";
        if (this.WebServiceDataTypes == SobyWebServiceDataTypes.Soap) {
            query = this.Filters.ToXml();
        }
        if (transport.Type == "POST") {
            query = this.Filters.ToJson();
        }
        else {
            query = this.Filters.ToQueryString(0);
            if (query != "") {
                query = "$filter=" + query;
            }
        }
        return query;
    };
    soby_WSBuilder.prototype.GetMainQuery = function (transport, excludePagingQuery) {
        if (this.WebServiceDataTypes == SobyWebServiceDataTypes.Soap) {
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
        var selectFieldsEnvelope = this.GetViewFieldsQuery(transport);
        var whereQuery = this.GetWhereQuery(transport);
        var orderByFieldsQuery = this.GetOrderByFieldsQuery(transport);
        var pagingQuery = "";
        if (excludePagingQuery == false) {
            pagingQuery = this.GetPagingQuery(transport);
        }
        if (transport.Type == "POST") {
            if (excludePagingQuery == true) {
                pagingQuery = "''";
            }
            return "{" + (whereQuery != "" ? whereQuery + ", " : "") + (orderByFieldsQuery != "" ? orderByFieldsQuery + ", " : "") + pagingQuery + "}";
        }
        else {
            var envelope = whereQuery;
            if (envelope != "" && selectFieldsEnvelope != "") {
                envelope += "&";
            }
            envelope += selectFieldsEnvelope;
            if (envelope != "" && orderByFieldsQuery != "") {
                envelope += "&";
            }
            envelope += orderByFieldsQuery;
            if (envelope != "" && pagingQuery != "") {
                envelope += "&";
            }
            envelope += pagingQuery;
            return envelope;
        }
    };
    soby_WSBuilder.prototype.GetCountQuery = function (transport) {
        if (this.CountQuerySupported == false)
            return "";
        var mainQuery = this.GetMainQuery(transport, true);
        var countServiceUrl = transport.Url + "/$count?"; // + mainQuery;
        if (transport.Type == "POST") {
            return "{" + mainQuery + "}";
        }
        else {
            return countServiceUrl;
        }
    };
    soby_WSBuilder.prototype.ParseData = function (result1) {
        var result = (result1.value != null ? result1.value : result1);
        var parseCompleted = false;
        result = this.DataBeingParsed(result, parseCompleted);
        if (parseCompleted == false) {
            for (var i = 0; i < result.length; i++) {
                for (var x = 0; x < this.SchemaFields.length; x++) {
                    if (this.SchemaFields[x].FieldType == SobyFieldTypes.DateTime) {
                        var propertyName = this.SchemaFields[x].FieldName;
                        var value = result[i][propertyName];
                        if (value != null) {
                            if (value instanceof Date == true) {
                                result[i][propertyName] = value;
                            }
                            else if (value != "") {
                                if (value.indexOf("20") == 0 || value.indexOf("19") == 0) {
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
    };
    soby_WSBuilder.prototype.GetData = function (data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType, contentType) {
        if (requestMethod == null || requestMethod == "") {
            requestMethod = "POST";
        }
        if (contentType == null || contentType == "") {
            contentType = "application/json; charset=utf-8";
        }
        $.ajax({
            async: (async != null ? async : true),
            url: wsUrl,
            type: requestMethod,
            dataType: dataType,
            data: data,
            processData: false,
            contentType: contentType,
            complete: function (XMLHttpRequest) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (errorcallback) {
                    errorcallback(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function (data) {
                sobyLastReturnData = data;
                var data = data;
                if (data.d != null) {
                    data = data.d;
                }
                if (data.results != null) {
                    data = data.results;
                }
                if (callback) {
                    callback(data);
                }
            },
            beforeSend: function (xhr) {
                if (headers == null) {
                    return;
                }
                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].Key, headers[i].Value);
                }
            }
        });
    };
    ;
    return soby_WSBuilder;
}(soby_DataSourceBuilderAbstract));
// ********************* HELPER METHODS *****************************
if (!Date.prototype.toISOString) {
    (function () {
        function pad(number) {
            var r = String(number);
            if (r.length === 1) {
                r = '0' + r;
            }
            return r;
        }
        Date.prototype.toISOString = function () {
            return this.getUTCFullYear()
                + '-' + pad(this.getUTCMonth() + 1)
                + '-' + pad(this.getUTCDate())
                + 'T' + pad(this.getUTCHours())
                + ':' + pad(this.getUTCMinutes())
                + ':' + pad(this.getUTCSeconds())
                + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                + 'Z';
        };
    }());
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
    }
    catch (err) { }
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
    return (date != null ? date.toLocaleDateString("en-gb", dateOptions) : "");
}
// ************************************************************
//# sourceMappingURL=soby.service.js.map