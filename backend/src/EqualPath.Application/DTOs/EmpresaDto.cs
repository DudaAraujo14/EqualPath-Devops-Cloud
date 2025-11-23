namespace EqualPath.Application.DTOs;

public record EmpresaDto(
    int Id,
    string Nome,
    string? Cnpj,
    string? Cidade,
    string? Site
);
