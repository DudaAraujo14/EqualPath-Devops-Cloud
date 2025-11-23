using EqualPath.Domain.Entities;
using EqualPath.Infrastructure.Data;
using EqualPath.Application.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EqualPath.Application.Services;

public class EmpresaService
{
    private readonly EqualPathContext _context;

    public EmpresaService(EqualPathContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EmpresaDto>> GetAllAsync()
        => await _context.Empresas
            .Select(e => new EmpresaDto(e.Id, e.Nome, e.Cnpj, e.Cidade, e.Site))
            .ToListAsync();

    public async Task<EmpresaDto?> GetByIdAsync(int id)
    {
        var e = await _context.Empresas.FindAsync(id);
        return e is null ? null : new EmpresaDto(e.Id, e.Nome, e.Cnpj, e.Cidade, e.Site);
    }

    public async Task<EmpresaDto> CreateAsync(CreateEmpresaDto dto)
    {
        var model = new Empresa
        {
            Nome = dto.Nome,
            Cnpj = dto.Cnpj,
            Cidade = dto.Cidade,
            Site = dto.Site
        };

        _context.Empresas.Add(model);
        await _context.SaveChangesAsync();

        return new EmpresaDto(model.Id, model.Nome, model.Cnpj, model.Cidade, model.Site);
    }

    public async Task<EmpresaDto?> UpdateAsync(int id, UpdateEmpresaDto dto)
    {
        var e = await _context.Empresas.FindAsync(id);
        if (e is null) return null;

        e.Nome = dto.Nome;
        e.Cnpj = dto.Cnpj;
        e.Cidade = dto.Cidade;
        e.Site = dto.Site;

        await _context.SaveChangesAsync();

        return new EmpresaDto(e.Id, e.Nome, e.Cnpj, e.Cidade, e.Site);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var e = await _context.Empresas.FindAsync(id);
        if (e is null) return false;

        _context.Empresas.Remove(e);
        await _context.SaveChangesAsync();

        return true;
    }
}
