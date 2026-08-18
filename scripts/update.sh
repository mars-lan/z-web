#!/bin/sh
set -e

ROOT="$( cd "$(dirname "$0")" ; pwd -P )"/..

cd "$ROOT"
yarn upgrade-interactive
