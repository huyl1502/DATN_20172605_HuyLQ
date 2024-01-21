using Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using SharedComponent.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController : ControllerBase
    {
        IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        AccountCollection _accCollection = new AccountCollection();
        UserDTO _response = new UserDTO();

        string GetToken(Account acc)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()),
                new Claim("UserId", acc.Id),
                new Claim("UserName", acc.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signIn
                );

            string Token = new JwtSecurityTokenHandler().WriteToken(token);
            return Token;
        }

        [HttpPost]
        [Route("Login")]
        public UserDTO Login(UserDTO dtqRequest)
        {
            var accountView = dtqRequest.Account;
            if (accountView != null)
            {
                var accountDb = _accCollection.getAccount_ByUserName(accountView.UserName);
                if(accountView.PassWord != accountDb.PassWord)
                {
                    throw new Exception("Thông tin đăng nhập không hợp lệ");
                }
                else
                {
                    var rs = accountView;
                    rs.PassWord = null;
                    rs.AccessToken = GetToken(accountDb);

                    _response.Account = rs;
                    return _response;
                }
            }
            throw new Exception("Thông tin đăng nhập không hợp lệ");
        }
    }
}
