import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function rebuildResumeWithText(originalPdfBytes: Uint8Array, editedText: string): Promise<Uint8Array> {
  // Load the original PDF
  const pdfDoc = await PDFDocument.load(originalPdfBytes);
  
  // Create a new PDF and copy pages
  const newPdfDoc = await PDFDocument.create();
  const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [0]);
  newPdfDoc.addPage(copiedPage);

  // Embed font
  const helveticaFont = await newPdfDoc.embedFont(StandardFonts.Helvetica);
  
  const pages = newPdfDoc.getPages();
  const firstPage = pages[0];
  
  // Define the area where the main text is expected (adjust coordinates as needed)
  const x = 50;
  const y = 300; // Starting position from bottom
  const width = 450;
  const height = 400;

  // "White-Box Eraser": Cover the area with a white rectangle
  firstPage.drawRectangle({
    x: x,
    y: y,
    width: width,
    height: height,
    color: rgb(1, 1, 1), // White
  });
  
  // Draw the new text over it
  firstPage.drawText(editedText, {
    x: x + 5,
    y: y + height - 20,
    size: 10,
    font: helveticaFont,
    maxWidth: width - 10,
    color: rgb(0, 0, 0), // Black text
  });

  return await newPdfDoc.save();
}
