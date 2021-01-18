import {BetDto, PlayNumbers} from 'local-packages/banca-api';

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


export function printTicket(bet: BetDto): void {
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  let toWrite = '<html>\n' +
    '<head>\n' +
    '  <title>TICKET #' + bet._id.toString() + '</title>\n' +
    '</head>' +
    '<body style="font-family: monospace">\n' +
    '<div class="page">\n' +
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;">TICKET #' + bet._id.toString() + '</h3>\n' +
    '  <h4 style="text-align: center; border-bottom: 1px dashed #000; margin: 0">SN:' + bet.sn + '</h4>\n' +
    '  <p>Fecha: ' + bet.date.toString() + '</p>\n' +
    '  <p>Banca: </p>\n' + // TODO pasar banca
    '  <h4 style="text-align: center; border-bottom: 1px dashed #000; border-top: 1px dashed #000;margin: 0">JUGADAS</h4>\n' +
    '  <table style="width: 100%">\n' +
    '    <tr>\n' +
    '      <th style="width: 33%">Loteria</th>\n' +
    '      <th style="width: 33%">Jugada</th>\n' +
    '      <th style="width: 33%">Monto</th>\n' +
    '    </tr>\n';
  let total = 0;
  bet.plays.map((play) => {
    total += play.amount;
    toWrite += '    <tr>\n' +
      '      <td style="text-align: center">' + play.lotteryId + '</td>\n' + // TODO pasar loteria
      '      <td style="text-align: center">' + showParsedNumbers(play.playNumbers) + '</td>\n' +
      '      <td style="text-align: center">$' + play.amount + '</td>\n' +
      '    </tr>\n';
  });

  toWrite += '  </table>\n' +
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;border-bottom: 1px dashed #000; ">TOTAL $' + total + '</h3>\n' +
    '</div>\n' +
    '</body>\n' +
    '<style>\n' +
    '  body {\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    background-color: #FAFAFA;\n' +
    '    font: 12pt "Tahoma";\n' +
    '  }\n' +
    '\n' +
    '  * {\n' +
    '    box-sizing: border-box;\n' +
    '    -moz-box-sizing: border-box;\n' +
    '  }\n' +
    '\n' +
    '  .page {\n' +
    '    width: 21cm;\n' +
    '    min-height: 29.7cm;\n' +
    '    padding: 2cm;\n' +
    '    margin: 1cm auto;\n' +
    '    border: 1px #D3D3D3 solid;\n' +
    '    border-radius: 5px;\n' +
    '    background: white;\n' +
    '    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);\n' +
    '  }\n' +
    '\n' +
    '  @page {\n' +
    '    size: A4;\n' +
    '    margin: 0;\n' +
    '  }\n' +
    '\n' +
    '  @media print {\n' +
    '    .page {\n' +
    '      margin: 0;\n' +
    '      border: initial;\n' +
    '      border-radius: initial;\n' +
    '      width: initial;\n' +
    '      min-height: initial;\n' +
    '      box-shadow: initial;\n' +
    '      background: initial;\n' +
    '      page-break-after: always;\n' +
    '    }\n' +
    '  }\n' +
    '</style>\n' +
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
