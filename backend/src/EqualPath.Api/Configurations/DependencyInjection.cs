using EqualPath.Application.Interfaces;
using EqualPath.Application.Services;

namespace EqualPath.Api.Configurations;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ICandidateService, CandidateService>();
        services.AddScoped<CandidateService>();
        services.AddScoped<EmpresaService>();
        services.AddScoped<VagaService>();
        return services;
    }
}
