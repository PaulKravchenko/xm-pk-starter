using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XmCloudSXAStarter.Models
{
    public class UserModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string[] Roles { get; set; }        
    }
}