using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Routing;

namespace MvcApiDemo
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.AddHttpRoutes();
        }

        private static List<Route> GetRoutes()
        {
            return new List<Route>
            {
                new Route("DefaultApi", "api/{controller}/{id}", new { id = RouteParameter.Optional })
            };
        }

        public static void AddHttpRoutes(this HttpRouteCollection routeCollection)
        {
            GetRoutes().ForEach(route => routeCollection.MapHttpRoute(route.Name, route.RouteTemplate, route.Defaults));
        }

        private static void AddHttpRoutes(this RouteCollection routeCollection)
        {
            GetRoutes().ForEach(route => routeCollection.MapHttpRoute(route.Name, route.RouteTemplate, route.Defaults));
        }

        private class Route
        {
            public string Name { get; set; }
            public string RouteTemplate { get; set; }
            public object Defaults { get; set; }

            public Route(string name, string routeTemplate, object defaults)
            {
                this.Name = name;
                this.RouteTemplate = routeTemplate;
                this.Defaults = defaults;
            }
        }
    }


}
