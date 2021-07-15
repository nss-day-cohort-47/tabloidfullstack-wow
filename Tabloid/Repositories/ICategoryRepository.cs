using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        public List<Category> GetAllCategories();

        Category GetById(int id);

        void AddCategory(Category category);

        void Update(Category category);

        void Delete(int id);
       
    }
}