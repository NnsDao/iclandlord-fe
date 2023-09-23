#!/usr/bin/env bash
set -eu
set -o pipefail
# set +e

export canisterType=${1:-prod}
echo "Deploy ${canisterType} canister"

# build prod
npm run build-prod
# install code
dfx canister install --all
