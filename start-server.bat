@echo off
echo Starting MentorAI local server...
cd /d "%~dp0"
where python >nul 2>&1 && (
    echo Using Python HTTP server on port 3500...
    python -m http.server 3500
) || (
    where node >nul 2>&1 && (
        echo Using npx serve on port 3500...
        npx -y serve . -l 3500
    ) || (
        echo ERROR: Neither Python nor Node.js found.
        echo Please install one of them, or open index.html directly in Chrome.
        pause
    )
)
pause
