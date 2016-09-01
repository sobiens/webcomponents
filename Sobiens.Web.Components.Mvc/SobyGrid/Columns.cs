using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sobiens.Web.Components.Mvc.SobyGrid
{
    public class Columns:List<Column>
    {
        public Columns() { }
        public Columns Add(string fieldName, string displayName, ShowFieldsOn showFieldsOn, string displayFunction, string cellTemplate, bool sortable, bool filterable, bool editable)
        {
            Column column = new Column()
            {
                FieldName = fieldName,
                DisplayName = displayName,
                ShowFieldsOn = showFieldsOn,
                DisplayFunction = displayFunction,
                CellTemplate = cellTemplate,
                Sortable = sortable,
                Filterable = filterable,
                Editable = editable
            };

            this.Add(column);

            return this;
        }
    }
}
