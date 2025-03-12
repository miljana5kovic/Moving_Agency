using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class ZauzetiTermini

    {
        [Key]
        public int ID { get; set; }

        [MaxLength(20)]
        public string datum { get; set; } 
    }
}