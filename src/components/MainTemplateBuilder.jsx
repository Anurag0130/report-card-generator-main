import React, { useState, useRef } from "react";
import { Search, Trash2, Save, FileDown, Upload, Type, Table, Image as ImageIcon, Square, Circle, Divide, Minus } from "lucide-react";

// Sample data structure based on your JSON
const studentData = {
    ApplicantAutoId: "APP/26-27/0163",
    AcademicYear: "2026-27",
    Class: "GRADE 3",
    udf_curriculum: "IB",
    udf_current_school: "",
    udf_current_class: "Grade 2",
    udf_is_transport: "YES",
    udf_Name_of_the_Applicant: "Ryaan Seth",
    udf_Name_of_the_Sibling: "",
    SiblingClass: "",
    FatherName: "Nimish Seth",
    MotherName: "Aishwarya Rawat",
    udf_DpCfIrEQNbqLNwhaPIlbZEMIhSLXcP: "03-11-1978",
    udf_EJZUtgLlNisqlIiZwjFoJWTaRyOLxK: "05-08-1985",
    udf_trhHSqcsooLHlBephDKdGQRaBhLarf: "Indian",
    udf_QMWkLmQUlcqaVivfzYwkuwnpOnZGpK: "Australian",
    FatherMobileNo: "468332435",
    MotherMobileNo: "490948709",
    FatherEmailId: "nimishseth@hotmail.com",
    MotherEmailId: "aishxlnc@gmail.com",
    FatherQualification: "",
    MotherQualification: "",
    FatherOccupation: "Consultant",
    MotherOccupation: "Service",
    FatherOrganisation: "",
    MotherOrganisation: "",
    FatherAnnualIncome: "200000.0",
    MotherAnnualIncome: "100000.0",
    udf_All_the_communication_from_the_school_is_to_be_sent_to: "Both",
    CorrAddress: "9 Old hall drive",
    PerAddress: "9 Old hall drive",
    CorrCity: "Caroline Springs",
    PerCity: "Caroline Springs",
    CorrState: "Victoria",
    PerState: "Victoria",
    CorrPincode: "3023",
    PerPincode: "3023",
    CorrCountry: "Australia",
    PerCountry: "Australia",
    udf_cbiiMuyUPJVhiGDXARpQLeWIMKsKwH: "No",
    udf_qoarTzyIfREiCwPpcttNbllfFTkDTi: "No",
    udf_fZBZyMgSHbhCUGsANDfUUHzQRRrEPg: "No",
    udf_iddZPVNGLrdKcEdKSgdiTlDgsjffML: "No",
    udf_Is_your_child_undergoing_or_has_been_recommended_for: ",None",
};

const groupedFields = {
    "Basic Info": ["ApplicantAutoId", "AcademicYear", "Class", "udf_curriculum"],
    "Student": ["udf_current_school", "udf_current_class", "udf_is_transport", "udf_Name_of_the_Applicant"],
    "Sibling": ["udf_Name_of_the_Sibling", "SiblingClass"],
    "Father": ["FatherName", "udf_DpCfIrEQNbqLNwhaPIlbZEMIhSLXcP", "udf_trhHSqcsooLHlBephDKdGQRaBhLarf", "FatherMobileNo", "FatherEmailId", "FatherQualification", "FatherOccupation", "FatherOrganisation", "FatherAnnualIncome"],
    "Mother": ["MotherName", "udf_EJZUtgLlNisqlIiZwjFoJWTaRyOLxK", "udf_QMWkLmQUlcqaVivfzYwkuwnpOnZGpK", "MotherMobileNo", "MotherEmailId", "MotherQualification", "MotherOccupation", "MotherOrganisation", "MotherAnnualIncome"],
    "Address": ["CorrAddress", "CorrCity", "CorrState", "CorrPincode", "CorrCountry", "PerAddress", "PerCity", "PerState", "PerPincode", "PerCountry"],
    "Medical": ["udf_cbiiMuyUPJVhiGDXARpQLeWIMKsKwH", "udf_qoarTzyIfREiCwPpcttNbllfFTkDTi", "udf_fZBZyMgSHbhCUGsANDfUUHzQRRrEPg", "udf_iddZPVNGLrdKcEdKSgdiTlDgsjffML"],
};

