using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Sobiens.Web.Components.TutorialServices.Models;
using System.Web.OData;
using Sobiens.Web.Components.TutorialServices.Attributes;

namespace Sobiens.Web.Components.TutorialServices.Controllers
{
    public class CustomersODataController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Customers
        [EnableQuery]
        public IQueryable<Customer> Get(ODataActionParameters parameters)
        {
            return db.Customers;
        }

        [EnableQuery]
        public SingleResult<Customer> Get([FromODataUri] int key)
        {
            IQueryable<Customer> result = db.Customers.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async Task<IHttpActionResult> Post(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Customers.Add(customer);
            await db.SaveChangesAsync();
            return Created(customer);
        }

        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Customer> customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Customers.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            customer.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(entity);
        }

        public async Task<IHttpActionResult> Put([FromODataUri] int key, Customer update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != update.Id)
            {
                return BadRequest();
            }
            db.Entry(update).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(update);
        }

        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            var product = await db.Customers.FindAsync(key);
            if (product == null)
            {
                return NotFound();
            }
            db.Customers.Remove(product);
            await db.SaveChangesAsync();
            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.Id == id) > 0;
        }
    }
}