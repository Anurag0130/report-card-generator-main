export const schoolTemplates = {
  "ABC123": `
    <div class="p-6 border-2 border-gray-700 bg-white max-w-md">
      <h2 class="text-xl font-bold text-center mb-4">ABC Public School</h2>
      <p class="text-sm text-gray-600 text-center mb-4">Year: {{student.schoolYear}}</p>
      
      <table class="w-full text-sm">
        <tr><td class="py-1 font-semibold">Name:</td><td>{{student.name}}</td></tr>
        <tr><td class="py-1 font-semibold">Roll No:</td><td>{{student.rollNo}}</td></tr>
        <tr><td class="py-1 font-semibold">Class:</td><td>{{student.class}} - {{student.section}}</td></tr>
        {{if.dob}}<tr><td class="py-1 font-semibold">DOB:</td><td>{{student.dob}}</td></tr>{{end}}
        {{if.attendance}}<tr><td class="py-1 font-semibold">Attendance:</td><td>{{student.attendance}}</td></tr>{{end}}
        {{if.marks}}<tr><td class="py-1 font-semibold">Marks:</td><td class="font-bold">{{student.marks}}</td></tr>{{end}}
        {{if.grade}}<tr><td class="py-1 font-semibold">Grade:</td><td class="font-bold">{{student.grade}}</td></tr>{{end}}
        {{if.optionalSubjects}}<tr><td class="py-1 font-semibold">Subjects:</td><td>{{student.optionalSubjects}}</td></tr>{{end}}
      </table>

      {{if.remarks}}
      <div class="mt-4 pt-4 border-t">
        <p class="font-semibold text-sm">Remarks:</p>
        <p class="text-sm mt-1 italic">{{student.remarks}}</p>
      </div>
      {{end}}

      {{if.parentContact}}
      <p class="text-xs mt-4 text-gray-600">Guardian: {{student.parentContact}}</p>
      {{end}}

      <div class="flex justify-between mt-6 pt-4 border-t text-xs">
        <span>Teacher</span>
        <span>Principal</span>
      </div>
    </div>
  `,

  "XYZ999": `
    <div class="p-6 border-2 border-purple-600 bg-white max-w-md rounded-lg">
      <h2 class="text-2xl font-bold text-purple-600 text-center mb-2">XYZ International</h2>
      <p class="text-xs text-gray-500 text-center mb-4">Year: {{student.schoolYear}}</p>
      
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="font-semibold">Name:</span><span>{{student.name}}</span></div>
        <div class="flex justify-between"><span class="font-semibold">Roll:</span><span>{{student.rollNo}}</span></div>
        <div class="flex justify-between"><span class="font-semibold">Class:</span><span>{{student.class}}-{{student.section}}</span></div>
        {{if.dob}}<div class="flex justify-between"><span class="font-semibold">DOB:</span><span>{{student.dob}}</span></div>{{end}}
        {{if.attendance}}<div class="flex justify-between"><span class="font-semibold">Attendance:</span><span>{{student.attendance}}</span></div>{{end}}
        {{if.marks}}<div class="flex justify-between"><span class="font-semibold">Marks:</span><span class="font-bold">{{student.marks}}</span></div>{{end}}
        {{if.grade}}<div class="flex justify-between"><span class="font-semibold">Grade:</span><span class="font-bold">{{student.grade}}</span></div>{{end}}
        {{if.optionalSubjects}}<div class="flex justify-between"><span class="font-semibold">Subjects:</span><span>{{student.optionalSubjects}}</span></div>{{end}}
      </div>

      {{if.remarks}}
      <div class="mt-4 p-3 bg-yellow-50 border-l-2 border-yellow-400">
        <p class="font-semibold text-xs">Remarks:</p>
        <p class="text-xs mt-1 italic">{{student.remarks}}</p>
      </div>
      {{end}}

      {{if.parentContact}}
      <p class="text-xs mt-4 text-gray-600">Guardian: {{student.parentContact}}</p>
      {{end}}

      <p class="text-xs text-right mt-6 pt-4 border-t">Teacher: Mrs. Sharma</p>
    </div>
  `,

  "DPS": `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Genesis Global School - Admission Form (HTML)</title>
  <style>
    /* Simple printable layout, mirrors the DOCX structure */
    :root{
      --muted:#6b7280;
      --border:#e5e7eb;
      --card:#ffffff;
      --bg:#f8fafc;
      --text:#111827;
      --boxbg:#fafafa;
    }
    html,body{height:100%;}
    body{
      margin:0;
      font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background:var(--bg);
      color:var(--text);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      padding:24px;
    }
    .container{
      max-width:900px;
      margin:0 auto;
      background:var(--card);
      border:1px solid var(--border);
      border-radius:6px;
      padding:28px;
      box-shadow:0 10px 30px rgba(2,6,23,0.06);
    }
    .center{text-align:center;}
    h1{margin:0;font-size:20px;letter-spacing:0.4px;}
    .muted{color:var(--muted);font-size:13px;margin-top:4px;}
    h2.section{font-size:15px;margin:20px 0 10px 0;border-bottom:1px dashed var(--border);padding-bottom:8px;}
    .meta{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;}
    .meta .cell{flex:1;min-width:220px;}
    .label{font-weight:700;font-size:13px;margin-bottom:6px;}
    .value{background:var(--boxbg);border:1px dashed var(--border);padding:10px;border-radius:6px;min-height:28px;}
    .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
    .full{grid-column:1/-1;}
    .two-col{display:flex;gap:12px;}
    .small{font-size:13px;color:#374151;margin:6px 0;}
    .box{background:#fff;border:1px solid #f1f5f9;padding:12px;border-radius:6px;}
    pre{white-space:pre-wrap;font-family:inherit;margin:0;font-size:13px;color:#374151;}
    .signature-row{display:flex;gap:24px;margin-top:14px;}
    .signature{flex:1;}
    .note{font-size:13px;color:var(--muted);margin-top:14px;}
    a.filelink{color:var(--muted);text-decoration:none;}
    @media print{
      body{padding:0;}
      .container{box-shadow:none;border:none;border-radius:0;}
    }
  </style>
</head>
<body>
  <div class="container" id="admission-form-template">
    <!-- Header (repeat as in doc) -->
    <div class="center">
      <h1>GENESIS GLOBAL SCHOOL</h1>
      <p class="muted">SEC-132, EXPRESSWAY, NOIDA ; 201304.</p>
      <p class="muted">+91-9711000498 / 560 / 625 / 626 &nbsp; | &nbsp; admissions@genesisgs.edu.in</p>
    </div>

    <!-- duplicate header lines (document had repeats) -->
    <div class="center" style="margin-top:10px;">
      <h2 style="margin:0;font-size:16px;">GENESIS GLOBAL SCHOOL</h2>
      <p class="muted" style="margin:4px 0 0 0;">SEC-132, EXPRESSWAY, NOIDA ; 201304.</p>
      <p class="muted" style="margin:4px 0 0 0;">+91-9711000498 / 560 / 625 / 626 &nbsp; | &nbsp; admissions@genesisgs.edu.in</p>
    </div>

    <!-- Admission form title -->
    <div style="margin-top:18px;">
      <h2 class="section">ADMISSION FORM FOR SESSION <span style="font-weight:700;"> <span class="value" data-key="AcademicYear" style="display:inline-block;min-width:140px;padding:4px 8px;border-radius:4px;">{AcademicYear}</span></span></h2>
    </div>

    <!-- Registration / Session / Class / Curriculum -->
    <div class="meta">
      <div class="cell">
        <div class="label">Registration Number</div>
        <div class="value" data-key="ApplicantAutoId">{ApplicantAutoId}</div>
      </div>
      <div class="cell">
        <div class="label">Session Applied For</div>
        <div class="value" data-key="AcademicYear">{AcademicYear}</div>
      </div>
      <div class="cell">
        <div class="label">Class Applied For</div>
        <div class="value" data-key="Class">{Class}</div>
      </div>
      <div class="cell">
        <div class="label">Curriculum Applied For</div>
        <div class="value" data-key="udf_curriculum">{udf_curriculum}</div>
      </div>
    </div>

    <!-- STUDENT'S BASIC DETAILS -->
    <h2 class="section">STUDENT'S BASIC DETAILS</h2>
    <div class="grid">
      <div>
        <div class="label">First Name</div>
        <div class="value" data-key="FirstName">{FirstName}</div>
      </div>
      <div>
        <div class="label">Middle Name</div>
        <div class="value" data-key="MiddleName">{MiddleName}</div>
      </div>

      <div>
        <div class="label">Last Name</div>
        <div class="value" data-key="LastName">{LastName}</div>
      </div>
      <div>
        <div class="label">Blood Group</div>
        <div class="value" data-key="BloodGroup">{BloodGroup}</div>
      </div>

      <div>
        <div class="label">Gender</div>
        <div class="value" data-key="Gender">{Gender}</div>
      </div>
      <div>
        <div class="label">Date Of Birth</div>
        <div class="value" data-key="DOB">{DOB}</div>
      </div>

      <div>
        <div class="label">Nationality</div>
        <div class="value" data-key="Nationality">{Nationality}</div>
      </div>
      <div>
        <div class="label">Student Type</div>
        <div class="value" data-key="StudentType">{StudentType}</div>
      </div>

      <div>
        <div class="label">Category</div>
        <div class="value" data-key="Category">{Category}</div>
      </div>
      <div>
        <div class="label">Permanent Education Number</div>
        <div class="value" data-key="udf_MNYuoPWZEqzZALaFreNqDadIkWShkZ">{udf_MNYuoPWZEqzZALaFreNqDadIkWShkZ}</div>
      </div>

      <div>
        <div class="label">Mother Tongue</div>
        <div class="value" data-key="udf_mothertoungue">{udf_mothertoungue}</div>
      </div>
      <div>
        <div class="label">(Duplicate) Student Type</div>
        <div class="value" data-key="StudentTypeDup">{StudentType}</div>
      </div>
    </div>

    <!-- ADDITIONAL INFORMATION -->
    <h2 class="section">ADDITIONAL INFORMATION</h2>
    <div class="grid">
      <div>
        <div class="label">Name Of The Current School</div>
        <div class="value" data-key="udf_current_school">{udf_current_school}</div>
      </div>
      <div>
        <div class="label">Current Class</div>
        <div class="value" data-key="udf_current_class">{udf_current_class}</div>
      </div>

      <div>
        <div class="label">Want to Avail Transport</div>
        <div class="value" data-key="udf_is_transport">{udf_is_transport}</div>
      </div>
      <div>
        <div class="label">Name of the applicant (if applied before)</div>
        <div class="value" data-key="udf_Name_of_the_Applicant">{udf_Name_of_the_Applicant}</div>
      </div>
    </div>

    <!-- SIBLING -->
    <h2 class="section">SIBLING INFORMATION STUDIED IN GENESIS</h2>
    <div class="grid">
      <div>
        <div class="label">Sibling Name</div>
        <div class="value" data-key="udf_Name_of_the_Sibling">{udf_Name_of_the_Sibling}</div>
      </div>
      <div>
        <div class="label">Sibling Class</div>
        <div class="value" data-key="SiblingClass">{SiblingClass}</div>
      </div>
    </div>

    <!-- PARENT/GUARDIAN INFORMATION -->
    <h2 class="section">PARENT/GUARDIAN INFORMATION</h2>
    <div class="two-col" style="margin-top:8px;">
      <div style="flex:1;">
        <div class="label">Father's Details</div>
        <div class="box">
          <div class="small"><strong>Full Name:</strong> <span data-key="FatherName">{FatherName}</span></div>
          <div class="small"><strong>Date of Birth:</strong> <span data-key="udf_DpCfIrEQNbqLNwhaPIlbZEMIhSLXcP">{udf_DpCfIrEQNbqLNwhaPIlbZEMIhSLXcP}</span></div>
          <div class="small"><strong>Nationality:</strong> <span data-key="udf_trhHSqcsooLHlBephDKdGQRaBhLarf">{udf_trhHSqcsooLHlBephDKdGQRaBhLarf}</span></div>
          <div class="small"><strong>Mobile No.:</strong> <span data-key="FatherMobileNo">{FatherMobileNo}</span></div>
          <div class="small"><strong>Email ID:</strong> <span data-key="FatherEmailId">{FatherEmailId}</span></div>
          <div class="small"><strong>Qualification:</strong> <span data-key="FatherQualification">{FatherQualification}</span></div>
          <div class="small"><strong>Occupation:</strong> <span data-key="FatherOccupation">{FatherOccupation}</span></div>
          <div class="small"><strong>Organization Name:</strong> <span data-key="FatherOrganisation">{FatherOrganisation}</span></div>
          <div class="small"><strong>Annual Income:</strong> <span data-key="FatherAnnualIncome">{FatherAnnualIncome}</span></div>
        </div>
      </div>

      <div style="flex:1;">
        <div class="label">Mother's Details</div>
        <div class="box">
          <div class="small"><strong>Full Name:</strong> <span data-key="MotherName">{MotherName}</span></div>
          <div class="small"><strong>Date of Birth:</strong> <span data-key="udf_EJZUtgLlNisqlIiZwjFoJWTaRyOLxK">{udf_EJZUtgLlNisqlIiZwjFoJWTaRyOLxK}</span></div>
          <div class="small"><strong>Nationality:</strong> <span data-key="udf_QMWkLmQUlcqaVivfzYwkuwnpOnZGpK">{udf_QMWkLmQUlcqaVivfzYwkuwnpOnZGpK}</span></div>
          <div class="small"><strong>Mobile No.:</strong> <span data-key="MotherMobileNo">{MotherMobileNo}</span></div>
          <div class="small"><strong>Email ID:</strong> <span data-key="MotherEmailId">{MotherEmailId}</span></div>
          <div class="small"><strong>Qualification:</strong> <span data-key="MotherQualification">{MotherQualification}</span></div>
          <div class="small"><strong>Occupation:</strong> <span data-key="MotherOccupation">{MotherOccupation}</span></div>
          <div class="small"><strong>Organization Name:</strong> <span data-key="MotherOrganisation">{MotherOrganisation}</span></div>
          <div class="small"><strong>Annual Income:</strong> <span data-key="MotherAnnualIncome">{MotherAnnualIncome}</span></div>
        </div>
      </div>
    </div>

    <div style="margin-top:12px;">
      <div class="label">All the communication from the school is to be sent to</div>
      <div class="value" data-key="udf_All_the_communication_from_the_school_is_to_be_sent_to">{udf_All_the_communication_from_the_school_is_to_be_sent_to}</div>
    </div>

    <!-- ADDRESS -->
    <h2 class="section">CURRENT/ PERMANENT ADDRESS INFORMATION</h2>
    <div class="grid">
      <div>
        <div class="label">House Address (Current/Local)</div>
        <div class="value" data-key="CorrAddress">{CorrAddress}</div>
      </div>
      <div>
        <div class="label">House Address (Permanent)</div>
        <div class="value" data-key="PerAddress">{PerAddress}</div>
      </div>

      <div>
        <div class="label">City (Current)</div>
        <div class="value" data-key="CorrCity">{CorrCity}</div>
      </div>
      <div>
        <div class="label">City (Permanent)</div>
        <div class="value" data-key="PerCity">{PerCity}</div>
      </div>

      <div>
        <div class="label">State (Current)</div>
        <div class="value" data-key="CorrState">{CorrState}</div>
      </div>
      <div>
        <div class="label">State (Permanent)</div>
        <div class="value" data-key="PerState">{PerState}</div>
      </div>

      <div>
        <div class="label">Pin Code (Current)</div>
        <div class="value" data-key="CorrPincode">{CorrPincode}</div>
      </div>
      <div>
        <div class="label">Pin Code (Permanent)</div>
        <div class="value" data-key="PerPincode">{PerPincode}</div>
      </div>

      <div>
        <div class="label">Country (Current)</div>
        <div class="value" data-key="CorrCountry">{CorrCountry}</div>
      </div>
      <div>
        <div class="label">Country (Permanent)</div>
        <div class="value" data-key="PerCountry">{PerCountry}</div>
      </div>
    </div>

    <!-- MEDICAL -->
    <h2 class="section">MEDICAL INFORMATION</h2>
    <div class="grid">
      <div>
        <div class="label">Is the child suffering/ or has suffered in the past from any medical illness or allergies</div>
        <div class="value" data-key="udf_cbiiMuyUPJVhiGDXARpQLeWIMKsKwH">{udf_cbiiMuyUPJVhiGDXARpQLeWIMKsKwH} – <span data-key="udf_QUMjoccRobZpaAdEojzhNsblASgOoD">{udf_QUMjoccRobZpaAdEojzhNsblASgOoD}</span></div>
      </div>

      <div>
        <div class="label">Is the child on/or had been on any long medication?</div>
        <div class="value" data-key="udf_qoarTzyIfREiCwPpcttNbllfFTkDTi">{udf_qoarTzyIfREiCwPpcttNbllfFTkDTi} <span data-key="udf_OxWmmScWZuEPSAxyTOpFKPNTCWLjxZ">{udf_OxWmmScWZuEPSAxyTOpFKPNTCWLjxZ}</span></div>
      </div>

      <div>
        <div class="label">Is the child suffering from any disability? (As per Rights of Persons with Disabilities Act 2016)</div>
        <div class="value" data-key="udf_fZBZyMgSHbhCUGsANDfUUHzQRRrEPg">{udf_fZBZyMgSHbhCUGsANDfUUHzQRRrEPg}</div>
      </div>

      <div>
        <div class="label">Does your child require any individual learning support?</div>
        <div class="value" data-key="udf_iddZPVNGLrdKcEdKSgdiTlDgsjffML">{udf_iddZPVNGLrdKcEdKSgdiTlDgsjffML}</div>
      </div>

      <div class="full">
        <div class="label">Is your child undergoing or has been recommended for</div>
        <div class="value" data-key="udf_Is_your_child_undergoing_or_has_been_recommended_for">{udf_Is_your_child_undergoing_or_has_been_recommended_for}</div>
      </div>
    </div>

    <!-- DECLARATIONS -->
    <h2 class="section">GENERAL DECLARATION AND DISCLAIMER</h2>
    <div style="margin-top:8px;">
      <div class="label">A. I declare</div>
      <div class="box" style="margin-top:6px;">
        <pre>1. We have carefully read the rules, regulations & procedures mentioned in the admission form. We have understood them and would like to seek admission to our ward at Genesis Global School, Noida. We and our ward shall follow all the rules, regulations & procedures laid down by the school from time to time. The school reserves the right to take appropriate action which may include suspension/barring him/her from attending class if there is any violation of these at any time and all decisions of the Administration of the school shall be final and binding on us and our ward.

2. That all the information provided by us is complete, accurate and nothing has been concealed/misstated thereof. We understand that if any information is found to be inaccurate or incomplete, the school reserves the right to reject the application and/or my wards admission may be withdrawn or cancelled.

3. We, the parents, are making this application jointly. Any deviation to this, due to marital discord or any similar reason, will be substantiated with court order(s), and copies of which will be submitted to the school, at the earliest.

4. That the school fees as notified to us are commensurate with the infrastructure, faculty and facilities available in the school.</pre>
      </div>

      <div class="label" style="margin-top:10px;">B. The School shall not be responsible for</div>
      <div class="box" style="margin-top:6px;">
        <pre>1. Any deliberate or intentional act done by the student resulting in fatality or health injury.

2. Any injury to the student on account of accident or mishap, or on account of any kind of rash and negligent act including driving of motor vehicle by him/her or vehicle carrying him/her and driven by someone else.

3. Any injury caused to the student due to an act of nature or otherwise during the normal course of his/her studying or attending school.

4. The student's actions outside the perimeter of School, while alone or in a group.

5. If the student makes any attempt to inflict self-injury.

6. Any mishap or untoward happening takes place during School outings, educational tours, School functions and alike.

7. Any student sustaining injury or loss of life and property because of any acts of indiscipline or quarrel amongst students inside and outside the school.

8. We understand that children while running, playing, commuting may get physically injured/hurt, and over which the school may not have control and that the school will not be liable for such incidences.</pre>
      </div>

      <div class="label" style="margin-top:10px;">C. We understand that</div>
      <div class="box" style="margin-top:6px;">
        <pre>1. We must make a satisfactory arrangement for remittance of school fees within the due dates without waiting for a reminder from school. The date for payment of fees is fixed and non-receipt of reminder is no excuse for non-payment.

2. The school will run school buses in limited areas with limited stops. These routes and stops may change depending on the users of this facility. It will not be obligatory on the part of the school authorities to make new bus stops. It will be the parent's sole responsibility to escort the pupil to and from the respective bus stop. The transport fee is charged for the school term.

3. Keeping in line with the continued learning, the school may amend and/or make necessary changes in present policies, and parents shall review such policies on the school’s website. The school shall not be liable to provide specific intimation of any changes in policies provided on the school’s website.

4. In case we do not claim the security deposit paid by us within one year after our ward leaves the school, our right over the refund of this amount will stand relinquished by us.

5. Once my ward is admitted and if we subsequently decide not to join the school before the session commences, then the admission fee will be forfeited and the rest of the amount deposited at the time of admission will be refunded.

6. Once my ward is admitted and if we subsequently decide not to join the school after the session commences, then the admission fee will be forfeited and the rest of the amount deposited at the time of admission, will be refunded after deductions on a pro rata basis for the number of days lapsed.

7. My ward must always wear the proper uniform in accordance with the school's traditions and decorum.

8. My ward will face disciplinary action for any indecent or unruly behavior towards fellow students or staff members.</pre>
      </div>

      <div class="label" style="margin-top:10px;">D. We shall:</div>
      <div class="box" style="margin-top:6px;">
        <pre>1. Visit the school whenever called by the principal.

2. Maintain dignity and decorum while interacting with members of the school staff.

3. Compensate the school for any damage to school property caused by our ward.

4. Settle all the outstanding fees within the stipulated time, to avoid penalty/late fees.

5. Pay all the pending dues before withdrawing our ward from the school. Failure to do so shall entitle the school to initiate appropriate legal proceedings to recover the outstanding amount.</pre>
      </div>
    </div>

    <!-- GENERAL DISCLAIMER -->
    <h2 class="section">GENERAL DISCLAIMER</h2>
    <div class="box" style="margin-top:6px;">
      <pre>1. Genesis Global School (GGS) reserves the right to use any photograph/video taken at any event on its location, without the expressed written permission of those included within the photograph/video. GGS may use the photograph/video in publications or other media material produced, used or contracted by GGS including but not limited to brochures, invitations, books, newspapers, magazines, television, websites, etc.

2. To ensure the privacy of individuals and children, images will not be identified using full names or personal identifying information without written approval from the photographed subject, parent or legal guardian.

3. A person attending GGS who does not wish to have their image recorded for distribution should make their wishes known to the School Office in writing of his/her intentions and include a photograph of the scholar intended. GGS will use this photo for identification purposes and will hold it in confidence.

4. Failing to notify GGS, in writing, your desire to not have your photograph used by GGS, you agree to release, defend, hold harmless and indemnify GGS from all claims involving the use of your picture or likeness.</pre>
    </div>

    <!-- Signature -->
    <div style="margin-top:14px;">
      <div class="label">I/We hereby declare that all the details provided by me are up to my knowledge.</div>
      <div class="signature-row">
        <div class="signature">
          <div class="label">Parent / Guardian Signature</div>
          <div class="value" style="height:70px;"></div>
        </div>
        <div class="signature">
          <div class="label">Date</div>
          <div class="value" data-key="SubmissionDate">{SubmissionDate}</div>
        </div>
      </div>
    </div>

    <div class="note">Original uploaded file: <a class="filelink" href="/mnt/data/6802cf7f-13a4-4bf4-970b-483b94426c10.docx" target="_blank">/mnt/data/6802cf7f-13a4-4bf4-970b-483b94426c10.docx</a></div>
  </div>
</body>
</html>

  `,
};


