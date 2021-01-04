git checkout gh-pages
git reset --hard origin/master
npm run build
rm .gitignore
rm -rf node_modules
mv ./build/* .
git add .
git commit -m "deploy"
git push origin gh-pages --force
git checkout master