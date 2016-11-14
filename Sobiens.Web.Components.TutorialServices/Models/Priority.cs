using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class Priority
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
    }
}