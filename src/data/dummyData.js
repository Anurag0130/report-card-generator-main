// Sample JSON data structure for multiple students
// export const sampleStudentsData = [
//   {
//     student: {
//       name: "John Doe",
//       rollNo: "2024001",
//       class: "10th Grade",
//       section: "A",
//       photo: "https://cdn.pixabay.com/photo/2024/02/18/12/08/ai-generated-8581078_1280.jpg"
//     },
//     school: {
//       name: "Springfield High School",
//       address: "123 Education Street, City, State",
//       phone: "+1 234-567-8900",
//       email: "info@springfield.edu",
//       logo: "https://tse3.mm.bing.net/th/id/OIP.xNY8-1ZNP6rmd27nlwIu5wHaIZ?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
//     },
//     academicYear: "2024-2025",
//     term: "First Semester",
//     subjects: [
//       { name: "Mathematics", marks: 92, grade: "A+", maxMarks: 100 },
//       { name: "Science", marks: 88, grade: "A", maxMarks: 100 },
//       { name: "English", marks: 85, grade: "A", maxMarks: 100 },
//       { name: "Social Studies", marks: 90, grade: "A+", maxMarks: 100 },
//       { name: "Computer Science", marks: 95, grade: "A+", maxMarks: 100 }
//     ],
//     totalMarks: 450,
//     maxTotalMarks: 500,
//     percentage: 90,
//     attendance: "95%",
//     remarks: "Excellent performance. Keep up the good work!"
//   },
//   {
//     student: {
//       name: "Emma Smith",
//       rollNo: "2024002",
//       class: "10th Grade",
//       section: "A",
//       photo: "https://tse3.mm.bing.net/th/id/OIP.iSPsGLBmI5-PEUwjzzSIcgHaE7?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
//     },
//     school: {
//       name: "Springfield High School",
//       address: "123 Education Street, City, State",
//       phone: "+1 234-567-8900",
//       email: "info@springfield.edu",
//       logo: "https://tse3.mm.bing.net/th/id/OIP.xNY8-1ZNP6rmd27nlwIu5wHaIZ?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
//     },
//     academicYear: "2024-2025",
//     term: "First Semester",
//     subjects: [
//       { name: "Mathematics", marks: 78, grade: "B+", maxMarks: 100 },
//       { name: "Science", marks: 82, grade: "A", maxMarks: 100 },
//       { name: "English", marks: 95, grade: "A+", maxMarks: 100 },
//       { name: "Social Studies", marks: 88, grade: "A", maxMarks: 100 },
//       { name: "Computer Science", marks: 91, grade: "A+", maxMarks: 100 }
//     ],
//     totalMarks: 434,
//     maxTotalMarks: 500,
//     percentage: 86.8,
//     attendance: "92%",
//     remarks: "Very good performance. Focus more on mathematics."
//   },
//   {
//     student: {
//       name: "Michael Johnson",
//       rollNo: "2024003",
//       class: "10th Grade",
//       section: "A",
//       photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='%2310b981' width='120' height='120'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='48' font-family='Arial'%3EMJ%3C/text%3E%3C/svg%3E"
//     },
//     school: {
//       name: "Springfield High School",
//       address: "123 Education Street, City, State",
//       phone: "+1 234-567-8900",
//       email: "info@springfield.edu",
//       logo: "https://tse3.mm.bing.net/th/id/OIP.xNY8-1ZNP6rmd27nlwIu5wHaIZ?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
//     },
//     academicYear: "2024-2025",
//     term: "First Semester",
//     subjects: [
//       { name: "Mathematics", marks: 85, grade: "A", maxMarks: 100 },
//       { name: "Science", marks: 90, grade: "A+", maxMarks: 100 },
//       { name: "English", marks: 80, grade: "A", maxMarks: 100 },
//       { name: "Social Studies", marks: 87, grade: "A", maxMarks: 100 },
//       { name: "Computer Science", marks: 98, grade: "A+", maxMarks: 100 }
//     ],
//     totalMarks: 440,
//     maxTotalMarks: 500,
//     percentage: 88,
//     attendance: "97%",
//     remarks: "Outstanding performance in technical subjects!"
//   }
// ];



