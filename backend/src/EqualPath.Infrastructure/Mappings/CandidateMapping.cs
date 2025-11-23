using EqualPath.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EqualPath.Infrastructure.Mappings;

public class CandidateMapping : IEntityTypeConfiguration<Candidate>
{
    public void Configure(EntityTypeBuilder<Candidate> builder)
    {
        builder.ToTable("CANDIDATES");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("ID");

        builder.Property(x => x.FullName)
            .HasColumnName("FULL_NAME")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Email)
            .HasColumnName("EMAIL")
            .HasMaxLength(200)
            .IsRequired();
    }
}
