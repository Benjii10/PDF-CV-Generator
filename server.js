const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-pdf', (req, res) => {
  const doc = new PDFDocument();
  let filename = req.body.filename || 'document';
  filename = encodeURIComponent(filename) + '.pdf';
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  const content = req.body.content || 'Contenu par défaut';

  doc.y = 300;
  doc.text(content, 50, 50);
  doc.pipe(res);
  doc.end();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.static('public'));
