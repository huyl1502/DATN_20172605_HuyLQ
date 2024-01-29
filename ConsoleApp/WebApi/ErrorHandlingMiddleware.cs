using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Newtonsoft.Json;
using SharedComponent.Models.System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApi
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                await next(context);
            }
            catch (MyException ex)
            {
                var response = new
                {
                    Message = ex.Msg,
                };
                var json = JsonConvert.SerializeObject(response);
                context.Response.StatusCode = ex.StatusCode;
                await context.Response.WriteAsync(json);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    Message = ex.Message,
                };
                var json = JsonConvert.SerializeObject(response);
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync(json);
            }
        }
    }
}
