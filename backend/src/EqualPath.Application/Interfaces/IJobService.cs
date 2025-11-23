namespace EqualPath.Application.Interfaces;

public interface IJobService
{
    // Só um método inicial para não ficar vazio
    Task<string> PingAsync();
}
