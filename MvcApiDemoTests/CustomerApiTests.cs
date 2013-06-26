using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.SelfHost;
using MvcApiDemo;
using System.Threading;
using System.Net;
using MvcApiDemoCore;

namespace MvcApiDemoTests
{
    [TestClass]
    public class CustomerApiTests
    {
        private HttpClient _client;
        private HttpServer _server;

        [TestInitialize]
        public void Setup()
        {
            var config = new HttpConfiguration();
            config.Routes.AddHttpRoutes();
            config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
            _server = new HttpServer(config);
            _client = new HttpClient(_server);
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        [TestCleanup]
        public void TearDown()
        {
            _server.Dispose();
            _client.Dispose();
        }

        [TestMethod]
        public void GivenUrlOfApiSlashCustomers_WhenApiCalled_Returns200()
        {
            //Given
            var url = "http://tests.com/api/customers";
            var request = new HttpRequestMessage { RequestUri = new Uri(url), Method = HttpMethod.Get };

            //When 
            HttpResponseMessage response = _client.SendAsync(request, new CancellationTokenSource().Token).Result;
            var result = (EnumerableQuery<Customer>)response.Content.ReadAsAsync<object>().Result;

            //Then
            Assert.AreEqual(3, result.Count());
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
