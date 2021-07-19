using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models.RequestModels
{
    public class PostTagRequest
    {
        public int id { get; set; }

        public List<int> selectedTagIds { get; set; }

    }
}
