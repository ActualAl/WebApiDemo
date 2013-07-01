using MvcApiDemoCore;
using MvcApiDemoRepository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebFormsApiDemo.Api
{
    public class CustomersController : ApiController
    {
        public ICustomerRepository CustomerRepository { get; internal set; }

        public CustomersController()
        {
            CustomerRepository = new CustomerRespository();
        }

        // GET api/<controller>
        public IEnumerable<Customer> Get()
        {
            return CustomerRepository.All();
        }

        // GET api/<controller>/5
        public Customer Get(int id)
        {
            var c = CustomerRepository.ById(id);
            if (c == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return c;
        }

        // POST api/<controller>
        public HttpResponseMessage Post([FromBody]Customer customer)
        {
            if (customer == null)
            {
                var httpError = new HttpError("customer is null");
                var errorResponse = Request.CreateErrorResponse((HttpStatusCode)422, httpError);
                throw new HttpResponseException(errorResponse);
            }
            if (!ModelState.IsValid)
            {
                var httpError = new HttpError(ModelState, true);
                var errorResponse = Request.CreateErrorResponse((HttpStatusCode)422, httpError);
                throw new HttpResponseException(errorResponse); //Rails now uses 422
            }
            customer = CustomerRepository.Add(customer);
            var response = Request.CreateResponse<Customer>(HttpStatusCode.Created, customer);
            string uri = Url.Link("DefaultApi", new { id = customer.Id });
            response.Headers.Location = new Uri(uri);
            return response;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}