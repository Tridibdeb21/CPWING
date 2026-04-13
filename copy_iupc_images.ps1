$files = @('iupc1.jpg','iupc2.jpg','iupc3.jpg','iupc4.jpg','iupc5.jpg')
foreach ($f in $files) {
    Copy-Item -Path "C:\Users\USER\Downloads\$f" -Destination "c:\Users\USER\Desktop\CPWING\public\gallery\$f" -Force
}
