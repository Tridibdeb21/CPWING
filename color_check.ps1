Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Users\USER\Downloads\puc_computer_club_logo_color.png')
$bmp = new-object System.Drawing.Bitmap($img)
$colors = @{}
for ($x = 0; $x -lt $bmp.Width; $x += 2) {
    for ($y = 0; $y -lt $bmp.Height; $y += 2) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -lt 50) { continue }
        $hex = "#{0:X2}{1:X2}{2:X2}" -f $c.R, $c.G, $c.B
        if ($colors.ContainsKey($hex)) {
            $colors[$hex]++
        } else {
            $colors[$hex] = 1
        }
    }
}
$colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 20
