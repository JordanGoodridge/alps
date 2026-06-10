$filePath = "C:\Users\Jordan\Downloads\alp\src\App.tsx"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

# Fix double-encoded UTF-8 characters
$from1 = [char]0x00C3 + [string][char]0x00A9; $to1 = [string][char]0x00E9  # é
$from2 = [char]0x00C3 + [string][char]0x0089; $to2 = [string][char]0x00C9  # É
$from3 = [char]0x00C3 + [string][char]0x00A8; $to3 = [string][char]0x00E8  # è
$from4 = [char]0x00C3 + [string][char]0x00B4; $to4 = [string][char]0x00F4  # ô
$from5 = [char]0x00C3 + [string][char]0x00AB; $to5 = [string][char]0x00EB  # ë
$from6 = [char]0x00C3 + [string][char]0x00A0; $to6 = [string][char]0x00E0  # à

$text = $text.Replace($from1, $to1)
$text = $text.Replace($from2, $to2)
$text = $text.Replace($from3, $to3)
$text = $text.Replace($from4, $to4)
$text = $text.Replace($from5, $to5)
$text = $text.Replace($from6, $to6)

# Fix em-dash: â€" -> —
$fromDash = [char]0x00E2 + [string][char]0x0080 + [string][char]0x0094
$text = $text.Replace($fromDash, [string][char]0x2014)

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($filePath, $text, $utf8NoBom)

Write-Host "Encoding fix complete."
