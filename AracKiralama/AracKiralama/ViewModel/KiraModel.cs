using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracKiralama.ViewModel
{
    public class KiraModel
    {
        public string kiraId { get; set; }
        public string kiraAracId { get; set; }
        public string kiraMusteriId { get; set; }
        public string kiraBaslangic { get; set; }
        public string kiraBitis { get; set; }
        public string kiraAracPlaka { get; set; }



        public AracModel aracBilgi { get; set; }
        public MusteriModel musteriBilgi { get; set; }

    }
}