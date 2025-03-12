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
     public class StvarController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public StvarController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiStvari")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiStvari()
        {
            var stvari = await Context.Stvari
            .Select(p => 
            new 
            {
                ID = p.ID,
                kolicina = p.kolicina,
                status=p.status,
                visina = p.visina,
                sirina = p.sirina,
                dubina = p.dubina,
                cena = p.cena
            }).ToListAsync();
            return Ok(stvari);
        }
[Route("PreuzmiStvariSoba/{idSoba}")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiStvari(int idSoba)
        {
            var stvari = await Context.Stvari
            .Where(p=>p.prostorija.ID==idSoba)
            .Select(p => 
            new 
            {
                ID = p.ID,
                status=p.status,
                kolicina = p.kolicina,
                visina = p.visina,
                sirina = p.sirina,
                dubina = p.dubina,
                cena = p.cena

            }).ToListAsync();
            return Ok(stvari);
        }

        [Route("PromeniStatus/{id}/{status}")]
        [HttpPut]

        public async Task<ActionResult> PromeniStatus(int id,string status)
        {
            var stvar=Context.Stvari
            .Include(p=>p.prostorija)
            .ThenInclude(p=>p.selidba)
            .Where(p=>p.ID==id).FirstOrDefault();
            stvar.status=status;
            Context.Stvari.Update(stvar);
            await Context.SaveChangesAsync();
            return Ok("Uspesno Zavrsen");
        }

        [Route("UkloniStvar/{id}")]
        [HttpDelete]

        public async Task<ActionResult> ukloniStvar(int id)
        {
            var stvar=Context.Stvari
            .Include(p=>p.prostorija)
            .ThenInclude(p=>p.selidba)
            .Where(p=>p.ID==id).FirstOrDefault();
            var prostorija=Context.Prostorije
            .Include(p=>p.selidba)
            .Where(p=>p.ID==stvar.prostorija.ID).FirstOrDefault();
            var selidba=Context.Selidbe
            .Include(p=>p.selidbaProstorije)
            .Where(p=>p.selidbaProstorije.Any(q=>q.ID==prostorija.ID)).FirstOrDefault();
            selidba.cena-=stvar.cena;
            Context.Stvari.Remove(stvar);
            await Context.SaveChangesAsync();
            return Ok("Uspesno Obrisan");
        }

    }
}
