﻿using Sobiens.Web.Components.TutorialServices.Models;
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
    public class TasksController : ODataController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Tasks
        [EnableQuery]
        public IQueryable<Task> GetTasks()
        {
            return db.Tasks;
        }

        [EnableQuery]
        public SingleResult<Task> Get([FromODataUri] int key)
        {
            IQueryable<Task> result = db.Tasks.Where(p => p.Id == key);
            return SingleResult.Create(result);
        }

        public async System.Threading.Tasks.Task<IHttpActionResult> Post(Task addEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Tasks.Add(addEntity);
            await db.SaveChangesAsync();
            return Created(addEntity);
        }

        public async System.Threading.Tasks.Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Task> patchEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Tasks.FindAsync(key);
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
                if (!TaskExists(key))
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

        public async System.Threading.Tasks.Task<IHttpActionResult> Put([FromODataUri] int key, Task updateEntity)
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
                if (!TaskExists(key))
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
            var deleteEntity = await db.Tasks.FindAsync(key);
            if (deleteEntity == null)
            {
                return NotFound();
            }
            db.Tasks.Remove(deleteEntity);
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

        private bool TaskExists(int id)
        {
            return db.Tasks.Count(e => e.Id == id) > 0;
        }
    }
}