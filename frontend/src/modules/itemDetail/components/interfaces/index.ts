import { IItemDetail } from "@/contracts/types/backend/items";

type PartialItemDetails = Partial<IItemDetail>;

export interface ItemDetailsProps {
  details: PartialItemDetails;
}