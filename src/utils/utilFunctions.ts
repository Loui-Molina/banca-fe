import {Banking, BetDto, PlayNumbers} from 'local-packages/banca-api';

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
  numbers += formatResult(playNumbers.first);
  if (playNumbers.second) {
    numbers += '-' + formatResult(playNumbers.second);
  }
  if (playNumbers.third) {
    numbers += '-' + formatResult(playNumbers.third);
  }
  if (playNumbers.fourth) {
    numbers += '-' + formatResult(playNumbers.fourth);
  }
  if (playNumbers.fifth) {
    numbers += '-' + formatResult(playNumbers.fifth);
  }
  if (playNumbers.sixth) {
    numbers += '-' + formatResult(playNumbers.sixth);
  }
  if (playNumbers.seventh) {
    numbers += '-' + formatResult(playNumbers.seventh);
  }
  return numbers;
}

export function formatResult(value: number): string {
  return String(value).padStart(2, '0');
}
