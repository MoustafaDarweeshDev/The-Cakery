using Microsoft.OpenApi.Models;

namespace The_Cakery.Extentions
{
    public static class SwaggerServiceExtentions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen( c=>
            {
                var securitySchema = new OpenApiSecurityScheme {
                    Description = "Jwt Auth Bearer Schema",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme="bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "bearer"
                    }
                };

                c.AddSecurityDefinition("bearer", securitySchema);

                var securityRequirments = new OpenApiSecurityRequirement { {securitySchema , new[] { "bearer" } } };
                c.AddSecurityRequirement(securityRequirments);
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            return app;
        }

    }
}
