using Microsoft.AspNetCore.Mvc;
using EqualPath.Application.Services;
using EqualPath.Application.DTOs;

namespace EqualPath.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmpresaController : ControllerBase
{
    private readonly EmpresaService _service;

    public EmpresaController(EmpresaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var empresa = await _service.GetByIdAsync(id);
        return empresa is null ? NotFound() : Ok(empresa);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateEmpresaDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateEmpresaDto dto)
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
