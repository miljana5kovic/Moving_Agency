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
      public class PregledController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public PregledController(AgencijaContext context)
        {
            Context = context;
        }


        [Route("ZakaziPreged/{idKorisnik}/{Datum}/{Vreme}/{Adresa}/{lng}/{lat}")]
        [HttpPost]
        public async Task<ActionResult> zakaziPregled(int idKorisnik,string Datum, string Vreme, string Adresa, double lng, double lat)
        {
            try
            {
                var korisnik = Context.Korisnici.Where(pKorisnik=> pKorisnik.ID == idKorisnik).FirstOrDefault();
                var p=await Context
                .Pregled
                .Where(p=>p.klijent.ID==idKorisnik).ToListAsync();
                if(p.Count()>=5)
                {
                    return BadRequest("Ne mozete da zakazete vise od 5 procena!");
                }
                if (korisnik == null)
                {
                    return BadRequest("Korisnik Ne Postoji!");
                }
                var pregled=new Pregled
                {
                    datum=Datum,
                    vreme=Vreme,
                    adresa=Adresa,
                    status="cekanje",
                    klijent=korisnik,
                    longitude=lng,
                    latitude=lat
                };
                Context.Pregled.Add(pregled);
                await Context.SaveChangesAsync();

                var radnici = await Context.Korisnici
                .Include(p=>p.PregledRadnik)
                .Where(p=>p.tipKorsinika=="radnikP").ToListAsync();

                var pregledi= await Context.Pregled
                .Where(p=>p.vreme==Vreme&&p.datum==Datum).ToListAsync();

                if(radnici.Count<=pregledi.Count)
                {
                    var termin=new ZauzetiTermini
                    {
                        datum=Datum+Vreme
                    };
                Context.ZauzetiTermini.Add(termin);
                }
                await Context.SaveChangesAsync();
                return Ok(pregled);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PotvrdiPreged/{idPregled}/{idRadnik}")]
        [HttpPut]
        public async Task<ActionResult> potvrdiPregled(int idPregled, int idRadnik)
        {
           
            try
            {
                var pregled = Context.Pregled.Where(pPregled=> pPregled.ID == idPregled).FirstOrDefault();
                if (pregled == null)
                {
                    return BadRequest("Pregled Ne Postoji!");
                }

                var radnik = Context.Korisnici.Where(pRadnik=> pRadnik.ID == idRadnik).FirstOrDefault();
                if (radnik == null)
                {
                    return BadRequest("Radnik Ne Postoji!");
                }
                pregled.status="zakazano";
                pregled.pregledRadnik=radnik;
                Context.Pregled.Update(pregled);
                await Context.SaveChangesAsync();
                return Ok(pregled);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiPreglede")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiPreglede()
        {
            var pregledi = await Context.Pregled
            .Select(p => 
            new 
            {
                ID = p.ID,
                datum = p.datum,
                vreme = p.vreme,
                adresa = p.adresa,
                status = p.status,
                longtitude=p.longitude,
                latitude=p.latitude

            })
            .OrderBy(x => x.datum)
            .ThenBy(x => x.vreme)
           .ToListAsync();
            return Ok(pregledi);
        }

        [Route("PreuzmiPregledeNaCekanju")]
        [HttpGet]

        public async Task<ActionResult> preuzmiPregledeNaCekanju()
        {
            var pregledi = await Context.Pregled.Where(p=>p.status=="cekanje").ToListAsync();

            var sorted = (from o in pregledi orderby o.datum descending select o).Take(pregledi.Count());
            var sort = (from o in sorted orderby o.vreme descending select o).Take(sorted.Count());
            sort.Select(p => 
            new 
            {
                ID = p.ID,
                datum = p.datum,
                vreme = p.vreme,
                adresa = p.adresa,
                status = p.status

            })
            
            .ToList();
            return Ok(sort);
        }

        [Route("PreuzmiPotvrdjenePreglede")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiPotvrdjenePreglede()
        {
            var p=await Context
            .Pregled
            .Include(p=>p.pregledRadnik)
            .Include(p=>p.klijent)
            .Where(p=>p.status=="zakazano")
            .Select(p => 
            new 
            {
                ID = p.ID,
                datum = p.datum,
                vreme = p.vreme,
                adresa = p.adresa,
                status = p.status,
                klijent=p.klijent,
                radnik=p.pregledRadnik,
                longtitude=p.longitude,
                latitude=p.latitude
            })
            .OrderBy(x => x.datum)
                 .ThenBy(x => x.vreme)
            .ToListAsync();
            return Ok(p);
        }

        [Route("PreuzmiSlobodneRadnike/{Datum}/{Vreme}")]
        [HttpGet]

        public async Task<ActionResult> preuzmiSlobodneRadnike(string Datum, string Vreme)
        {
            var radnici = await Context.Korisnici
            .Include(p=>p.PregledRadnik)
            .Where(p=>p.tipKorsinika=="radnikP").ToListAsync();
            var slobodni=radnici.Where(p=>p.PregledRadnik.Any(p=>p.datum==Datum&&p.vreme==Vreme)==false);

            return Ok(slobodni);
        }

        [Route("VratiZauzete")]
        [HttpGet]

        public async Task<ActionResult> VratiZauzete()
        { 
            var termini = await Context.ZauzetiTermini.ToListAsync();
            return Ok(termini);
        }

        [Route("VratiPregledeKorisnika/{id}")]
        [HttpGet]

        public async Task<ActionResult> vratiPregledeKorisnika(int id)
        { 
            var p=await Context
            .Pregled
            .Include(p=>p.pregledRadnik)
            .Include(p=>p.klijent)
            .Where(p=>(p.klijent.ID==id)&&(p.status=="cekanje" ||p.status=="zakazano")).Select(p => 
            new 
            {
                ID = p.ID,
                datum = p.datum,
                vreme = p.vreme,
                adresa = p.adresa,
                status = p.status,
                klijent=p.klijent,
                radnik=p.pregledRadnik,
                longtitude=p.longitude,
                latitude=p.latitude
            }).OrderBy(x => x.datum)
                 .ThenBy(x => x.vreme)
            .ToListAsync();
            return Ok(p);
        }

        [Route("VratiPreglede")]
        [HttpGet]
        
        public async Task<ActionResult> vratiPreglede()
        { 
            var p=await Context
            .Pregled
            .Include(p=>p.pregledRadnik)
            .Include(p=>p.klijent)
            .Where(p=>p.status=="cekanje")
            .Select(p => 
            new 
            {
                ID = p.ID,
                datum = p.datum,
                vreme = p.vreme,
                adresa = p.adresa,
                status = p.status,
                klijent=p.klijent,
                radnik=p.pregledRadnik,
                longtitude=p.longitude,
                latitude=p.latitude
            })
            .OrderBy(x => x.datum)
                 .ThenBy(x => x.vreme)
            .ToListAsync();
            return Ok(p);
        }

        [Route("UkloniPregled/{idPregleda}")]
        [HttpDelete]

        public async Task<ActionResult> ukloniPregled(int idPregleda)
        {
            var pregled=Context.Pregled.Where(p=>p.ID==idPregleda).FirstOrDefault();
            var termin=Context.ZauzetiTermini.Where(p=>p.datum==pregled.datum+pregled.vreme).FirstOrDefault();
            if(pregled==null)
            return BadRequest("Ne Postoji Ovaj Pregled");
            Context.Pregled.Remove(pregled);
            if(termin!=null)
            Context.ZauzetiTermini.Remove(termin);
            await Context.SaveChangesAsync();
            return Ok("Uspesno Obrisan");
        }

    }
}
