using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrudStudent.Migrations.Subject
{
    /// <inheritdoc />
    public partial class h35 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subjects_Student_DepartmentId",
                table: "Subjects");

            migrationBuilder.DropIndex(
                name: "IX_Subjects_DepartmentId",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Subjects");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_StudentId",
                table: "Subjects",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subjects_Student_StudentId",
                table: "Subjects",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subjects_Student_StudentId",
                table: "Subjects");

            migrationBuilder.DropIndex(
                name: "IX_Subjects_StudentId",
                table: "Subjects");

            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "Subjects",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_DepartmentId",
                table: "Subjects",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subjects_Student_DepartmentId",
                table: "Subjects",
                column: "DepartmentId",
                principalTable: "Student",
                principalColumn: "StudentId");
        }
    }
}
