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
      public class TipStvariController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public TipStvariController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiTipoveStvari")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiTipoveStvari()
        {
            var TipStvari = await Context.TipoviStvari
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.naziv,
            }).ToListAsync();
            return Ok(TipStvari);
        }
    }
}
