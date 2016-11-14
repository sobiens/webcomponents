using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class Task
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public DateTime DueDate { get; set; }

        // Foreign Key
        public int CategoryId { get; set; }
        // Navigation property
        public Category Category { get; set; }

        // Foreign Key
        public int StatusId { get; set; }
        // Navigation property
        public Status Status { get; set; }

        // Foreign Key
        public int PriorityId { get; set; }
        // Navigation property
        public Priority Priority { get; set; }
    }
}