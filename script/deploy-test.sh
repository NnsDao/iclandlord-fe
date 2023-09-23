#!/usr/bin/env bash
set -eu
set -o pipefail
# set +e

export canisterType=${1:-test}
# canister=${2:-market}
echo "Deploy ${canisterType} canister"
# build test
npm run build-test
# install code
dfx canister install --all
