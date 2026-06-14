import re
f = open(r'C:\Users\kelvi\.openclaw\workspace-appcreator\plantglow\index.html', 'r', encoding='utf-8')
c = f.read()
f.close()
c = c.replace('onclick="openLoginRequiredModal()" class="absolute top-2 right-2"', 'onclick="openLoginRequiredModal(); event.stopPropagation();" class="absolute top-2 right-2"')
open(r'C:\Users\kelvi\.openclaw\workspace-appcreator\plantglow\index.html', 'w', encoding='utf-8').write(c)
print("Done")