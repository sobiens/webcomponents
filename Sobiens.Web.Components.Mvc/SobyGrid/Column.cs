using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sobiens.Web.Components.Mvc.SobyGrid
{
    public class Column
    {
        public string FieldName { get; set; }
        public string DisplayName { get; set; }
        public ShowFieldsOn ShowFieldsOn { get; set; }
        public string DisplayFunction { get; set; }
        public string CellTemplate { get; set; }
        public bool Sortable { get; set; }
        public bool Filterable { get; set; }
        public bool Editable { get; set; }
    }
}
