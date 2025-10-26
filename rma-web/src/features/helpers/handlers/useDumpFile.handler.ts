import { formatExportLabel } from '@/utils/helper';
import * as XLSX from 'xlsx';
import { useAppDispatch } from '@/stores/hooks';
import { handleModal } from '@/stores/modalSlice';
import { useNotify } from '@/hooks/useNotify';
import { flattenObject } from '@/features/helpers/utils/dump-file.utils';

export const useDumpFileHandler = ({
  data,
  resetForm,
}: {
  data: Record<string, any>[];
  resetForm: () => void;
}) => {
  const dispatch = useAppDispatch();
  const notify = useNotify();

  // Handle CSV File Export
  const handleDumpCsvFile = (formData: Record<string, boolean>) => {
    const selectedColumns = Object.keys(formData).filter((key) => formData[key]);

    // Validate selected columns
    if (!selectedColumns.length) {
      notify.warning({ message: 'No columns selected for export' });
      return;
    }

    // Filter the data
    const filteredData = data
      .map((row) => flattenObject(row))
      .map((row) =>
        selectedColumns.reduce((acc, col) => ({ ...acc, [formatExportLabel(col)]: row[col] }), {})
      );

    // Convert the data to CSV
    const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(filteredData));
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = Object.assign(document.createElement('a'), {
      href: url,
      download: `delivered_serials_${new Date().toISOString().split('T')[0]}.csv`,
      style: { display: 'none' },
    });

    // Download the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Reset form
    resetForm();

    // Close modal
    dispatch(handleModal({ type: '', isOpen: false }));
  };

  // TODO : Need to add this later if needed excel file export
  //   // Handle Excel File Export
  //   const handleDumpExcelFile = (formData: Record<string, boolean>) => {
  //     // Get selected columns
  //     const selectedColumns = Object.entries(formData)
  //       .filter(([, isSelected]) => isSelected)
  //       .map(([column]) => column);

  //     // Validate selected columns
  //     if (selectedColumns.length === 0) {
  //       notify.warning({
  //         message: 'No columns selected for export',
  //       });
  //       return;
  //     }

  //     // Filter data to only include selected columns
  //     const filteredData = data.map((row) => {
  //       const filteredRow: Record<string, any> = {};
  //       selectedColumns.forEach((column) => {
  //         // Use formatted label as key for better readability in Excel
  //         const formattedKey = formatExportLabel(column);
  //         filteredRow[formattedKey] = row[column];
  //       });
  //       return filteredRow;
  //     });

  //     // Create worksheet from filtered data
  //     const worksheet = XLSX.utils.json_to_sheet(filteredData);
  //     // Auto-size columns for better readability
  //     const maxWidths: Record<string, number> = {};
  //     selectedColumns.forEach((column) => {
  //       const formattedKey = formatExportLabel(column);
  //       maxWidths[formattedKey] = formattedKey.length;
  //     });
  //     filteredData.forEach((row) => {
  //       Object.entries(row).forEach(([key, value]) => {
  //         const valueLength = String(value || '').length;
  //         if (valueLength > maxWidths[key]) {
  //           maxWidths[key] = valueLength;
  //         }
  //       });
  //     });
  //     worksheet['!cols'] = Object.values(maxWidths).map((width) => ({
  //       wch: Math.min(width + 2, 50), // Add padding and cap at 50
  //     }));
  //     // Create workbook and add worksheet
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Delivered Serials');
  //     // Generate filename with timestamp
  //     const timestamp = new Date().toISOString().split('T')[0];
  //     const filename = `delivered_serials_${timestamp}.xlsx`;
  //     // Download the file
  //     XLSX.writeFile(workbook, filename);
  //     // Close modal
  //     dispatch(handleModal({ type: '', isOpen: false }));
  //   };

  return { handleDumpCsvFile };
};
