using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.Json;
using System.IO;
using System.Net.Http.Headers;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Models;
using Data;
using Dtos;
using Helpers;
using Microsoft.AspNetCore.Hosting;

namespace ASP.NET.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KorisnikController : ControllerBase
    {
        public AgencijaContext Context {get; set;}
        private IWebHostEnvironment _env;

        private readonly IUserRapository _repository;
         private readonly JwtService _jmtService;

        public KorisnikController(IUserRapository repository, JwtService jwtService, AgencijaContext context, IWebHostEnvironment env){
            _repository = repository;
            _jmtService = jwtService;
            Context = context;
             _env=env;
        }

        [Route("register/{tip}")]
        [HttpPost]
        public IActionResult Register(string tip,string tim,RegisterDto dto)
        {
            

            if(Context.Korisnici.Where(p=>dto.UserName==p.username||p.email==dto.Email).FirstOrDefault()!=null) return BadRequest(new {message = "Email ili UserName Vec Postoji"}); 
        var timRadnika=Context.TimRadnika.Where(t=>t.naziv==tim).FirstOrDefault();;            
        if(tip=="radnik") 
            {
                if(timRadnika==null)
                {
                    var termini=Context.ZauzetiTerminiSelidba.ToList();
                    Context.ZauzetiTerminiSelidba.RemoveRange(termini);
                    timRadnika=new TimRadnika{
                        naziv=tim
                    };
                    TimMesec timMesec=new TimMesec{
                        tim=timRadnika
                    };
                    Context.TimRadnika.Add(timRadnika);
                    //Context.TimMeseci.Add(timMesec);
                    Context.SaveChanges();
                }
            }
            if(tip=="radnikP")
            {
                var termini=Context.ZauzetiTermini.ToList();
                    Context.ZauzetiTermini.RemoveRange(termini);
            }
            var korisnik= new Korisnik{
                tipKorsinika=tip,
                ime = dto.Ime,
                prezime=dto.Prezime,
                username=dto.UserName,
                email = dto.Email,
                password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            if(tip=="radnik") korisnik.timRadnika=timRadnika;
            return Created("uspesno",_repository.Create(korisnik));
        }

        

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var jwt = Request.Cookies["jwt"];

            var user = _repository.GetByEmail(dto.Email);

            if(user == null)
            {
                return BadRequest(new {message = "Invalid Credentials"});
            }

            if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.password))
            {
                return BadRequest(new {message = "Invalid Crudentials"});
            }

            jwt = _jmtService.Generate(user.ID);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true  
            });

            return Ok(user);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }
        
        [HttpGet("korisnik")]
        public IActionResult Korisnik()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jmtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user);
            }
            catch(Exception e)
            {
                return Unauthorized(e.Message);
            }
        }

        [Route("VratiRadnike")]
        [HttpGet]
        public async Task<ActionResult> vratiRadnike( )
        {
            try
            {
                var radnici=await Context.Korisnici.Include(p=>p.timRadnika).Where(p=>p.tipKorsinika=="radnik"||p.tipKorsinika=="radnikp").Select(p => 
                    new 
                    {
                        id=p.ID,
                        tipKorsinika=p.tipKorsinika,
                        ime = p.ime,
                        prezime=p.prezime,
                        username=p.username,
                        email = p.email,
                        timRadnika=p.timRadnika.naziv
                    })
                    .OrderByDescending(x => x.tipKorsinika)
                    .ThenBy(x => x.ime)
                    .ToListAsync();

                return Ok(radnici);
            }
            catch(Exception)
            {
                throw;
            }
        }

        [Route("VratiAdministraciju")]
        [HttpGet]
        public async Task<ActionResult> VratiAdministraciju( )
        {
            try
            {
                var radnici=await Context.Korisnici.Include(p=>p.timRadnika).Where(p=>p.tipKorsinika=="agencija").Select(p => 
                    new 
                    {
                        id=p.ID,
                        tipKorsinika=p.tipKorsinika,
                        ime = p.ime,
                        prezime=p.prezime,
                        username=p.username,
                        email = p.email
                    })
                    .OrderBy(x => x.ime)
                    .ToListAsync();
                return Ok(radnici);
            }
            catch(Exception)
            {
                throw;
            }
        }

        [Route("VratiVlasnika")]
        [HttpGet]
        public async Task<ActionResult> VratiVlasnika( )
        {
            try
            {
                var radnici=await Context.Korisnici.Where(p=>p.tipKorsinika=="vlasnik").Select(p => 
                    new 
                    {
                        id=p.ID,
                        tipKorsinika=p.tipKorsinika,
                        ime = p.ime,
                        prezime=p.prezime,
                        username=p.username,
                        email = p.email
                    })
                    .OrderBy(x => x.ime)
                    .ToListAsync();
                return Ok(radnici);
            }
            catch(Exception)
            {
                throw;
            }
        }


        [Route("VratiKorisnika/{id}")]
        [HttpGet]
        public async Task<ActionResult> vratiKorisnika(int id )
        {
            try
            {
                var korisnik=await Context.Korisnici.Where(p=>p.ID==id).FirstOrDefaultAsync();
                return Ok(korisnik);
            }
            catch(Exception)
            {
                throw;
            }
        }

        [Route("ListaZadataka/{id}")]
        [HttpGet]
        public async Task<ActionResult> ListaZadataka(int id)
        {
            try
            {
                var user = await Context.Korisnici.Where(u=>u.ID==id).FirstOrDefaultAsync();
                
                if(user.tipKorsinika=="radnikP")
                {
                    var list=await Context.Pregled
                    .Include(p=>p.pregledRadnik)
                    .Include(p=>p.klijent)
                    .Where(p=>p.pregledRadnik.ID==user.ID).Select(p => 
                    new 
                    {
                        ID = p.ID,
                        datum = p.datum,
                        vreme = p.vreme,
                        adresa = p.adresa,
                        status = p.status,
                        klijent = p.klijent,
                        radnik = p.pregledRadnik,
                        longtitude = p.longitude,
                        latitude = p.latitude
                    }).OrderBy(x => x.datum)
                        .ThenBy(x => x.vreme)
                    .ToListAsync();
                            return Ok(list);
                        }
                else
                {
                    var tim=await Context.TimRadnika.Where(t=>t.timRadnikaRadnici.Any(p=>p.ID==user.ID)).FirstOrDefaultAsync();
                    var list=await Context.Selidbe
                        .Include(p=>p.timRadnika)
                        .Include(p=>p.selidbaProstorije)
                        .ThenInclude(p=>p.prostorijaStvari)
                        .Where(p=>p.timRadnika.ID==tim.ID&&p.status=="zakazano").Select(
                    sel=>
                    new{
                        ID=sel.ID,
                        adresaOd=sel.adresaOd,
                        adresaDo=sel.adresaDo,
                        datum=sel.datum,
                        klijent=sel.klijent,
                        broj=sel.selidbaProstorije.Count(a => a.prostorijaStvari.Count(b => b.status == "pocetak") != 0),
                        cena=sel.cena.ToString("0.00"),
                        prostorija=sel.selidbaProstorije.Select(p => 
                    new 
                    {
                        ID = p.ID,
                        naziv = p.ilustracija,
                        tip = p.tipProstorije.naziv,
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
                            status=s.status,
                            jedinica=s.jedinicaMere.naziv
                        })
                    })
                    }
                )
                .OrderBy(x => x.datum)
                        .ToListAsync();
                        return Ok(list);
                }
                }
                catch(Exception)
                {
                    throw;
                }
        }

        [Route("ObrisiKorisnika/{id}")]
        [HttpDelete]
        public async Task<ActionResult> obrisiKorisnika(int id)
        {
            try
            {
                var korisnici=await Context.Korisnici.Where(p=>p.ID==id).FirstOrDefaultAsync();
                Context.Korisnici.Remove(korisnici);
                await Context.SaveChangesAsync();
                return Ok("Success!");
            }
            catch(Exception)
            {
                throw;
            }
        }

    }
}
 
  
            
        
  