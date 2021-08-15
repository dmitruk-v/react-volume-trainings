const CYCLE_NONE = "none" as const;
const CYCLE_RELAX = "relax" as const;
const CYCLE_VOLUME = "volume" as const;
const CYCLE_VOLUME_STRENGTH = "volume-strength" as const;
const CYCLE_STRENGTH = "strength" as const;
const CYCLE_FAT_BURN = "fat-burn" as const;

const CYCLES = [
  CYCLE_NONE, CYCLE_RELAX, CYCLE_VOLUME, CYCLE_VOLUME_STRENGTH, CYCLE_STRENGTH, CYCLE_FAT_BURN
] as const;

export { CYCLES };