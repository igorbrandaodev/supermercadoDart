using SupermercadoDart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SupermercadoDart.Repository
{
    public class UserRepository
    {
        private readonly dbSupermercadoDartContext _context;

        public UserRepository(dbSupermercadoDartContext context)
        {
            _context = context;
        }


        public Usuario GetByLogin(string login)
        {
            return _context.Usuario
                    .SingleOrDefault(p => p.Email.Equals(login));
        }
    }
}
