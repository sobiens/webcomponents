using Sobiens.Web.Components.TutorialServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace Sobiens.Web.Components.TutorialServices
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // New code:
            ODataModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Book>("Books");
            builder.EntitySet<Author>("Authors");
            config.MapODataServiceRoute(
                routeName: "ODataRoute",
                routePrefix: "api",
                model: builder.GetEdmModel());

            config.Routes.MapHttpRoute(
                name: "DefaultApix",
                routeTemplate: "wcf/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

        }
    }
}
