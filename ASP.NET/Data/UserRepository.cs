using System.Linq;
using Models;

namespace Data{
    public class USerRepository : IUserRapository
    {
        private readonly AgencijaContext _context;
        public USerRepository(AgencijaContext context)
        {
            _context = context;
        }
        public Korisnik Create(Korisnik nalog)
        {
            _context.Korisnici.Add(nalog);
            nalog.ID = _context.SaveChanges();

            return nalog;
        }

        public Korisnik GetByEmail(string email)
        {
            return _context.Korisnici.FirstOrDefault(u => u.email == email);
        }

        public Korisnik GetById(int id)
        {
            return _context.Korisnici.FirstOrDefault(u => u.ID == id);
        }
    }
}