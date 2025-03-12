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
     public class TimRadnikaController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public TimRadnikaController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiTimoveRadnika")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiTimoveRadnika()
        {
            var tim = await Context.TimRadnika
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.naziv,
                

            }).ToListAsync();
            return Ok(tim);
        }
    }
}
