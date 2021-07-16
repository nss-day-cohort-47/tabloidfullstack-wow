using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);

        void UpdatePost( Post post);
        List<Post> GetAllPublishedPosts();
        Post GetPublishedPostById(int id);

        List<Post> GetAllPostsFromUser(string firebaseUserId);
    }
}