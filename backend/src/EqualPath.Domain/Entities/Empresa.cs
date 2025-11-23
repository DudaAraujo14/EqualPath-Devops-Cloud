namespace EqualPath.Domain.Entities;

public class Empresa
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string? Cnpj { get; set; }
    public string? Cidade { get; set; }
    public string? Site { get; set; }

    public ICollection<Vaga> Vagas { get; set; } = new List<Vaga>();
}
