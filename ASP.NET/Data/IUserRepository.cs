using Models;
namespace Data

{
    public interface IUserRapository{
        public Korisnik Create(Korisnik nalog);
        Korisnik GetByEmail(string email);

        Korisnik GetById(int id);
    }

}