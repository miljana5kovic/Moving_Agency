using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Meseci

    {
        [Key]
        public int ID {get;set;}

        [Required]
        public string mesec {get;set;}

        [JsonIgnore]
        public List<TimMesec> mesecTim {get;set;}
    }
}