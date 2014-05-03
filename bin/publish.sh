#!/bin/bash
git checkout gh-pages && git merge --no-ff --no-commit master && rm .gitignore && cp .gitignore.gh-pages .gitignore && gulp && git add --all && git commit -m "Merging 'master' into 'gh-pages'" && git checkout master && git push