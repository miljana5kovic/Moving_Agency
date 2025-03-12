using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Korisnik

    {
        [Key]
        public int ID { get; set; }

       
        [MaxLength(50)]
        public string tipKorsinika { get; set; } //"klijent" , "admin", "vlasnik", "agencija", "radnik","radnikP" 

     
        [MaxLength(50)]
        public string email {get; set;}

      
        [MaxLength(50)]
        public string username {get; set;}
        
     
        public string password {get; set;}

       
        [MaxLength(30)]
        public string ime {get; set;}

       
        [MaxLength(30)]
        public string prezime {get; set;}

        public string PhotoFileName { get; set; }

        public bool FKlijent {get; set;}

        public bool FAdministrator {get; set;}

        public bool FVlanikAgencije {get; set;}

        public bool FAdministracijaAgencije {get; set;}

        public bool FRadnik {get; set;}

        public bool FRadnikPregled {get; set;}

        public int plata {get; set;}

        public int ForeignKeyNV {get; set;}

        [MaxLength(500)]
        public string recenzijaZaAngenciju {get; set;}

        public int ocena {get; set; }

        [JsonIgnore]
        public List<Pregled> PregledRadnik {get; set;}

        [JsonIgnore]
        public List<Pregled> pregledKlijent {get; set;}
        [JsonIgnore]
        public  List<Selidba> kijentSelidbe {get; set;}
        [JsonIgnore]
        public  TimRadnika timRadnika {get; set;}

        [JsonIgnore]

        public  AgencijaOpsta korsinikAgencija {get; set;}
    }
}