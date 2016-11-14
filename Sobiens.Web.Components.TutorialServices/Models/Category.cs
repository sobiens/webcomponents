using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}