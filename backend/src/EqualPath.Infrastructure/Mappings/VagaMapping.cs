using EqualPath.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EqualPath.Infrastructure.Mappings;

public class VagaMapping : IEntityTypeConfiguration<Vaga>
{
    public void Configure(EntityTypeBuilder<Vaga> builder)
    {
        builder.ToTable("VAGAS");

        builder.HasKey(v => v.Id);

        builder.Property(v => v.Id)
            .HasColumnName("ID");

        builder.Property(v => v.Titulo)
            .HasColumnName("TITULO")
            .HasMaxLength(160)
            .IsRequired();

        builder.Property(v => v.Descricao)
            .HasColumnName("DESCRICAO");

        builder.Property(v => v.Habilidades)
            .HasColumnName("HABILIDADES")
            .HasMaxLength(300);

        builder.Property(v => v.Senioridade)
            .HasColumnName("SENIORIDADE")
            .IsRequired();

        builder.Property(v => v.TipoContrato)
            .HasColumnName("TIPOCONTRATO")
            .IsRequired();

        builder.Property(v => v.Cidade)
            .HasColumnName("CIDADE")
            .HasMaxLength(100);

        builder.Property(v => v.CriadaEm)
            .HasColumnName("CRIADAEM");

        builder.Property(v => v.EmpresaId)
            .HasColumnName("EMPRESAID")
            .IsRequired();

            builder.HasOne(v => v.Empresa)
               .WithMany(e => e.Vagas)
               .HasForeignKey(v => v.EmpresaId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
