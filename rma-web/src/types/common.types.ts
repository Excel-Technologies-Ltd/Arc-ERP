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
