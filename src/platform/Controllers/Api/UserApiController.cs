using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Sitecore.Security.Accounts;
using Sitecore.SecurityModel;
using XmCloudSXAStarter.Models;
using Newtonsoft.Json;

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
            if (userModel == null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "Body JSON is empty");
            }
            if (string.IsNullOrEmpty(userModel.Name))
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "Body JSON misses user's name");
            }
            var warnings = new List<string>();
            using (new SecurityDisabler())
            {                
                if (!Sitecore.Security.Accounts.User.Exists(userModel.Name))
                {
                    var user = Sitecore.Security.Accounts.User.Create(userModel.Name, "Password12345!");
                    if (user != null)
                    {
                        if (string.IsNullOrEmpty(userModel.FullName))
                        {
                            warnings.Add("Body JSON misses user's FullName");
                        }
                        else
                        {
                            user.Profile.FullName = userModel.FullName;
                        }

                        if (string.IsNullOrEmpty(userModel.Email))
                        {
                            warnings.Add("Body JSON misses user's Email");
                        }
                        else
                        {
                            user.Profile.Email = userModel.Email;
                        }

                        if (!userModel.Roles.Any())
                        {
                            warnings.Add("Body JSON misses roles collection");
                        }
                        foreach (var role in userModel.Roles)
                        {
                            if (Role.Exists(role))
                            {
                                user.Roles.Add(Role.FromName(role));
                            }
                        }
                    }
                    else
                    {
                        return Content(System.Net.HttpStatusCode.Conflict, $"User with name '{userModel.Name}' already exists");
                    }
                }
            }

            var responseModel = new ResponseModel();

            if (warnings.Any())
            {
                responseModel.Message = "User was created with some warnings";
                responseModel.Warnings = warnings.ToArray();

            }
            else 
            {
                responseModel.Message = "User was successfully created";
            }

            return Content(System.Net.HttpStatusCode.Created, JsonConvert.SerializeObject(responseModel));
        }
    }
}