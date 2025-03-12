using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Models;
using Hubs;
using Data;
using Helpers;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.Owin;  
using Owin; 

[assembly: OwinStartupAttribute(typeof(ASP.NET.Startup))]  
namespace ASP.NET
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AgencijaContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("AgencijaCS"));

            });

            services.AddCors(options => 
            {
                options.AddPolicy("CORS", builder =>
                {
                    builder.WithOrigins(new string[]
                    {
                        "http://localhost:8000",
                        "https://127.0.0.1:8000",
                        "http://127.0.0.1:8000",
                        "https://localhost:8000",
                        "http://localhost:8080",
                        "https://localhost:8080",
                        "http://127.0.0.1:8080",
                        "https://127.0.0.1:8080",
                        "http://127.0.0.1:5500",
                        "http://localhost:5500",
                        "https://127.0.0.1:5500",
                        "https://localhost:5500",
                        "https://localhost:5501",
                        "http://localhost:5501",
                        "https://127.0.0.1:5501",
                        "http://127.0.0.1:5501",
                        "http://localhost:3000",
                        "https://localhost:3000",
                        "http://127.0.0.1:3000",
                        "https://127.0.0.1:3000"
                        
                    })
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();

                   
                });
               
            });
            services.AddSignalR();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.NET", Version = "v1" });
            });

            services.AddScoped<IUserRapository,USerRepository>(); 
            services.AddScoped<JwtService>();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ASP.NET v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseCors("CORS");

            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotificationHub>("/NotificationHub");
                endpoints.MapControllers();
            });
        }
    }
}
