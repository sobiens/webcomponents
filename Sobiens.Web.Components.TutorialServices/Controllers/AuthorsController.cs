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
    public class AuthorsController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Authors
        [EnableQuery]
        public IQueryable<Author> GetAuthors()
        {
            return db.Authors;
        }

        [EnableQuery]
        public SingleResult<Author> Get([FromODataUri] int key)
        {
            IQueryable<Author> result = db.Authors.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async Task<IHttpActionResult> Post(Author author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Authors.Add(author);
            await db.SaveChangesAsync();
            return Created(author);
        }

        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Author> author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Authors.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            author.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(key))
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

        public async Task<IHttpActionResult> Put([FromODataUri] int key, Author update)
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
                if (!AuthorExists(key))
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
            var product = await db.Authors.FindAsync(key);
            if (product == null)
            {
                return NotFound();
            }
            db.Authors.Remove(product);
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

        private bool AuthorExists(int id)
        {
            return db.Authors.Count(e => e.Id == id) > 0;
        }
    }
}