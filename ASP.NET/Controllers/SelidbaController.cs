using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;
using Hubs.Clients;
using Hubs;
using Microsoft.AspNetCore.SignalR;

namespace ASP.NET.Controllers
{
    [ApiController]
    [Route("[controller]")]
      public class SelidbaController : ControllerBase
    {
        public AgencijaContext Context {get; set;}
                
        private readonly IHubContext<NotificationHub> _hub;

        public SelidbaController(AgencijaContext context, IHubContext<NotificationHub> hub)
        {
            Context = context;
            _hub = hub;
        }

        [Route("NovaSelidba/{idPregled}")]
        [HttpPost]

        public async Task<ActionResult> NovaSelidba(int idPregled)
        {
            var p=Context.Pregled
            .Include(p=>p.klijent)
            .Where(p=>p.ID==idPregled).FirstOrDefault();
            var korisnik = Context.Korisnici.Where(pKorisnik=> pKorisnik.ID == p.klijent.ID).FirstOrDefault();

            p.status="zapocet";

            if (korisnik == null)
            {
                return BadRequest("Korisnik Ne Postoji!");
            }
            var selidba=new Selidba
            {
                klijent=korisnik,
                pregled=p,
                adresaOd=p.adresa,
                status="procena"
            };
            Context.Selidbe.Add(selidba);
            await Context.SaveChangesAsync();
            return Ok(selidba);
        }

        [Route("OkoncajSelidbu/{idProcena}/{idTim}/{Adresa}/{Datum}")]
        [HttpPut]

        public async Task<ActionResult> OkoncajSelidbu(int idProcena, int idTim, string Adresa, string Datum)
        {
            
            var procena=Context.Pregled.Where(pProcena=>pProcena.ID==idProcena).FirstOrDefault();
            if(procena==null) return BadRequest("Obrisano");
            var selidba = Context.Selidbe.Where(pSelidbe=> pSelidbe.pregled.ID== idProcena).FirstOrDefault();
            var tim=Context.TimRadnika.Where(pTim=>pTim.ID==idTim).FirstOrDefault();
            selidba.adresaDo=Adresa;
            selidba.datum=Datum;
            selidba.timRadnika=tim;
            selidba.status="zakazano";
            Context.Selidbe.Update(selidba);
            await Context.SaveChangesAsync();

            var selidbe =await Context.Selidbe.Where(pSelidbe=> pSelidbe.datum==Datum).ToListAsync();
            var timovi= await Context.TimRadnika.ToListAsync();
            if(selidbe.Count>=timovi.Count) 
            {
                var termin=new ZauzetiTerminiSelidba
                    {
                        datum=Datum
                    };
                Context.ZauzetiTerminiSelidba.Add(termin);
            }
            await Context.SaveChangesAsync();

            var datum=Context.ZauzetiTermini.Where(p=>p.datum==procena.datum+procena.vreme).FirstOrDefault();
            if(datum!=null)
            Context.ZauzetiTermini.Remove(datum);
            Context.Pregled.Remove(procena);
            
            await Context.SaveChangesAsync();
            return Ok(selidba);
        }

        [Route("ZavrsiSelidbu/{idSelidba}")]
        [HttpPut]

        public async Task<ActionResult> ZavrsiSelidbu(int idSelidba)
        {
            var selidba = Context.Selidbe.Where(pSelidbe=> pSelidbe.ID== idSelidba).FirstOrDefault();
            selidba.status="zavrseno";
            Context.Selidbe.Update(selidba);
            await Context.SaveChangesAsync();
            return Ok(selidba);

        }

        [Route("NovaSoba/{idProcena}/{idTip}/{Naziv}")]
        [HttpPut]

        public async Task<ActionResult> NovaSoba(int idProcena, int idTip, string Naziv)
        {
            var selidba = Context.Selidbe.Where(pSelidbe=> pSelidbe.pregled.ID== idProcena).FirstOrDefault();
            var tip=Context.TipoviProstorije.Where(p=>p.ID==idTip).FirstOrDefault();
            var soba=new Prostorija
            {
                ilustracija=Naziv,
                selidba=selidba,
                tipProstorije=tip,
                status="pocetak"
            };
            Context.Prostorije.Add(soba);
            await Context.SaveChangesAsync();
            return Ok(soba);

        }

