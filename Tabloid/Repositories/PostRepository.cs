using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }
        public List<Post> GetAllPublishedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId, p.IsDeleted AS PostDeleted,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() AND p.IsDeleted = 0
                         ORDER BY p.CreateDateTime DESC";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllPostsFromUser(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId, p.IsDeleted,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName,
                              u.FirebaseUserId
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE FirebaseUserId = @FirebaseUserId AND p.IsDeleted = 0
                    ORDER BY p.CreateDateTime DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
                            IsApproved, CategoryId, UserProfileId, IsDeleted )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
                            1, @CategoryId, @UserProfileId, 0 )";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);                
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);


                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Post
                            SET IsDeleted = 1
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                },
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "UserTypeId"),
                        Name = DbUtils.GetString(reader, "UserTypeName")
                    }
                }
            };
        }

        //public Post GetPostById(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //           SELECT p.Id, p.Title, p.Content, 
        //                  p.ImageLocation AS HeaderImage,
        //                  p.CreateDateTime, p.PublishDateTime, p.IsApproved,
        //                  p.CategoryId, p.UserProfileId,
        //                  c.[Name] AS CategoryName,
        //                  u.FirstName, u.LastName, u.DisplayName, 
        //                  u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
        //                  u.UserTypeId, 
        //                  ut.[Name] AS UserTypeName
        //             FROM Post p
        //                  LEFT JOIN Category c ON p.CategoryId = c.id
        //                  LEFT JOIN UserProfile u ON p.UserProfileId = u.id
        //                  LEFT JOIN UserType ut ON u.UserTypeId = ut.id
        //            WHERE p.id = @id";

        //            cmd.Parameters.AddWithValue("@id", id);
        //            var reader = cmd.ExecuteReader();

        //            Post post = null;

        //            if (reader.Read())
        //            {
        //                post = NewPostFromReader(reader);
        //            }

        //            reader.Close();

        //            return post;
        //        }
        //    }
        //}

        public Post GetPublishedPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                   SELECT p.Id, p.Title, p.Content, 
                          p.ImageLocation AS HeaderImage,
                          p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                          p.CategoryId, p.UserProfileId, p.IsDeleted AS PostDeleted,
                          c.[Name] AS CategoryName,
                          u.FirstName, u.LastName, u.DisplayName, 
                          u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                          u.UserTypeId, 
                          ut.[Name] AS UserTypeName
                     FROM Post p
                          LEFT JOIN Category c ON p.CategoryId = c.id
                          LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                          LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                    WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() AND p.IsDeleted = 0
                          AND p.id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        //public Post GetUserPostById(int id, int userProfileId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //           SELECT p.Id, p.Title, p.Content, 
        //                  p.ImageLocation AS HeaderImage,
        //                  p.CreateDateTime, p.PublishDateTime, p.IsApproved,
        //                  p.CategoryId, p.UserProfileId,
        //                  c.[Name] AS CategoryName,
        //                  u.FirstName, u.LastName, u.DisplayName, 
        //                  u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
        //                  u.UserTypeId, 
        //                  ut.[Name] AS UserTypeName
        //             FROM Post p
        //                  LEFT JOIN Category c ON p.CategoryId = c.id
        //                  LEFT JOIN UserProfile u ON p.UserProfileId = u.id
        //                  LEFT JOIN UserType ut ON u.UserTypeId = ut.id
        //            WHERE p.id = @id AND p.UserProfileId = @userProfileId
        //            ORDER BY p.CreateDateTime DESC";

        //            cmd.Parameters.AddWithValue("@id", id);
        //            cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

        //            var reader = cmd.ExecuteReader();

        //            Post post = null;

        //            if (reader.Read())
        //            {
        //                post = NewPostFromReader(reader);
        //            }

        //            reader.Close();

        //            return post;
        //        }
        //    }
        //}

        //public List<PostTag> GetTagByPostId(int PostId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //           SELECT 
        //                 pt.Id,
        //                 pt.PostId,
        //                 pt.TagId,
        //                 t.Name
        //             FROM PostTag pt
        //             JOIN Tag t ON t.Id = pt.TagId     
        //            WHERE pt.PostId = @postId";

        //            cmd.Parameters.AddWithValue("@postId", PostId);
        //            var reader = cmd.ExecuteReader();

        //            List<PostTag> post = new List<PostTag>();

        //            while (reader.Read())
        //            {
        //                PostTag posttag = NewPostTagFromReader(reader);
        //                post.Add(posttag);
        //            }
        //            reader.Close();

        //            return post;
        //        }
        //    }
        //}

        //public void AddTagToPost(int tag, int post)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //        INSERT INTO PostTag (PostId, TagId)
        //        OUTPUT INSERTED.ID
        //        VALUES (@postid, @tagid);
        //    ";

        //            cmd.Parameters.AddWithValue("@postid", post);
        //            cmd.Parameters.AddWithValue("@tagid", tag);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
        //public void RemoveTagFromPost(int tag, int post)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //        DELETE FROM PostTag WHERE PostId = @postid  AND TagId = @tagid  ;
        //    ";

        //            cmd.Parameters.AddWithValue("@postid", post);
        //            cmd.Parameters.AddWithValue("@tagid", tag);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}




        //    public void UpdatePost(Post post)
        //    {
        //        using (var conn = Connection)
        //        {
        //            conn.Open();
        //            using (var cmd = conn.CreateCommand())
        //            {
        //                cmd.CommandText = @"
        //                UPDATE Post 
        //                    SET
        //                        Title = @title,
        //                        Content = @content,
        //                        ImageLocation = @imageLocation,
        //                        PublishDateTime = @publishDateTime,
        //                        CategoryId = @categoryId
        //                        WHERE Id = @id";

        //                cmd.Parameters.AddWithValue("@title", post.Title);
        //                cmd.Parameters.AddWithValue("@content", post.Content);
        //                cmd.Parameters.AddWithValue("@imageLocation", DbUtils.ValueOrDBNull(post.ImageLocation));
        //                cmd.Parameters.AddWithValue("@publishDateTime", DbUtils.ValueOrDBNull(post.PublishDateTime));
        //                cmd.Parameters.AddWithValue("@categoryId", post.CategoryId);
        //                cmd.Parameters.AddWithValue("@id", post.Id);

        //                cmd.ExecuteNonQuery();
        //            }
        //        }
        //    }




        //    private PostTag NewPostTagFromReader(SqlDataReader reader)
        //    {
        //        return new PostTag()
        //        {
        //            Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //            TagId = reader.GetInt32(reader.GetOrdinal("TagId")),
        //            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
        //            Tag = new Tag()
        //            {
        //                Name = reader.GetString(reader.GetOrdinal("Name"))
        //            }
        //        };
        //    }


    }
}


