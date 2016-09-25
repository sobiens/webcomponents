using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.OData.Formatter;
using System.Web.Routing;
using Microsoft.OData.Core;
using System.Web.Mvc;
using System.Web.Optimization;

namespace Sobiens.Web.Components.TutorialServices
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            List<ODataPayloadKind> data = new List<ODataPayloadKind>()
            {
                ODataPayloadKind.Value,
                ODataPayloadKind.Property,
                ODataPayloadKind.Collection,
                ODataPayloadKind.Parameter,
                ODataPayloadKind.Entry,
                ODataPayloadKind.Batch
            };
            GlobalConfiguration.Configuration.Formatters.Insert(0, new ODataMediaTypeFormatter(data));
//            return;
//            AreaRegistration.RegisterAllAreas();

//            WebApiConfig.Register(GlobalConfiguration.Configuration);
//            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpContext.Current.Response.AppendHeader("Access-Control-Allow-Origin", "*");
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                //These headers are handling the "pre-flight" OPTIONS call sent by the browser
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, AuthCode");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
        }
    }
}
