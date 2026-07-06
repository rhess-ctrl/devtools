#!/usr/bin/env bash
# ---------------------------------------------------------------------
# ** for whatever reason, bru is continually complaining about these...

bru::trust() {
  local FORMULA=(
    f/mcptools/mcp
    ksdme/tap/ut
    mistertea/et/et
    rjyo/moshi/moshi-hook
    rshelekhov/tap/lazymake
  )
  local TAPS=(
    charmbracelet/tap
    github/gh
    teamookla/speedtest
    wedow/tools
  )
  for formula in "${FORMULA[@]}"
  do
    brew trust --formula ${formula}
  done
  for tap in "${TAPS[@]}"
  do
    brew trust ${tap}
  done
}
