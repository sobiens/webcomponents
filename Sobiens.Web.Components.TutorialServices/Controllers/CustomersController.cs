using Sobiens.Web.Components.TutorialServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sobiens.Web.Components.TutorialServices.Controllers
{
    public class CustomersController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();
        
        // GET api/values
        public ServiceResult<List<Customer>> Get(int pageIndex, int pageItemCount, string sort)
        {
            ServiceResult<List<Customer>> result = new ServiceResult<List<Customer>>(null);

            List<Customer> customers = db.Customers.ToList();

            if (string.IsNullOrEmpty(sort) == false)
            {
                string[] sortsValues = sort.Split(new char[] { ',' });
                for (int t = 0; t < sortsValues.Length; t++)
                {
                    bool isAsc = false;
                    string[] sortValues = sortsValues[t].Split(new char[] { ' ' });
                    string propertyName = sortValues[0];
                    if (sortValues.Length > 1 && sortValues[1].ToLower() == "asc")
                    {
                        isAsc = true;
                    }

                    var propertyInfo = typeof(Customer).GetProperty(propertyName);
                    if (isAsc == true)
                        customers = customers.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                    else
                        customers = customers.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            result.Data = customers;
            result.Succeed = true;
            return result;
        }

        // GET api/values/5
        public ServiceResult<Customer> Get(int id)
        {
            var query = from a in db.Customers
                        where a.Id == id
                        select a;

            ServiceResult<Customer> result = new ServiceResult<Customer>(null);
            result.Data = query.FirstOrDefault();
            result.Succeed = true;
            return result;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
