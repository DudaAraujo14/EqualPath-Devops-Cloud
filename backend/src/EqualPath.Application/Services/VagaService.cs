using EqualPath.Application.DTOs;
using EqualPath.Domain.Entities;
using EqualPath.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EqualPath.Application.Services;

public class VagaService
{
    private readonly EqualPathContext _context;

    public VagaService(EqualPathContext context)
    {
        _context = context;
    }

    // Busca com filtros e paginação
    public async Task<(IEnumerable<VagaDto> Items, int Total)> SearchAsync(
        string? cidade = null,
        int? senioridade = null,
        int? tipoContrato = null,
        string? q = null,            // busca livre no título/descrição/habilidades
        int page = 1,
        int pageSize = 10,
        string? orderBy = null,      // ex: "CriadaEm" ou "Titulo"
        bool desc = true)
    {
        var query = _context.Vagas.AsQueryable();

        if (!string.IsNullOrWhiteSpace(cidade))
            query = query.Where(v => v.Cidade == cidade);

        if (senioridade != null)
            query = query.Where(v => (int)v.Senioridade == senioridade);

        if (tipoContrato != null)
            query = query.Where(v => (int)v.TipoContrato == tipoContrato);

        if (!string.IsNullOrWhiteSpace(q))
        {
            var lower = q.ToLower();
            query = query.Where(v =>
                (v.Titulo != null && v.Titulo.ToLower().Contains(lower)) ||
                (v.Descricao != null && v.Descricao.ToLower().Contains(lower)) ||
                (v.Habilidades != null && v.Habilidades.ToLower().Contains(lower)));
        }

        // total antes da paginação
        var total = await query.CountAsync();

        // ordenação básica (seguro)
        query = orderBy?.ToLower() switch
        {
            "titulo" => desc ? query.OrderByDescending(v => v.Titulo) : query.OrderBy(v => v.Titulo),
            "criadas" => desc ? query.OrderByDescending(v => v.CriadaEm) : query.OrderBy(v => v.CriadaEm),
            "criadaem" => desc ? query.OrderByDescending(v => v.CriadaEm) : query.OrderBy(v => v.CriadaEm),
            _ => desc ? query.OrderByDescending(v => v.CriadaEm) : query.OrderBy(v => v.CriadaEm)
        };

        // paginação segura
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(v => new VagaDto(
                v.Id, v.Titulo, v.Descricao, v.Habilidades,
                v.Senioridade, v.TipoContrato, v.Cidade, v.CriadaEm, v.EmpresaId))
            .ToListAsync();

        return (items, total);
    }

    public async Task<VagaDto?> GetByIdAsync(int id)
    {
        var v = await _context.Vagas.FindAsync(id);
        return v is null ? null : new VagaDto(v.Id, v.Titulo, v.Descricao, v.Habilidades, v.Senioridade, v.TipoContrato, v.Cidade, v.CriadaEm, v.EmpresaId);
    }

    public async Task<VagaDto> CreateAsync(CreateVagaDto dto)
    {
        var model = new Vaga
        {
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            Habilidades = dto.Habilidades,
            Senioridade = dto.Senioridade,
            TipoContrato = dto.TipoContrato,
            Cidade = dto.Cidade,
            EmpresaId = dto.EmpresaId,
            CriadaEm = DateTime.UtcNow
        };

        _context.Vagas.Add(model);
        await _context.SaveChangesAsync();

        return new VagaDto(model.Id, model.Titulo, model.Descricao, model.Habilidades, model.Senioridade, model.TipoContrato, model.Cidade, model.CriadaEm, model.EmpresaId);
    }

    public async Task<VagaDto?> UpdateAsync(int id, UpdateVagaDto dto)
    {
        var v = await _context.Vagas.FindAsync(id);
        if (v is null) return null;

        v.Titulo = dto.Titulo;
        v.Descricao = dto.Descricao;
        v.Habilidades = dto.Habilidades;
        v.Senioridade = dto.Senioridade;
        v.TipoContrato = dto.TipoContrato;
        v.Cidade = dto.Cidade;
        v.EmpresaId = dto.EmpresaId;

        await _context.SaveChangesAsync();

        return new VagaDto(v.Id, v.Titulo, v.Descricao, v.Habilidades, v.Senioridade, v.TipoContrato, v.Cidade, v.CriadaEm, v.EmpresaId);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var v = await _context.Vagas.FindAsync(id);
        if (v is null) return false;

        _context.Vagas.Remove(v);
        await _context.SaveChangesAsync();
        return true;
    }
}
