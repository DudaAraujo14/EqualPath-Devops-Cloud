namespace EqualPath.Application.DTOs;

using EqualPath.Domain.Enums;

public record VagaDto(
    int Id,
    string Titulo,
    string? Descricao,
    string? Habilidades,
    SeniorityLevel Senioridade,
    ContractType TipoContrato,
    string? Cidade,
    DateTime CriadaEm,
    int EmpresaId
);
