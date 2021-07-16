using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        void AddTag(Tag tag);

        void UpdateTag(Tag tag);
        Tag GetTagById(int id);
        void DeleteTag(int id);
        void AddTagToPost(int tagId, int postId);
    }
}