        [Route("NovaStvar/{idSoba}/{idJedinica}/{idPodtip}/{kolicina}/{dubina}/{sirina}/{visina}")]
        [HttpPut]

        public async Task<ActionResult> NovaStvar(int idSoba, int idJedinica, int idPodtip, int kolicina, double dubina, double sirina, double visina)
        {
            var soba = Context.Prostorije.Where(pProstorije=> pProstorije.ID== idSoba).FirstOrDefault();
            var tip=Context.PodTipovi.Where(p=>p.ID==idPodtip).FirstOrDefault();
            var jedinica=Context.JedinicaMere.Where(p=>p.ID==idJedinica).FirstOrDefault();
            var stvar=new Stvar
            {
                kolicina=kolicina,
                visina=visina,
                sirina=sirina,
                dubina=dubina,
                prostorija=soba,
                podtip=tip,
                jedinicaMere=jedinica,
                status="pocetak"
            };
            stvar.cena=kolicina*dubina*sirina*visina*jedinica.metar*jedinica.metar*jedinica.metar*tip.cena;

            Context.Stvari.Add(stvar);
            await Context.SaveChangesAsync();

            var selidba=Context.Selidbe
            .Include(p=>p.selidbaProstorije)
            .Where(p=>p.selidbaProstorije.Any(p=>p.ID==idSoba)).FirstOrDefault();

            selidba.cena+=stvar.cena;
            await Context.SaveChangesAsync();
            return Ok(stvar);
        }
        

        [Route("ListaProstorija/{idProcena}")]
        [HttpGet]

