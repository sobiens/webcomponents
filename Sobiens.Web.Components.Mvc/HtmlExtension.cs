using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Sobiens.Web.Components.Mvc
{
    public static class HtmlExtension
    {
        public static SobyGrid.SobyGrid SobyGrid(this HtmlHelper helper)
        {
            return new SobyGrid.SobyGrid()
            {
                Helper = helper
            };
        }
    }
}
