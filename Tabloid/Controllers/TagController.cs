using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
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
