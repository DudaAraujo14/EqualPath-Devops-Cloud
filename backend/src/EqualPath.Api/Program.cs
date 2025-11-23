using EqualPath.Infrastructure.Data;
using EqualPath.Api.Configurations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ORACLE
builder.Services.AddDbContext<EqualPathContext>(options =>
    options.UseOracle(builder.Configuration.GetConnectionString("DefaultConnection")));

// SERVICES
builder.Services.AddApplicationServices();

// CONTROLLERS
builder.Services.AddControllers();

// SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// SWAGGER sempre ativado
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "EqualPath Oracle API Running! 🚀");

app.Run();
