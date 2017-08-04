using Sobiens.Web.Components.TutorialServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sobiens.Web.Components.TutorialServices.Controllers
{
    public class CustomerAddressesController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/values
        public ServiceResult<List<Address>> Get(int pageIndex, int pageItemCount, string sort, string filter)
        {
            ServiceResult<List<Address>> result = new ServiceResult<List<Address>>(null);

            List<Address> addresses = db.Addresses.ToList();
            result.Data = addresses;
            result.TotalItemCount = addresses.Count();
            result.Succeed = true;
            return result;
        }

        // GET api/values/5
        public Address Get(int id)
        {
            var query = from a in db.Addresses
                        where a.CustomerId == id
                        select a;

            return query.FirstOrDefault();
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
