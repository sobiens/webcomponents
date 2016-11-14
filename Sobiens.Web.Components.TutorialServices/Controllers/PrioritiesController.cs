using Sobiens.Web.Components.TutorialServices.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.OData;

namespace Sobiens.Web.Components.TutorialServices.Controllers
{
    public class PrioritiesController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Priorities
        [EnableQuery]
        public IQueryable<Priority> GetPriorities()
        {
            return db.Priorities;
        }

        [EnableQuery]
        public SingleResult<Priority> Get([FromODataUri] int key)
        {
            IQueryable<Priority> result = db.Priorities.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async System.Threading.Tasks.Task<IHttpActionResult> Post(Priority addEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Priorities.Add(addEntity);
            await db.SaveChangesAsync();
            return Created(addEntity);
        }

        public async System.Threading.Tasks.Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Priority> patchEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Priorities.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            patchEntity.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriorityExists(key))
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

        public async System.Threading.Tasks.Task<IHttpActionResult> Put([FromODataUri] int key, Priority updateEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != updateEntity.Id)
            {
                return BadRequest();
            }
            db.Entry(updateEntity).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriorityExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(updateEntity);
        }

        public async System.Threading.Tasks.Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            var deleteEntity = await db.Priorities.FindAsync(key);
            if (deleteEntity == null)
            {
                return NotFound();
            }
            db.Priorities.Remove(deleteEntity);
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

        private bool PriorityExists(int id)
        {
            return db.Tasks.Count(e => e.Id == id) > 0;
        }
    }
}