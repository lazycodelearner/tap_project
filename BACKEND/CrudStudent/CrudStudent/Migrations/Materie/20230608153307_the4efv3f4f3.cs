using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrudStudent.Migrations.Materie
{
    /// <inheritdoc />
    public partial class the4efv3f4f3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Materie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Materie",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
