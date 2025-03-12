using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Pregled

    {
        [Key]
        public int ID { get; set; }

        [MaxLength(15)]
        public string datum { get; set; } 

        [MaxLength(10)]
        public string vreme { get; set; } 
        
        public string adresa { get; set; } 

        public double longitude {get; set;}
        public double latitude {get; set;}

        [MaxLength(30)]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string status { get; set; } //"cekanje" "zakazano" "zapocet"

        [JsonIgnore]
        public  Korisnik pregledRadnik {get; set;}

       [JsonIgnore]
        public  Korisnik klijent {get; set; } 

        [JsonIgnore]

        public AgencijaOpsta pregeldAgencija {get; set;}
        
    }
}