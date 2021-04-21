import {Banking, BetDto, PlayDto, PlayNumbers} from '../../local-packages/banca-api';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export function uuidv4(): string {
  // tslint:disable-next-line:only-arrow-functions
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // tslint:disable-next-line:one-variable-per-declaration no-bitwise prefer-const
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function reverseString(str): string {
  return str.split('').reverse().join('');
}

export function getCombinations(chars: string[], length: number = null, separator: string = ''): string[] {
  const result = [];
  for (const char of chars) {
    for (const char2 of chars) {
      if (char !== char2) {
        if (!result.includes(char + separator + char2) && !result.includes(char2 + separator + char)) {
          result.push(char + separator + char2);
        }
      }
    }
  }
  return result;
}

export function whatsappShare(bet: BetDto, banking: Banking): string {
  // TODO Ver si tiene user y ponerle el numero como &phone=+5493543573840
  if (bet && bet._id && banking) {
    let text = 'Hola! 👋🏼👋🏼 \n\n'; // TODO poner nombre de usuario
    text += banking.header + '\n';
    text += 'Este es el detalle de tu ticket 🎟️:\n';
    text += '🆔:  *' + bet._id.toString() + '*\n';
    text += '🆔 SN:  *' + bet.sn + '*\n';
    text += '📅: ' + new Date(bet.date).toLocaleString() + '\n\n';
    text += 'Tus jugadas son:\n';
    let sum = 0;
    bet.plays
      .sort((a, b) => (a.lotteryName.toLowerCase() < b.lotteryName.toLowerCase()
        ? -1 : (a.lotteryName.toLowerCase() > b.lotteryName.toLowerCase()
          ? 1 : 0))).map(play => {
      text += `${play.lotteryName} - *${showParsedNumbers(play.playNumbers)}* - MONTO: $${play.amount} - TIPO: ${play.playType}\n`;
      // TODO traducir el tipo de jugada
      sum += play.amount;
    });
    text += `Total: $${sum}\n`;
    text += 'Gracias por elegirnos! 🙏🏼🙏🏼';
    text += 'Y buena suerte!! 🤞🏼🍀';
    text += '\n' + banking.footer;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  }
}


export function shareTicket(bet: BetDto, banking: Banking): void {
  {
    const navigator = window.navigator as any;
    if (navigator.share && bet && bet._id && banking) {

      let text = banking.header + '\n\n';
      text += 'ID:  *' + bet._id.toString() + '*\n';
      text += 'SN:  *' + bet.sn + '*\n';
      text += 'Fecha: ' + new Date(bet.date).toLocaleString() + '\n\n';
      let sum = 0;
      let lastLottery: string;

      bet.plays
        .sort((a, b) => (a.lotteryName.toLowerCase() < b.lotteryName.toLowerCase()
          ? -1 : (a.lotteryName.toLowerCase() > b.lotteryName.toLowerCase()
            ? 1 : 0))).map(play => {
          if (lastLottery !== play.lotteryName) {
            if (lastLottery) {
              text += '\n';
            }
            text += `--------------\n`;
            text += `${play.lotteryName.toUpperCase()}\n`;

          }
          text += `*${showParsedNumbers(play.playNumbers)}*   -   $${play.amount}   -   ${play.playType}\n`;
          // TODO traducir el tipo de jugada
          sum += play.amount;
          lastLottery = play.lotteryName;
        }
      );
      text += `Total: $${sum}\n`;
      text += '\n' + banking.footer;
      navigator
        .share({
          title: 'TICKET ' + bet._id.toString(),
          text
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error));
    } else {
      alert('share not supported');
    }
  }
}

export function printTicket(bet: BetDto, banking: Banking): void {
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  let toWrite = '<html>\n' +
    '<head>\n' +
    '  <title>TICKET #' + bet._id.toString() + '</title>\n' +
    '  <style type="text/css" media="print">\n' +
    '    @media print {\n' +
    '      html, body {\n' +
    '        width: 80mm;\n' +
    '        position:absolute;\n' +
    '      }\n' +
    '      @page\n' +
    '      {\n' +
    '        \n' +
    '        margin: 6mm;\n' +
    '      }\n' +
    '      html, body\n' +
    '      {\n' +
    '        \n' +
    '        width: 99%;\n' +
    '      }\n' +
    '    }\n' +
    '  </style>\n' +
    '</head>' +
    '<body style="font-family: monospace; margin: 0; width:100%">\n' +
    '<div class="page">\n' +
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;">' + banking.header + '</h3>\n' +
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;">TICKET #' + bet._id.toString() + '</h3>\n' +
    '  <h4 style="text-align: center; border-bottom: 1px dashed #000; margin: 0">SN:' + bet.sn + '</h4>\n' +
    '  <p>Fecha: ' + new Date(bet.date).toLocaleString() + '</p>\n' +
    '  <h4 style="text-align: center; border-bottom: 1px dashed #000; border-top: 1px dashed #000;margin: 0">JUGADAS</h4>\n' +
    '  <table style="width: 100%">\n' +
    '    <tr>\n' +
    '      <th style="width: 33%">Loteria</th>\n' +
    '      <th style="width: 33%">Jugada</th>\n' +
    '      <th style="width: 33%">Monto</th>\n' +
    '      <th style="width: 33%">Tipo</th>\n' +
    '    </tr>\n';
  let total = 0;
  bet.plays
    .sort((a, b) =>
      (a.lotteryName.toLowerCase() < b.lotteryName.toLowerCase()
        ? -1 : (a.lotteryName.toLowerCase() > b.lotteryName.toLowerCase()
          ? 1 : 0)))
    .map((play) => {
      total += play.amount;
      toWrite += '    <tr>\n' +
        '      <td style="text-align: center">' + play.lotteryName + '</td>\n' +
        '      <td style="text-align: center">' + showParsedNumbers(play.playNumbers) + '</td>\n' +
        '      <td style="text-align: center">$' + play.amount + '</td>\n' +
        '      <td style="text-align: center">' + play.playType + '</td>\n' +
        '    </tr>\n';
    });

  toWrite += '  </table>\n' +
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;border-bottom: 1px dashed #000; ">TOTAL $' + total + '</h3>\n' +
    // tslint:disable-next-line:max-line-length
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;border-bottom: 1px dashed #000; ">' + banking.footer + '</h3>\n' +
    '</div>\n' +
    '</body>\n' +
    '</html>';
  WindowPrt.document.write(toWrite);
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}

export function showParsedNumbers(playNumbers: PlayNumbers): string {
  let numbers = '';
  // Iterate through the properties of the PlayNumbers
  const plays: string[] = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'];
  for (const [i, play] of plays.entries()) {
    if (playNumbers[play] || playNumbers[play] === 0) {
      numbers += (((i !== 0) ? ('-') : ('')) + formatResult(playNumbers[play]));
    }
  }
  return numbers;
}

export function formatResult(value: number): string {
  return String(value).padStart(2, '0');
}


export function exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = {Sheets: {data: worksheet}, SheetNames: ['data']};
  const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
  saveAsExcelFile(excelBuffer, excelFileName);
}

export function saveAsExcelFile(buffer: any, fileName: string): void {
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
  FileSaver.saveAs(data, fileName + '-' + new Date().getTime() + EXCEL_EXTENSION);
}

export function getBetStatus(bet: BetDto): string {
  switch (bet.betStatus) {
    case 'cancelled':
      return 'CANCELADO';
    case 'claimed':
      return 'RECLAMADO';
    case 'expired':
      return 'EXPIRADO';
    case 'loser':
      return 'PERDEDOR';
    case 'pending':
      return 'PENDIENTE';
    case 'winner':
      return 'GANADOR';
    default:
      return 'Undefined';
  }
}

export function getBetStatusColor(bet: BetDto): string {
  switch (bet.betStatus) {
    case 'cancelled':
      return 'brown';
    case 'claimed':
      return 'darkgreen';
    case 'expired':
      return 'red';
    case 'loser':
      return 'red';
    case 'pending':
      return 'blue';
    case 'winner':
      return 'green';
    default:
      return '#000';
  }
}

export function getTotalPlays(plays: Array<PlayDto>): number {
  return plays.reduce((acc, val) => acc += val.amount, 0);
}
