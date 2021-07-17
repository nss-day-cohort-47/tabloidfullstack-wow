﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<Post> GetAllPublishedPosts();
        Post GetPublishedPostById(int id);

        List<Post> GetAllPostsFromUser(string firebaseUserId);
    }
}