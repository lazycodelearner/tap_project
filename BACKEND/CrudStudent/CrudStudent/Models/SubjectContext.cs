using CRUD.Models;
using Microsoft.EntityFrameworkCore;


namespace CRUD.Models
{
	public class SubjectContext : DbContext
	{


		public SubjectContext(DbContextOptions<SubjectContext> options) : base(options)
		{

		}
		public DbSet<Subject> Subjects { get; set; }

	}

}