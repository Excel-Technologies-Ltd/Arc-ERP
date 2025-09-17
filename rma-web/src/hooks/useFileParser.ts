export interface ParseResult<T = any> {
  data: T[];
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

import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const useFileParser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFileType = useCallback((file: File): SupportedFileType => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'csv':
        return 'csv';
      case 'xlsx':
        return 'xlsx';
      case 'xls':
        return 'xls';
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }
  }, []);

  const parseCSV = useCallback(
    (file: File, options: FileParserOptions = {}): Promise<ParseResult> => {
      return new Promise((resolve) => {
        const defaultOptions: FileParserOptions = {
          hasHeader: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          delimiter: '',
          ...options,
        };

        Papa.parse(file, {
          header: defaultOptions.hasHeader,
          skipEmptyLines: defaultOptions.skipEmptyLines,
          dynamicTyping: defaultOptions.dynamicTyping,
          delimiter: defaultOptions.delimiter,
          encoding: defaultOptions.encoding || 'UTF-8',
          delimitersToGuess: [',', '\t', '|', ';'],
          complete: (results) => {
            resolve({
              data: results.data as any[],
              errors: results.errors.map((err) => err.message),
              meta: results.meta,
            });
          },
          error: (error) => {
            resolve({
              data: [],
              errors: [error.message],
            });
          },
        });
      });
    },
    []
  );

  const parseExcel = useCallback(
    (file: File, options: FileParserOptions = {}): Promise<ParseResult> => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, {
              type: 'array',
              cellStyles: true,
              cellDates: true,
              cellNF: true,
              sheetStubs: true,
              cellFormula: true,
            });

            // Get first sheet by default
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: options.hasHeader !== false ? 1 : undefined,
              defval: '',
              blankrows: !options.skipEmptyLines,
            });

            resolve({
              data: jsonData,
              errors: [],
              meta: {
                fields: Object.keys(jsonData[0] || {}),
              },
            });
          } catch (error) {
            resolve({
              data: [],
              errors: [(error as Error).message],
            });
          }
        };

        reader.onerror = () => {
          resolve({
            data: [],
            errors: ['Failed to read file'],
          });
        };

        reader.readAsArrayBuffer(file);
      });
    },
    []
  );

  const parseFile = useCallback(
    async (file: File, options: FileParserOptions = {}): Promise<ParseResult> => {
      setIsLoading(true);
      setError(null);

      try {
        const fileType = getFileType(file);
        let result: ParseResult;

        switch (fileType) {
          case 'csv':
            result = await parseCSV(file, options);
            break;
          case 'xlsx':
          case 'xls':
            result = await parseExcel(file, options);
            break;
          default:
            throw new Error(`Unsupported file type: ${fileType}`);
        }

        if (result.errors.length > 0) {
          setError(result.errors.join(', '));
        }

        return result;
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        return {
          data: [],
          errors: [errorMessage],
        };
      } finally {
        setIsLoading(false);
      }
    },
    [getFileType, parseCSV, parseExcel]
  );

  return {
    parseFile,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
