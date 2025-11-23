using EqualPath.Domain.Enums;

namespace EqualPath.Domain.Entities;

public class Vaga
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public string? Habilidades { get; set; }

    public SeniorityLevel Senioridade { get; set; }
    public ContractType TipoContrato { get; set; }

    public string? Cidade { get; set; }

    public DateTime CriadaEm { get; set; } = DateTime.UtcNow;

    public int EmpresaId { get; set; }
    public Empresa? Empresa { get; set; }
}
