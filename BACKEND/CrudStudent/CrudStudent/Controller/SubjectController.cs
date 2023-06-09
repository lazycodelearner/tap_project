using CRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudStudent.Controller
{
	[Route("api/[controller]")]
	[ApiController]
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
		public async Task<ActionResult> DeleteEmployee(int id)
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
	}
}

