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
    public class ProstorijaController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public ProstorijaController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiProstoriju")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiProstoriju()
        {
            var Prostorija = await Context.Prostorije
            .Select(p => 
            new 
            {
                ID = p.ID,
                komentar = p.ilustracija,
                status=p.status,
                stvari = p.prostorijaStvari.Select(s=>
                new{
                    ID=s.ID,
                    tip=s.podtip.naziv,
                    kolicina=s.kolicina,
                    sirina=s.sirina,
                    dubina=s.dubina,
                    visina=s.visina,
                    cena=s.cena,
                    jedinica=s.jedinicaMere.naziv
                })
            }).ToListAsync();
            return Ok(Prostorija);
        }

        [Route("PromeniStatus/{id}/{status}")]
        [HttpPut]

        public async Task<ActionResult> PromeniStatus(int id,string status)
        {
            var stvar=Context.Prostorije
            .Include(p=>p.prostorijaStvari)
            .Where(p=>p.ID==id).FirstOrDefault();
            var stvari =stvar.prostorijaStvari;
            stvar.status=status;
            foreach (var s in stvari)
            {
                s.status=status;
                Context.Stvari.Update(s);
            }
            Context.Prostorije.Update(stvar);
            await Context.SaveChangesAsync();
            return Ok("Uspesno Zavrsen");
        }

        [Route("UkloniProstoriju/{id}")]
        [HttpDelete]

        public async Task<ActionResult> ukloniProstoriju(int id)
        {
            var stvar=Context.Prostorije
            .Include(p=>p.prostorijaStvari)
            .Where(p=>p.ID==id).FirstOrDefault();
            var stvari =Context.Stvari.Where(p => p.prostorija.ID == id);
            var selidba=Context.Selidbe
            .Include(p=>p.selidbaProstorije)
            .Where(p=>p.selidbaProstorije.Any(q=>q.ID==id)).FirstOrDefault();
            var sum=stvari.Select(x => x.cena).Sum();
            selidba.cena-=sum;
            if(stvari.Count()>0)
            Context.Stvari.RemoveRange(stvari);
            Context.Prostorije.Remove(stvar);
            await Context.SaveChangesAsync();
            return Ok("Uspesno Obrisan");
        }
    }
}
