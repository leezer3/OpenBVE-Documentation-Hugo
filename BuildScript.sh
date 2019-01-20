#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

echo "Building site using Hugo, please wait...."
hugo
retVal=$?
if [ $retVal -eq 1 ]; then
    echo "Hugo build failed with error code "+$retVal
	exit $retVal
fi
echo "Hugo build completed successfully."
cd ..
if [ -n "$GITHUB_API_KEY" ]; then
	echo "Beginning deploy"
    git clone --depth=50 --branch=gh-pages https://github.com/leezer3/OpenBVE-Site.git OpenBVE-Site
    rm -rf OpenBVE-Site/documentation_hugo
    mv OpenBVE-Documentation-Hugo/public OpenBVE-Site/documentation_hugo
	cd OpenBVE-Site
    git add -f --ignore-errors --all
    git -c user.name='travis' -c user.email='travis' commit -m "Automatic documentation update"
    git push -f -q https://leezer3:$GITHUB_API_KEY@github.com/leezer3/OpenBVE-Site
	echo "Deploy complete"
else
	echo "Not deploying- Wrong branch."
fi
