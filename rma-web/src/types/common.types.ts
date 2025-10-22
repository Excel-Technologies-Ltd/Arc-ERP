export type InputType = 'text' | 'number' | 'password' | 'email' | 'select' | string;

export type FormField = {
  type: InputType;
  name: string;
  label: string;
  placeholder: string;
  options?: { value: string; label: string }[];
};

export type SerialFileDataType = {
  item_name: string;
  serial_no: string;
  mac_no: string;
};

export interface ParseResult {
  data: SerialFileDataType[];
  errors: string[];
  meta?: {
    fields?: string[];
    delimiter?: string;
    linebreak?: string;
    aborted?: boolean;
    truncated?: boolean;
    cursor?: number;
  };
}

export interface FileParserOptions {
  hasHeader?: boolean;
  delimiter?: string;
  skipEmptyLines?: boolean;
  dynamicTyping?: boolean;
  encoding?: string;
}

export type SupportedFileType = 'csv' | 'xlsx' | 'xls';

export interface FrappeGetCallListResponseWithCount<T> {
  message: {
    data: T[];
    count?: number;
    offset?: number;
  };
}

export interface FrappeGetCallDocResponse<T> {
  message: T;
}

// mongodb-types.ts
export type MongoOperators<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
  $nin?: T[];
  $exists?: boolean;
  $regex?: string | RegExp;
  $options?: string;
};

export type MongoFilter<T> = {
  [K in keyof T]?: T[K] | MongoOperators<T[K]>;
} & {
  $and?: MongoFilter<T>[];
  $or?: MongoFilter<T>[];
  $nor?: MongoFilter<T>[];
};

export interface GetSerialItemType {
  serial_no: string;
  item_name: string;
  warehouse: string;
  warranty_date: string;
  purchased_on: string;
}

export type GetDeliveredSerialsFilterQueryType = {
  purchase_invoice_name?: string;
  sales_invoice_name?: string;
  serial_no?: string;
};
