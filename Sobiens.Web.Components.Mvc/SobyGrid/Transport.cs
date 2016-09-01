using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sobiens.Web.Components.Mvc.SobyGrid
{
    public class Transport
    {
        internal TransportRequest Read = null;
        internal TransportRequest Add = null;
        internal TransportRequest Update = null;
        internal TransportRequest Delete = null;
        public void SetRead(string url, string dataType, string contentType, string type){
            this.Read = new TransportRequest(url, dataType, contentType, type);
        }
        public void SetAdd(string url, string dataType, string contentType, string type)
        {
            this.Add = new TransportRequest(url, dataType, contentType, type);
        }
        public void SetUpdate(string url, string dataType, string contentType, string type)
        {
            this.Update = new TransportRequest(url, dataType, contentType, type);
        }
        public void SetDelete(string url, string dataType, string contentType, string type)
        {
            this.Delete = new TransportRequest(url, dataType, contentType, type);
        }

    }
}
