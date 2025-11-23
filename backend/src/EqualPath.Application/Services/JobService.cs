using EqualPath.Application.Interfaces;

namespace EqualPath.Application.Services;

public class JobService : IJobService
{
    public Task<string> PingAsync()
    {
        return Task.FromResult("JobService OK");
    }
}
