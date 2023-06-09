using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrudStudent.Migrations.Materie
{
    /// <inheritdoc />
    public partial class the4e3f4f3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materie_Student_StudentId",
                table: "Materie");

            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Materie_StudentId",
                table: "Materie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
      

            migrationBuilder.CreateIndex(
                name: "IX_Materie_StudentId",
                table: "Materie",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materie_Student_StudentId",
                table: "Materie",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
