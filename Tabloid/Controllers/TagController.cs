using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Models.RequestModels;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        


        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }


        //GET: api/<TagController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_tagRepository.GetAllTags());
        }

        //// GET api/<TagController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        // POST api/<TagController>
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepository.AddTag(tag);
            return CreatedAtAction(nameof(GetAll), new { id = tag.Id }, tag);
        }

        [HttpPost("AddTagsToPost")]
        public IActionResult AddTagsToPost(PostTagRequest postTagRequest)
        {
            //TODO: Delete all postTags associated with a post.
            //Create a postTag for each tag id using the postId.
       
                int postId = postTagRequest.id;
            _tagRepository.RemoveAllTagsFromPost(postId);
            //Iterate through each tag id in the array and create a posttag.
            foreach (var tagId in postTagRequest.selectedTagIds)
            {
                _tagRepository.AddTagToPost(tagId, postId);
            }
            return NoContent();
        }




        // PUT api/<TagController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepository.UpdateTag(tag);
            return NoContent();
        }

        // DELETE api/<TagController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
                _tagRepository.DeleteTag(id);
            return NoContent();
        }

    }
}
