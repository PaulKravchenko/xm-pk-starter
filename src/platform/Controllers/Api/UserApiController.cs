using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Sitecore.Security.Accounts;
using Sitecore.SecurityModel;
using XmCloudSXAStarter.Models;

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

        [HttpPost]
        [Route("create")]
        public IHttpActionResult CreateUser([FromBody] UserModel userModel)
        {
            using (new SecurityDisabler())
            {                
                if (!Sitecore.Security.Accounts.User.Exists(userModel.Name))
                {
                    var user = Sitecore.Security.Accounts.User.Create(userModel.Name, "Password12345!");
                    foreach (var role in userModel.Roles)
                    {
                        if (Role.Exists(role))
                        {
                            user.Roles.Add(Role.FromName(role));
                        }
                    }
                }
            }

            return Json("OK");
        }
    }
}