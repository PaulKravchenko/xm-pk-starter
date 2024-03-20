using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Sitecore.Security.Accounts;
using Sitecore.SecurityModel;

namespace XmCloudSXAStarter.Controllers.Api
{
    [RoutePrefix("api/users")]
    public class UserApiController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetUsers()
        {
            var usersNames = new List<string>();

            using (new SecurityDisabler())
            {
                var users = UserManager.GetUsers();
                usersNames = users.Select(u => u.Name).ToList();
            }

            return Json(usersNames);
        }
    }
}