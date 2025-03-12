using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class PodtipStvari

    {
        [Key]
        public int ID { get; set; }

     
        [MaxLength(255)]
        public string naziv { get; set; } 

     
        [RegularExpression(@"\d+")] 
        public int cena {get; set;}

        [JsonIgnore]
        public virtual  TipStvari tipStvari {get; set;}

        [JsonIgnore]
        public virtual List <Stvar> podtipStvari {get; set;}
    }
}