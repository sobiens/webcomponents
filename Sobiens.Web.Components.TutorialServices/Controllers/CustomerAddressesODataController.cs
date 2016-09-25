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
    public class CustomerAddressesODataController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Addresses
        [EnableQuery]
        public IQueryable<Address> Get(ODataActionParameters parameters)
        {
            return db.Addresses;
        }

        [EnableQuery]
        public SingleResult<Address> Get([FromODataUri] int key)
        {
            IQueryable<Address> result = db.Addresses.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async Task<IHttpActionResult> Post(Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Addresses.Add(address);
            await db.SaveChangesAsync();
            return Created(address);
        }

        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Address> address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Addresses.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            address.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(key))
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

        public async Task<IHttpActionResult> Put([FromODataUri] int key, Address update)
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
                if (!AddressExists(key))
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
            var product = await db.Addresses.FindAsync(key);
            if (product == null)
            {
                return NotFound();
            }
            db.Addresses.Remove(product);
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

        private bool AddressExists(int id)
        {
            return db.Addresses.Count(e => e.Id == id) > 0;
        }
    }
}