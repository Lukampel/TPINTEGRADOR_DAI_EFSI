#!/bin/sh
# Activa los hooks versionados. Correr una vez por clon: sh scripts/setup-hooks.sh
chmod +x .githooks/commit-msg .githooks/pre-push
git config core.hooksPath .githooks
echo "Hooks activados (core.hooksPath=.githooks)."
echo "Verificá tu identidad: git config user.name && git config user.email"
