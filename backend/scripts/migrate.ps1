Write-Host "Rodando migrations para EqualPath..."

dotnet ef database update `
 --project ../src/EqualPath.Infrastructure `
 --startup-project ../src/EqualPath.Api

Write-Host "Migrations concluídas!"
