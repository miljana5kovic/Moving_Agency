using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Jedinica

    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(10)]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string naziv { get; set; } 

        public double metar { get; set; }
        
        [JsonIgnore]
        public virtual List<Stvar> jedinicaStvari {get; set;}

        
    }
}