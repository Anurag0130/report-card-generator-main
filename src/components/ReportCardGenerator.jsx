import React, { useState, useRef, useEffect } from 'react';
import {
  GripVertical,
  Download,
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
  Users,
  Settings,
  Monitor,
  MoveDiagonal
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { sampleStudentsData, initialFields, colorSchemes, headerStyles } from '../data/dummyData';
import { hexToRgba } from '../utils/hexToRgba';
import profileDummy from '../assets/profileDummy.png';
import schoolDummy from '../assets/schoolDummy.png';



const evaluateExpression = (expr, data) => {
  if (!expr) return '';
  // Replace occurrences of {{path}} with the actual value from `data`
  return expr.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
    const keys = path.trim().split('.');
    let value = data;
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return '';
    }
    return value;
  });
};

const ReportCardGenerator = () => {

  const [masterFields] = useState(initialFields); // available fields you can drag
  const [placedLayout, setPlacedLayout] = useState(initialFields.slice()); // fields currently placed on the grid
  const [draggedItem, setDraggedItem] = useState(null); // item currently being dragged
  const [dragOverCell, setDragOverCell] = useState(null); // which cell is being hovered while dragging
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
  const [headerStyle, setHeaderStyle] = useState(headerStyles[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [borderStyle, setBorderStyle] = useState('double');
  const [borderWidth, setBorderWidth] = useState(8);
  const reportRefs = useRef([]); // used to hold DOM nodes for PDF creation
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Grid & resizing helpers
  const gridRef = useRef(null);
  const [resizingId, setResizingId] = useState(null);
  const resizeInfoRef = useRef(null); // store starting info for resize operations

  const currentStudent = sampleStudentsData[currentStudentIndex];
  const gridCols = 12; // number of columns in the grid
  const gridRows = 10; // number of rows in the grid

  // ----------- Drag & Drop handlers -----------
  const handleDragStart = (e, item) => {
    // keep the dragged item in local state
    setDraggedItem(item);
    try { e.dataTransfer.setData('text/plain', item.id); } catch (err) { }
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverCell = (e, x, y) => {
    // Must prevent default so drop will work
    e.preventDefault();
    e.stopPropagation();
    if (draggedItem) setDragOverCell({ x, y });
  };

  const handleDropOnCell = (e, dropX, dropY) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedItem) return;

    // If the field already exists in the layout, move it. Otherwise add it with new x/y
    const exists = placedLayout.find(p => p.id === draggedItem.id);
    if (exists) {
      setPlacedLayout(prev => prev.map(it => it.id === draggedItem.id ? { ...it, x: dropX, y: dropY } : it));
    } else {
      const base = masterFields.find(f => f.id === draggedItem.id) || draggedItem;
      setPlacedLayout(prev => [...prev, { ...base, x: dropX, y: dropY }]);
    }

    // Clear drag state
    setDraggedItem(null);
    setDragOverCell(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverCell(null);
  };

  const handleDeleteField = (id) => {
    setPlacedLayout(prev => prev.filter(p => p.id !== id));
  };


  const getCellContent = (x, y) => {
    return placedLayout.find(item => x >= item.x && x < item.x + item.w && y >= item.y && y < item.y + item.h);
  };


  const renderField = (field, studentData) => {

    const value = evaluateExpression(field.expr, studentData);

    switch (field.type) {
      case 'header':
        return (
          <div className={`text-${headerStyle.align} mb-2 w-full`}>
            <h1 className={`${headerStyle.size} font-bold ${headerStyle.decoration === 'underline' ? 'underline' : ''}`} style={{ color: colorScheme.primary }}>
              {value}
            </h1>
          </div>
        );

      case 'logo':
        return (
          <div className="flex justify-center items-center h-full w-full">
            <img src={value || schoolDummy}
              alt="Logo" className="w-32 h-32 rounded-full object-contain" style={{ borderColor: colorScheme.primary, borderStyle: 'solid' }} />
          </div>
        );

      case 'photo':
        return (
          <div className="flex justify-center items-center h-full w-full">
            <img src={value || profileDummy}
              alt="Student" className="w-32 h-32 rounded-lg object-cover shadow-lg" style={{ borderColor: colorScheme.accent, borderWidth: '1px', borderStyle: 'solid' }} />
          </div>
        );

      case 'info':
        return (
          <div className="p-2 rounded h-full w-full flex items-center" style={{ backgroundColor: hexToRgba(colorScheme.primary, 0.06) }}>
            <p className="text-gray-800 font-medium text-sm">{value}</p>
          </div>
        );

      case 'highlight':
        return (
          <div className="p-3 rounded h-full w-full flex items-center" style={{ backgroundColor: `${colorScheme.primary}20`, borderLeft: `4px solid ${colorScheme.primary}` }}>
            <p className="text-xl font-bold" style={{ color: colorScheme.primary }}>{value}</p>
          </div>
        );

      case 'table':
        // Tables use studentData.subjects expected to be an array
        return (
          <div className="overflow-x-auto h-full w-full">
            <table className="w-full border-collapse" style={{ borderColor: colorScheme.border }}>
              <thead style={{ backgroundColor: colorScheme.primary, color: '#ffffff' }}>
                <tr>
                  <th className="border p-2 text-left text-xs" style={{ borderColor: colorScheme.border }}>Subject</th>
                  <th className="border p-2 text-center text-xs" style={{ borderColor: colorScheme.border }}>Marks</th>
                  <th className="border p-2 text-center text-xs" style={{ borderColor: colorScheme.border }}>Max</th>
                  <th className="border p-2 text-center text-xs" style={{ borderColor: colorScheme.border }}>Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentData.subjects.map((subject, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                    <td className="border p-2 text-xs" style={{ borderColor: colorScheme.border, color: '#111827' }}>{subject.name}</td>
                    <td className="border p-2 text-center font-semibold text-xs" style={{ borderColor: colorScheme.border, color: '#111827' }}>{subject.marks}</td>
                    <td className="border p-2 text-center text-xs" style={{ borderColor: colorScheme.border, color: '#111827' }}>{subject.maxMarks}</td>
                    <td className="border p-2 text-center text-xs" style={{ borderColor: colorScheme.border }}>
                      <span className="px-2 py-1 rounded font-semibold" style={{ backgroundColor: hexToRgba(colorScheme.secondary, 0.15), color: colorScheme.primary }}>
                        {subject.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'text':
        return (
          <div className="p-3 rounded h-full w-full" style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24' }}>
            <p className="text-gray-700 italic text-sm">{value}</p>
          </div>
        );

      case 'longText':
        return (
          <div className="p-3 rounded h-full w-full" style={{ backgroundColor: '#fff', boxSizing: 'border-box' }}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#111827' }}>{value}</p>
          </div>
        );

      case 'attendance':
        return (
          <div className="p-3 rounded h-full w-full flex flex-col justify-center" style={{ backgroundColor: hexToRgba(colorScheme.primary, 0.06) }}>
            <div className="text-sm font-semibold">{value}</div>
            <div className="text-xs text-gray-600 mt-1">Attendance</div>
          </div>
        );

      case 'signature':
        return (
          <div className="p-2 h-full w-full flex flex-col justify-end items-start">
            {/* you can replace below with actual signature image if you have one in student data */}
            <div style={{ width: '160px', height: '48px', borderBottom: '1px solid #111827' }} />
            <div className="text-xs text-gray-600 mt-1">Signature</div>
          </div>
        );



      default:
        return <div className="text-sm w-full">{value}</div>;
    }
  };


  const startResizing = (e, item) => {
    e.stopPropagation();
    e.preventDefault();

   
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setResizingId(item.id);

    resizeInfoRef.current = {
      startX: clientX,
      startY: clientY,
      startW: item.w,
      startH: item.h,
      startItem: item
    };


    window.addEventListener('mousemove', handleResizingMove);
    window.addEventListener('mouseup', handleResizingEnd);
    window.addEventListener('touchmove', handleResizingMove, { passive: false });
    window.addEventListener('touchend', handleResizingEnd);
  };

  const handleResizingMove = (e) => {
    if (!resizeInfoRef.current || !gridRef.current) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const gridRect = gridRef.current.getBoundingClientRect();
    const colWidth = gridRect.width / gridCols; // width of one grid column in px
    const rowHeight = gridRect.height / gridRows; // height of one grid row in px

    const { startX, startY, startW, startH, startItem } = resizeInfoRef.current;
    const dx = clientX - startX; // how much pointer moved horizontally
    const dy = clientY - startY; // how much pointer moved vertically


    const newWidthInPx = Math.max(1, startW * colWidth + dx);
    const newHeightInPx = Math.max(1, startH * rowHeight + dy);


    let newW = Math.max(1, Math.round(newWidthInPx / colWidth));
    let newH = Math.max(1, Math.round(newHeightInPx / rowHeight));


    newW = Math.min(newW, gridCols - startItem.x);
    newH = Math.min(newH, gridRows - startItem.y);

    // apply change to layout
    setPlacedLayout(prev => prev.map(it => it.id === startItem.id ? { ...it, w: newW, h: newH } : it));
  };

  const handleResizingEnd = () => {
    // cleanup
    resizeInfoRef.current = null;
    setResizingId(null);
    window.removeEventListener('mousemove', handleResizingMove);
    window.removeEventListener('mouseup', handleResizingEnd);
    window.removeEventListener('touchmove', handleResizingMove);
    window.removeEventListener('touchend', handleResizingEnd);
  };


  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleResizingMove);
      window.removeEventListener('mouseup', handleResizingEnd);
      window.removeEventListener('touchmove', handleResizingMove);
      window.removeEventListener('touchend', handleResizingEnd);
    };

  }, []);



  const generatePDF = async (element, studentData) => {
    if (!element) return;

    await new Promise(res => requestAnimationFrame(res));

    const cloned = element.cloneNode(true);


    const teacherMsg = studentData?.student?.teacherMessage || studentData?.student?.remarks || '';
    const secondPage = document.createElement('div');
    secondPage.className = 'report-page teacher-message-page';

    secondPage.style.background = '#ffffff';
    secondPage.style.padding = '32px';
    secondPage.style.boxSizing = 'border-box';
    secondPage.style.width = `${element.scrollWidth}px`;
    secondPage.style.border = `${borderWidth}px ${borderStyle} ${colorScheme.border}`;
    secondPage.style.marginTop = '20px';

    const title = document.createElement('h2');
    title.innerText = 'Teacher Message';
    title.style.marginTop = '0';
    title.style.marginBottom = '12px';
    title.style.color = colorScheme.primary;

    const para = document.createElement('p');
    para.style.whiteSpace = 'pre-wrap';
    para.style.lineHeight = '1.6';
    para.style.margin = '0';
    para.style.color = '#111827';
    para.innerText = teacherMsg || 'No teacher message provided.';

    secondPage.appendChild(title);
    secondPage.appendChild(para);

    // temporary container off-screen
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = `${element.scrollWidth}px`;
    wrapper.style.background = '#fff';
    wrapper.appendChild(cloned);
    wrapper.appendChild(secondPage);

    document.body.appendChild(wrapper);

    try {
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: wrapper.scrollWidth,
        height: wrapper.scrollHeight,
        backgroundColor: '#ffffff'
      });

      if (!canvas || !canvas.width) return;

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4'); // portrait A4
      const pdfWidth = pdf.internal.pageSize.getWidth();   // mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // mm

      const imgWidth = pdfWidth;
      // how many pixels of canvas correspond to one PDF page
      const pageHeightPx = Math.floor((pdfHeight * canvas.width) / imgWidth);

      for (let sliceStart = 0, pageIndex = 0; sliceStart < canvas.height; sliceStart += pageHeightPx, pageIndex++) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - sliceStart);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext('2d');

        ctx.drawImage(canvas, 0, sliceStart, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

        const pageData = pageCanvas.toDataURL('image/png');
        const pageImgHeightMM = (sliceHeight * imgWidth) / canvas.width;

        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(pageData, 'PNG', 0, 0, imgWidth, pageImgHeightMM);
      }

      pdf.save(`report-card-${(studentData?.student?.name || 'student').replace(/\s+/g, '-')}.pdf`);

    } finally {
      // cleanup
      document.body.removeChild(wrapper);
    }
  };


  const handleDownloadCurrent = async () => {
    setIsExporting(true);
    await new Promise(res => requestAnimationFrame(res));
    try {
      if (reportRefs.current[0]) {
        await generatePDF(reportRefs.current[0], currentStudent);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateAll = async () => {
    setGeneratingAll(true);
    setIsExporting(true);
    const failed = [];
    try {
      for (let i = 0; i < sampleStudentsData.length; i++) {
        const refEl = reportRefs.current[i + 1];
        if (refEl) {
          try {
            await generatePDF(refEl, sampleStudentsData[i]);
          } catch (err) {
            failed.push({ name: sampleStudentsData[i].student.name, error: err.message });
          }
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          failed.push({ name: sampleStudentsData[i].student.name, error: 'ref not found' });
        }
      }
      if (failed.length === 0) {
        alert(`Successfully generated ${sampleStudentsData.length} report cards!`);
      } else {
        console.warn('Some failed:', failed);
        alert(`Generated ${sampleStudentsData.length - failed.length} PDFs. ${failed.length} failed (check console).`);
      }
    } finally {
      setIsExporting(false);
      setGeneratingAll(false);
    }
  };


  const renderGrid = (studentData) => {
    const cells = [];
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const content = getCellContent(x, y);
        const isTopLeft = content && content.x === x && content.y === y;
        const isDragOver = dragOverCell && dragOverCell.x === x && dragOverCell.y === y;
        if (content && !isTopLeft) continue;

        cells.push(
          <div
            key={`${x}-${y}`}
            onDragOver={(e) => handleDragOverCell(e, x, y)}
            onDrop={(e) => handleDropOnCell(e, x, y)}
            className={`border border-dashed transition-all ${isDragOver ? 'bg-blue-100 border-blue-400' : 'border-gray-200'}`}
            style={{
              gridColumn: content ? `span ${content.w}` : 'span 1',
              gridRow: content ? `span ${content.h}` : 'span 1',
              minHeight: '60px',
              position: 'relative'
            }}
          >
            {content && isTopLeft && (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, content)}
                onDragEnd={handleDragEnd}
                className="h-full w-full cursor-move p-2 hover:bg-gray-50 rounded relative group"
                style={{ boxSizing: 'border-box' }}
              >
                {/* delete button (hidden while exporting) */}
                {!isExporting && (
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteField(content.id);
                    }}
                    className="absolute right-2 top-2 z-20 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete field"
                  >
                    <span style={{ fontSize: 14, color: '#dc2626', lineHeight: 1 }}>×</span>
                  </button>
                )}

                {/* Actual field UI */}
                {renderField(content, studentData)}

                {/* Resizer handle (bottom-right) */}
                {!isExporting && (
                  <div
                    onMouseDown={(e) => startResizing(e, content)}
                    onTouchStart={(e) => startResizing(e, content)}
                    title="Resize"
                    className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
                    style={{
                      position: 'absolute',
                      right: 4,
                      bottom: 4,
                      width: 16,
                      height: 16,
                      borderRadius: 3,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      background: '#fff',
                      border: '1px solid rgba(0,0,0,0.12)',
                      cursor: 'se-resize',
                      zIndex: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={(e) => e.stopPropagation()}
                    draggable={false}
                  >
                    <MoveDiagonal size={10} stroke="#6b7280" strokeWidth={1.5} className="rotate-90" />
                  </div>
                )}
              </div>
            )}

          </div>
        );
      }
    }
    return cells;
  };


  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <div className="lg:hidden fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-400 text-yellow-800 p-4 text-center z-50">
        <div className="flex items-center justify-center gap-2">
          <Monitor className="w-5 h-5" />
          <span>For better experience, please use a laptop or desktop computer</span>
        </div>
      </div>


      <div
        className={`fixed lg:static z-40 top-0 left-0 h-full bg-white shadow-lg transition-all duration-300
          ${sidebarOpen ? 'w-80 p-6' : 'w-0 p-0'} overflow-y-auto`}
        aria-hidden={!sidebarOpen}
      >
        {sidebarOpen && (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <LayoutTemplate className="w-6 h-6" />
                Customize
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Settings className={`w-5 h-5 transition-transform ${showSettings ? 'rotate-90' : ''}`} />
                </button>

                {/* Close sidebar */}
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Close Sidebar">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mb-6 p-0 rounded-lg">
              {showSettings && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color Scheme</label>
                    <div className="grid grid-cols-3 gap-2">
                      {colorSchemes.map(scheme => (
                        <button key={scheme.id} onClick={() => setColorScheme(scheme)} className={`p-2 rounded-lg border-2 transition-all ${colorScheme.id === scheme.id ? 'border-gray-800 shadow-md' : 'border-gray-200'}`} style={{ backgroundColor: scheme.primary }}>
                          <div className="h-6 rounded" style={{ backgroundColor: scheme.secondary }}></div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{colorScheme.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Header Style</label>
                    <select value={headerStyle.id} onChange={(e) => setHeaderStyle(headerStyles.find(s => s.id === e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                      {headerStyles.map(style => <option key={style.id} value={style.id}>{style.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Border Style</label>
                    <select value={borderStyle} onChange={(e) => setBorderStyle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                      <option value="solid">Solid</option>
                      <option value="double">Double</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Border Width: {borderWidth}px</label>
                    <input type="range" min="2" max="16" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} className="w-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Fields</h3>
              <p className="text-xs text-gray-600 mb-4">Drag fields directly into the report card grid</p>

              <div className="space-y-2">
                {masterFields.map((field) => {
                  const isPlaced = !!placedLayout.find(p => p.id === field.id);
                  return (
                    <div key={field.id} draggable onDragStart={(e) => handleDragStart(e, field)} onDragEnd={handleDragEnd}
                      className={`p-3 rounded-lg border transition-all flex items-center justify-between ${isPlaced ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} cursor-move`}>
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{field.label}</span>
                      </div>
                      {isPlaced ? <span className="text-xs text-green-700 px-2 py-1 rounded bg-green-100">Placed</span> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-8' : 'ml-0'} overflow-y-auto p-8 lg:mt-0 mt-16`}>
        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow hover:bg-gray-50" title="Open Sidebar">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        <div className="max-w-7xl mx-auto w-full">
          {/* Student navigation */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-4">
              <Users className="w-6 h-6" style={{ color: colorScheme.primary }} />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Student {currentStudentIndex + 1} of {sampleStudentsData.length}</h2>
                <p className="text-sm text-gray-600">{currentStudent.student.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentStudentIndex(Math.max(0, currentStudentIndex - 1))} disabled={currentStudentIndex === 0} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentStudentIndex(Math.min(sampleStudentsData.length - 1, currentStudentIndex + 1))} disabled={currentStudentIndex === sampleStudentsData.length - 1} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Report Card Builder</h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button onClick={handleDownloadCurrent} className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-md flex-1 sm:flex-none" style={{ backgroundColor: colorScheme.primary }}>
                <Download className="w-5 h-5" />
                Download Current
              </button>
              <button onClick={handleGenerateAll} disabled={generatingAll} className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-md disabled:opacity-50 flex-1 sm:flex-none" style={{ backgroundColor: colorScheme.secondary }}>
                <Users className="w-5 h-5" />
                {generatingAll ? 'Generating...' : `Generate All ${sampleStudentsData.length}`}
              </button>
            </div>
          </div>

          {/* Report Card Grid */}
          <div className="w-full">
            <div ref={(el) => reportRefs.current[0] = el} className="bg-white rounded-lg shadow-xl p-4 lg:p-8 w-full">
              <div className="p-4 lg:p-6 w-full" style={{ border: `${borderWidth}px ${borderStyle} ${colorScheme.border}`, boxSizing: 'border-box' }}>
                <div ref={gridRef} className="grid gap-2 w-full" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, width: '100%' }}>
                  {renderGrid(currentStudent)}
                </div>

                <div className="mt-6 pt-4 border-t-2 flex justify-between" style={{ borderColor: colorScheme.border }}>
                  <div className="text-center">
                    <div className="border-t-2 w-32 mb-1" style={{ borderColor: colorScheme.primary }}></div>
                    <p className="text-xs text-gray-600">Class Teacher</p>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 w-32 mb-1" style={{ borderColor: colorScheme.primary }}></div>
                    <p className="text-xs text-gray-600">Principal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Off-screen reports for batch generation */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 0, width: '1200px', pointerEvents: 'none', opacity: 1 }}>
              {sampleStudentsData.map((student, idx) => (
                <div key={idx} ref={(el) => reportRefs.current[idx + 1] = el} className="bg-white rounded-lg shadow-xl p-8 w-full">
                  <div className="p-6 w-full" style={{ border: `${borderWidth}px ${borderStyle}`, borderColor: colorScheme.border }}>
                    <div className="grid gap-2 w-full" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, width: '100%' }}>
                      {renderGrid(student)}
                    </div>

                    <div className="mt-6 pt-4 border-t-2 flex justify-between" style={{ borderColor: colorScheme.border }}>
                      <div className="text-center">
                        <div className="border-t-2 w-32 mb-1" style={{ borderColor: colorScheme.primary }}></div>
                        <p className="text-xs text-gray-600">Class Teacher</p>
                      </div>
                      <div className="text-center">
                        <div className="border-t-2 w-32 mb-1" style={{ borderColor: colorScheme.primary }}></div>
                        <p className="text-xs text-gray-600">Principal</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardGenerator;