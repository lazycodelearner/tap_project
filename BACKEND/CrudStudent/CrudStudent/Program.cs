using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CRUD.Models.StudentContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("CRUDCS")));
builder.Services.AddDbContext<CRUD.Models.SubjectContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("CRUDCS")));
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
	// Configurarea serializ?rii JSON folosind Newtonsoft.Json
	options.SerializerSettings.ContractResolver = new DefaultContractResolver
	{
		NamingStrategy = new CamelCaseNamingStrategy()
	};
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseCors(builder =>
{
	builder
	.AllowAnyOrigin()
	.AllowAnyMethod()
	.AllowAnyHeader();
});


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.MapControllers();

app.UseDeveloperExceptionPage();
app.Run();
//public partial class Program { }