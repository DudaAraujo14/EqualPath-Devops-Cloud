namespace EqualPath.Application.DTOs;

public record CreateEmpresaDto(
    string Nome,
    string? Cnpj,
    string? Cidade,
    string? Site
);
