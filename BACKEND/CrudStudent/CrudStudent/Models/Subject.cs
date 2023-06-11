using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRUD.Models
{
	public class Subject
	{
		[Key] public int SubjectId { get; set; }
		public String? SubjectName { get; set; }
		public int Mark { get; set; }

		[Display(Name = "Student")]
        [ForeignKey("StudentId")] public virtual int StudentId { get; set; }

		//To Create a Foreign Key it should have the Standard Navigational Property
	}
}
