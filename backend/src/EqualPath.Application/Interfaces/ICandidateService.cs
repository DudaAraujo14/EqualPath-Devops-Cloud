using EqualPath.Application.Dtos;

namespace EqualPath.Application.Interfaces;

public interface ICandidateService
{
    Task<IEnumerable<CandidateDto>> GetAllAsync();
    Task<CandidateDto?> GetByIdAsync(int id);
    Task<CandidateDto> CreateAsync(CreateCandidateDto dto);
    Task<CandidateDto?> UpdateAsync(int id, UpdateCandidateDto dto);
    Task<bool> DeleteAsync(int id);
}
