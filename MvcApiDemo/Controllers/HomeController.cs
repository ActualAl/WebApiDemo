using MvcApiDemo.Models;
using MvcApiDemoCore;
using MvcApiDemoRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApiDemo.Controllers
{
    public class HomeController : Controller
    {
        public ICustomerRepository CustomerRespository {get; internal set;}

        /// <summary>
        /// HomeController: In production inject repository dependency (Ninject is good!)
        /// </summary>
        public HomeController()
        {
            var repository = new CustomerRespository();
            CustomerRespository = repository;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetCustomers()
        {
            return Json(ApiResponse<Object>.Fail("badness"), JsonRequestBehavior.AllowGet);
            var customers = CustomerRespository.All();
            return Json(ApiResponse<IQueryable<Customer>>.Ok(customers), JsonRequestBehavior.AllowGet);
        }
    }
}
