using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace ASP.NET.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AgencijaController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public AgencijaController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiAgenciju")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiAgenciju()
        {
            var agencija = await Context.AgencijaOpsta
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.naziv,
                lokacija = p.lokacija,
                gmail = p.gmail,
                kontakt = p.kontakt,
                oNama = p.oNama,
                text1 = p.text1,
                text2 = p.text2,
                text = p.text3,
            }).ToListAsync();
            return Ok(agencija);
        }

        [Route("ListaRecenzijaOcena/{idAdministracija}")]
        [HttpGet]

        public async Task<ActionResult> ListaRecenzijaOcena(int idAdministracija)
        {
            var administarcija =   Context.Korisnici.Where(p => p.ID == idAdministracija &&  p.tipKorsinika == "agencija").FirstOrDefault();
            if(administarcija == null)
           {
               return BadRequest("Nalog za agministraciju/agenciju ne postoji");
           }

           

            var recenzija =  await Context.Korisnici.Where(p => p.tipKorsinika == "klijent" && p.recenzijaZaAngenciju != null && p.ocena != 0)
            .Select(p => 
            new
            {
                ID = p.ID,
                recenzijaZaAngenciju = p.recenzijaZaAngenciju,
                ocena = p.ocena
                
            }
            ).ToListAsync();

            return Ok(recenzija);
        }

          [Route("DodatiRecenzijuIOcenu/{idKorisnik}/{recenzija}/{ocena}")]
          [HttpPut]

           public async Task<ActionResult> DodatiRecenzijuIOcenu(int idKorisnik, string recenzija, int ocena)
           {
              var pom = await Context.Korisnici.Where(u=>u.ID==idKorisnik).FirstOrDefaultAsync();
             

              if(pom == null)
              {
                  return BadRequest("Greska, nemamo tog klijenta");
              }

              var list =  Context.Pregled.Where(p => p.status == "zakazano")
                  .Include(p => p.klijent)
                  .Where(p => p.klijent.ID == idKorisnik).FirstOrDefault();
              
              var list1 = Context.Selidbe.Where(p => (p.status == "zakazano")||(p.status=="zavrseno"))
                  .Include(p => p.klijent)
                  .Where(p => p.klijent.ID == idKorisnik).FirstOrDefault();
            

                  if(list == null && list1 == null)
                  {
                      return BadRequest("Nije zakazan pregled niti je zakazana selidba ne moze se ostaviti recenzija");
                  }


                   pom.recenzijaZaAngenciju = recenzija; 
                   pom.ocena = ocena;
                   Context.Korisnici.Update(pom);
                   await Context.SaveChangesAsync();
                   return Ok("Izmena je uspesna, recenzija je dodata");       
                      
          }

          [Route("BrisanjeRecenzije/{idKorisnika}")]
          [HttpPut]

          public async Task<ActionResult> BrisanjeRecenzije(int idKorisnika)
          {
              var pom = Context.Korisnici.Where(p => p.ID == idKorisnika).FirstOrDefault();

             
              
              pom.recenzijaZaAngenciju = null;
              pom.ocena = 0;
              Context.Korisnici.Update(pom);
              await Context.SaveChangesAsync();
              return Ok("Izmena je uspesna, recenzija i ocena su uklonjene");  

          }

        [Route("ListaOdredjenihRecenzijaPocetnaStrana")]
        [HttpGet]

        public async Task<ActionResult> ListaRecenzijaOcena()
        {
            var recenzije = await Context.Korisnici.Where(p => p.recenzijaZaAngenciju != null && p.ocena != 0 && p.tipKorsinika == "klijent").ToListAsync();
            if(recenzije == null)
            {
                return BadRequest("Nemamo korisnika sa zadatim podacima");
            }
            var sorted = (from o in recenzije orderby o.recenzijaZaAngenciju ascending
            select o).Take(5);

            return Ok(
                sorted.Select(p =>
                new
                {
                    recenzijaZaAngenciju = p.recenzijaZaAngenciju,
                    ocena = p.ocena

                }).ToList()
            );

        }
      
        [Route("StatistikaZaKlijenta")]
        [HttpGet]
        public async Task<ActionResult> StatistikaZaKlijenta()
        {
            var recenzije=await Context.Korisnici.Where(p=>p.recenzijaZaAngenciju!=null).ToListAsync();
            var brojR=recenzije.Count();

            var selidbe=await Context.Selidbe.Where(p=>p.status=="zavrseno").ToListAsync();
            var brojS=selidbe.Count();

            var radnici=await Context.Korisnici.Where(p=>p.tipKorsinika=="radnik" || p.tipKorsinika=="radnikP" || p.tipKorsinika=="agencija").ToListAsync();
            var brojRad=radnici.Count();

            return Ok(new{
                brojRecenzija=brojR,
                brojSelidbi=brojS,
                brojRadnika=brojRad
            });
        }
    }
}
