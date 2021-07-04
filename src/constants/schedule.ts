const CYCLE_NONE = "none" as const;
const CYCLE_RELAX = "relax" as const;
const CYCLE_VOLUME = "volume" as const;
const CYCLE_VOLUME_STRENGTH = "volume-strength" as const;
const CYCLE_STRENGTH = "strength" as const;
const CYCLE_FAT_BURN = "fat-burn" as const;

type Cycles = [
  typeof CYCLE_NONE,
  typeof CYCLE_RELAX,
  typeof CYCLE_VOLUME,
  typeof CYCLE_VOLUME_STRENGTH,
  typeof CYCLE_STRENGTH,
  typeof CYCLE_FAT_BURN
];

const CYCLES: Cycles = [CYCLE_NONE, CYCLE_RELAX, CYCLE_VOLUME, CYCLE_VOLUME_STRENGTH, CYCLE_STRENGTH, CYCLE_FAT_BURN];

type Cycle = Cycles[number];

export type { Cycles, Cycle };
export { CYCLES };