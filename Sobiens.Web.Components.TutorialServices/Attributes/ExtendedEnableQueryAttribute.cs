using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.OData;
using Sobiens.Web.Components.TutorialServices.Extensions;
namespace Sobiens.Web.Components.TutorialServices.Attributes
{
    public class ExtendedEnableQueryAttribute : EnableQueryAttribute
    {
        public override IQueryable ApplyQuery(IQueryable queryable, System.Web.OData.Query.ODataQueryOptions queryOptions)
        {
            System.Linq.IQueryable<string> c;
            
            var x = base.ApplyQuery(queryable, queryOptions);
//            x.addGroupBy
            var expression = x.Expression;
//            System.Linq.Expressions.MethodCallExpressionN ex = (System.Linq.Expressions.MethodCallExpressionN)expression;
            return x;
        }

        public override object ApplyQuery(object entity, System.Web.OData.Query.ODataQueryOptions queryOptions)
        {
            return base.ApplyQuery(entity, queryOptions);
        }

        public override Microsoft.OData.Edm.IEdmModel GetModel(Type elementClrType, System.Net.Http.HttpRequestMessage request, System.Web.Http.Controllers.HttpActionDescriptor actionDescriptor)
        {
            return base.GetModel(elementClrType, request, actionDescriptor);
        }

        public override bool Match(object obj)
        {
            return base.Match(obj);
        }

        public override void OnActionExecuted(System.Web.Http.Filters.HttpActionExecutedContext actionExecutedContext)
        {
            base.OnActionExecuted(actionExecutedContext);
        }

        public override System.Threading.Tasks.Task OnActionExecutedAsync(System.Web.Http.Filters.HttpActionExecutedContext actionExecutedContext, System.Threading.CancellationToken cancellationToken)
        {
            return base.OnActionExecutedAsync(actionExecutedContext, cancellationToken);
        }

        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);
        }

        public override System.Threading.Tasks.Task OnActionExecutingAsync(System.Web.Http.Controllers.HttpActionContext actionContext, System.Threading.CancellationToken cancellationToken)
        {
            return base.OnActionExecutingAsync(actionContext, cancellationToken);
        }

        public override void ValidateQuery(System.Net.Http.HttpRequestMessage request, System.Web.OData.Query.ODataQueryOptions queryOptions)
        {
            //base.ValidateQuery(request, queryOptions);
        }
    }
}