// export const initialFields = [
//   { id: 'header', label: 'School Header', expr: '{{school.name}}', type: 'header', x: 0, y: 0, w: 12, h: 1 },
//   { id: 'logo', label: 'School Logo', expr: '{{school.logo}}', type: 'logo', x: 0, y: 1, w: 3, h: 2 },
//   { id: 'student', label: 'Student Name', expr: '{{student.name}}', type: 'info', x: 3, y: 1, w: 6, h: 1 },
//   { id: 'rollno', label: 'Roll Number', expr: 'Roll No: {{student.rollNo}}', type: 'info', x: 3, y: 2, w: 6, h: 1 },
//   { id: 'photo', label: 'Student Photo', expr: '{{student.photo}}', type: 'photo', x: 9, y: 1, w: 3, h: 2 },
//   { id: 'class', label: 'Class', expr: 'Class: {{student.class}} - {{student.section}}', type: 'info', x: 0, y: 3, w: 6, h: 1 },
//   { id: 'term', label: 'Academic Term', expr: '{{academicYear}} - {{term}}', type: 'info', x: 6, y: 3, w: 6, h: 1 },
//   { id: 'subjects', label: 'Subject Marks', expr: '{{subjects}}', type: 'table', x: 0, y: 4, w: 12, h: 3 },
//   { id: 'total', label: 'Total Marks', expr: 'Total: {{totalMarks}}/{{maxTotalMarks}} ({{percentage}}%)', type: 'highlight', x: 0, y: 7, w: 6, h: 1 },
//   { id: 'attendance', label: 'Attendance', expr: 'Attendance: {{attendance}}', type: 'info', x: 6, y: 7, w: 6, h: 1 },
//   { id: 'remarks', label: 'Remarks', expr: '{{remarks}}', type: 'text', x: 0, y: 8, w: 12, h: 1 },


//   // add these to the array you export as initialFields
//   {
//     id: 'longRemarks',
//     type: 'longText',
//     label: 'Long Remarks',
//     expr: '{{student.remarks}}',
//     w: 12, h: 4, x: 0, y: 6
//   },
//   {
//     id: 'attendance',
//     type: 'attendance',
//     label: 'Attendance',
//     expr: 'Present: {{student.attendance.present}} / {{student.attendance.total}}',
//     w: 4, h: 2, x: 0, y: 2
//   },
//   {
//     id: 'signature',
//     type: 'signature',
//     label: 'Signature',
//     expr: '', // static image or left blank for manual signing
//     w: 4, h: 2, x: 8, y: 8
//   },
//   {
//     id: 'remarksTitle',
//     type: 'highlight',
//     label: 'Remarks Title',
//     expr: 'Teacher Remarks',
//     w: 4, h: 1, x: 0, y: 5
//   }


// ];


