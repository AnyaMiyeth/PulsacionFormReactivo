using Entity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebPulsaciones.Config;
using WebPulsaciones.Models;

namespace WebPulsaciones.Service
{
    
    public class JwtService 
    {
       

        private readonly AppSetting _appSettings;

        public JwtService(IOptions<AppSetting> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public LoginViewModel GenerateToken(User user)
        {
            // return null if user not found
            if (user == null)
                return null;

            var userResponse = new LoginViewModel() { FirstName = user.FirstName, LastName = user.LastName, Username = user.UserName };

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString()),
                    new Claim(ClaimTypes.MobilePhone, user.MobilePhone.ToString()),
                    new Claim(ClaimTypes.Role, "Rol1"),
                    new Claim(ClaimTypes.Role, "Rol2"),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userResponse.Token = tokenHandler.WriteToken(token);

            return userResponse;
        }
        
    }
}
