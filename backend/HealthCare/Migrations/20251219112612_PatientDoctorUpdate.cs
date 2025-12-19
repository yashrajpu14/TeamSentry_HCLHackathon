using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthCare.Migrations
{
    /// <inheritdoc />
    public partial class PatientDoctorUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorProfile_Users_UserId",
                table: "DoctorProfile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DoctorProfile",
                table: "DoctorProfile");

            migrationBuilder.DropColumn(
                name: "LicenseFileName",
                table: "DoctorProfile");

            migrationBuilder.RenameTable(
                name: "DoctorProfile",
                newName: "DoctorProfiles");

            migrationBuilder.RenameColumn(
                name: "LicenseFilePath",
                table: "DoctorProfiles",
                newName: "LicenseImageUrl");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorProfile_UserId",
                table: "DoctorProfiles",
                newName: "IX_DoctorProfiles_UserId");

            migrationBuilder.AddColumn<string>(
                name: "LicenseImagePublicId",
                table: "DoctorProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DoctorProfiles",
                table: "DoctorProfiles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorProfiles_Users_UserId",
                table: "DoctorProfiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorProfiles_Users_UserId",
                table: "DoctorProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DoctorProfiles",
                table: "DoctorProfiles");

            migrationBuilder.DropColumn(
                name: "LicenseImagePublicId",
                table: "DoctorProfiles");

            migrationBuilder.RenameTable(
                name: "DoctorProfiles",
                newName: "DoctorProfile");

            migrationBuilder.RenameColumn(
                name: "LicenseImageUrl",
                table: "DoctorProfile",
                newName: "LicenseFilePath");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorProfiles_UserId",
                table: "DoctorProfile",
                newName: "IX_DoctorProfile_UserId");

            migrationBuilder.AddColumn<string>(
                name: "LicenseFileName",
                table: "DoctorProfile",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DoctorProfile",
                table: "DoctorProfile",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorProfile_Users_UserId",
                table: "DoctorProfile",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
