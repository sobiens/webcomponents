using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sobiens.Web.Components.Mvc.SobyGrid
{
    public enum FieldTypes
    {
        Text = 0,
        Number = 1,
        MultiChoice = 2,
        Lookup = 3,
        Boolean = 4,
        Choice = 5,
        ModStat = 6,
        User = 7,
        TaxonomyFieldType = 8,
        DateTime = 9,
        Integer = 10,
        CurrentUserGroups = 11,
        DateTimeNowDifferenceAsMinute = 12,
        DateTimeRange = 13
    }
}
