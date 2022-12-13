export type Button = {
  hold: boolean; // The key is held down.
  press: boolean; // Only true one frame after key is pressed
  lock: boolean; // Locks press functionality
};

export const buttonDefaults: Button = {
  hold: false,
  press: false,
  lock: false,
};
