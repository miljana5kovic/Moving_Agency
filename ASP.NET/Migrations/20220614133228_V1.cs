using Microsoft.EntityFrameworkCore.Migrations;

namespace ASP.NET.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgencijaOpsta",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    lokacija = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    gmail = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    kontakt = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    oNama = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    text1 = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    text2 = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    text3 = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgencijaOpsta", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "JedinicaMere",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    metar = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JedinicaMere", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Meseci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    mesec = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meseci", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TipoviProstorije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    slika = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoviProstorije", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TipoviStvari",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoviStvari", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ZauzetiTermini",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    datum = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZauzetiTermini", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ZauzetiTerminiSelidba",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    datum = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZauzetiTerminiSelidba", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TimRadnika",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    brojSelidbi = table.Column<int>(type: "int", nullable: false),
                    timRadnikaAgencijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimRadnika", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TimRadnika_AgencijaOpsta_timRadnikaAgencijaID",
                        column: x => x.timRadnikaAgencijaID,
                        principalTable: "AgencijaOpsta",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PodTipovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    cena = table.Column<int>(type: "int", nullable: false),
                    tipStvariID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PodTipovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PodTipovi_TipoviStvari_tipStvariID",
                        column: x => x.tipStvariID,
                        principalTable: "TipoviStvari",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipKorsinika = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    PhotoFileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FKlijent = table.Column<bool>(type: "bit", nullable: false),
                    FAdministrator = table.Column<bool>(type: "bit", nullable: false),
                    FVlanikAgencije = table.Column<bool>(type: "bit", nullable: false),
                    FAdministracijaAgencije = table.Column<bool>(type: "bit", nullable: false),
                    FRadnik = table.Column<bool>(type: "bit", nullable: false),
                    FRadnikPregled = table.Column<bool>(type: "bit", nullable: false),
                    plata = table.Column<int>(type: "int", nullable: false),
                    ForeignKeyNV = table.Column<int>(type: "int", nullable: false),
                    recenzijaZaAngenciju = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ocena = table.Column<int>(type: "int", nullable: false),
                    timRadnikaID = table.Column<int>(type: "int", nullable: true),
                    korsinikAgencijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Korisnici_AgencijaOpsta_korsinikAgencijaID",
                        column: x => x.korsinikAgencijaID,
                        principalTable: "AgencijaOpsta",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Korisnici_TimRadnika_timRadnikaID",
                        column: x => x.timRadnikaID,
                        principalTable: "TimRadnika",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TimMeseci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    timID = table.Column<int>(type: "int", nullable: true),
                    mesecID = table.Column<int>(type: "int", nullable: true),
                    brojSelidbi = table.Column<int>(type: "int", nullable: false),
                    prihod = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimMeseci", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TimMeseci_Meseci_mesecID",
                        column: x => x.mesecID,
                        principalTable: "Meseci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimMeseci_TimRadnika_timID",
                        column: x => x.timID,
                        principalTable: "TimRadnika",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pregled",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    datum = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    vreme = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    adresa = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true),
                    longitude = table.Column<double>(type: "float", nullable: false),
                    latitude = table.Column<double>(type: "float", nullable: false),
                    status = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    pregledRadnikID = table.Column<int>(type: "int", nullable: true),
                    klijentID = table.Column<int>(type: "int", nullable: true),
                    pregeldAgencijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pregled", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Pregled_AgencijaOpsta_pregeldAgencijaID",
                        column: x => x.pregeldAgencijaID,
                        principalTable: "AgencijaOpsta",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pregled_Korisnici_klijentID",
                        column: x => x.klijentID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pregled_Korisnici_pregledRadnikID",
                        column: x => x.pregledRadnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Selidbe",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    adresaOd = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    adresaDo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    datum = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    cena = table.Column<double>(type: "float", nullable: false),
                    tipSelidbe = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    komentarSelidba = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    recenzijaSelidba = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ocena = table.Column<int>(type: "int", nullable: false),
                    klijentID = table.Column<int>(type: "int", nullable: true),
                    timRadnikaID = table.Column<int>(type: "int", nullable: true),
                    pregledID = table.Column<int>(type: "int", nullable: true),
                    selidbaAgendijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Selidbe", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Selidbe_AgencijaOpsta_selidbaAgendijaID",
                        column: x => x.selidbaAgendijaID,
                        principalTable: "AgencijaOpsta",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Selidbe_Korisnici_klijentID",
                        column: x => x.klijentID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Selidbe_Pregled_pregledID",
                        column: x => x.pregledID,
                        principalTable: "Pregled",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Selidbe_TimRadnika_timRadnikaID",
                        column: x => x.timRadnikaID,
                        principalTable: "TimRadnika",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Prostorije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ilustracija = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    komentar = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    selidbaID = table.Column<int>(type: "int", nullable: true),
                    tipProstorijeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prostorije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Prostorije_Selidbe_selidbaID",
                        column: x => x.selidbaID,
                        principalTable: "Selidbe",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Prostorije_TipoviProstorije_tipProstorijeID",
                        column: x => x.tipProstorijeID,
                        principalTable: "TipoviProstorije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stvari",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kolicina = table.Column<int>(type: "int", nullable: false),
                    visina = table.Column<double>(type: "float", nullable: false),
                    sirina = table.Column<double>(type: "float", nullable: false),
                    dubina = table.Column<double>(type: "float", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cena = table.Column<double>(type: "float", nullable: false),
                    prostorijaID = table.Column<int>(type: "int", nullable: true),
                    jedinicaMereID = table.Column<int>(type: "int", nullable: true),
                    podtipID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stvari", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Stvari_JedinicaMere_jedinicaMereID",
                        column: x => x.jedinicaMereID,
                        principalTable: "JedinicaMere",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stvari_PodTipovi_podtipID",
                        column: x => x.podtipID,
                        principalTable: "PodTipovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stvari_Prostorije_prostorijaID",
                        column: x => x.prostorijaID,
                        principalTable: "Prostorije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Korisnici_korsinikAgencijaID",
                table: "Korisnici",
                column: "korsinikAgencijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Korisnici_timRadnikaID",
                table: "Korisnici",
                column: "timRadnikaID");

            migrationBuilder.CreateIndex(
                name: "IX_PodTipovi_tipStvariID",
                table: "PodTipovi",
                column: "tipStvariID");

            migrationBuilder.CreateIndex(
                name: "IX_Pregled_klijentID",
                table: "Pregled",
                column: "klijentID");

            migrationBuilder.CreateIndex(
                name: "IX_Pregled_pregeldAgencijaID",
                table: "Pregled",
                column: "pregeldAgencijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Pregled_pregledRadnikID",
                table: "Pregled",
                column: "pregledRadnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Prostorije_selidbaID",
                table: "Prostorije",
                column: "selidbaID");

            migrationBuilder.CreateIndex(
                name: "IX_Prostorije_tipProstorijeID",
                table: "Prostorije",
                column: "tipProstorijeID");

            migrationBuilder.CreateIndex(
                name: "IX_Selidbe_klijentID",
                table: "Selidbe",
                column: "klijentID");

            migrationBuilder.CreateIndex(
                name: "IX_Selidbe_pregledID",
                table: "Selidbe",
                column: "pregledID");

            migrationBuilder.CreateIndex(
                name: "IX_Selidbe_selidbaAgendijaID",
                table: "Selidbe",
                column: "selidbaAgendijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Selidbe_timRadnikaID",
                table: "Selidbe",
                column: "timRadnikaID");

            migrationBuilder.CreateIndex(
                name: "IX_Stvari_jedinicaMereID",
                table: "Stvari",
                column: "jedinicaMereID");

            migrationBuilder.CreateIndex(
                name: "IX_Stvari_podtipID",
                table: "Stvari",
                column: "podtipID");

            migrationBuilder.CreateIndex(
                name: "IX_Stvari_prostorijaID",
                table: "Stvari",
                column: "prostorijaID");

            migrationBuilder.CreateIndex(
                name: "IX_TimMeseci_mesecID",
                table: "TimMeseci",
                column: "mesecID");

            migrationBuilder.CreateIndex(
                name: "IX_TimMeseci_timID",
                table: "TimMeseci",
                column: "timID");

            migrationBuilder.CreateIndex(
                name: "IX_TimRadnika_timRadnikaAgencijaID",
                table: "TimRadnika",
                column: "timRadnikaAgencijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stvari");

            migrationBuilder.DropTable(
                name: "TimMeseci");

            migrationBuilder.DropTable(
                name: "ZauzetiTermini");

            migrationBuilder.DropTable(
                name: "ZauzetiTerminiSelidba");

            migrationBuilder.DropTable(
                name: "JedinicaMere");

            migrationBuilder.DropTable(
                name: "PodTipovi");

            migrationBuilder.DropTable(
                name: "Prostorije");

            migrationBuilder.DropTable(
                name: "Meseci");

            migrationBuilder.DropTable(
                name: "TipoviStvari");

            migrationBuilder.DropTable(
                name: "Selidbe");

            migrationBuilder.DropTable(
                name: "TipoviProstorije");

            migrationBuilder.DropTable(
                name: "Pregled");

            migrationBuilder.DropTable(
                name: "Korisnici");

            migrationBuilder.DropTable(
                name: "TimRadnika");

            migrationBuilder.DropTable(
                name: "AgencijaOpsta");
        }
    }
}
