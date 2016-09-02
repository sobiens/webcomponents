
var soby_SchemaXml = null;
$(function () {
    soby_PopulateGridAdmin();
});
function soby_PopulateGridAdmin() {
    $.ajax({
        url: soby_GetTutorialWebAPIUrl() + "/$metadata",
        type: "GET",
//        dataType: dataType,
//        data: data,
        processData: false,
        contentType: "application/json; charset=utf-8",
        complete: function (XMLHttpRequest) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            if (errorcallback)
//                errorcallback(XMLHttpRequest, textStatus, errorThrown);
        },
        success: function (data) {
            soby_SchemaXml = $(data);
            soby_PopulateEntitiesGrid();
        }
    });
}

function soby_PopulateEntitiesGrid() {
    $("#soby_AdminDiv").html("");
    var container = $("<div></div>");
    var entitySets = soby_SchemaXml.find("Schema EntitySet");
    for (var i = 0; i < entitySets.length; i++) {
        var entitySet = $(entitySets[i]);
        var entitySetName = entitySet.attr("Name");
        var entitySetType = entitySet.attr("EntityType");
        var link = $("<a href='javascript:void(0)'></a>");
        link.attr("onclick", "soby_PopulateEntityGrid('" + entitySetName + "', '" + entitySetType + "')")
        link.text(entitySetName);

        container.append(link);
    }
    $("#soby_AdminDiv").append(container);
}
function soby_PopulateEntityGrid(entitySetName, entitySetType) {
    var entityNamespace = entitySetType.substring(0, entitySetType.lastIndexOf("."));
    var entityName = entitySetType.substring(entitySetType.lastIndexOf(".")+1);

    var entityType = soby_SchemaXml.find("Schema[Namespace='" + entityNamespace + "'] EntityType[Name='" + entityName + "']");
    $("#soby_AdminDiv").html("<a href='javascript:void(0)' onclick='soby_PopulateEntitiesGrid()'>&lt;&lt; Back to entity list</a><br><div id='soby_AdminEntityGridDiv'></div>");
    var properties = entityType.find("Property");

    var keyFieldName = entityType.find("Key PropertyRef").attr("Name");

    var entityDataSourceBuilder = new soby_WSBuilder();
    entityDataSourceBuilder.Filters = new SobyFilters(false);
    var entityService = new soby_WebServiceService(entityDataSourceBuilder);
    entityService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/" + entitySetName, "json", "application/json; charset=utf-8", "GET");
    entityService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/" + entitySetName, "json", "application/json; charset=utf-8", "POST");
    entityService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/" + entitySetName + "(#" + keyFieldName + ")", "json", "application/json; charset=utf-8", "PUT");
    entityService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/" + entitySetName + "(#" + keyFieldName + ")", "json", "application/json; charset=utf-8", "DELETE");

    var entityGrid = new soby_WebGrid("#soby_AdminEntityGridDiv", entitySetName, entityService, "There is no record found.");
    entityGrid.AddKeyField(keyFieldName);
    entityGrid.ImagesFolderUrl = "/media/images";
    for (var i = 0; i < properties.length; i++) {
        var property = $(properties[i]);
        var name = property.attr("Name");
        var typeName = property.attr("Type");
        var fieldType = SobyFieldTypes.Text;
        if (typeName == "Edm.Int32" || typeName == "Edm.Decimal")
            fieldType = SobyFieldTypes.Number;

        var referentialConstraint = entityType.find("NavigationProperty ReferentialConstraint[Property='" + name + "']");
        var isEditable = true;
        if (name == keyFieldName)
            isEditable = false;
        if (referentialConstraint.length > 0) {
            var navigationProperty = referentialConstraint.parent();
            var navigationPropertyName = navigationProperty.attr("Name");
            var navigationPropertyType = navigationProperty.attr("Type");
            var referencedProperty = referentialConstraint.attr("ReferencedProperty");
            var navigationPropertyEntitySetName = soby_SchemaXml.find("Schema EntitySet[EntityType='" + navigationPropertyType + "']").attr("Name");

            var referencedPropertyTitleFieldName = referencedProperty;
            var navigationPropertyEntitySetProperties = soby_SchemaXml.find("Schema EntityType[Name='" + navigationPropertyName + "'] Property[Name!='" + referencedProperty + "']");
            if (navigationPropertyEntitySetProperties.length > 0)
                referencedPropertyTitleFieldName = $(navigationPropertyEntitySetProperties[0]).attr("Name");
            
            entityDataSourceBuilder.AddSchemaField(name, SobyFieldTypes.Lookup, { ModelName: navigationPropertyName, ValueFieldType: SobyFieldTypes.Number, ValueFieldName: referencedProperty, TitleFieldName: referencedPropertyTitleFieldName, ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/" + navigationPropertyEntitySetName, "json", "application/json; charset=utf-8", "GET") });
            entityGrid.AddColumn(name, navigationPropertyName, SobyShowFieldsOn.All, function (item) {
                return item[navigationPropertyName][referencedPropertyTitleFieldName];
            }, null, true, true, isEditable, null);
        }
        else {
            entityDataSourceBuilder.AddSchemaField(name, fieldType, null);
            entityGrid.AddColumn(name, name, SobyShowFieldsOn.All, null, null, true, true, isEditable, null);
        }
    }

    entityGrid.Initialize(true);

}