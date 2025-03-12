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
    public class PodtipStvariController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public PodtipStvariController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiPodTipoveStvari")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiPodTipoveStvari()
        {
            var PodTipStvari = await Context.PodTipovi
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.naziv,
                cena = p.cena
            }).ToListAsync();
            return Ok(PodTipStvari);
        }

        [Route("PreuzmiPodtipoveZaTip/{id}")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiPodtipoveZaTip(int id)
        {
            var podTip = await Context.PodTipovi
            .Include(p=>p.tipStvari)
            .Where(t=>t.tipStvari.ID==id).ToListAsync();
            return Ok(podTip);
        }

        [Route("PreuzmiPodtipoveZaRandomTip")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiPodtipoveZaRandomTip()
        {
            var tip=await Context.TipoviStvari.FirstOrDefaultAsync();
            var podTip = await Context.PodTipovi
            .Include(p=>p.tipStvari)
            .Where(t=>t.tipStvari.ID==tip.ID).ToListAsync();
            return Ok(podTip);
        }
    }
}
