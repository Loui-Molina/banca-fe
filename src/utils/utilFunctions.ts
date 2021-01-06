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
  for (const char of chars){
    for (const char2 of chars){
      if (char !== char2){
        if (!result.includes(char + separator + char2) && !result.includes(char2 + separator + char)){
          result.push(char + separator + char2);
        }
      }
    }
  }
  return result;
}



export function printTicket(ticket): void{
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(
    '<html>\n' +
    '<head>\n' +
    '  <title>TICKET #10366-9236980</title>\n' +
    '</head>' +
    '<body style="font-family: monospace">\n' +
    '<div class="page">\n' +
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;">TICKET #10366-9236980</h3>\n' +
    '  <h4 style="text-align: center; border-bottom: 1px dashed #000; margin: 0">BS2324FFF22</h4>\n' +
    '  <p>Fecha: 24/12/2020</p>\n' +
    '  <p>Hora: 13:32</p>\n' +
    '  <p>Banca: Banca 1</p>\n' +
    '  <h4 style="text-align: center; border-bottom: 1px dashed #000; border-top: 1px dashed #000;margin: 0">APUESTAS</h4>\n' +
    '  <table style="width: 100%">\n' +
    '    <tr>\n' +
    '      <th style="width: 33%">Loteria</th>\n' +
    '      <th style="width: 33%">Jugada</th>\n' +
    '      <th style="width: 33%">Monto</th>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '      <td style="text-align: center">NEW YORK PM</td>\n' +
    '      <td style="text-align: center">20</td>\n' +
    '      <td style="text-align: center">$3</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '      <td style="text-align: center">NEW YORK PM</td>\n' +
    '      <td style="text-align: center">12</td>\n' +
    '      <td style="text-align: center">$3</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '      <td style="text-align: center">NEW YORK PM</td>\n' +
    '      <td style="text-align: center">44</td>\n' +
    '      <td style="text-align: center">$3</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '      <td style="text-align: center">NEW YORK PM</td>\n' +
    '      <td style="text-align: center">22</td>\n' +
    '      <td style="text-align: center">$5</td>\n' +
    '    </tr>\n' +
    '  </table>\n' +
    '  <h3 style="text-align: center;margin: 0; border-top: 1px dashed #000;border-bottom: 1px dashed #000; ">TOTAL $14</h3>\n' +
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
    '</html>'
  );
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}
