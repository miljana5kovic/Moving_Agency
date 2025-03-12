using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Stvar

    {
        [Key]
        public int ID { get; set; }

        [RegularExpression(@"\d+")]
        public int kolicina { get; set; }

        [RegularExpression(@"\d+")]
        public double visina { get; set; }

        [RegularExpression(@"\d+")]
        public double sirina { get; set; }

        [RegularExpression(@"\d+")]
        public double dubina { get; set; }

        public string status { get; set; }//"pocetak" "kraj"

        [RegularExpression(@"\d+")]
        public double cena { get; set; }

        [JsonIgnore]
        public virtual Prostorija prostorija {get; set;}

        [JsonIgnore]
        public virtual Jedinica jedinicaMere {get; set;}

        [JsonIgnore]
        public virtual PodtipStvari podtip {get; set;}
        
    }
}