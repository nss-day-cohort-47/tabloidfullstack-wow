﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration config) : base(config) { }
        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT t.Id,
                              t.Name
                         FROM Tag t
                        ORDER BY t.Name ASC
                              ";
                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();
                    while (reader.Read())
                    {
                        tags.Add(NewTagFromReader(reader));
                    }
                    reader.Close();

                    return tags;
                }
            }
        }

        public Tag GetTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT t.Id,
                              t.Name
                         FROM Tag t
                        WHERE t.id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Tag tag = null;

                    if (reader.Read())
                    {
                        tag = NewTagFromReader(reader);
                    }

                    reader.Close();

                    return tag;
                }
            }
        }

        //public void AddTagToPost(int tag, int post)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //            INSERT INTO PostTag (PostId, TagId)
        //            OUTPUT INSERTED.ID
        //            VALUES (@postid, @tagid);
        //        ";

        //            cmd.Parameters.AddWithValue("@postid", post);
        //            cmd.Parameters.AddWithValue("@tagid", tag);

        //            int id = (int)cmd.ExecuteScalar();
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
        //            DELETE FROM PostTag WHERE PostId = @postid  AND TagId = @tagid  ;
        //        ";

        //            cmd.Parameters.AddWithValue("@postid", post);
        //            cmd.Parameters.AddWithValue("@tagid", tag);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
        public void AddTag(Tag tag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Tag ([Name])
                    OUTPUT INSERTED.ID
                    VALUES (@name);
                ";

                    cmd.Parameters.AddWithValue("@name", tag.Name);

                    int id = (int)cmd.ExecuteScalar();

                    tag.Id = id;
                }
            }
        }

        public void UpdateTag(Tag tag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Tag
                            SET 
                                [Name] = @name
                            WHERE Id = @id";

                   DbUtils.AddParameter(cmd, "@name", tag.Name);
                    DbUtils.AddParameter(cmd, "@id", tag.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteTag(int tagId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM PostTag
                            Where TagId = @id;
                            DELETE FROM Tag
                            WHERE Id = @id;   
                        ";

                    DbUtils.AddParameter(cmd, "@id", tagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Tag NewTagFromReader(SqlDataReader reader)
        {
            return new Tag()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }
    }
}