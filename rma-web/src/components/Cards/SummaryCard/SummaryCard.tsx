import React from 'react';

type Props = {
  supplier: string;
  invoiceNo: string;
  postingDate: string; // e.g. "Jul 7, 2025"
  warehouse: string;
  status: string;
  poNumber: string;
  className?: string;
  gridCols?: number; // Add this new prop
};

export default function SummaryCard({
  supplier,
  invoiceNo,
  postingDate,
  warehouse,
  status,
  poNumber,
  className = '',
  gridCols = 3, // Default to 3 columns
}: Props) {
  // Map grid columns to Tailwind classes
  const getGridColsClass = (cols: number) => {
    const gridColsMap: Record<number, string> = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5',
      6: 'md:grid-cols-6',
    };
    return gridColsMap[cols] || 'md:grid-cols-3';
  };

  return (
    <div
      className={
        'rounded-xl border border-slate-200 bg-white shadow-sm ' + 'p-4 sm:p-5 md:p-6 ' + className
      }
    >
      <div className={`grid grid-cols-1 gap-y-6 ${getGridColsClass(gridCols)} md:gap-y-8`}>
        {/* Row 1 */}
        <Field label='Supplier' value={supplier} />
        <Field label='Purchase Invoice Number' value={invoiceNo} />
        <Field label='Posting Date' value={postingDate} />

        {/* Row 2 */}
        <Field label='Warehouse' value={warehouse} />
        <div className='flex flex-col'>
          <span className='text-xs font-medium uppercase tracking-wide text-slate-500'>Status</span>
          <span className='mt-1 text-base font-medium text-slate-900'>{status}</span>
        </div>
        <Field label='Purchase Order Number' value={poNumber} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      <span className='text-xs uppercase tracking-wide text-primary'>{label}</span>
      <span className='mt-1 text-base font-medium text-slate-900'>{value}</span>
    </div>
  );
}
