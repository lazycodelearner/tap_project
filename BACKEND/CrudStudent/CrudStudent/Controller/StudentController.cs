using CRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class StudentController : ControllerBase
	{
		private readonly StudentContext _studentContext;
		public StudentController(StudentContext studentContext)
		{
			_studentContext = studentContext;
		}
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
		{
			if (_studentContext.Student == null)
			{
				return NotFound();
			}
			return await _studentContext.Student.ToListAsync();
		}
		[HttpGet("{id}")]
		public async Task<ActionResult<Student>> GetStudent(int id)
		{
			if (_studentContext.Student == null)
			{
				return NotFound();
			}
			var student = await _studentContext.Student.FindAsync(id);
			if (student == null)
			{
				return NotFound();
			}
			return student;
		}
		[HttpPost]
		public async Task<ActionResult<Student>> PostStudent(Student student)
		{
			_studentContext.Student.Add(student);
			await _studentContext.SaveChangesAsync();
			return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
		}
		[HttpPut("{id}")]
		public async Task<ActionResult> PutStudent(int id, Student student)
		{
			if (id != student.StudentId)
			{
				return BadRequest();
			}
			_studentContext.Entry(student).State = EntityState.Modified; try
			{
				await _studentContext.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException) { throw; }
			return Ok();
		}
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteEmployee(int id)
		{
			if (_studentContext.Student == null)
			{
				return NotFound();
			}
			var student = await (_studentContext.Student.FindAsync(id));
			if (student == null)
			{
				return NotFound();
			}
			_studentContext.Student.Remove(student);
			await _studentContext.SaveChangesAsync();
			return Ok();
		}
	}
}