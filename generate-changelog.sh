#!/usr/bin/env bash
# npm publish with goodies
# prerequisites:
# Create a github access token [https://github.com/settings/tokens] and save it in a file named 'generate-changelog-token.local.txt'
# Run this script with required argument `patch`/`minor`/`major`/`<version>`
# defaults to conventional-recommended-bump
# and optional argument preset `angular`/ `jquery` ...
# defaults to conventional-commits-detector


githubToken=$(cat ./generate-changelog-token.local.txt)
echo 'Updating changelog...'
./node_modules/.bin/conventional-changelog -i CHANGELOG.md -s -p angular
echo 'Adding changelog changes to git...'
git add CHANGELOG.md
version=$(./node_modules/.bin/json -f package.json version)
echo '============================ To commit changelog changes to git run the following ============================'
echo 'git commit -m "docs(CHANGELOG): '$version'"'
echo 'git tag '$version
echo 'git push --follow-tags'
echo './node_modules/.bin/conventional-github-releaser -t ' ${githubToken} ' -p angular'
echo '===================================================================================='

