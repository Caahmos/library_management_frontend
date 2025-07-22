import * as XLSX from 'xlsx';

interface ExportField {
  key: string;
  label: string;
}

interface GenericObject {
  [key: string]: any;
}

export const exportToXLSX = (
  data: GenericObject[],
  fields: ExportField[],
  filename = 'export.xlsx'
) => {
  if (!data || data.length === 0) return;

  const formattedData = data.map(item => {
    const row: { [key: string]: any } = {};
    fields.forEach(field => {
      row[field.label] = item[field.key];
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Planilha");

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  };

  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
