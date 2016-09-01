using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sobiens.Web.Components.Mvc.SobyGrid
{
    public class SchemaColumns : List<SchemaColumn>
    {
        public SchemaColumns() { }

        public SchemaColumns Add(string fieldName, FieldTypes fieldType)
        {
            SchemaColumn column = new SchemaColumn()
            {
                FieldName = fieldName,
                FieldType = fieldType,
            };

            this.Add(column);

            return this;
        }
    }
}
