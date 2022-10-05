using Core.identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using The_Cakery.Errors;
using The_Cakery.Extentions;
using The_Cakery.Helpers;
using The_Cakery.Middleware;

var AllowCors = "CorsPolicy";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<AppIdentityDbContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection"));
});
// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddAutoMapper(typeof(MappingProfiles));

builder.Services.AddCors(option =>
{
    option.AddPolicy(AllowCors, builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});




var app = builder.Build();

// applying migration automatically
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
    try
    {
        var context = services.GetRequiredService<StoreContext>();
        await context.Database.MigrateAsync();
        await StoreContextSeed.SeedAsync(context, loggerFactory);

        var userManger = services.GetRequiredService<UserManager<AppUser>>();
        var IdentityContext = services.GetRequiredService<AppIdentityDbContext>();
        await IdentityContext.Database.MigrateAsync();
        await AppIdentityDbContextSeed.SeedUsersAsync(userManger);
    }
    catch(Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "something went wrong during migration");
    }
}

// Configure the HTTP request pipeline.

app.UseMiddleware<ExeptionMiddleware>();

app.UseSwaggerDocumentation();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors(AllowCors);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
