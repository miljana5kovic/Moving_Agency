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
     public class TipProstorijeController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public TipProstorijeController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiTipoveProstorija")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiTipoveProstorija()
        {
            var TipProstorije = await Context.TipoviProstorije
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.naziv,
            }).ToListAsync();
            return Ok(TipProstorije);
        }
    }
}
