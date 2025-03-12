using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class TimRadnika

    {
        [Key]
        public int ID { get; set; }

     
        [MaxLength(255)]
        public string naziv { get; set; } 

       
        public int brojSelidbi {get;set;}

        [JsonIgnore]
        public List<Korisnik> timRadnikaRadnici {get; set;}
        
        [JsonIgnore]
        public List<Selidba> timRadnikaSelidbe {get; set; }

        [JsonIgnore]

        public AgencijaOpsta timRadnikaAgencija {get; set;}

        [JsonIgnore]
        public List<TimMesec> timMesec {get;set;}
    }
}