import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx-js-style';

@Injectable({providedIn: 'root'})
export class ExcelUtility {

  constructor() {
  }

  public exportToExcel(totalColumn: number, tableId: string, heading: string, fileName: string): void {

    let element = document.getElementById(tableId);
    let head;

    if (!totalColumn) {
      try {

        if (element?.getElementsByTagName('tr')[0]?.childElementCount)
          totalColumn = element?.getElementsByTagName('tr')[0]?.childElementCount;
      } catch (err) { console.log(err); }
    }

    try {
      head = element?.getElementsByTagName('table')[0].tHead;
    } catch (err) {
      head = element?.getElementsByTagName('thead')[0];
      if (!head)
        head = element?.getElementsByTagName('head')[0];
    }

    if (head) {

      let tr = document.createElement('tr');
      tr.setAttribute("id", "_tmp_id1_");
      let th1 = document.createElement('th');
      th1.setAttribute("colspan", totalColumn.toString());
      th1.innerText = heading;
      tr.appendChild(th1);

      let tr1 = document.createElement('tr');
      tr1.setAttribute("id", "_tmp_id2_");
      head.prepend(tr1);
      head.prepend(tr);
    }

    const sheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    try {
      for (let i in sheet) {

        if (typeof sheet[i] != 'object')
          continue;

        let cell = XLSX.utils.decode_cell(i);

        sheet[i].s = {
          font: {
            name: 'arial'
          },
          alignment: {
            vertical: 'center',
            horizontal: 'center',
            wrapText: '1'
          }
        };

        if (cell.r == 0 && head) {

          sheet[i].s.fill = {
            patternType: 'solid',
            fgColor: { rgb: 'a8c69e' },
            bgColor: { rgb: 'a8c69e' }
          };
        }

        if (cell.r == 2) {

          sheet[i].s.fill = {
            patternType: 'solid',
            fgColor: { rgb: '9fbdb9' },
            bgColor: { rgb: '9fbdb9' }
          };
        }

        if (cell.r > 2 && !(cell.r % 2)) {
          sheet[i].s.fill = {
            patternType: 'solid',
            fgColor: { rgb: 'f7f7f7' },
            bgColor: { rgb: 'f7f7f7' }
          };
        }
      }
    } catch (err) { console.log(err); }

    document.getElementById('_tmp_id1_')?.remove();
    document.getElementById('_tmp_id2_')?.remove();

    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, sheet, 'Sheet1');
    XLSX.writeFile(workBook, fileName);
  }

  public exportToExcelOld(tableId: any, filename: any, sheetName?: any): void {

    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s: any) { return window.btoa(unescape(encodeURIComponent(s))) },
      format = function (s: any, c: any) { return s.replace(/{(\w+)}/g, function (m: any, p: any) { return c[p]; }) };

    if (!tableId.nodeType) tableId = document.getElementById(tableId)
    var ctx = { worksheet: sheetName ? sheetName : 'sheet1' || 'Worksheet', table: tableId.innerHTML }
    let element = <HTMLAnchorElement>document.createElement('a');
    element.href = uri + base64(format(template, ctx));
    element.download = filename;
    element.click();
  }
}
