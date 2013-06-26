using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MvcApiDemoCore
{
    public interface ICustomerRepository
    {
        IQueryable<Customer> All();
        Customer ById(int id);
        void Delete(int id);
        Customer Add(Customer customer);
    }
}
