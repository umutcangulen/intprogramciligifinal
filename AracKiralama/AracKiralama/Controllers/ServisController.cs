using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AracKiralama.ViewModel;
using AracKiralama.Models;

namespace AracKiralama.Controllers
{
    public class ServisController : ApiController
    {
        AracKiralamDBEntities db = new AracKiralamDBEntities();
        SonucModel sonuc = new SonucModel();

        #region Kiralayan
        [HttpGet]
        [Route("api/kiralayanliste")]
        public List<KiralayanModel> KiralayanListe()
        {
            List<KiralayanModel> liste = db.Kiralayan.Select(x => new KiralayanModel()
            {
                kiralayanId = x.kiralayanId,
                kiralayanAd = x.kiralayanAd,
                kiralayanSoyad = x.kiralayanSoyad,
                kiralayanAdres = x.kiralayanAdres,
                kiralayanTelefon = x.kiralayanTelefon,
             
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/KiralayanById/{kiralayanId}")]
        public KiralayanModel KiralayanById(string kiralayanId)
        {
            KiralayanModel kayit = db.Kiralayan.Where(s => s.kiralayanId == kiralayanId).Select(x => new KiralayanModel()
            {
                kiralayanId = x.kiralayanId,
                kiralayanAd = x.kiralayanAd,
                kiralayanSoyad = x.kiralayanSoyad,
                kiralayanAdres = x.kiralayanAdres,
                kiralayanTelefon = x.kiralayanTelefon,
            }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/kiralayanekle")]
        public SonucModel KiralayanEkle(KiralayanModel model)
        {
            if (db.Kiralayan.Count(s => s.kiralayanTelefon == model.kiralayanTelefon) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kiralayan Kişi Telefon Numarası Kayıtlıdır!";
                return sonuc;
            }

            Kiralayan yeni = new Kiralayan();
            yeni.kiralayanId = Guid.NewGuid().ToString();
            yeni.kiralayanAdres = model.kiralayanAdres;
            yeni.kiralayanAd = model.kiralayanAd;
            yeni.kiralayanSoyad = model.kiralayanSoyad;
            yeni.kiralayanTelefon = model.kiralayanTelefon;
            db.Kiralayan.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kiralayan Kişi Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kiralayanduzenle")]
        public SonucModel KiralayanDuzenle(KiralayanModel model)
        {
            Kiralayan kayit = db.Kiralayan.Where(s => s.kiralayanId == model.kiralayanId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.kiralayanAdres = model.kiralayanAdres;
            kayit.kiralayanAd = model.kiralayanAd;
            kayit.kiralayanSoyad = model.kiralayanSoyad;
            kayit.kiralayanTelefon = model.kiralayanTelefon;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kiralayan Kişi Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/kiralayansil/{kiralayanId}")]
        public SonucModel KiralayanSil(string kiralayanId)
        {
            Kiralayan kayit = db.Kiralayan.Where(s => s.kiralayanId == kiralayanId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }


            db.Kiralayan.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kiralayan Kişi Silindi";
            return sonuc;
        }
        #endregion

        #region Musteri
        [HttpGet]
        [Route("api/musteriListe")]
        public List<MusteriModel> MusteriListe()
        {
            List<MusteriModel> liste = db.Musteri.Select(x => new MusteriModel()
            {
                musteriId = x.musteriId,
                musteriAd = x.musteriAd,
                musteriSoyad = x.musteriSoyad,
                musteriAdres = x.musteriAdres,
                musteriTelefon = x.musteriTelefon
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/musteribyid/{musteriId}")]
        public MusteriModel MusteriById(string musteriId)
        {
            MusteriModel kayit = db.Musteri.Where(s => s.musteriId == musteriId).Select(x => new MusteriModel()
            {
                musteriId = x.musteriId,
                musteriAd = x.musteriAd,
                musteriSoyad = x.musteriSoyad,
                musteriAdres = x.musteriAdres,
                musteriTelefon = x.musteriTelefon
            }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/musteriekle")]
        public SonucModel MusteriEkle(MusteriModel model)
        {
            if (db.Musteri.Count(s => s.musteriTelefon == model.musteriTelefon) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Müşteri Sisteme Kayıtlıdır!";
                return sonuc;
            }

            Musteri yeni = new Musteri();
            yeni.musteriId = Guid.NewGuid().ToString();
            yeni.musteriAd = model.musteriAd;
            yeni.musteriSoyad = model.musteriSoyad;
            yeni.musteriAdres = model.musteriAdres;
            yeni.musteriTelefon = model.musteriTelefon;
            db.Musteri.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Müşteri Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/musteriduzenle")]
        public SonucModel MusteriDuzenle(MusteriModel model)
        {
            Musteri kayit = db.Musteri.Where(s => s.musteriId == model.musteriId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.musteriAd = model.musteriAd;
            kayit.musteriSoyad = model.musteriSoyad;
            kayit.musteriAdres = model.musteriAdres;
            kayit.musteriTelefon = model.musteriTelefon;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Müşteri Bilgileri Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/musterisil/{musteriId}")]
        public SonucModel MusteriSil(string musteriId)
        {
            Musteri kayit = db.Musteri.Where(s => s.musteriId == musteriId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }


            db.Musteri.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Müşteri Silindi";
            return sonuc;
        }
        #endregion

        #region Arac

        [HttpGet]
        [Route("api/aracliste")]
        public List<AracModel> AracListe()
        {
            List<AracModel> liste = db.Arac.Select(x => new AracModel()
            {
                aracId = x.aracId,
                aracKiralayanId = x.aracKiralayanId,
                aracKiraUcret = x.aracKiraUcret,
                aracMarka = x.aracMarka,
                aracPlaka = x.aracPlaka,
                aracRenk = x.aracRenk
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/aracbyid/{aracId}")]
        public AracModel AracById(string aracId)
        {
            AracModel kayit = db.Arac.Where(s => s.aracId == aracId).Select(x => new AracModel()
            {
                aracId = x.aracId,
                aracKiralayanId = x.aracKiralayanId,
                aracKiraUcret = x.aracKiraUcret,
                aracMarka = x.aracMarka,
                aracPlaka = x.aracPlaka,
                aracRenk = x.aracRenk
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/aracekle")]
        public SonucModel AracEkle(AracModel model)
        {
            if (db.Arac.Count(s => s.aracPlaka == model.aracPlaka) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Plaka Numaralı Araç Kayıtlıdır!";
                return sonuc;
            }

            Arac yeni = new Arac();
            yeni.aracId = Guid.NewGuid().ToString();
            yeni.aracKiralayanId = model.aracKiralayanId;
            yeni.aracKiraUcret = model.aracKiraUcret;
            yeni.aracMarka = model.aracMarka;
            yeni.aracPlaka = model.aracPlaka;
            yeni.aracRenk = model.aracRenk;
            db.Arac.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Eklendi";
            return sonuc;
        }


        [HttpPut]
        [Route("api/aracduzenle")]
        public SonucModel AracDuzenle(AracModel model)
        {
            Arac kayit = db.Arac.Where(s => s.aracId == model.aracId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.aracKiralayanId = model.aracKiralayanId;
            kayit.aracKiraUcret = model.aracKiraUcret;
            kayit.aracMarka = model.aracMarka;
            kayit.aracPlaka = model.aracPlaka;
            kayit.aracRenk = model.aracRenk;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Bilgileri Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/aracsil/{aracId}")]
        public SonucModel AracSil(string aracId)
        {
            Arac kayit = db.Arac.Where(s => s.aracId == aracId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Arac.Count(s => s.aracId == aracId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Üzerinde Kira Kaydı Olduğu İçin Araç Silinemez!";
                return sonuc;
            }

            db.Arac.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Silindi";
            return sonuc;
        }
        #endregion

        #region Kira

        [HttpGet]
        [Route("api/kiraliste")]
        public List<KiraModel> KiraListe()
        {
            List<KiraModel> liste = db.Kira.Select(x => new KiraModel()
            {
                kiraId = x.kiraId,
                kiraAracId = x.kiraAracId,
                kiraMusteriId = x.kiraMusteriId,
                kiraBaslangic = x.kiraBaslangic,
                kiraBitis = x.kiraBitis,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kiraaracliste/{aracId}")]
        public List<KiraModel> KiraAracListe(string aracId)
        {
            List<KiraModel> liste = db.Kira.Where(s => s.kiraAracId == aracId).Select(x => new KiraModel()
            {
                kiraId = x.kiraId,
                kiraAracId = x.kiraAracId,
                kiraMusteriId = x.kiraMusteriId,
                kiraBaslangic = x.kiraBaslangic,
                kiraBitis = x.kiraBitis

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.aracBilgi = AracById(kayit.kiraAracId);
                kayit.musteriBilgi = MusteriById(kayit.kiraMusteriId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/kiramusteriliste/{musteriId}")]
        public List<KiraModel> KiraMusteriListe(string musteriId)
        {
            List<KiraModel> liste = db.Kira.Where(s => s.kiraMusteriId == musteriId).Select(x => new KiraModel()
            {
                kiraId = x.kiraId,
                kiraAracId = x.kiraAracId,
                kiraMusteriId = x.kiraMusteriId,
                kiraBaslangic = x.kiraBaslangic,
                kiraBitis = x.kiraBitis

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.aracBilgi = AracById(kayit.kiraAracId);
                kayit.musteriBilgi = MusteriById(kayit.kiraMusteriId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/kiraekle")]
        public SonucModel KiraEkle(KiraModel model)
        {
            if (db.Kira.Count(s => s.kiraAracId == model.kiraAracId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Araç Daha Önce Kiralanmıştır!";
                return sonuc;
            }

            Kira yeni = new Kira();
            yeni.kiraId = Guid.NewGuid().ToString();
            yeni.kiraAracId = model.kiraAracId;
            yeni.kiraMusteriId = model.kiraMusteriId;
            yeni.kiraBaslangic = model.kiraBaslangic;
            yeni.kiraBitis = model.kiraBitis;
            db.Kira.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Kira Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kirasil/{kiraId}")]
        public SonucModel KiraSil(string kiraId)
        {
            Kira kayit = db.Kira.Where(s => s.kiraId == kiraId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Kira.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kira Kaydı Silindi";
            return sonuc;
        }
        #endregion
    }
}
