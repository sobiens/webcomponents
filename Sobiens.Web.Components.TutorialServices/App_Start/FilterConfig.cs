using System.Web;
using System.Web.Mvc;

namespace Sobiens.Web.Components.TutorialServices
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}