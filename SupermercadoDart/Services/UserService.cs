using SupermercadoDart.Models;
using SupermercadoDart.Repository;
using SupermercadoDart.Security;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace SupermercadoDart.Services
{
    public class UserService
    {
        private UserRepository _repository;
        private SigningConfiguration _signingConfiguration;
        private TokenConfiguration _tokenConfiguration;
        private IDistributedCache _cache;

        private Usuario baseUser;

        public UserService(UserRepository repository, SigningConfiguration signingConfiguration, TokenConfiguration tokenConfiguration, IDistributedCache cache)
        {
            _repository = repository;
            _signingConfiguration = signingConfiguration;
            _tokenConfiguration = tokenConfiguration;
            _cache = cache;
        }

        public object GetByLogin(AccessCredentials credentials)
        {
            bool credentialsIsValid = false;

            if (credentials != null && !string.IsNullOrWhiteSpace(credentials.UserID))
            {
                if (credentials.GrantType == "password")
                {
                    //converte em base64
                    var plainTextBytes = Encoding.UTF8.GetBytes(credentials.AccessKey);
                    string encodedText = Convert.ToBase64String(plainTextBytes);

                    credentials.AccessKey = encodedText;

                    baseUser = _repository.GetByLogin(credentials.UserID);
                    credentialsIsValid = (baseUser != null && credentials.UserID == baseUser.Email && credentials.AccessKey == baseUser.Senha);

                }

                // Para utilizar o refresh token, é necessário utilizar uma base de dados para cache, como o Reddis
                /*
                else if (credentials.GrantType == "refresh_token")
                {
                    if (!String.IsNullOrWhiteSpace(credentials.RefreshToken))
                    {
                        baseUser = _repository.GetByLogin(credentials.UserID);

                        RefreshTokenData refreshTokenBase = null;

                        string strTokenArmazenado =
                            _cache.GetString(credentials.RefreshToken);
                        if (!String.IsNullOrWhiteSpace(strTokenArmazenado))
                        {
                            refreshTokenBase = JsonConvert
                                .DeserializeObject<RefreshTokenData>(strTokenArmazenado);
                        }

                        credentialsIsValid = (refreshTokenBase != null &&
                            credentials.UserID == refreshTokenBase.UserID &&
                            credentials.RefreshToken == refreshTokenBase.RefreshToken);

                        // Elimina o token de refresh já que um novo será gerado
                        if (credentialsIsValid)
                            _cache.Remove(credentials.RefreshToken);

                    }

                }
                */


            }
            if (credentialsIsValid)
            {
                ClaimsIdentity identity = new ClaimsIdentity(
                    new GenericIdentity(credentials.UserID, "Login"),
                        new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                            new Claim(JwtRegisteredClaimNames.Sub, baseUser.Nome),
                            new Claim(JwtRegisteredClaimNames.Sid, baseUser.Id.ToString())
                        }
                    );

                DateTime createDate = DateTime.Now;
                DateTime expirationDate = createDate + TimeSpan.FromSeconds(_tokenConfiguration.Seconds);

                // Calcula o tempo máximo de validade do refresh token
                // (o mesmo será invalidado automaticamente pelo Redis)
                TimeSpan finalExpiration = TimeSpan.FromSeconds(_tokenConfiguration.FinalExpiration);

                var handler = new JwtSecurityTokenHandler();
                string token = CreateToken(identity, createDate, expirationDate, handler);

                return SuccessObject(createDate, expirationDate, token, credentials, finalExpiration);
            }
            else
            {
                return ExceptionObject();
            }
        }

        private string CreateToken(ClaimsIdentity identity, DateTime createDate, DateTime expirationDate, JwtSecurityTokenHandler handler)
        {
            var securityToken = handler.CreateToken(new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
            {
                Issuer = _tokenConfiguration.Issuer,
                Audience = _tokenConfiguration.Audience,
                SigningCredentials = _signingConfiguration.SigningCredentials,
                Subject = identity,
                NotBefore = createDate,
                Expires = expirationDate,
            });

            var token = handler.WriteToken(securityToken);
            return token;
        }

        private object ExceptionObject()
        {
            return new
            {
                autenticated = false,
                message = "Failed to autheticate"
            };
        }

        private object SuccessObject(DateTime createDate, DateTime expirationDate, string token, AccessCredentials credentials, TimeSpan finalExpiration)
        {
            var resultado = new
            {
                autenticated = true,
                created = createDate.ToString("yyyy-MM-dd HH:mm:ss"),
                expiration = expirationDate.ToString("yyyy-MM-dd HH:mm:ss"),
                accessToken = token,
                refreshToken = Guid.NewGuid().ToString().Replace("-", String.Empty),
                message = "OK"
            };

            // Armazena o refresh token em cache através do Redis 
            var refreshTokenData = new RefreshTokenData();
            refreshTokenData.RefreshToken = resultado.refreshToken;
            refreshTokenData.UserID = credentials.UserID;

            DistributedCacheEntryOptions opcoesCache =
                new DistributedCacheEntryOptions();
            opcoesCache.SetAbsoluteExpiration(finalExpiration);
            _cache.SetString(resultado.refreshToken,
                JsonConvert.SerializeObject(refreshTokenData),
                opcoesCache);

            return resultado;
        }


    }
}
