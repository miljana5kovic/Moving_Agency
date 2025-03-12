using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Selidba

    {
        [Key]
        public int ID { get; set; }

        [MaxLength(255)]
        public string adresaOd { get; set; } 

        [MaxLength(255)]
        public string adresaDo { get; set; } 

        [MaxLength(15)]
        public string datum { get; set; }


        public double cena { get; set; }

        [MaxLength(50)]
        public string tipSelidbe { get; set; }


        [MaxLength(50)]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string status { get; set; } // "procena" "zakazano" "zavrseno"

        [MaxLength(255)]

        public string komentarSelidba { get; set; }  //atribut veze izmedju klijenta i selidbe

        [MaxLength(500)]

        public string recenzijaSelidba {get; set;}

        public int ocena {get; set;}

        [JsonIgnore]
        public List<Prostorija> selidbaProstorije  {get; set;}

        [JsonIgnore]
        public  Korisnik klijent {get; set;}

        [JsonIgnore]
        public TimRadnika timRadnika {get; set;}
        [JsonIgnore]
        public Pregled pregled {get; set;}
        [JsonIgnore]

        public AgencijaOpsta selidbaAgendija {get; set;}

        
    }
}