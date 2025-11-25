import React, { useState } from 'react';
import { Download, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { schoolTemplates } from '../data/templates';
import { studentData } from '../data/templates';

const UpdatedReportCardGenerator = () => {
  const [schoolId, setSchoolId] = useState("ABC123");
  const [scoreType, setScoreType] = useState("percentage");

  const [students, setStudents] = useState(studentData);

  const convertScore = (rawScore, type) => {
    console.log('rawscore', rawScore);
    if (type === "percentage") return `${rawScore}%`;
    if (type === "cgpa") return (rawScore / 10).toFixed(1);
    if (type === "grade") {
      if (rawScore >= 90) return "A1";
      if (rawScore >= 80) return "A2";
      if (rawScore >= 70) return "B1";
      if (rawScore >= 60) return "B2";
      return "C";
    }
  };

  const toggleField = (studentIndex, field) => {
    console.log('studentindex , feild', studentIndex, field)
    setStudents(students.map((student, idx) => {
      if (idx === studentIndex) {
        return { ...student, [`hide${field}`]: !student[`hide${field}`] };
      }
      return student;
    }));
  };


  const renderTemplate = (template, student, scoreType) => {


    const fields = ['marks', 'grade', 'attendance', 'dob', 'optionalSubjects', 'remarks', 'parentContact'];

    for (let field of fields) {
      const hideKey = `hide${field[0].toUpperCase()}${field.slice(1)}`;
      const pattern = new RegExp(`{{if\\.${field}}}([\\s\\S]*?){{end}}`, "g");
      template = template.replace(pattern, student[hideKey] ? '' : '$1');
    }


    const displayStudent = {
      ...student,
      marks: scoreType === "percentage" || scoreType === "cgpa"
        ? convertScore(student.rawScore, scoreType)
        : student.marks,
      grade: scoreType === "grade"
        ? convertScore(student.rawScore, "grade")
        : student.grade
    };


    Object.keys(displayStudent).forEach(key => {
      // skip hidden metadata
      if (!key.startsWith('hide') && key !== 'rawScore') {
        const regex = new RegExp(`{{student\\.${key}}}`, 'g');
        template = template.replace(regex, displayStudent[key] ?? '');
      }
    });

    return template;
  };



  const handleDeleteStudent = (index) => {
    if (window.confirm('Delete this student?')) {
      setStudents(students.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen  p-8 flex items-center justify-center">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <div className="border-b-4 border-purple-600 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">📋 Report Card Generator</h1>
          <p className="text-gray-600 mt-2">Create professional student reports</p>
        </div>

        <div className="flex gap-6 mb-8 flex-wrap">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">🏫 School</label>
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg w-64 focus:outline-none focus:border-purple-500"
            >
              <option value="ABC123">Saint Mark Meera Bagh</option>
              <option value="XYZ999">Chandramari International School</option>
              <option value="DPS">GD Goenka</option>
            </select>

          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">📊 Score Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setScoreType("percentage")}
                className={`px-4 py-3 rounded-lg font-semibold transition ${scoreType === 'percentage' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                %
              </button>
              <button
                onClick={() => setScoreType("grade")}
                className={`px-4 py-3 rounded-lg font-semibold transition ${scoreType === 'grade' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Grade
              </button>
              <button
                onClick={() => setScoreType("cgpa")}
                className={`px-4 py-3 rounded-lg font-semibold transition ${scoreType === 'cgpa' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                CGPA
              </button>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {students.map((student, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50">

              <div className="mb-4 flex justify-between items-center">
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Student #{idx + 1} - {student.name}
                </div>
                {/* <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Edit ${student.name}`)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(idx)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div> */}
              </div>

              {/* Hide/Unhide Controls */}
              <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm font-semibold mb-2 text-gray-700">👁️ Show/Hide Fields:</p>
                <div className="flex flex-wrap gap-2">
                  {['Marks', 'Grade', 'Attendance', 'Dob', 'OptionalSubjects', 'Remarks', 'ParentContact'].map((field) => (
                    <button
                      key={field}
                      onClick={() => toggleField(idx, field)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition ${student[`hide${field}`]
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-green-100 text-green-700 border border-green-300'
                        }`}
                    >
                      {student[`hide${field}`] ? <EyeOff size={12} /> : <Eye size={12} />}
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Report Preview */}
              <div
                className="flex justify-center"
                dangerouslySetInnerHTML={{
                  __html: renderTemplate(schoolTemplates[schoolId], student, scoreType),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatedReportCardGenerator;