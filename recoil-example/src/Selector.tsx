import { selector } from "recoil";
import { countState } from "./Atom";

export const doubledCountState = selector({
  key: "doubledCountState",
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  },
});
