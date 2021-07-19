using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        public List<UserProfile> GetAllUsers();

        UserProfile GetUserById(int id);
        void ActivateUser(int id);

        void DeactivateUser(int id);
        List<UserProfile> GetDeactivatedUsers();
    }
}