namespace EqualPath.Application.DTOs;

using EqualPath.Domain.Enums;

public record CreateVagaDto(
    string Titulo,
    string? Descricao,
    string? Habilidades,
    SeniorityLevel Senioridade,
    ContractType TipoContrato,
    string? Cidade,
    int EmpresaId
);
