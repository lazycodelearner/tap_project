using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrudStudent.Migrations.Materie
{
    /// <inheritdoc />
    public partial class the4e343 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Materie",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "materie",
                table: "Materie",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nota",
                table: "Materie",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Materie");

            migrationBuilder.DropColumn(
                name: "materie",
                table: "Materie");

            migrationBuilder.DropColumn(
                name: "nota",
                table: "Materie");
        }
    }
}
