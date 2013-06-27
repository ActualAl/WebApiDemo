using MvcApiDemoCore;
using MvcApiDemoRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace MvcApiDemo.Api
{
    public class CustomersController : ApiController
    {
        public ICustomerRepository CustomerRespository { get; internal set; }

        public CustomersController()
        {
            CustomerRespository = new CustomerRespository();
        }
        
        public IEnumerable<Customer> GetAllCustomers()
        {
            return CustomerRespository.All();
        }

        public Customer GetCustomerById(int id)
        {
            var c = CustomerRespository.ById(id);
            if (c == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return c;
        }

        public HttpResponseMessage DeleteCustomer(int id)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage PostCustomer(Customer item)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            item = CustomerRespository.Add(item);
            var response = Request.CreateResponse<Customer>(HttpStatusCode.Created, item);
            string uri = Url.Link("DefaultApi", new { id = item.Id });
            response.Headers.Location = new Uri(uri);
            return response;
        }
    }
}
