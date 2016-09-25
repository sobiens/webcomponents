using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public decimal Price { get; set; }

        // Foreign Key
        public int OrderId { get; set; }
        // Navigation property
        public Order Order { get; set; }
        // Foreign Key
        public int ProductId { get; set; }
        // Navigation property
        public Product Product { get; set; }
    }
}