using EqualPath.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EqualPath.Infrastructure.Data;

public class EqualPathContext : DbContext
{
    public EqualPathContext(DbContextOptions<EqualPathContext> options)
        : base(options)
    {
    }

    public DbSet<Empresa> Empresas { get; set; }
    public DbSet<Vaga> Vagas { get; set; }
    public DbSet<Candidate> Candidates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(EqualPathContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
