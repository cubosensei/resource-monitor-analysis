@echo OFF

FOR /F "usebackq" %%i IN (`hostname`) DO SET pc_name=%%i
echo %pc_name% - %date% %time:~0,2%-%time:~3,2%

SET file_name="Rendimiento_%pc_name% %date:~11,4%-%date:~8,2%-%date:~5,2% %time:~0,2%-%time:~3,2%.csv"

@echo PC_NAME,HOUR,CPU_PERCENTAGE,MEMORY,MEMORY_PERCENTAGE > %file_name%
@echo PC_NAME, HOUR, CPU_PERCENTAGE, MEMORY, MEMORY_PERCENTAGE

:loop
set "cpu_usage=0"
set "processors=0"
%SystemRoot%\System32\wbem\wmic.exe CPU get loadpercentage >"%TEMP%\cpu_usage.tmp"
for /F "skip=1" %%P in ('type "%TEMP%\cpu_usage.tmp"') do (
    set /A cpu_usage+=%%P
    set /A processors+=1
)
del "%TEMP%\cpu_usage.tmp"

set /A cpu_usage/=processors
goto Gettotal_memory

:Gettotal_memory
for /F "skip=1" %%M in ('%SystemRoot%\System32\wbem\wmic.exe ComputerSystem get TotalPhysicalMemory') do set "total_memory=%%M" & goto Getavailable_memory
:Getavailable_memory
for /F "skip=1" %%M in ('%SystemRoot%\System32\wbem\wmic.exe OS get FreePhysicalMemory') do set "available_memory=%%M" & goto ProcessValues

:ProcessValues
set "total_memory=%total_memory:~0,-6%"
set /A total_memory+=50
set /A total_memory/=1073


set /A total_memory*=1024

set /A available_memory/=1024

set /A used_memory=total_memory - available_memory

set /A used_memory_percentage=(used_memory * 100) / total_memory

@echo %pc_name%,%TIME:~0,8%,%cpu_usage%,%used_memory%,%used_memory_percentage%>> %file_name%
timeout 1 > nul
@echo %pc_name%, %TIME:~0,8%, %cpu_usage%%%, %used_memory%, %used_memory_percentage%%%

goto loop
