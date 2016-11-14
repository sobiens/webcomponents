using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class Premise
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }


        // Foreign Key
        public int ParentId { get; set; }
    }
}