export const studentData = [
  {
    name: "Anurag Kumar",
    rollNo: "1001",
    class: "10th",
    section: "A",
    rawScore: 89,
    attendance: "95%",
    dob: "15/03/2009",
    schoolYear: "2024-2025",
    optionalSubjects: "Computer Science, French",
    remarks: "Excellent student with strong analytical skills.",
    parentContact: "Mr. Rajesh Kumar - 9876543210",
    hideMarks: false,
    hideGrade: false,
    hideAttendance: false,
    hideDob: false,
    hideOptionalSubjects: false,
    hideRemarks: false,
    hideParentContact: false
  },
  // {
  //   name: "Rohan Verma",
  //   rollNo: "1004",
  //   class: "10th",
  //   section: "B",
  //   rawScore: 85,
  //   attendance: "92%",
  //   dob: "10/11/2009",
  //   schoolYear: "2024-2025",
  //   optionalSubjects: "Physical Education",
  //   remarks: "Shows improvement. Good participation.",
  //   parentContact: "Mr. Vikram Verma - 9876543213",
  //   hideMarks: true,
  //   hideGrade: true,
  //   hideAttendance: false,
  //   hideDob: false,
  //   hideOptionalSubjects: false,
  //   hideRemarks: false,
  //   hideParentContact: false
  // },
]