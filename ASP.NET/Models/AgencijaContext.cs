using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class AgencijaContext : DbContext
    {
        public DbSet<Jedinica> JedinicaMere {get; set;}

        public DbSet<Korisnik> Korisnici {get; set;}

        public DbSet<PodtipStvari> PodTipovi {get; set;}

        public DbSet<Pregled> Pregled {get; set;}

        public DbSet<Prostorija> Prostorije {get; set;}

        public DbSet<Selidba> Selidbe {get; set;}

        public DbSet<Stvar> Stvari {get; set;}

        public DbSet<TimRadnika> TimRadnika {get; set;}
        
        public DbSet<TipProstorije> TipoviProstorije {get; set;}

        public DbSet<TipStvari> TipoviStvari {get; set;}

        public DbSet<AgencijaOpsta> AgencijaOpsta {get; set;}

        public DbSet<ZauzetiTermini> ZauzetiTermini {get; set;}
        
        public DbSet<ZauzetiTerminiSelidba> ZauzetiTerminiSelidba {get; set;}

        public DbSet<TimMesec> TimMeseci {get;set;}

        public DbSet<Meseci> Meseci {get;set;}

        public AgencijaContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pregled>()
            .HasOne(m => m.pregledRadnik)
            .WithMany(t => t.PregledRadnik);
            modelBuilder.Entity<Pregled>()
            .HasOne(m => m.klijent)
            .WithMany(t => t.pregledKlijent);
                

        }



    }
}