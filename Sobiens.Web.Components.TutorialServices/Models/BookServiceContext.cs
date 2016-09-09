using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class BookServiceContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public BookServiceContext() : base("name=BookServiceContext")
        {
        }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.Author> Authors { get; set; }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.Book> Books { get; set; }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.Customer> Customers { get; set; }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.Address> Addresses { get; set; }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.Phone> Phones { get; set; }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.Product> Products { get; set; }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.Order> Orders { get; set; }

        public System.Data.Entity.DbSet<Sobiens.Web.Components.TutorialServices.Models.OrderItem> OrderItems { get; set; }
    }
}
