using Microsoft.EntityFrameworkCore;

namespace EqualPath.Infrastructure.Repositories;

public class GenericRepository<T> where T : class
{
    private readonly DbContext _context;

    public GenericRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<T>> GetAllAsync() =>
        await _context.Set<T>().ToListAsync();

    public async Task AddAsync(T entity)
    {
        _context.Set<T>().Add(entity);
        await _context.SaveChangesAsync();
    }
}
