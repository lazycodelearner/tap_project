﻿using CRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudStudent.Controller
{
	[ApiController]
    [Route("api/[controller]/[action]")]
    public class SubjectController : ControllerBase
	{
		private readonly SubjectContext _subjectContext;
		public SubjectController(SubjectContext subjectContext)
		{
			_subjectContext = subjectContext;
		}
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Subject>>> GetSubject()
		{
			if (_subjectContext.Subjects == null)
			{
				return NotFound();
			}
			return await _subjectContext.Subjects.ToListAsync();
		}
		[HttpGet("{id}")]
		public async Task<ActionResult<Subject>> GetSubject(int id)
		{
			if (_subjectContext.Subjects== null)
			{
				return NotFound();
			}
			var subject= await _subjectContext.Subjects.FindAsync(id);
			if (subject== null)
			{
				return NotFound();
			}
			return subject;
		}
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Subject>> GetSubjectsByStudentId(int id)
        {
            if (_subjectContext.Subjects == null)
            {
                return NotFound();
            }
            var subjects = _subjectContext.Subjects.Where(s => s.StudentId == id).ToList();
   
            if (subjects == null)
            {
                return NotFound();
            }
            return subjects;
        }
        [HttpPost]
		public async Task<ActionResult<Student>> PostSubject(Subject subject)
		{
			_subjectContext.Subjects.Add(subject);
			await _subjectContext.SaveChangesAsync();
			return CreatedAtAction(nameof(GetSubject), new { id = subject.SubjectId }, subject);
		}
		[HttpPut("{id}")]
		public async Task<ActionResult> PutSubject(int id, Subject subject)
		{
			if (id != subject.SubjectId)
			{
				return BadRequest();
			}
			_subjectContext.Entry(subject).State = EntityState.Modified; try
			{
				await _subjectContext.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException) { throw; }
			return Ok();
		}
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteSubject(int id)
		{
			if (_subjectContext.Subjects== null)
			{
				return NotFound();
			}
			var subject= await (_subjectContext.Subjects.FindAsync(id));
			if (subject== null)
			{
				return NotFound();
			}
			_subjectContext.Subjects.Remove(subject);
			await _subjectContext.SaveChangesAsync();
			return Ok();
		}
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteSubjects(int id)
		{
			if (_subjectContext.Subjects == null)
			{
				return NotFound();
			}
			var subjects = _subjectContext.Subjects.Where(s => s.StudentId == id).ToList();
			if (subjects == null)
			{
				return NotFound();
			}
			_subjectContext.Subjects.RemoveRange(subjects);
			await _subjectContext.SaveChangesAsync();
			return Ok();
		}
	}
}

