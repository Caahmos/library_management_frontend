import ExcelJS from 'exceljs';

interface ExportField {
  key: string;
  label: string;
}

interface GenericObject {
  [key: string]: any;
}

export const exportToExcel = async (
  data: GenericObject[],
  fields: ExportField[],
  filename = 'export.xlsx'
) => {
  if (!data || data.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Planilha');

  // Cabeçalho
  worksheet.addRow(fields.map(f => f.label));

  // Dados
  data.forEach(item => {
    const row = fields.map(f => item[f.key]);
    worksheet.addRow(row);
  });

  // Gerar buffer e baixar
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};