import { IItemFromQueryParams } from "@/contracts/types/backend/items";

type PartialItem = Partial<IItemFromQueryParams>;

export interface ItemProps {
  info: PartialItem;
}