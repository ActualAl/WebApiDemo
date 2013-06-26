using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MvcApiDemoCore;

namespace MvcApiDemoRepository
{
    public class CustomerRespository : ICustomerRepository
    {
        private readonly List<Customer> fakeCustomers = new List<Customer>
        {
            new Customer { Forename = "David", Surname = "Starsky", Title = "Mr", DateOfBirth = new DateTime(1943, 3, 25) },
            new Customer { Forename = "Kenneth", Surname = "Hutch", Title = "Mr", DateOfBirth = new DateTime(1943, 8, 28) },
            new Customer { Forename = "Huggy", Surname = "Bear", Title = "Dr", DateOfBirth = new DateTime(1946, 8, 14) }
        };

        public IQueryable<Customer> All()
        {
            return fakeCustomers.AsQueryable();
        }

        public Customer ById(int id)
        {
            return fakeCustomers.FirstOrDefault(x => x.Id == id);
        }
    }
    
}
