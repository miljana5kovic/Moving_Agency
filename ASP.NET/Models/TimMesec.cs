using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class TimMesec

    {
        [Key]
        public int ID {get;set;}

        [JsonIgnore]
        public TimRadnika tim {get;set;}

        [JsonIgnore]
        public Meseci mesec {get;set;}

        public int brojSelidbi {get;set;}

        public double prihod {get;set;}
    }
}