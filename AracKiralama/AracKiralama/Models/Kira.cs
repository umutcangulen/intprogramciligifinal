//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AracKiralama.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Kira
    {
        public string kiraId { get; set; }
        public string kiraAracId { get; set; }
        public string kiraMusteriId { get; set; }
        public string kiraBaslangic { get; set; }
        public string kiraBitis { get; set; }
        public string kiraAracPlaka { get; set; }
    
        public virtual Arac Arac { get; set; }
        public virtual Musteri Musteri { get; set; }
    }
}