// Enhanced component configuration
const elementTypes = {
    text: {
        name: "Text",
        icon: Type,
        defaultProps: {
            type: "text",
            value: "Static Text",
            fontSize: 14,
            fontWeight: "normal",
            color: "#000000",
            textAlign: "left"
        }
    },
    header: {
        name: "Header",
        icon: Type,
        defaultProps: {
            type: "header",
            value: "Section Header",
            fontSize: 18,
            fontWeight: "bold",
            color: "#000000",
            textAlign: "left",
            underline: false
        }
    },
    table: {
        name: "Table",
        icon: Table,
        defaultProps: {
            type: "table",
            rows: 2,
            cols: 2,
            width: 400,
            height: 100,
            borderWidth: 1,
            borderColor: "#000000",
            headerRow: false
        }
    },
    formTable: {
        name: "Form Table",
        icon: Table,
        defaultProps: {
            type: "formTable",
            rows: 3,
            cols: 2,
            width: 600,
            height: 150,
            borderWidth: 1,
            borderColor: "#000000",
            showLabels: true
        }
    },
    image: {
        name: "Image",
        icon: ImageIcon,
        defaultProps: {
            type: "image",
            width: 200,
            height: 150,
            alt: "Uploaded Image"
        }
    },
    rectangle: {
        name: "Rectangle",
        icon: Square,
        defaultProps: {
            type: "rectangle",
            width: 200,
            height: 100,
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#d1d5db"
        }
    },
    line: {
        name: "Line",
        icon: Minus,
        defaultProps: {
            type: "line",
            width: 200,
            height: 2,
            color: "#000000",
            lineWidth: 1
        }
    },
    section: {
        name: "Section",
        icon: Square,
        defaultProps: {
            type: "section",
            width: 600,
            height: 200,
            backgroundColor: "#f8fafc",
            borderWidth: 1,
            borderColor: "#e2e8f0",
            title: "Section Title",
            padding: 10
        }
    }
};

// Template presets for common forms
const templatePresets = {
    admissionForm: {
        name: "Admission Form",
        elements: [
            {
                type: "header",
                value: "GENESIS GLOBAL SCHOOL",
                x: 50,
                y: 50,
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                width: 700
            },
            {
                type: "text",
                value: "SEC-132, EXPRESSWAY, NOIDA ; 201304",
                x: 50,
                y: 90,
                fontSize: 12,
                fontWeight: "normal",
                textAlign: "center",
                width: 700
            },
            {
                type: "text",
                value: "+91-9711000498 | admission@genesisgs.edu.in",
                x: 50,
                y: 110,
                fontSize: 12,
                fontWeight: "normal",
                textAlign: "center",
                width: 700
            },
            {
                type: "line",
                x: 50,
                y: 140,
                width: 700,
                color: "#000000",
                lineWidth: 1
            },
            {
                type: "header",
                value: "Admission Form",
                x: 50,
                y: 160,
                fontSize: 16,
                fontWeight: "bold"
            },
            {
                type: "text",
                field: "AcademicYear",
                value: studentData.AcademicYear,
                x: 180,
                y: 160,
                fontSize: 16,
                fontWeight: "bold"
            },
            {
                type: "text",
                value: "Registration No:",
                x: 50,
                y: 190,
                fontSize: 12,
                fontWeight: "normal"
            },
            {
                type: "text",
                field: "ApplicantAutoId",
                value: studentData.ApplicantAutoId,
                x: 150,
                y: 190,
                fontSize: 12,
                fontWeight: "bold"
            }
        ]
    }
};

