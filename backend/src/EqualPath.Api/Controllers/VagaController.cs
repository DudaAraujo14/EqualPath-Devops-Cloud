using Microsoft.AspNetCore.Mvc;
using EqualPath.Application.Services;
using EqualPath.Application.DTOs;

namespace EqualPath.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VagaController : ControllerBase
{
    private readonly VagaService _service;

    public VagaController(VagaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int page = 1, int pageSize = 10)
    {
        var (items, total) = await _service.SearchAsync(null, null, null, null, page, pageSize);
        return Ok(new { items, total, page, pageSize });
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var v = await _service.GetByIdAsync(id);
        return v is null ? NotFound() : Ok(v);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] string? cidade,
        [FromQuery] int? senioridade,
        [FromQuery] int? contrato,
        [FromQuery] string? q,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? orderBy = "CriadaEm",
        [FromQuery] bool desc = true)
    {
        var (items, total) = await _service.SearchAsync(cidade, senioridade, contrato, q, page, pageSize, orderBy, desc);
        return Ok(new { items, total, page, pageSize });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateVagaDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateVagaDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}
