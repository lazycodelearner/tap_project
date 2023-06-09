using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRUD.Models
{
	public class Subject
	{
		[Key] public int SubjectId { get; set; }
		public String? materie { get; set; }
		public int nota { get; set; }

		[Display(Name = "Student")]
		public virtual int StudentId { get; set; }

		[ForeignKey("StudentId")]
		public virtual Student? Students { get; set; }

		//To Create a Foreign Key it should have the Standard Navigational Property
	}
}
