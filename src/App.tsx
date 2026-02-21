import { useState } from 'react';
import { AdmissionForm } from './components/AdmissionForm';
import { ApplicationPDF } from './components/ApplicationPDF';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { AdmissionFormData, ApplicationData } from './types';
import { Printer, Download, ArrowLeft, CheckCircle2, Loader2, X, Eye, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [submittedData, setSubmittedData] = useState<ApplicationData | null>(null);
  const [previewData, setPreviewData] = useState<ApplicationData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFormSubmit = (data: AdmissionFormData) => {
    // Get next application number from localStorage
    const lastNum = parseInt(localStorage.getItem('icop_app_count') || '0');
    const nextNum = lastNum + 1;
    localStorage.setItem('icop_app_count', nextNum.toString());
    
    // Format: ICOP/2026/01, ICOP/2026/02, etc.
    const paddedNum = nextNum.toString().padStart(2, '0');
    const applicationId = `ICOP/2026/${paddedNum}`;
    
    setSubmittedData({
      ...data,
      applicationId,
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreview = (data: AdmissionFormData) => {
    setPreviewData({
      ...data,
      applicationId: 'ICOP/2026/XX',
    });
  };

  const handleDownload = async () => {
    const dataToUse = submittedData || previewData;
    if (!dataToUse) return;
    
    try {
      setIsDownloading(true);
      const blob = await pdf(<ApplicationPDF data={dataToUse} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `CET_Application_${dataToUse.applicationId}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = async () => {
    const dataToUse = submittedData || previewData;
    if (!dataToUse) return;
    
    try {
      setIsDownloading(true);
      const blob = await pdf(<ApplicationPDF data={dataToUse} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      const printWindow = window.open(url, '_blank');
      if (printWindow) {
        printWindow.focus();
      } else {
        alert('Please allow popups to print the document.');
      }
    } catch (error) {
      console.error('Error preparing print:', error);
      alert('Failed to prepare document for printing.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setPreviewData(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <AnimatePresence>
        {previewData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Eye className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tighter text-lg leading-none">Print Preview</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Review your application before final submission</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={() => setPreviewData(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 p-4 overflow-hidden">
                <PDFViewer className="w-full h-full border-none rounded-lg shadow-inner">
                  <ApplicationPDF data={previewData} />
                </PDFViewer>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium italic">
                  * This is a preview mode. Application ID will be generated after final submission.
                </p>
                <button
                  onClick={() => setPreviewData(null)}
                  className="bg-slate-900 text-white px-8 py-2.5 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {submittedData ? (
        <div className="p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Success Header */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Application Submitted Successfully!</h2>
                  <p className="text-slate-500 text-sm font-medium">Application ID: <span className="text-slate-900 font-bold">{submittedData.applicationId}</span></p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 border border-slate-300 rounded-sm hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Fill New Form
                </button>

                <button
                  onClick={handlePrint}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 border border-slate-300 rounded-sm hover:bg-slate-50 transition-colors disabled:opacity-70"
                >
                  <Printer className="w-4 h-4" />
                  Print PDF
                </button>
                
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-6 py-2 text-sm font-bold bg-slate-900 text-white rounded-sm hover:bg-slate-800 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="bg-white border border-slate-200 shadow-xl rounded-sm overflow-hidden">
              <div className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest">Document Preview (A4)</span>
                <div className="flex items-center gap-2 text-[10px] opacity-70">
                  <Printer className="w-3 h-3" />
                  <span>Use browser print for physical copy</span>
                </div>
              </div>
              <div className="h-[800px] w-full bg-slate-200 p-4">
                <PDFViewer className="w-full h-full border-none shadow-inner">
                  <ApplicationPDF data={submittedData} />
                </PDFViewer>
              </div>
            </div>
            
            <div className="mt-8 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
              Official Document • State Common Entrance Test Cell • 2026-27
            </div>
          </div>
        </div>
      ) : (
        <>
          <AdmissionForm onSubmit={handleFormSubmit} onPreview={handlePreview} />
          
          <footer className="max-w-4xl mx-auto py-8 px-4 border-t border-slate-200 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              © 2026 State Common Entrance Test Cell, Maharashtra State. All Rights Reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