        public async Task<ActionResult> ListaProstorija(int idProcena)
        {
            var p=Context.Pregled.Where(p=>p.ID==idProcena).FirstOrDefault();
            if(p==null) return BadRequest("ne");
            var selidba = Context.Selidbe.Where(pSelidbe=> pSelidbe.pregled.ID== idProcena).FirstOrDefault();
            var prostorije=await Context.Prostorije
            .Include(p=>p.prostorijaStvari)
            .Include(p=>p.tipProstorije)
            .Where(p=>p.selidba.ID==selidba.ID)
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.ilustracija,
                tip = p.tipProstorije.naziv,
                slika=p.tipProstorije.slika,
                stvari = p.prostorijaStvari.Select(s=>
                new{
                    ID=s.ID,
                    tip=s.podtip.naziv,
                    kolicina=s.kolicina,
                    sirina=s.sirina.ToString("0.0"),
                    dubina=s.dubina.ToString("0.0"),
                    visina=s.visina.ToString("0.0"),
                    cena=s.cena,
                    jedinica=s.jedinicaMere.naziv
                })
            }).ToListAsync();
            return Ok(prostorije);
        }

        [Route("ListaProstorija1/{id}")]
        [HttpGet]

        public async Task<ActionResult> ListaProstorija1(int id)
        {
            var selidba = Context.Selidbe.Where(pSelidbe=> pSelidbe.ID== id).FirstOrDefault();
            if(selidba==null) return BadRequest("ne");
            var prostorije=await Context.Prostorije
            .Include(p=>p.prostorijaStvari)
            .Include(p=>p.tipProstorije)
            .Where(p=>p.selidba.ID==selidba.ID)
            .Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.ilustracija,
                tip = p.tipProstorije.naziv,
                status=p.status,
                broj=p.prostorijaStvari.Count(a => a.status == "pocetak"),
                stvari = p.prostorijaStvari.Select(s=>
                new{
                    ID=s.ID,
                    tip=s.podtip.naziv,
                    kolicina=s.kolicina,
                    sirina=s.sirina.ToString("0.0"),
                    dubina=s.dubina.ToString("0.0"),
                    visina=s.visina.ToString("0.0"),
                    cena=s.cena,
                    status=s.status,
                    jedinica=s.jedinicaMere.naziv
                })
            }).ToListAsync();
            return Ok(prostorije);
        }

        [Route("PreuzmiSelidbe")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiSelidbe()
        {
            var selidba = await Context.Selidbe
            .Select(p => 
            new 
            {
                ID = p.ID,
                adresaOd = p.adresaOd,
                adresaDo = p.adresaDo,
                datum = p.datum,
                cena = p.cena,
                tipSelidbe = p.tipSelidbe,
            }).ToListAsync();
            return Ok(selidba);
        }

        [Route("PreuzmiSelidbu/{idProcene}")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiSelidbu(int idProcene)
        {var p=Context.Pregled.Where(p=>p.ID==idProcene).FirstOrDefault();
            if(p==null) return BadRequest("not funny");
            var selidba = await Context.Selidbe
            .Include(p=>p.klijent)
            .Where(pSelidbe=> pSelidbe.pregled.ID== idProcene)
            .Select(p => 
            new 
            {
                ID = p.ID,
                adresaOd = p.adresaOd,
                adresaDo = p.adresaDo,
                datum = p.datum,
                cena = p.cena.ToString("0.00"),
                tipSelidbe = p.tipSelidbe,
                idKorisnika=p.klijent.ID
            }).FirstOrDefaultAsync();
            return Ok(selidba);
        }

        [Route("PreuzmiSlobodneTimove/{Datum}")]
        [HttpGet]

        public async Task<ActionResult> preuzmiSlobodneTimove(string Datum)
        {
            var timovi = await Context.TimRadnika
            .Include(p=>p.timRadnikaSelidbe)
            .Where(p=>p.timRadnikaSelidbe.Any(p=>p.datum==Datum)==false).ToListAsync();

            return Ok(timovi);
        }

        [Route("VratiZauzete")]
        [HttpGet]

        public async Task<ActionResult> VratiZauzete()
        { 
            var termini = await Context.ZauzetiTerminiSelidba.ToListAsync();
            return Ok(termini);
        }

       [Route("ListaSelidbi/{idKorisnik}")]
       [HttpGet]

        public async Task<ActionResult> ListaSelidba(int idKorisnik)
        {
            var selidbe =await Context.Selidbe.Where(pSelidbe=> pSelidbe.klijent.ID== idKorisnik&&pSelidbe.status=="zakazano")
            .Select(
                sel=>
                new{
                    ID=sel.ID,
                    adresaOd=sel.adresaOd,
                    adresaDo=sel.adresaDo,
                    datum=sel.datum,
                    cena=sel.cena.ToString("0.00"),
                    prostorija=sel.selidbaProstorije.Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.ilustracija,
                tip = p.tipProstorije.naziv,
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
            })
                }
            ).ToListAsync();
            return Ok(selidbe);
        }


        [Route("ListaZavrsenihSelidbi/{idKorisnik}")]
       [HttpGet]

        public async Task<ActionResult> ListaZavrsenihSelidbi(int idKorisnik)
        {
            var selidbe =await Context.Selidbe.Where(pSelidbe=> pSelidbe.klijent.ID== idKorisnik&&pSelidbe.status=="zavrseno").OrderByDescending(x=>x.datum)
            .Select(
                sel=>
                new{
                    ID=sel.ID,
                    adresaOd=sel.adresaOd,
                    adresaDo=sel.adresaDo,
                    datum=sel.datum,
                    cena=Math.Round(sel.cena,2),
                    prostorija=sel.selidbaProstorije.Select(p => 
            new 
            {
                ID = p.ID,
                naziv = p.ilustracija,
                tip = p.tipProstorije.naziv,
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
            })
                }
            ).ToListAsync();
            return Ok(selidbe);
        }

       [Route("Obavesti/{idKorisnika}/{poruka}/{idPosiljaoc}/{tip}")]
       [HttpPost]

        public async Task Obavesti(int idKorisnika, string poruka, int idPosiljaoc,string tip) 
        {
            var odgovor= new 
               { 
                tip=tip,
                id=idKorisnika,
                poruka=poruka,
                idPosiljaoc=idPosiljaoc
                };
                
            await _hub.Clients.All.SendAsync("ReceiveMessage", odgovor);
            
        }
        [Route("DatumIVreme")]
        [HttpGet]
        public async Task<ActionResult>  datumIVreme()
        {
           string vreme=DateTime.Now.ToString("MM/dd/yyyy");
           string dan=vreme.Substring(3,2);
           string mesec=vreme.Substring(0,2);
           string godina=vreme.Substring(6,4);
           
           var selidbe=await Context.Selidbe.Where(p=>p.cena!=0).ToListAsync();
           var timovi= await Context.TimRadnika.ToListAsync();

        foreach(TimRadnika t in timovi)
        {
            List<Selidba> listaSelidbi=new List<Selidba>();

           foreach (Selidba s in selidbe)
           {
               if(s.timRadnika.ID==t.ID)
               {
                string datum=s.datum;
               
                List<string> podaci=datum.Split('.').ToList();
                string danZ=podaci[0];
                string   mesecZ=podaci[1];
                string   godinaZ=podaci[2];
                

               //izdvajanje samo realizovanih selidbi
               if(/*Int32.Parse(danZ)<=Int32.Parse(dan) &&*/ Int32.Parse(mesecZ)==Int32.Parse(mesec) && Int32.Parse(godinaZ)==Int32.Parse(godina))
                {
                    listaSelidbi.Add(s);
                }
               }
           }
            t.brojSelidbi=listaSelidbi.Count;
        }

        return Ok(
               timovi.Select(p=>
                new{
                    tim=p.naziv,
                    brojSelidbi=p.brojSelidbi
                }).ToList()
            );
        

    }

        [Route("UkloniSelidbu/{idProcena}")]
        [HttpDelete]

        public async Task<ActionResult> ukloniSelidbu(int idProcena)
        {
            var procena=Context.Pregled.Where(pProcena=>pProcena.ID==idProcena).FirstOrDefault();
            if(procena==null) return BadRequest("Obrisano");
            var selidba = Context.Selidbe.Where(pSelidbe=> pSelidbe.pregled.ID== idProcena).FirstOrDefault();
            var prostorije=Context
            .Prostorije
            .Include(p=>p.prostorijaStvari)
            .Where(p => p.selidba.ID == selidba.ID).ToList();
            foreach (var prostorija in prostorije)
            {
                var stvari =Context.Stvari.Where(p => p.prostorija.ID == prostorija.ID);
                if(stvari.Count()>0)
                Context.Stvari.RemoveRange(stvari);
                Context.Prostorije.Remove(prostorija);
            }
            var datum=Context.ZauzetiTermini.Where(p=>p.datum==procena.datum+procena.vreme).FirstOrDefault();
            if(datum!=null)
            Context.ZauzetiTermini.Remove(datum);
            Context.Pregled.Remove(procena);
            var datumS=Context.ZauzetiTerminiSelidba.Where(p=>p.datum==selidba.datum).FirstOrDefault();
            if(datumS!=null)
            Context.ZauzetiTerminiSelidba.Remove(datumS);
            Context.Selidbe.Remove(selidba);
            await Context.SaveChangesAsync();
            return Ok("Uspesno Obrisan");
        }

          [Route("DodatiRecenzijuIOcenuSelidba/{idSelidbe}/{recenzija}/{ocena}")]
          [HttpPut]

           public async Task<ActionResult> DodatiRecenzijuIOcenuSelidba(int idSelidbe, string recenzija, int ocena)
           {
              var pom = await Context.Selidbe.Where(p=>p.ID==idSelidbe && p.status == "zavrseno").FirstOrDefaultAsync();
             

              if(pom == null)
              {
                  return BadRequest("Selidba nije zavrsena ne mozete ostaviti recenziju");
              }

             

            pom.recenzijaSelidba = recenzija; 
            pom.ocena = ocena;
            Context.Selidbe.Update(pom);
            await Context.SaveChangesAsync();
            return Ok("Izmena je uspesna, recenzija je dodata");       
                      
          }

        [Route("ListaRecenzijaOcenaSelidba/{idAdministracija}")]
        [HttpGet]

        public async Task<ActionResult> ListaRecenzijaOcena(int idAdministracija)
        {
            var administarcija =   Context.Korisnici.Where(p => p.ID == idAdministracija &&  p.tipKorsinika == "agencija").FirstOrDefault();
            if(administarcija == null)
           {
               return BadRequest("Nalog za agministraciju/agenciju ne postoji");
           }

            var recenzija =  await Context.Selidbe.Where(p => p.recenzijaSelidba != null && p.ocena != 0)
            .Select(p => 
            new
            {
                ID = p.ID,
                recenzijaSelidba = p.recenzijaSelidba,
                ocena = p.ocena
                
            }
            ).ToListAsync();

            return Ok(recenzija);
        }

        [Route("BrisanjeRecenzijeSelidba/{idSelidbe}")]
        [HttpPut]

          public async Task<ActionResult> BrisanjeRecenzijeSelidba(int idSelidbe)
          {
              var pom = Context.Selidbe.Where(p => p.ID == idSelidbe).FirstOrDefault();

              if(pom == null)
              {
                  return BadRequest("Nemamo navedenu selidbu");
              }
              
              pom.recenzijaSelidba = null;
              pom.ocena = 0;
              Context.Selidbe.Update(pom);
              await Context.SaveChangesAsync();
              return Ok("Izmena je uspesna, recenzija i ocena su uklonjene");  

          }


    [Route("GodisnjiIzvestaj")]
    [HttpPut]
    public async Task<ActionResult> GodisnjiPrihodi()
    {
        string vreme=DateTime.Now.ToString("MM/dd/yyyy");
           string dan=vreme.Substring(3,2);
           string mesec=vreme.Substring(0,2);
           string godina=vreme.Substring(6,4);
           
           var timovi=await Context.TimRadnika
                            .Include(p=>p.timRadnikaSelidbe)
                            .Include(p=>p.timMesec)
                            .ThenInclude(p=>p.mesec).ToListAsync();

            var meseci=await Context.Meseci.ToListAsync();
           
           foreach(TimRadnika t in timovi)
           {
               List<Selidba> ostvareneSelidbe1=new List<Selidba>();
               List<Selidba> ostvareneSelidbe2=new List<Selidba>();
               List<Selidba> ostvareneSelidbe3=new List<Selidba>();
               List<Selidba> ostvareneSelidbe4=new List<Selidba>();
               List<Selidba> ostvareneSelidbe5=new List<Selidba>();
               List<Selidba> ostvareneSelidbe6=new List<Selidba>();
               List<Selidba> ostvareneSelidbe7=new List<Selidba>();
               List<Selidba> ostvareneSelidbe8=new List<Selidba>();
               List<Selidba> ostvareneSelidbe9=new List<Selidba>();
               List<Selidba> ostvareneSelidbe10=new List<Selidba>();
               List<Selidba> ostvareneSelidbe11=new List<Selidba>();
               List<Selidba> ostvareneSelidbe12=new List<Selidba>();

               double[] prihodi=new double[12];
               for(int i=0;i<12;i++)
               {
                   prihodi[i]=0;
               }

               var selidbe=await Context.Selidbe.Where(p=>p.timRadnika.ID==t.ID).ToListAsync();
               foreach(Selidba s in selidbe)
                {
                    string datumS=s.datum;

                    List<string> podaci=datumS.Split('.').ToList();
                        string danS=podaci[0];
                        string   mesecS=podaci[1];
                        string   godinaS=podaci[2];

                    if(Int32.Parse(godinaS)==Int32.Parse(godina) && s.status=="zavrseno")
                    {
                        switch(Int32.Parse(mesecS))
                        {
                            case 1:
                            ostvareneSelidbe1.Add(s);
                            prihodi[0]+=s.cena;
                            break;

                            case 2:
                            ostvareneSelidbe2.Add(s);
                            prihodi[1]+=s.cena;
                            break;

                            case 3:
                            ostvareneSelidbe3.Add(s);
                            prihodi[2]+=s.cena;
                            break;

                            case 4:
                            ostvareneSelidbe4.Add(s);
                            prihodi[3]+=s.cena;
                            break;

                            case 5:
                            ostvareneSelidbe5.Add(s);
                            prihodi[4]+=s.cena;
                            break;

                            case 6:
                            ostvareneSelidbe6.Add(s);
                            prihodi[5]+=s.cena;
                            break;

                            case 7:
                            ostvareneSelidbe7.Add(s);
                            prihodi[6]+=s.cena;
                            break;

                            case 8:
                            ostvareneSelidbe8.Add(s);
                            prihodi[7]+=s.cena;
                            break;

                            case 9:
                            ostvareneSelidbe9.Add(s);
                            prihodi[8]+=s.cena;
                            break;

                            case 10:
                            ostvareneSelidbe10.Add(s);
                            prihodi[9]+=s.cena;
                            break;

                            case 11:
                            ostvareneSelidbe11.Add(s);
                            prihodi[10]+=s.cena;
                            break;

                            case 12:
                            ostvareneSelidbe12.Add(s);
                            prihodi[11]+=s.cena;
                            break;
                        }
                    }
               }

               for(int i=1;i<=12;i++)
               {
                    TimMesec tm= new TimMesec();
                    tm.tim=t;
                    var mes=Context.Meseci.Where(p=>p.mesec==i.ToString()).FirstOrDefault();

                    tm.mesec=mes;
                    tm.prihod=prihodi[i-1];

                   switch(i)
                        {
                            case 1:
                            tm.brojSelidbi=ostvareneSelidbe1.Count();
                            break;

                            case 2:
                            tm.brojSelidbi=ostvareneSelidbe2.Count();
                            break;

                            case 3:
                            tm.brojSelidbi=ostvareneSelidbe3.Count();
                            break;

                            case 4:
                            tm.brojSelidbi=ostvareneSelidbe4.Count();
                            break;

                            case 5:
                            tm.brojSelidbi=ostvareneSelidbe5.Count();
                            break;

                            case 6:
                            tm.brojSelidbi=ostvareneSelidbe6.Count();
                            break;

                            case 7:
                            tm.brojSelidbi=ostvareneSelidbe7.Count();
                            break;

                            case 8:
                            tm.brojSelidbi=ostvareneSelidbe8.Count();
                            break;

                            case 9:
                            tm.brojSelidbi=ostvareneSelidbe9.Count();
                            break;

                            case 10:
                            tm.brojSelidbi=ostvareneSelidbe10.Count();
                            break;

                            case 11:
                            tm.brojSelidbi=ostvareneSelidbe11.Count();
                            break;

                            case 12:
                            tm.brojSelidbi=ostvareneSelidbe12.Count();
                            break;
                        }
                        var pom=Context.TimMeseci.Where(p=>p.tim.ID==t.ID && p.mesec.mesec==mes.mesec).FirstOrDefault();
                        if(pom!=null)
                        {
                            pom.tim=tm.tim;
                            pom.mesec=tm.mesec;
                            pom.brojSelidbi=tm.brojSelidbi;
                            pom.prihod=tm.prihod;
                            Context.TimMeseci.Update(pom);
                        }
                        else
                        {
                            Context.TimMeseci.Add(tm);
                        }
               
               }
           }
           Context.SaveChangesAsync();
           return Ok("zavrseno");
    }
    [Route("PreuzmiGodisnjiIzvestaj")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiGodisnjePrihode()
    {
        //GodisnjiPrihodi();
        var timMesec=await Context.TimMeseci
                            .Include(p=>p.tim)
                            .Include(p=>p.mesec)
                            .OrderBy(x=>x.tim).ThenBy(x=>x.mesec).ToListAsync();
        return Ok(timMesec.Select(p=>
                    new{
                        naziv=p.tim.naziv,
                        mesec=p.mesec.mesec,
                        brojSelidbi=p.brojSelidbi,
                        prihod=p.prihod
                    }).ToList());
    }
    }
    
}