function ElementProperties({ selectedElement, onUpdateElement, fileInputRef }) {
    if (!selectedElement) {
        return (
            <div className="p-4">
                <p className="text-center text-gray-400 text-sm py-8">
                    Select an element to edit properties
                </p>
            </div>
        );
    }

    const handleImageChange = () => {
        fileInputRef.current?.click();
    };

    const renderPropertyControls = () => {
        const commonControls = (
            <>
                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Position X (px)</label>
                    <input
                        type="number"
                        value={selectedElement.x || 0}
                        onChange={(e) => onUpdateElement({ ...selectedElement, x: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                        min="0"
                        max="750"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Position Y (px)</label>
                    <input
                        type="number"
                        value={selectedElement.y || 0}
                        onChange={(e) => onUpdateElement({ ...selectedElement, y: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                        min="0"
                        max="1123"
                    />
                </div>
            </>
        );

        switch (selectedElement.type) {
            case "table":
            case "formTable":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Rows</label>
                            <input
                                type="number"
                                value={selectedElement.rows || 2}
                                onChange={(e) => onUpdateElement({ ...selectedElement, rows: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="1"
                                max="20"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Columns</label>
                            <input
                                type="number"
                                value={selectedElement.cols || 2}
                                onChange={(e) => onUpdateElement({ ...selectedElement, cols: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="1"
                                max="10"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 400}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="100"
                                max="750"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.borderWidth || 1}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderWidth: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="0"
                                max="5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Color</label>
                            <input
                                type="color"
                                value={selectedElement.borderColor || "#000000"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderColor: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                        {selectedElement.type === "formTable" && (
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedElement.showLabels || false}
                                        onChange={(e) => onUpdateElement({ ...selectedElement, showLabels: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-xs font-medium text-gray-600">Show Field Labels</span>
                                </label>
                            </div>
                        )}
                    </>
                );

            case "image":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Image Preview</label>
                            <div className="border border-gray-300 rounded-md p-2 bg-gray-50 flex justify-center">
                                <img 
                                    src={selectedElement.src} 
                                    alt={selectedElement.alt || "Image"} 
                                    className="max-h-32 max-w-full object-contain"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 200}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
                            <input
                                type="number"
                                value={selectedElement.height || 150}
                                onChange={(e) => onUpdateElement({ ...selectedElement, height: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Alt Text</label>
                            <input
                                type="text"
                                value={selectedElement.alt || ""}
                                onChange={(e) => onUpdateElement({ ...selectedElement, alt: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                placeholder="Image description"
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                onClick={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700"
                            >
                                Change Image
                            </button>
                        </div>
                    </>
                );

            case "rectangle":
            case "section":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 200}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
                            <input
                                type="number"
                                value={selectedElement.height || 100}
                                onChange={(e) => onUpdateElement({ ...selectedElement, height: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Background Color</label>
                            <input
                                type="color"
                                value={selectedElement.backgroundColor || "#ffffff"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, backgroundColor: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.borderWidth || 1}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderWidth: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="0"
                                max="5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Color</label>
                            <input
                                type="color"
                                value={selectedElement.borderColor || "#d1d5db"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderColor: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                        {selectedElement.type === "section" && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={selectedElement.title || ""}
                                        onChange={(e) => onUpdateElement({ ...selectedElement, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Padding (px)</label>
                                    <input
                                        type="number"
                                        value={selectedElement.padding || 10}
                                        onChange={(e) => onUpdateElement({ ...selectedElement, padding: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                        min="0"
                                        max="50"
                                    />
                                </div>
                            </>
                        )}
                    </>
                );

            case "line":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Length (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 200}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Line Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.lineWidth || 1}
                                onChange={(e) => onUpdateElement({ ...selectedElement, lineWidth: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="1"
                                max="10"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Line Color</label>
                            <input
                                type="color"
                                value={selectedElement.color || "#000000"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, color: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                    </>
                );

            case "header":
            case "text":
            default: // text and field elements
                return (
                    <>
                        {commonControls}
                        {selectedElement.field && (
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-600 mb-2">Field Name</label>
                                <div className="px-3 py-2 bg-gray-100 rounded-md text-xs text-gray-800 font-mono">
                                    {selectedElement.field}
                                </div>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Text Content</label>
                            <input
                                type="text"
                                value={selectedElement.value || ""}
                                onChange={(e) => onUpdateElement({ ...selectedElement, value: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Font Size (px)</label>
                            <input
                                type="number"
                                value={selectedElement.fontSize || 12}
                                onChange={(e) => onUpdateElement({ ...selectedElement, fontSize: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="8"
                                max="72"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Font Weight</label>
                            <select
                                value={selectedElement.fontWeight || "normal"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, fontWeight: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="normal">Normal</option>
                                <option value="600">Semi-Bold</option>
                                <option value="bold">Bold</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Text Color</label>
                            <input
                                type="color"
                                value={selectedElement.color || "#000000"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, color: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Text Alignment</label>
                            <select
                                value={selectedElement.textAlign || "left"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, textAlign: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                        {selectedElement.type === "header" && (
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedElement.underline || false}
                                        onChange={(e) => onUpdateElement({ ...selectedElement, underline: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-xs font-medium text-gray-600">Underline</span>
                                </label>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 100}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="750"
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Element Properties</h3>
            {renderPropertyControls()}
        </div>
    );
}

function Sidebar({ onDragStart, selectedElement, onUpdateElement, onAddElement, fileInputRef, onLoadTemplate }) {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("fields");

    const filterFields = (fields) =>
        fields.filter((f) => f.toLowerCase().includes(query.toLowerCase()));

    const handleAddElement = (type) => {
        const elementConfig = elementTypes[type];
        if (elementConfig) {
            if (type === "image") {
                fileInputRef.current?.click();
            } else {
                onAddElement(elementConfig.defaultProps);
            }
        }
    };

    return (
        <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-white">
                <h2 className="text-lg font-semibold text-gray-800">Template Builder</h2>
            </div>

            <div className="flex bg-white border-b border-gray-200">
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === "fields" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("fields")}
                >
                    Fields
                </button>
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === "elements" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("elements")}
                >
                    Elements
                </button>
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === "templates" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("templates")}
                >
                    Templates
                </button>
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === "properties" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("properties")}
                >
                    Properties
                </button>
            </div>

            {activeTab === "fields" && (
                <>
                    <div className="relative p-4 bg-white border-b border-gray-200">
                        <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Search fields..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {Object.entries(groupedFields).map(([group, fields]) => {
                            const filtered = filterFields(fields);
                            if (!filtered.length) return null;

                            return (
                                <div key={group} className="mb-6">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                        {group}
                                    </h3>
                                    {filtered.map((field) => (
                                        <div
                                            key={field}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, field)}
                                            className="bg-white p-3 mb-2 border border-gray-200 rounded-md cursor-grab hover:border-blue-500 hover:shadow-sm transition-all active:cursor-grabbing"
                                        >
                                            <span className="block text-xs font-medium text-gray-800 mb-1">
                                                {field}
                                            </span>
                                            <span className="block text-xs text-gray-500 truncate">
                                                {String(studentData[field] || "").substring(0, 25)}
                                                {String(studentData[field] || "").length > 25 ? "..." : ""}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {activeTab === "elements" && (
                <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Layout Elements
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(elementTypes).map(([type, config]) => (
                            <button
                                key={type}
                                onClick={() => handleAddElement(type)}
                                className="flex flex-col items-center gap-2 bg-white p-3 border border-gray-200 rounded-md hover:border-blue-500 hover:shadow-sm transition-all"
                            >
                                <config.icon size={18} className="text-gray-600" />
                                <span className="text-xs font-medium text-center">{config.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "templates" && (
                <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Quick Templates
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(templatePresets).map(([key, template]) => (
                            <button
                                key={key}
                                onClick={() => onLoadTemplate(template.elements)}
                                className="w-full text-left bg-white p-3 border border-gray-200 rounded-md hover:border-blue-500 hover:shadow-sm transition-all"
                            >
                                <div className="font-medium text-sm text-gray-800">{template.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {template.elements.length} elements
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "properties" && (
                <ElementProperties
                    selectedElement={selectedElement}
                    onUpdateElement={onUpdateElement}
                    fileInputRef={fileInputRef}
                />
            )}
        </div>
    );
}

function CanvasElement({ element, index, isSelected, onSelect, onDragEnd, onDelete }) {
    const handleClick = (e) => {
        e.stopPropagation();
        onSelect(element, index);
    };

    const handleDragEnd = (e) => {
        e.stopPropagation();
        onDragEnd(e, index);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(index);
    };

    const renderElement = () => {
        const baseStyle = {
            left: `${element.x}px`,
            top: `${element.y}px`,
        };

        const selectedClass = isSelected ? 'ring-2 ring-blue-500 z-10' : '';

        switch (element.type) {
            case "table":
            case "formTable":
                const cellWidth = (element.width || 400) / (element.cols || 2);
                const cellHeight = (element.height || 100) / (element.rows || 2);

                return (
                    <div
                        style={baseStyle}
                        className={`absolute cursor-move ${selectedClass}`}
                    >
                        <table
                            style={{
                                borderCollapse: 'collapse',
                                width: `${element.width || 400}px`,
                                borderColor: element.borderColor || "#000000"
                            }}
                        >
                            <tbody>
                                {Array.from({ length: element.rows || 2 }).map((_, rowIdx) => (
                                    <tr key={rowIdx}>
                                        {Array.from({ length: element.cols || 2 }).map((_, colIdx) => (
                                            <td
                                                key={colIdx}
                                                className="p-2"
                                                style={{
                                                    width: `${cellWidth}px`,
                                                    height: `${cellHeight}px`,
                                                    border: `${element.borderWidth || 1}px solid ${element.borderColor || "#000000"}`,
                                                    backgroundColor: rowIdx === 0 && element.headerRow ? '#f3f4f6' : 'transparent',
                                                    fontWeight: rowIdx === 0 && element.headerRow ? 'bold' : 'normal'
                                                }}
                                            >
                                                {element.type === "formTable" && element.showLabels ? 
                                                    (rowIdx === 0 ? `Header ${colIdx + 1}` : `Field ${rowIdx}.${colIdx + 1}`)
                                                    : `Cell ${rowIdx + 1},${colIdx + 1}`
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "image":
                return (
                    <div
                        style={baseStyle}
                        className={`absolute cursor-move ${selectedClass}`}
                    >
                        <img
                            src={element.src}
                            alt={element.alt || "Image"}
                            style={{
                                width: `${element.width || 200}px`,
                                height: `${element.height || 150}px`,
                                objectFit: 'contain'
                            }}
                            className="border border-gray-300"
                        />
                    </div>
                );

            case "rectangle":
                return (
                    <div
                        style={{
                            ...baseStyle,
                            width: `${element.width || 200}px`,
                            height: `${element.height || 100}px`,
                            backgroundColor: element.backgroundColor || "#ffffff",
                            border: `${element.borderWidth || 1}px solid ${element.borderColor || "#d1d5db"}`
                        }}
                        className={`absolute cursor-move ${selectedClass}`}
                    />
                );

            case "section":
                return (
                    <div
                        style={{
                            ...baseStyle,
                            width: `${element.width || 200}px`,
                            height: `${element.height || 100}px`,
                            backgroundColor: element.backgroundColor || "#f8fafc",
                            border: `${element.borderWidth || 1}px solid ${element.borderColor || "#e2e8f0"}`,
                            padding: `${element.padding || 10}px`
                        }}
                        className={`absolute cursor-move ${selectedClass}`}
                    >
                        {element.title && (
                            <div className="text-sm font-semibold mb-2" style={{color: element.color || "#000000"}}>
                                {element.title}
                            </div>
                        )}
                        <div className="text-xs text-gray-600">
                            Section content area
                        </div>
                    </div>
                );

            case "line":
                return (
                    <div
                        style={{
                            ...baseStyle,
                            width: `${element.width || 200}px`,
                            height: `${element.lineWidth || 1}px`,
                            backgroundColor: element.color || "#000000"
                        }}
                        className={`absolute cursor-move ${selectedClass}`}
                    />
                );

            case "header":
                return (
                    <div
                        style={{
                            ...baseStyle,
                            fontSize: `${element.fontSize || 18}px`,
                            fontWeight: element.fontWeight || "bold",
                            color: element.color || "#000000",
                            textAlign: element.textAlign || "left",
                            width: element.width ? `${element.width}px` : 'auto',
                            textDecoration: element.underline ? 'underline' : 'none'
                        }}
                        className={`absolute cursor-move px-2 py-1 rounded transition-all whitespace-nowrap ${isSelected
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-transparent hover:border-blue-300 hover:bg-blue-50'
                            } ${selectedClass}`}
                    >
                        {element.value || element.field}
                    </div>
                );

            default: // text and field elements
                return (
                    <div
                        style={{
                            ...baseStyle,
                            fontSize: `${element.fontSize || 12}px`,
                            fontWeight: element.fontWeight || "normal",
                            color: element.color || "#000000",
                            textAlign: element.textAlign || "left",
                            width: element.width ? `${element.width}px` : 'auto'
                        }}
                        className={`absolute cursor-move px-2 py-1 rounded transition-all whitespace-nowrap ${isSelected
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-transparent hover:border-blue-300 hover:bg-blue-50'
                            } ${selectedClass}`}
                        title={element.field}
                    >
                        {element.value || element.field}
                    </div>
                );
        }
    };

    return (
        <div
            draggable
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            className="relative"
        >
            {renderElement()}
            {isSelected && (
                <button
                    onClick={handleDelete}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-20"
                >
                    <Trash2 size={12} />
                </button>
            )}
        </div>
    );
}

function Canvas({ elements, onDropToPage, onElementMove, onSelectElement, selectedElement, onDeleteElement }) {
    const pageRef = useRef(null);

    const allowDrop = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        if (!pageRef.current) return;

        const rect = pageRef.current.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);

        onDropToPage({ x, y });
    };

    const handleElementDragEnd = (e, index) => {
        if (!pageRef.current) return;

        const rect = pageRef.current.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left - 40);
        const y = Math.round(e.clientY - rect.top - 10);

        onElementMove(index, { x, y });
    };

    const handleCanvasClick = () => {
        onSelectElement(null, null);
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
            <div className="flex gap-2 p-3 bg-white border-b border-gray-200">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <Save size={16} />
                    Save Template
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <FileDown size={16} />
                    Export PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <Upload size={16} />
                    Import Template
                </button>
            </div>

            <div className="flex-1 overflow-auto p-5">
                <div
                    ref={pageRef}
                    className="w-[794px] h-[1123px] bg-white mx-auto shadow-lg relative"
                    onDragOver={allowDrop}
                    onDrop={handleDrop}
                    onClick={handleCanvasClick}
                    style={{
                        backgroundImage: `
                            linear-gradient(90deg, #f8fafc 1px, transparent 1px),
                            linear-gradient(#f8fafc 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                    }}
                >
                    {elements.map((element, index) => (
                        <CanvasElement
                            key={element.id}
                            element={element}
                            index={index}
                            isSelected={selectedElement?.id === element.id}
                            onSelect={onSelectElement}
                            onDragEnd={handleElementDragEnd}
                            onDelete={onDeleteElement}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function MainTemplateBuilder() {
    const [elements, setElements] = useState([]);
    const [draggingField, setDraggingField] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragStart = (e, field) => {
        setDraggingField(field);
        try {
            e.dataTransfer.setData("text/plain", field);
        } catch (err) { }
    };

    const handleDropToPage = (coords) => {
        if (!draggingField) return;

        const newElement = {
            id: Date.now(),
            field: draggingField,
            value: studentData[draggingField] || "",
            x: coords.x - 8,
            y: coords.y - 8,
            fontSize: 12,
            fontWeight: "normal",
            color: "#000000",
            textAlign: "left"
        };

        setElements((prev) => [...prev, newElement]);
        setDraggingField(null);
    };

    const handleAddElement = (elementConfig) => {
        const newElement = {
            id: Date.now(),
            x: 50,
            y: 50,
            ...elementConfig
        };
        setElements((prev) => [...prev, newElement]);
    };

    const handleLoadTemplate = (templateElements) => {
        setElements(templateElements.map(el => ({
            ...el,
            id: Date.now() + Math.random()
        })));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleAddElement({
                    type: "image",
                    src: e.target.result,
                    width: 200,
                    height: 150,
                    alt: "Uploaded Image"
                });
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    const handleElementMove = (index, coords) => {
        setElements((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], x: coords.x, y: coords.y };
            return copy;
        });
    };

    const handleSelectElement = (element, index) => {
        setSelectedElement(element);
        setSelectedIndex(index);
    };

    const handleUpdateElement = (updatedElement) => {
        setElements((prev) => {
            const copy = [...prev];
            copy[selectedIndex] = updatedElement;
            return copy;
        });
        setSelectedElement(updatedElement);
    };

    const handleDeleteElement = (index) => {
        setElements((prev) => prev.filter((_, i) => i !== index));
        setSelectedElement(null);
        setSelectedIndex(null);
    };

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />
            <div className="flex h-screen font-sans">
                <Sidebar
                    onDragStart={handleDragStart}
                    selectedElement={selectedElement}
                    onUpdateElement={handleUpdateElement}
                    onAddElement={handleAddElement}
                    fileInputRef={fileInputRef}
                    onLoadTemplate={handleLoadTemplate}
                />
                <Canvas
                    elements={elements}
                    onDropToPage={handleDropToPage}
                    onElementMove={handleElementMove}
                    onSelectElement={handleSelectElement}
                    selectedElement={selectedElement}
                    onDeleteElement={handleDeleteElement}
                />
            </div>
        </>
    );
}