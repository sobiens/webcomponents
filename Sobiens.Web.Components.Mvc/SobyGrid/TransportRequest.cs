using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sobiens.Web.Components.Mvc.SobyGrid
{
    public class TransportRequest
    {
        public string Url {get;set;}
        public string DataType {get;set;}
        public string ContentType {get;set;}
        public string Type {get;set;}

        public TransportRequest(string url, string dataType, string contentType, string type)
        {
            this.Url = url;
            this.DataType = dataType;
            this.ContentType = contentType;
            this.Type = type;
        }
    }
}
