using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Sobiens.Web.Components.TutorialServices.Extensions
{
    public static class LinqExtensions
    {
        public static System.Linq.IQueryable<System.Linq.IGrouping<string, TResult>> addGroupBy<TResult>(this IQueryable<TResult> query, string columnName)
        {

            var providerType = query.Provider.GetType();
            // Find the specific type parameter (the T in IQueryable<T>)
            var iqueryableT = providerType.FindInterfaces((ty, obj) => ty.IsGenericType && ty.GetGenericTypeDefinition() == typeof(IQueryable<>), null).FirstOrDefault();
            var tableType = iqueryableT.GetGenericArguments()[0];
            var tableName = tableType.Name;

            var data = Expression.Parameter(iqueryableT, "query");
            var arg = Expression.Parameter(tableType, tableName);
            var nameProperty = Expression.PropertyOrField(arg, columnName);
            var lambda = Expression.Lambda<Func<TResult, string>>(nameProperty, arg);

            var expression = Expression.Call(typeof(Enumerable),
                                            "GroupBy",
                                            new Type[] { tableType, typeof(string) },
                                            data,
                                            lambda);
            var predicate = Expression.Lambda<Func<TResult, String>>(expression, arg); // this is the line that produces the error I describe below
            var result = query.GroupBy(predicate).AsQueryable();
            return result;
        }

        public static System.Linq.IQueryable addGroupBy(this IQueryable query, string columnName)
        {

            var providerType = query.Provider.GetType();
            // Find the specific type parameter (the T in IQueryable<T>)
            var iqueryableT = providerType.FindInterfaces((ty, obj) => ty.IsGenericType && ty.GetGenericTypeDefinition() == typeof(IQueryable<>), null).FirstOrDefault();
            var tableType = iqueryableT.GetGenericArguments()[0];
            var tableName = tableType.Name;

            var data = Expression.Parameter(iqueryableT, "query");
            var arg = Expression.Parameter(tableType, tableName);
            var nameProperty = Expression.PropertyOrField(arg, columnName);
            var lambda = Expression.Lambda(nameProperty, arg);

            var expression = Expression.Call(typeof(Enumerable),
                                            "GroupBy",
                                            new Type[] { tableType, typeof(string) },
                                            data,
                                            lambda);
            var predicate = Expression.Lambda(expression, arg); // this is the line that produces the error I describe below
//            var result = query.GroupBy(predicate).AsQueryable();
//            return result;
            return query;
        }
    }
}