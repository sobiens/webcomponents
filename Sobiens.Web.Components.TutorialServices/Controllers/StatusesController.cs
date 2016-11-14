using Sobiens.Web.Components.TutorialServices.Models;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.OData;

namespace Sobiens.Web.Components.TutorialServices.Controllers
{
    public class StatusesController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Statuses
        [EnableQuery]
        public IQueryable<Status> GetStatuses()
        {
            return db.Statuses;
        }

        [EnableQuery]
        public SingleResult<Status> Get([FromODataUri] int key)
        {
            IQueryable<Status> result = db.Statuses.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async System.Threading.Tasks.Task<IHttpActionResult> Post(Status addEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Statuses.Add(addEntity);
            await db.SaveChangesAsync();
            return Created(addEntity);
        }

        public async System.Threading.Tasks.Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Status> patchEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Statuses.FindAsync(key);
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
                if (!StatusExists(key))
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

        public async System.Threading.Tasks.Task<IHttpActionResult> Put([FromODataUri] int key, Status updateEntity)
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
                if (!StatusExists(key))
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
            var deleteEntity = await db.Statuses.FindAsync(key);
            if (deleteEntity == null)
            {
                return NotFound();
            }
            db.Statuses.Remove(deleteEntity);
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

        private bool StatusExists(int id)
        {
            return db.Statuses.Count(e => e.Id == id) > 0;
        }
    }
}