using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApiDemo.Models
{
    public class ApiResponse<X>
    {
        public bool Success { get; protected set; }
        public X Data { get; protected set; }
        public string Message { get; protected set; }

        protected ApiResponse() { }

        public static ApiResponse<X> Ok(X data)
        {
            return new ApiResponse<X> { Data = data, Success = true };
        }

        public static ApiResponse<X> Fail(string message)
        {
            return new ApiResponse<X> { Message = message };
        }
    }
}