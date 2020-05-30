using Datos;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Entity;

namespace Logica
{

   public class UserService
    {
        private readonly PulsacionesContext _context;
        public UserService(PulsacionesContext context)
        { 
            _context = context;
        }

        public User Validate(string usuario, string password) {
            return _context.Users.Where(u => u.UserName == usuario && u.Password == password && u.Estado== "AC").FirstOrDefault();
        }


    }
}
