using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Runtime.Serialization;

namespace CRUD.Models
{
	public class Subject
	{
		[Key]
		public int SubjectId { get; set; }

		public string SubjectName { get; set; }
		public int Mark { get; set; }

		[ForeignKey("Student")]
		public int StudentId { get; set; }
		[JsonIgnore]
		public virtual Student? Student { get; set; }

	}
}
