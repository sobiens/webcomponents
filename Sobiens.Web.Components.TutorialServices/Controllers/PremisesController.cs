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
    public class PremisesController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Premises
        [EnableQuery]
        public IQueryable<Premise> Get(ODataActionParameters parameters)
        {
            return db.Premises;
        }

        [EnableQuery]
        public SingleResult<Premise> Get([FromODataUri] int key)
        {
            IQueryable<Premise> result = db.Premises.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async Task<IHttpActionResult> Post(Premise premise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Premises.Add(premise);
            await db.SaveChangesAsync();
            return Created(premise);
        }

        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Premise> premise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Premises.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            premise.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PremiseExists(key))
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

        public async Task<IHttpActionResult> Put([FromODataUri] int key, Premise update)
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
                if (!PremiseExists(key))
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
            var premise = await db.Premises.FindAsync(key);
            if (premise == null)
            {
                return NotFound();
            }
            db.Premises.Remove(premise);
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

        private bool PremiseExists(int id)
        {
            return db.Premises.Count(e => e.Id == id) > 0;
        }
    }
}