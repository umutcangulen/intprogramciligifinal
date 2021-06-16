using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracKiralama.ViewModel
{
    public class AracModel
    {
        public string aracId { get; set; }
        public string aracPlaka { get; set; }
        public string aracRenk { get; set; }
        public int aracKiraUcret { get; set; }
        public string aracMarka { get; set; }
        public string aracKiralayanId { get; set; }
    }
}