using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Sobiens.Web.Components.Tutorials.SobyGrid
{
    public partial class CodeView : System.Web.UI.Page
    {
        private string GetCategoryName(dynamic cat) {
            return "TEST";
        }
        protected void Page_Load(object sender, EventArgs e)
        {
           string t = GetCategoryName("ddd");
        }
    }
}