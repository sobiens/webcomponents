using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class Phone
    {
        public int Id { get; set; }
        public string PhoneType { get; set; }
        [Required]
        public string Number { get; set; }

        // Foreign Key
        public int CustomerId { get; set; }
        // Navigation property
        public Customer Customer { get; set; }

    }
}