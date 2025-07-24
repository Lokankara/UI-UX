for dir in react-design-patterns-2895130-*; do
    [ -d "$dir" ] || continue
    branch="${dir#react-design-patterns-2895130-}"
    newdir="react-design-patterns-${branch}"
    mv "$dir" "$newdir"
    rm -rf "$newdir/.github"
    rm -f "$newdir/LICENSE" "$newdir/NOTICE" "$newdir"/package-lock* "$newdir/README.md"
done


for dir in react-design-patterns-*; do
  [ -d "$dir" ] || continue

  rm -f "$dir/public/favicon.ico" "$dir/public/logo192.png" "$dir/public/logo512.png"

  cat > "$dir/public/index.html" <<'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

done
