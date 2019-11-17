using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SupermercadoDart.Models;
using SupermercadoDart.Security;
using SupermercadoDart.Controllers;
using SupermercadoDart.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiLaurentiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserService _service;

        public LoginController(UserService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public object Post([FromBody]AccessCredentials credentials)
        {
            if (credentials == null) return BadRequest();
            return _service.GetByLogin(credentials);
        }
    }
}