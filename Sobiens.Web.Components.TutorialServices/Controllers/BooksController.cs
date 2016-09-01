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
    public class BooksController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Books
        [EnableQuery]
        public IQueryable<Book> Get(ODataActionParameters parameters)
        {
            return db.Books;
        }

        [EnableQuery]
        public SingleResult<Book> Get([FromODataUri] int key)
        {
            IQueryable<Book> result = db.Books.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async Task<IHttpActionResult> Post(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Books.Add(book);
            await db.SaveChangesAsync();
            return Created(book);
        }

        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Book> book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Books.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            book.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(key))
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

        public async Task<IHttpActionResult> Put([FromODataUri] int key, Book update)
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
                if (!BookExists(key))
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
            var product = await db.Books.FindAsync(key);
            if (product == null)
            {
                return NotFound();
            }
            db.Books.Remove(product);
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

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.Id == id) > 0;
        }

        /*
        // GET api/Books
        public IQueryable<BookDTO> GetBooks()
        {
            var books = from b in db.Books
                        select new BookDTO()
                        {
                            Id = b.Id,
                            Title = b.Title,
                            AuthorName = b.Author.Name
                        };

            return books;
        }

        // GET api/Books/5
        [ResponseType(typeof(BookDetailDTO))]
        public async Task<IHttpActionResult> GetBook(int id)
        {
            var book = await db.Books.Include(b => b.Author).Select(b =>
                new BookDetailDTO()
                {
                    Id = b.Id,
                    Title = b.Title,
                    Year = b.Year,
                    Price = b.Price,
                    AuthorName = b.Author.Name,
                    Genre = b.Genre
                }).SingleOrDefaultAsync(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Books.Add(book);
            await db.SaveChangesAsync();

            // New code:
            // Load author name
            db.Entry(book).Reference(x => x.Author).Load();

            var dto = new BookDTO()
            {
                Id = book.Id,
                Title = book.Title,
                AuthorName = book.Author.Name
            };

            return CreatedAtRoute("DefaultApi", new { id = book.Id }, dto);
        }
         */ 
    }
}