export const sampleStudentsData = [
  {
    student: {
      name: "John Doe",
      rollNo: "2024001",
      class: "10th Grade",
      section: "A",
      photo: "https://cdn.pixabay.com/photo/2024/02/18/12/08/ai-generated-8581078_1280.jpg",
      // moved remarks & attendance inside `student`
      remarks: "Excellent performance. Keep up the good work!",
      attendance: { present: 172, total: 180, percent: "95%" },
      teacherMessage: 'John is a bright student who consistently performs well in academics and extracurricular activities. Continue this dedication and focus for future success.'
    },
    school: {
      name: "Springfield High School",
      address: "123 Education Street, City, State",
      phone: "+1 234-567-8900",
      email: "info@springfield.edu",
      logo: "https://tse3.mm.bing.net/th/id/OIP.xNY8-1ZNP6rmd27nlwIu5wHaIZ?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    academicYear: "2024-2025",
    term: "First Semester",
    subjects: [
      { name: "Mathematics", marks: 92, grade: "A+", maxMarks: 100 },
      { name: "Science", marks: 88, grade: "A", maxMarks: 100 },
      { name: "English", marks: 85, grade: "A", maxMarks: 100 },
      { name: "Social Studies", marks: 90, grade: "A+", maxMarks: 100 },
      { name: "Computer Science", marks: 95, grade: "A+", maxMarks: 100 }
    ],
    totalMarks: 450,
    maxTotalMarks: 500,
    percentage: 90
  },

  // ...repeat same structure for Emma & Michael
  {
    student: {
      name: "Emma Smith",
      rollNo: "2024002",
      class: "10th Grade",
      section: "A",
      photo: "https://tse3.mm.bing.net/th/id/OIP.iSPsGLBmI5-PEUwjzzSIcgHaE7?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
      remarks: "Very good performance. Focus more on mathematics.",
      attendance: { present: 161, total: 175, percent: "92%" }
    },
    school: { /* same as above */ },
    academicYear: "2024-2025",
    term: "First Semester",
    subjects: [
      { name: "Mathematics", marks: 78, grade: "B+", maxMarks: 100 },
      { name: "Science", marks: 82, grade: "A", maxMarks: 100 },
      { name: "English", marks: 95, grade: "A+", maxMarks: 100 },
      { name: "Social Studies", marks: 88, grade: "A", maxMarks: 100 },
      { name: "Computer Science", marks: 91, grade: "A+", maxMarks: 100 }
    ],
    totalMarks: 434,
    maxTotalMarks: 500,
    percentage: 86.8
  },

  {
    student: {
      name: "Michael Johnson",
      rollNo: "2024003",
      class: "10th Grade",
      section: "A",
      photo: "data:image/svg+xml,%3Csvg ... %3E", // keep your data URI
      remarks: "Outstanding performance in technical subjects!",
      attendance: { present: 175, total: 180, percent: "97%" }
    },
    school: { /* same */ },
    academicYear: "2024-2025",
    term: "First Semester",
    subjects: [
      { name: "Mathematics", marks: 85, grade: "A", maxMarks: 100 },
      { name: "Science", marks: 90, grade: "A+", maxMarks: 100 },
      { name: "English", marks: 80, grade: "A", maxMarks: 100 },
      { name: "Social Studies", marks: 87, grade: "A", maxMarks: 100 },
      { name: "Computer Science", marks: 98, grade: "A+", maxMarks: 100 }
    ],
    totalMarks: 440,
    maxTotalMarks: 500,
    percentage: 88
  }
];



export const initialFields = [
  { id: 'header', label: 'School Header', expr: '{{school.name}}', type: 'header', x: 0, y: 0, w: 12, h: 1 },
  { id: 'logo', label: 'School Logo', expr: '{{school.logo}}', type: 'logo', x: 0, y: 1, w: 3, h: 2 },
  { id: 'studentName', label: 'Student Name', expr: '{{student.name}}', type: 'info', x: 3, y: 1, w: 6, h: 1 },
  { id: 'rollno', label: 'Roll Number', expr: 'Roll No: {{student.rollNo}}', type: 'info', x: 3, y: 2, w: 6, h: 1 },
  { id: 'photo', label: 'Student Photo', expr: '{{student.photo}}', type: 'photo', x: 9, y: 1, w: 3, h: 2 },

  { id: 'class', label: 'Class', expr: 'Class: {{student.class}} - {{student.section}}', type: 'info', x: 0, y: 3, w: 6, h: 1 },
  { id: 'term', label: 'Academic Term', expr: '{{academicYear}} - {{term}}', type: 'info', x: 6, y: 3, w: 6, h: 1 },

  { id: 'subjects', label: 'Subject Marks', expr: '{{subjects}}', type: 'table', x: 0, y: 4, w: 12, h: 3 },

  { id: 'total', label: 'Total Marks', expr: 'Total: {{totalMarks}}/{{maxTotalMarks}} ({{percentage}}%)', type: 'highlight', x: 0, y: 7, w: 6, h: 1 },

  // attendance summary (percent) — using unique id
  { id: 'attendanceSummary', label: 'Attendance', expr: 'Attendance: {{student.attendance.percent}}', type: 'info', x: 6, y: 7, w: 6, h: 1 },

  // a longer remarks block placed lower so it doesn't overlap total / attendance
  { id: 'remarks', label: 'Remarks', expr: '{{student.remarks}}', type: 'longText', x: 0, y: 8, w: 12, h: 2 },

  // additional useful fields (renamed unique ids)
  {
    id: 'attendanceDetail',
    type: 'attendance',
    label: 'Attendance Detail',
    expr: 'Present: {{student.attendance.present}} / {{student.attendance.total}}',
    w: 4, h: 1, x: 0, y: 6
  },
  {
    id: 'signature',
    type: 'signature',
    label: 'Signature',
    expr: '',
    w: 4, h: 1, x: 8, y: 9
  },
  {
    id: 'remarksTitle',
    type: 'highlight',
    label: 'Remarks Title',
    expr: 'Teacher Remarks',
    w: 4, h: 1, x: 0, y: 5
  }
];



export const colorSchemes = [
  { id: 'indigo', name: 'Professional Blue', primary: '#4f46e5', secondary: '#6366f1', accent: '#818cf8', border: '#4f46e5' },
  { id: 'green', name: 'Fresh Green', primary: '#059669', secondary: '#10b981', accent: '#34d399', border: '#059669' },
  { id: 'purple', name: 'Royal Purple', primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa', border: '#7c3aed' },
  { id: 'red', name: 'Classic Red', primary: '#dc2626', secondary: '#ef4444', accent: '#f87171', border: '#dc2626' },
  { id: 'orange', name: 'Vibrant Orange', primary: '#ea580c', secondary: '#f97316', accent: '#fb923c', border: '#ea580c' },
  { id: 'teal', name: 'Ocean Teal', primary: '#0d9488', secondary: '#14b8a6', accent: '#2dd4bf', border: '#0d9488' }
];


export const headerStyles = [
  { id: 'classic', name: 'Classic Centered', align: 'center', size: 'text-3xl', decoration: 'underline' },
  { id: 'modern', name: 'Modern Bold', align: 'center', size: 'text-4xl', decoration: 'none' },
  { id: 'elegant', name: 'Elegant Left', align: 'left', size: 'text-3xl', decoration: 'underline' },
  { id: 'simple', name: 'Simple Clean', align: 'center', size: 'text-2xl', decoration: 'none' }
];





export const gradingScales = [
  {
    id: 'standard',
    name: 'Standard Grading Scale',
    grades: [
      { range: '90-100%', grade: 'A' },
      { range: '80-89%', grade: 'B' },
      { range: '70-79%', grade: 'C' },
      { range: '60-69%', grade: 'D' },
      { range: '0-59%', grade: 'F' }
    ]
  },
  {
    id: 'detailed',
    name: 'Detailed Grading Scale',
    grades: [
      { range: '97-100%', grade: 'A+' },
      { range: '93-96%', grade: 'A' },
      { range: '90-92%', grade: 'A-' },
      { range: '87-89%', grade: 'B+' },
      { range: '83-86%', grade: 'B' },
      { range: '80-82%', grade: 'B-' },
      { range: '77-79%', grade: 'C+' },
      { range: '73-76%', grade: 'C' },
      { range: '70-72%', grade: 'C-' },
      { range: '67-69%', grade: 'D+' },
      { range: '63-66%', grade: 'D' },
      { range: '60-62%', grade: 'D-' },
      { range: '0-59%', grade: 'F' }
    ]
  }
];