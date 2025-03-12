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
    public class JedinicaController : ControllerBase
    {
       public AgencijaContext Context {get; set;}

        public JedinicaController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiJedinice")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiJedinice()
        {
            var jedinicaMere = await Context.JedinicaMere
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.naziv,
            }).ToListAsync();
            return Ok(jedinicaMere);
        }
    }
}
