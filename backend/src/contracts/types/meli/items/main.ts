export interface IItemsReponseFromMeliAPI {
  site_id: string;
  country_default_time_zone: string;
  query: string;
  paging: Paging;
  results: Result[];
  sort: Sort;
  available_sorts: Sort[];
  filters: Filter[];
  available_filters: AvailableFilter[];
  pdp_tracking: PDPTracking;
  user_context: null;
}

export interface AvailableFilter {
  id: string;
  name: string;
  type: string;
  values: AvailableFilterValue[];
}

export interface AvailableFilterValue {
  id: string;
  name: string;
  results: number;
}

export interface Sort {
  id: string;
  name: string;
}

export interface Filter {
  id: string;
  name: string;
  type: string;
  values: FilterValue[];
}

export interface FilterValue {
  id: string;
  name: string;
  path_from_root?: Sort[];
}

export interface Paging {
  total: number;
  primary_results: number;
  offset: number;
  limit: number;
}

export interface PDPTracking {
  group: boolean;
  product_info: ProductInfo[];
}

export interface ProductInfo {
  id: string;
  score: number;
  status: string;
}

export interface Result {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: null | string;
  listing_type_id: string;
  sanitized_title: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id: string;
  order_backend: number;
  price: number;
  original_price: number;
  sale_price: SalePrice;
  available_quantity: number;
  official_store_id: number | null;
  official_store_name?: string;
  use_thumbnail_id: boolean;
  accepts_mercadopago: boolean;
  shipping: Shipping;
  stop_time: Date;
  seller: Seller;
  attributes: ResultAttribute[];
  installments: Installments;
  winner_item_id: null;
  catalog_listing: boolean;
  discounts: null;
  promotions: string[];
  inventory_id: null | string;
  variation_id?: string;
  variation_filters?: string[];
  variations_data?: { [key: string]: VariationsDatum };
}

export interface ResultAttribute {
  id: string;
  name: string;
  value_id: null | string;
  value_name: null | string;
  attribute_group_id: string;
  attribute_group_name: string;
  value_struct: Struct | null;
  values: AttributeValue[];
  source: number;
  value_type: string;
}

export interface Struct {
  number: number;
  unit: string;
}

export interface AttributeValue {
  id: null | string;
  name: null | string;
  struct: Struct | null;
  source: number;
}

export interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
  metadata: InstallmentsMetadata;
}

export interface InstallmentsMetadata {
  meliplus_installments: boolean;
  additional_bank_interest: boolean;
}

export interface SalePrice {
  price_id: string;
  amount: number;
  conditions: Conditions;
  currency_id: string;
  exchange_rate: null;
  payment_method_prices: string[];
  payment_method_type: string;
  regular_amount: number | null;
  type: string;
  metadata: SalePriceMetadata;
}

export interface Conditions {
  eligible: boolean;
  context_restrictions: string[];
  start_time: Date | null;
  end_time: Date | null;
}


export interface SalePriceMetadata {
  funding_mode?: string;
  campaign_discount_percentage?: number;
  order_item_price?: number;
  promotion_type?: string;
  campaign_end_date?: Date;
  campaign_id?: string;
  promotion_id?: string;
  variation?: string;
  discount_meli_amount?: number;
  experiment_id?: string;
}

export interface Seller {
  id: number;
  nickname: string;
}

export interface Shipping {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  mode: string;
  tags: string[];
  benefits: null;
  promise: null;
  shipping_score: number;
}


export interface VariationsDatum {
  thumbnail: string;
  ratio: string;
  name: string;
  pictures_qty: number;
  price: number;
  user_product_id: string;
  attributes: VariationsDatumAttribute[];
  attribute_combinations: null;
}

export interface VariationsDatumAttribute {
  id: string;
  name: string;
  value_name: string;
  value_type: string;
}

export interface IItemDescriptionFromMeliResponse {
  text: string;
  plain_text: string;
  last_updated: Date;
  date_created: Date;
  snapshot: ISnapshotToDescription;
}

export interface ISnapshotToDescription {
  url: string;
  width: number;
  height: number;
  status: string;
}
