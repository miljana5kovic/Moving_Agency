using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class TipStvari

    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(60)]
        public string naziv { get; set; } 

        [JsonIgnore]
        public virtual List<PodtipStvari> podtipStvari {get; set;}
    }
}