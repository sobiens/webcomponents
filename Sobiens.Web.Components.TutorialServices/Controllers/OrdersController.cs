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
    public class OrdersController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Orders
        [EnableQuery]
        public IQueryable<Order> Get(ODataActionParameters parameters)
        {
            return db.Orders;
        }

        [EnableQuery]
        public SingleResult<Order> Get([FromODataUri] int key)
        {
            IQueryable<Order> result = db.Orders.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async Task<IHttpActionResult> Post(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Orders.Add(order);
            await db.SaveChangesAsync();
            return Created(order);
        }

        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Order> order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Orders.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            order.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(key))
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

        public async Task<IHttpActionResult> Put([FromODataUri] int key, Order update)
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
                if (!OrderExists(key))
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
            var order = await db.Orders.FindAsync(key);
            if (order == null)
            {
                return NotFound();
            }
            db.Orders.Remove(order);
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

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.Id == id) > 0;
        }
    }
}