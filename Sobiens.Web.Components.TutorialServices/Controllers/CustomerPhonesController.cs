using Sobiens.Web.Components.TutorialServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sobiens.Web.Components.TutorialServices.Controllers
{
    public class CustomerPhonesController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/values
        public ServiceResult<List<Phone>> Get(string filter, int pageIndex, int pageItemCount, string sort)
        {
            ServiceResult<List<Phone>> result = new ServiceResult<List<Phone>>(null);

            result.Data = db.Phones.ToList(); 
            result.Succeed = true;
            return result;
        }

        // GET api/values/5
        public Phone Get(int id)
        {
            var query = from a in db.Phones
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
