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
            builder.EntitySet<Customer>("CustomersOData");
            builder.EntitySet<Address>("CustomerAddressesOData");
            builder.EntitySet<Phone>("CustomerPhonesOData");
            builder.EntitySet<Product>("Products");
            builder.EntitySet<Order>("Orders");
            builder.EntitySet<OrderItem>("OrderItems");
            builder.EntitySet<Priority>("Priorities");
            builder.EntitySet<Category>("Categories");
            builder.EntitySet<Status>("Statuses");
            builder.EntitySet<Task>("Tasks");
            builder.EntitySet<Premise>("Premises");
            
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
