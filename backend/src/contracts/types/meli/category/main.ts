export interface ICategoryResponseFromMeliAPI {
  id: string;
  name: string;
  picture: string;
  permalink: null;
  total_items_in_this_category: number;
  path_from_root: IPathFromRoot[];
  children_categories: IChildrenCategory[];
  attribute_types: string;
  settings: ICategorySettings;
  channels_settings: IChannelsSetting[];
  meta_categ_id: null;
  attributable: boolean;
  date_created: Date;
}

export interface IChannelsSetting {
  channel: string;
  settings: IChannelsSettingSettings;
}

export interface IChannelsSettingSettings {
  minimum_price?: number;
  status?: string;
  buying_modes?: string[];
  immediate_payment?: string;
}

export interface IChildrenCategory {
  id: string;
  name: string;
  total_items_in_this_category: number;
}

export interface IPathFromRoot {
  id: string;
  name: string;
}

export interface ICategorySettings {
  adult_content: boolean;
  buying_allowed: boolean;
  buying_modes: string[];
  catalog_domain: string;
  coverage_areas: string;
  currencies: string[];
  fragile: boolean;
  immediate_payment: string;
  item_conditions: string[];
  items_reviews_allowed: boolean;
  listing_allowed: boolean;
  max_description_length: number;
  max_pictures_per_item: number;
  max_pictures_per_item_var: number;
  max_sub_title_length: number;
  max_title_length: number;
  max_variations_allowed: number;
  maximum_price: null;
  maximum_price_currency: string;
  minimum_price: number;
  minimum_price_currency: string;
  mirror_category: null;
  mirror_master_category: null;
  mirror_slave_categories: string[];
  price: string;
  reservation_allowed: string;
  restrictions: string[];
  rounded_address: boolean;
  seller_contact: string;
  shipping_options: string[];
  shipping_profile: string;
  show_contact_information: boolean;
  simple_shipping: string;
  stock: string;
  sub_vertical: string;
  subscribable: boolean;
  tags: string[];
  vertical: string;
  vip_subdomain: string;
  buyer_protection_programs: string[];
  status: string;
}
