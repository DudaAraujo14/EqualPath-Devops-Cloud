namespace EqualPath.Application.DTOs;

public record UpdateEmpresaDto(
    string Nome,
    string? Cnpj,
    string? Cidade,
    string? Site
);
