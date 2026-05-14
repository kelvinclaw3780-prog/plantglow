import zipfile
import os

src = r'C:\Users\kelvi\.openclaw\workspace-appcreator\plantglow'
out = r'C:\Users\kelvi\.openclaw\workspace-appcreator\plantglow_backup.zip'

with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(src):
        # Skip .git and node_modules to keep size manageable
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__', '.firebase']]
        for file in files:
            fp = os.path.join(root, file)
            arcname = os.path.relpath(fp, os.path.dirname(src))
            zf.write(fp, arcname)

print(f'Created: {out}')
print(f'Size: {os.path.getsize(out) / 1024 / 1024:.1f} MB')