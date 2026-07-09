function doPost(e){
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nombreHoja = nombreDeHojaValido(d.idExamen || 'Respuestas');
  let hoja = ss.getSheetByName(nombreHoja) || ss.insertSheet(nombreHoja);
  if (hoja.getLastRow() === 0){
    hoja.appendRow(['Fecha','Estudiante','Examen','Materia','Nota','Puntaje','Sobre','Entrega','Detalle','Codigo']);
  }
  hoja.appendRow([new Date(), d.estudiante, d.examen, d.materia || '', d.nota, d.puntaje, d.sobre, d.entrega, d.detalle, d.codigo]);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Los nombres de pestaña en Sheets no pueden llevar [ ] * / \ ? : ni pasar de 100 caracteres.
function nombreDeHojaValido(idExamen){
  return String(idExamen).replace(/[\[\]\*\/\\\?:]/g, '-').slice(0, 100);
}
