New-Item -Path 'c:\Users\USER\Desktop\CPWING\public\gallery' -ItemType Directory -Force
$files = @('first.jpg','second.jpg','third.jpg','fourth.jpg','fifth.jpg','sixth.jpg','seventh.jpg','eightt.jpg','ninth.jpg','tenth.jpg')
foreach ($f in $files) {
    Copy-Item -Path "C:\Users\USER\Downloads\$f" -Destination "c:\Users\USER\Desktop\CPWING\public\gallery\$f" -Force
}
