using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class TipProstorije

    {
        [Key]
        public int ID { get; set; }

        [MaxLength(255)]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string naziv { get; set; } 

        [MaxLength(255)]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string slika{ get; set; } 

        [JsonIgnore]
        public virtual List <Prostorija> tipProstorije {get; set;}


    }
}