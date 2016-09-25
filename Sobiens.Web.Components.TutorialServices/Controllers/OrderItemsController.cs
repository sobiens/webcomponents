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
    public class OrderItemsController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Orders
        [EnableQuery]
        public IQueryable<OrderItem> Get(ODataActionParameters parameters)
        {
            return db.OrderItems;
        }

        [EnableQuery]
        public SingleResult<OrderItem> Get([FromODataUri] int key)
        {
            IQueryable<OrderItem> result = db.OrderItems.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async Task<IHttpActionResult> Post(OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.OrderItems.Add(orderItem);
            await db.SaveChangesAsync();
            return Created(orderItem);
        }

        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<OrderItem> orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.OrderItems.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            orderItem.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(key))
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

        public async Task<IHttpActionResult> Put([FromODataUri] int key, OrderItem update)
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
                if (!OrderItemExists(key))
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
            var orderItem = await db.OrderItems.FindAsync(key);
            if (orderItem == null)
            {
                return NotFound();
            }
            db.OrderItems.Remove(orderItem);
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

        private bool OrderItemExists(int id)
        {
            return db.OrderItems.Count(e => e.Id == id) > 0;
        }
    }
}