Import-Module -Name UniversalDashboard
Import-Module UniversalDashboard.UDButtonParticle
Get-UDDashboard | Stop-UDDashboard
Start-UDDashboard -Port 10005 -Dashboard (
    New-UDDashboard -Title "Powershell UniversalDashboard" -Content {
        New-UDButtonParticle -Id "Explode" -Text "Explode" -onClick {
            Set-UDElement -id "Explode" -Attributes @{
                hidden = $true
            }
        }
        ##Do some long activity then Set-UDElement and make it not hidden to bring it back
        New-UDRow
        New-UDButtonParticle -Text "Bring it Back" -OnClick {
            Set-UDElement -id "Explode" -Attributes @{
                hidden = $false
            }
        }
    }
)
