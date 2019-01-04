cp -r dist editor
tar -czf zb.tar editor
rm -rf editor
scp editor.tar root@000.000.000.000:/usr/home/editor
rm -rf editor.tar
ssh root@000.000.000.000 'cd /usr/home/ && rm -rf editor && tar -xzf editor.tar && rm -rf editor.tar'