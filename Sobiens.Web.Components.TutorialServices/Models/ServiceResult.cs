using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Sobiens.Web.Components.TutorialServices.Models
{
    [DataContract]
    public class ServiceResult<T>
    {
        public ServiceResult(T data)
        {
            this.Data = data;
            this.Succeed = true;
            this.NextPageExist = false;
        }

        [DataMember]
        public T Data { get; set; }

        [DataMember]
        public bool Succeed { get; set; }

        [DataMember]
        public string ErrorMessage { get; set; }

        [DataMember]
        public bool NextPageExist { get; set; }
    }
}