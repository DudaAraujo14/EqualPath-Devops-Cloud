using EqualPath.Application.Dtos;
using EqualPath.Application.Interfaces;
using EqualPath.Domain.Entities;
using EqualPath.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EqualPath.Application.Services;

public class CandidateService : ICandidateService
{
    private readonly EqualPathContext _context;

    public CandidateService(EqualPathContext ctx)
    {
        _context = ctx;
    }

    public async Task<IEnumerable<CandidateDto>> GetAllAsync()
    {
        return await _context.Candidates
            .Select(c => new CandidateDto(c.Id, c.FullName, c.Email))
            .ToListAsync();
    }

    public async Task<CandidateDto?> GetByIdAsync(int id)
    {
        var entity = await _context.Candidates.FindAsync(id);
        return entity == null
            ? null
            : new CandidateDto(entity.Id, entity.FullName, entity.Email);
    }

    public async Task<CandidateDto> CreateAsync(CreateCandidateDto dto)
    {
        var entity = new Candidate
        {
            FullName = dto.FullName,
            Email = dto.Email
        };

        _context.Candidates.Add(entity);
        await _context.SaveChangesAsync();

        return new CandidateDto(entity.Id, entity.FullName, entity.Email);
    }

    public async Task<CandidateDto?> UpdateAsync(int id, UpdateCandidateDto dto)
    {
        var entity = await _context.Candidates.FindAsync(id);
        if (entity == null)
            return null;

        entity.FullName = dto.FullName;
        entity.Email = dto.Email;

        await _context.SaveChangesAsync();

        return new CandidateDto(entity.Id, entity.FullName, entity.Email);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _context.Candidates.FindAsync(id);
        if (entity == null)
            return false;

        _context.Candidates.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }
}
