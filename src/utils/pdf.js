import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDFFromElement = async (element, studentName = 'student') => {
    if (!element) return;
    await new Promise(res => requestAnimationFrame(res));
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, width: element.scrollWidth, height: element.scrollHeight, backgroundColor: '#ffffff' });
    let imgData = canvas.toDataURL('image/png');
    if (!imgData.startsWith('data:image/png')) imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const format = imgData.startsWith('data:image/png') ? 'PNG' : 'JPEG';
    pdf.addImage(imgData, format, 0, 0, pdfWidth, pdfHeight);
    pdf.save(`report-card-${(studentName || 'student').replace(/\s+/g, '-')}.pdf`);
};

// ---------- PDF generation unchanged ----------
export const generatePDF = async (element, studentName) => {
    if (!element) return;
    await new Promise(res => requestAnimationFrame(res));
    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        backgroundColor: '#ffffff'
    });
    let imgData = canvas.toDataURL('image/png');
    if (!imgData.startsWith('data:image/png')) {
        imgData = canvas.toDataURL('image/jpeg', 0.92);
    }
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const format = imgData.startsWith('data:image/png') ? 'PNG' : 'JPEG';
    pdf.addImage(imgData, format, 0, 0, pdfWidth, pdfHeight);
    pdf.save(`report-card-${(studentName || 'student').replace(/\s+/g, '-')}.pdf`);
};