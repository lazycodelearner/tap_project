using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
	public class Student
	{
		public int StudentId { get; set; }
		public String? firstName { get; set; }
		public String? lastName { get; set; }
		public int age { get; set; }
		public String? Budget { get; set; }
	}
}
