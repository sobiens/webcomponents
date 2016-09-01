using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class Address
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Town { get; set; }
        public string PostCode { get; set; }
        public string Address1 { get; set; }

        // Foreign Key
        public int CustomerId { get; set; }
        // Navigation property
        public Customer Customer { get; set; }
    }
}