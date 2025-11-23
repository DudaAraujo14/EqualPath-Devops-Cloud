using EqualPath.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EqualPath.Infrastructure.Mappings;

public class EmpresaMapping : IEntityTypeConfiguration<Empresa>
{
    public void Configure(EntityTypeBuilder<Empresa> builder)
    {
        builder.ToTable("EMPRESAS");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("ID");

        builder.Property(e => e.Nome)
            .HasColumnName("NOME")
            .HasMaxLength(160)
            .IsRequired();

        builder.Property(e => e.Cnpj)
            .HasColumnName("CNPJ")
            .HasMaxLength(18);

        builder.Property(e => e.Cidade)
            .HasColumnName("CIDADE")
            .HasMaxLength(100);

        builder.Property(e => e.Site)
            .HasColumnName("SITE")
            .HasMaxLength(200);

        // 1:N — Empresa TEM muitas Vagas
        builder.HasMany(e => e.Vagas)
            .WithOne(v => v.Empresa)
            .HasForeignKey(v => v.EmpresaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
