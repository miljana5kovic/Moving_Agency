using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Prostorija

    {
        [Key]
        public int ID { get; set; }

       
        [MaxLength(255)]
        public string ilustracija {get;set;}//naziv

        [RegularExpression(@"^[a-zA-z0-9_ ]*$")]
        [MaxLength(255)]
        public string komentar { get; set; }

        public string status { get; set; }// "pocetak" "kraj"

        public Selidba selidba {get; set;}

        [JsonIgnore]
        public TipProstorije tipProstorije {get; set; }

        [JsonIgnore]
        public List<Stvar> prostorijaStvari {get; set;}

        
    }
}