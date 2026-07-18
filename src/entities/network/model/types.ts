import type { IconType } from "react-icons";

export interface Network {
  id: string;
  name: string;
  color: string;
  icon: IconType | null;
}
