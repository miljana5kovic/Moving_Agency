using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class AgencijaOpsta

    {
        [Key]
        public int ID { get; set; }

       
        [MaxLength(255)]
        public string naziv { get; set; } 

       
        [MaxLength(255)]
        public string lokacija { get; set; } 

      
        [MaxLength(255)]
        public string gmail { get; set; } 

        
        [MaxLength(255)]
        public string kontakt { get; set; } 

       
        [MaxLength(500)]

        public string oNama { get; set; }

       
        [MaxLength(500)]

        public string text1 { get; set; }

        
        [MaxLength(500)]

        public string text2 { get; set; }

        [MaxLength(500)]

        public string text3 { get; set; }

    

        [JsonIgnore]

        public virtual List<Korisnik> agencijaKorisnici {get; set;}

        [JsonIgnore]

        public virtual List<Selidba> agencijaSelidbe {get; set;}

        [JsonIgnore]

        public virtual List<Pregled> agencijaPregledi {get; set;}

        [JsonIgnore]

        public virtual List<TimRadnika> agencijaTimoviRadnika {get; set;} 

        

        
    }
}