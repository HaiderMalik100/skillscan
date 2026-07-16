import mammoth from 'mammoth';

// Use pdfjs-dist instead of pdf-parse (no TT warnings)
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

export async function extractTextFromFile(file) {
  let text = '';

  if (file.originalname.endsWith('.pdf')) {
    const uint8Array = new Uint8Array(file.buffer);
    const pdf = await pdfjs.getDocument({
      data: uint8Array,
      useSystemFonts: true,
      verbosity: 0 // hides TT warnings
    }).promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      fullText += pageText + ' ';
    }
    text = fullText;
  } else {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    text = result.value;
  }

  text = text.replace(/\s+/g, ' ').trim();
  if (text.length < 50) throw new Error('Resume too short or unreadable - use single column PDF');
  return text.slice(0, 6000);
}