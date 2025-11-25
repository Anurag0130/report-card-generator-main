import React, { useState, useRef } from "react";
import { Search, Trash2, Save, FileDown, Upload, Type, Table, Image as ImageIcon } from "lucide-react";

// Sample data structure based on your JSON
const studentData = {
    ApplicantAutoId: "APP/26-27/0163",
    AcademicYear: "2026-27",
    Class: "GRADE 3",
    udf_curriculum: "IB",
    udf_current_school: "",
    udf_current_class: "Grade 2",
    udf_is_transport: "YES",
    udf_Name_of_the_Applicant: "Ryaan seth",
    udf_Name_of_the_Sibling: "",
    SiblingClass: "",
    FatherName: "Nimish Seth",
    MotherName: "Aishwarya rawat",
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

function Sidebar({ onDragStart, selectedElement, onUpdateElement, onAddElement }) {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("fields");

    const filterFields = (fields) =>
        fields.filter((f) => f.toLowerCase().includes(query.toLowerCase()));

    const addStaticElement = (type) => {
        if (type === "text") {
            onAddElement({ type: "text", value: "Static Text", fontSize: 14, fontWeight: "bold" });
        } else if (type === "table") {
            onAddElement({
                type: "table",
                rows: 2,
                cols: 2,
                width: 400,
                height: 100,
                borderWidth: 1
            });
        }
    };

    return (
        <div className="w-72 border-r border-gray-200 bg-gray-50 flex flex-col overflow-hidden">
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
                        Static Elements
                    </h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => addStaticElement("text")}
                            className="w-full flex items-center gap-3 bg-white p-3 border border-gray-200 rounded-md hover:border-blue-500 hover:shadow-sm transition-all"
                        >
                            <Type size={18} className="text-gray-600" />
                            <span className="text-sm font-medium">Add Text Label</span>
                        </button>
                        <button
                            onClick={() => addStaticElement("table")}
                            className="w-full flex items-center gap-3 bg-white p-3 border border-gray-200 rounded-md hover:border-blue-500 hover:shadow-sm transition-all"
                        >
                            <Table size={18} className="text-gray-600" />
                            <span className="text-sm font-medium">Add Table</span>
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "properties" && (
                <div className="p-4">
                    {selectedElement ? (
                        <>
                            <h3 className="text-sm font-semibold text-gray-800 mb-4">Element Properties</h3>

                            {selectedElement.type === "table" ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-xs font-medium text-gray-600 mb-2">Field Name</label>
                                        <div className="px-3 py-2 bg-gray-100 rounded-md text-xs text-gray-800 font-mono">
                                            {selectedElement.field || selectedElement.value}
                                        </div>
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
                                    {selectedElement.type === "text" && (
                                        <div className="mb-4">
                                            <label className="block text-xs font-medium text-gray-600 mb-2">Text Content</label>
                                            <input
                                                type="text"
                                                value={selectedElement.value || ""}
                                                onChange={(e) => onUpdateElement({ ...selectedElement, value: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-gray-400 text-sm py-8">
                            Select an element to edit properties
                        </p>
                    )}
                </div>
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

    const renderElement = (el, i) => {
        if (el.type === "table") {
            const cellWidth = (el.width || 400) / (el.cols || 2);
            const cellHeight = (el.height || 100) / (el.rows || 2);

            return (
                <div
                    key={el.id}
                    draggable
                    onDragEnd={(e) => handleElementDragEnd(e, i)}
                    onClick={() => onSelectElement(el, i)}
                    className={`absolute cursor-move ${selectedElement?.id === el.id ? 'ring-2 ring-blue-500' : ''}`}
                    style={{ left: `${el.x}px`, top: `${el.y}px` }}
                >
                    <table
                        style={{
                            borderCollapse: 'collapse',
                            width: `${el.width || 400}px`
                        }}
                    >
                        <tbody>
                            {Array.from({ length: el.rows || 2 }).map((_, rowIdx) => (
                                <tr key={rowIdx}>
                                    {Array.from({ length: el.cols || 2 }).map((_, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className="border border-black p-2"
                                            style={{
                                                width: `${cellWidth}px`,
                                                height: `${cellHeight}px`,
                                                borderWidth: `${el.borderWidth || 1}px`
                                            }}
                                        >
                                            Cell {rowIdx + 1},{colIdx + 1}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedElement?.id === el.id && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onDeleteElement(i); }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                            <Trash2 size={12} />
                        </button>
                    )}
                </div>
            );
        }

        return (
            <div
                key={el.id}
                draggable
                onDragEnd={(e) => handleElementDragEnd(e, i)}
                onClick={() => onSelectElement(el, i)}
                className={`absolute px-2 py-1 border border-dashed cursor-move rounded transition-all whitespace-nowrap ${selectedElement?.id === el.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-transparent hover:border-blue-300 hover:bg-blue-50'
                    }`}
                style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    fontSize: `${el.fontSize || 12}px`,
                    fontWeight: el.fontWeight || "normal",
                    color: el.color || "#000000"
                }}
                title={el.field}
            >
                {el.value || el.field}
                {selectedElement?.id === el.id && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDeleteElement(i); }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <Trash2 size={12} />
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
            <div className="flex gap-2 p-3 bg-white border-b border-gray-200">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <Save size={16} />
                    Save
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <FileDown size={16} />
                    Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <Upload size={16} />
                    Import
                </button>
            </div>

            <div className="flex-1 overflow-auto p-5">
                <div
                    ref={pageRef}
                    className="w-[794px] h-[1123px] bg-white mx-auto shadow-lg relative"
                    onDragOver={allowDrop}
                    onDrop={handleDrop}
                >
                    {elements.map((el, i) => renderElement(el, i))}
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
            color: "#000000"
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
            <div className="flex h-screen font-sans">
                <Sidebar
                    onDragStart={handleDragStart}
                    selectedElement={selectedElement}
                    onUpdateElement={handleUpdateElement}
                    onAddElement={handleAddElement}
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