/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from "react";
import Structure from "../../components/layout/Structure";
import Button from "../../components/common/Button";
import Tab from "../../components/common/Tab";

const DUMMY_JSON_FILES = [
  {
    name: "user_profile.json",
    color: "#1e74db",
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1-555-123-4567",
      isActive: true,
      age: 30,
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      roles: ["admin", "editor"],
      preferences: {
        theme: "light",
        notifications: true,
      },
    },
  },
  {
    name: "product_details.json",
    color: "#ef4444",
    data: {
      id: "prod_99812",
      title: "Wireless Noise-Canceling Headphones",
      price: 199.99,
      category: "Electronics",
      inStock: true,
      stockCount: 42,
      specs: {
        batteryLife: "30h",
        bluetoothVersion: "5.2",
        color: "Matte Black",
      },
      tags: ["audio", "wireless", "anc"],
    },
  },
  {
    name: "order_feed.json",
    color: "#f97316",
    data: {
      orderId: "ord_771625",
      customerId: "cust_10928",
      items: [
        {
          itemId: "item_882",
          quantity: 2,
          price: 49.99,
        },
      ],
      shippingAddress: {
        street: "456 Oak Avenue",
        city: "San Francisco",
        state: "CA",
        zip: "94102",
      },
      paymentStatus: "Paid",
      total: 99.98,
    },
  },
  {
    name: "settings_config.json",
    color: "#22c55e",
    data: {
      appName: "Antigravity Admin CMS",
      version: "1.2.0",
      maintenanceMode: false,
      features: {
        enableAI: true,
        allowGuestCheckout: false,
        multiCurrency: true,
      },
      allowedLanguages: ["en", "es", "fr"],
    },
  },
];

const initialJson = DUMMY_JSON_FILES[0].data;

const Json = () => {
  const [selectedFile, setSelectedFile] = useState("user_profile.json");
  const [jsonText, setJsonText] = useState(JSON.stringify(initialJson, null, 2));
  const [schemaTitle, setSchemaTitle] = useState("USER PROFILE");
  const [leftTab, setLeftTab] = useState("editor"); // 'editor' | 'tree'
  const [rightTab, setRightTab] = useState("fields"); // 'fields' | 'array' | 'object' | 'custom'

  const [isValid, setIsValid] = useState(true);
  const [validationMsg, setValidationMsg] = useState("JSON is valid");
  const [parsedObj, setParsedObj] = useState(initialJson);
  const [fields, setFields] = useState([]);

  const gutterRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSidebarItemClick = (fileName) => {
    setSelectedFile(fileName);
    const file = DUMMY_JSON_FILES.find((f) => f.name === fileName);
    if (file) {
      setJsonText(JSON.stringify(file.data, null, 2));
      setSchemaTitle(fileName.replace(".json", "").replace("_", " ").toUpperCase());
    }
  };

  // Validate and parse JSON whenever input changes
  useEffect(() => {
    try {
      if (!jsonText.trim()) {
        setIsValid(false);
        setValidationMsg("JSON cannot be empty");
        setFields([]);
        return;
      }
      const parsed = JSON.parse(jsonText);
      setParsedObj(parsed);
      setIsValid(true);
      setValidationMsg("JSON is valid");

      // Extract top level fields
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const extractedFields = Object.entries(parsed).map(([key, val]) => {
          let type = "String";
          if (typeof val === "number") type = "Number";
          else if (typeof val === "boolean") type = "Boolean";
          else if (Array.isArray(val)) type = "Array";
          else if (val && typeof val === "object") type = "Object";
          return { key, type };
        });
        setFields(extractedFields);
      } else {
        setFields([]);
      }
    } catch (err) {
      setIsValid(false);
      setValidationMsg(err.message);
    }
  }, [jsonText]);

  // Sync Gutter Scroll
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // 1. Format JSON Action
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch {
      // Do nothing if invalid
    }
  };

  // 2. Minify JSON Action
  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed));
    } catch {
      // Do nothing if invalid
    }
  };

  // 3. Clear All Action
  const handleClear = () => {
    setJsonText("");
  };

  // 4. Load Example Action
  const handleLoadExample = () => {
    setJsonText(JSON.stringify(initialJson, null, 2));
  };

  // 5. Copy JSON to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    alert("JSON copied to clipboard!");
  };

  // 6. Export JSON File Download
  const handleExport = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonText);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${schemaTitle.toLowerCase().replace(/\s+/g, "_")}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      alert("Failed to export JSON: " + err.message);
    }
  };

  // Update JSON from right fields modification
  const serializeFields = (updatedFields) => {
    const newObj = {};
    updatedFields.forEach((field) => {
      // Retain old values if key exists in parsedObj
      if (Object.prototype.hasOwnProperty.call(parsedObj, field.key)) {
        const oldValue = parsedObj[field.key];
        // Check if value type matches selected type, if not cast it
        if (field.type === "Number" && typeof oldValue !== "number") {
          newObj[field.key] = Number(oldValue) || 0;
        } else if (field.type === "Boolean" && typeof oldValue !== "boolean") {
          newObj[field.key] = true;
        } else if (field.type === "Array" && !Array.isArray(oldValue)) {
          newObj[field.key] = [];
        } else if (field.type === "Object" && (typeof oldValue !== "object" || Array.isArray(oldValue))) {
          newObj[field.key] = {};
        } else if (field.type === "String" && typeof oldValue !== "string") {
          newObj[field.key] = String(oldValue);
        } else {
          newObj[field.key] = oldValue;
        }
      } else {
        // Assign default values for new fields
        if (field.type === "String") newObj[field.key] = "";
        else if (field.type === "Number") newObj[field.key] = 0;
        else if (field.type === "Boolean") newObj[field.key] = true;
        else if (field.type === "Array") newObj[field.key] = [];
        else if (field.type === "Object") newObj[field.key] = {};
      }
    });
    setJsonText(JSON.stringify(newObj, null, 2));
  };

  // Edit Key Name from right panel
  const handleFieldKeyChange = (index, newKey) => {
    const updated = [...fields];
    const oldKey = updated[index].key;
    if (newKey === oldKey) return;

    updated[index].key = newKey;
    setFields(updated);

    // Update JSON text
    const newObj = {};
    fields.forEach((f, i) => {
      const k = i === index ? newKey : f.key;
      const originalKeyName = i === index ? oldKey : f.key;
      newObj[k] = parsedObj[originalKeyName];
    });
    setJsonText(JSON.stringify(newObj, null, 2));
  };

  // Change Field Type from right panel
  const handleFieldTypeChange = (index, newType) => {
    const updated = [...fields];
    updated[index].type = newType;
    setFields(updated);
    serializeFields(updated);
  };

  // Delete Field
  const handleFieldDelete = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    serializeFields(updated);
  };

  // Add Field
  const handleAddField = () => {
    let baseName = "newField";
    let counter = 1;
    while (Object.prototype.hasOwnProperty.call(parsedObj, baseName)) {
      baseName = `newField_${counter}`;
      counter++;
    }
    const updated = [...fields, { key: baseName, type: "String" }];
    setFields(updated);
    serializeFields(updated);
  };

  // Recursive Tree Node renderer
  const renderTreeNode = (val, key = null, isLast = true) => {
    if (val === null) {
      return (
        <div>
          {key && <span className="text-secondary font-600">"{key}": </span>}
          <span className="text-gray">null</span>
          {!isLast && ","}
        </div>
      );
    }
    if (typeof val === "boolean") {
      return (
        <div>
          {key && <span className="text-secondary font-600">"{key}": </span>}
          <span className="text-warning font-600">{val.toString()}</span>
          {!isLast && ","}
        </div>
      );
    }
    if (typeof val === "number") {
      return (
        <div>
          {key && <span className="text-secondary font-600">"{key}": </span>}
          <span className="text-primary font-600">{val}</span>
          {!isLast && ","}
        </div>
      );
    }
    if (typeof val === "string") {
      return (
        <div>
          {key && <span className="text-secondary font-600">"{key}": </span>}
          <span className="text-success">"{val}"</span>
          {!isLast && ","}
        </div>
      );
    }

    if (Array.isArray(val)) {
      return (
        <div className="ml-16">
          {key && <span className="text-secondary font-600">"{key}": </span>}
          <span className="text-gray">[</span>
          {val.map((item, idx) => (
            <div key={idx} className="ml-16 pl-10 bordl">
              {renderTreeNode(item, null, idx === val.length - 1)}
            </div>
          ))}
          <span className="text-gray">]</span>
          {!isLast && ","}
        </div>
      );
    }

    if (typeof val === "object") {
      const entries = Object.entries(val);
      return (
        <div className="ml-16">
          {key && <span className="text-secondary font-600">"{key}": </span>}
          <span className="text-gray">{"{"}</span>
          {entries.map(([k, v], idx) => (
            <div key={k} className="ml-16 pl-10 bordl">
              {renderTreeNode(v, k, idx === entries.length - 1)}
            </div>
          ))}
          <span className="text-gray">{"}"}</span>
          {!isLast && ","}
        </div>
      );
    }
  };

  // Generate line numbers gutter
  const lineCount = jsonText.split("\n").length;
  const gutterLines = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  // Field Type Icons
  const getTypeIcon = (type) => {
    switch (type) {
      case "String": return "A";
      case "Number": return "#";
      case "Boolean": return "☑";
      case "Array": return "[]";
      case "Object": return "{}";
      default: return "A";
    }
  };
  return (
    <>
      <style>{`
        .editor-textarea {
          // font-family: 'Courier New', Courier, monospace !important;
          font-size: 13px !important;
          line-height: 20px !important;
          color: #24292e !important;
          resize: none !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          overflow-y: auto !important;
          white-space: pre !important;
          width: 100% !important;
          height: 100% !important;
          padding: 10px !important;
        }
      `}</style>
      <Structure
        sidebarTitle="JSON Files"
        sidebarItems={DUMMY_JSON_FILES}
        selectedSidebarItem={selectedFile}
        onSidebarItemClick={handleSidebarItemClick}
        headerIcon={
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        }
        headerTitle="JSON Schema Editor"
        headerSub={`${DUMMY_JSON_FILES.length} JSON files • ${fields.length} schema fields • ${isValid ? "JSON is valid" : "Syntax error"} • ${jsonText.length} bytes`}
        quickAction={
          <div className="text-right">
            <p className="mini-text text-gray font-600 uppercase mb-2">QUICK ACTION</p>
            <p className="small-text font-600 text-primary flex items-center gap-2 decoration-none cursor-pointer" style={{ display: "inline-flex" }} onClick={handleExport}>
              Export Schema JSON
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </p>
          </div>
        }
        tabs={[
          {
            name: "JSON Editor & Schema",
            icon: (
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            )
          }
        ]}
        activeTab="JSON Editor & Schema"
        showTabControls={true}
      >
        {/* 2. MAIN GRID LAYOUT */}
        <div className="flex gap-12 mb-10">

          {/* LEFT CARD: JSON EDITOR */}
          <div className="bg-white rounded-5 w-55">
            <div className="bordb flex justify-between items-center pr-10 pt-5">
              <div className="flex gap-16 items-center">
                <Tab
                  tabs={[
                    { name: "JSON Editor", value: "editor" },
                    { name: "Tree View", value: "tree" }
                  ]}
                  activeTab={leftTab}
                  onChange={setLeftTab}
                />
              </div>

              <div className="flex gap-10">
                <Button
                  version="v2"
                  bg="white"
                  color="dark"
                  border="ec"
                  className="gap-6 font-600 items-center"
                  onClick={handleFormat}
                >
                  {"{ }"} Format
                </Button>
                <Button
                  version="v2"
                  bg="white"
                  color="dark"
                  border="ec"
                  className="gap-6 font-600 items-center"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="p-12">
              {leftTab === "editor" ? (
                <div className="flex rounded-5 bg-white h-450 overflow-hidden">
                  <textarea
                    className="border-ec w-full p-10 overflow-auto"
                    ref={textareaRef}
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    onScroll={handleScroll}
                    spellCheck="false"
                  />
                </div>
              ) : (
                <div className="tree-container small-text h-400 overflow-auto p-10 bg-white border-ec rounded-5">
                  {isValid ? (
                    renderTreeNode(parsedObj, null, true)
                  ) : (
                    <div className="text-danger p-10 small-text">
                      Please resolve syntax errors in the JSON Editor to generate the tree view.
                    </div>
                  )}
                </div>
              )}

              {/* Status bar */}
              <div className="pt-8 bordh mt-8 flex justify-between items-center mini-text text-gray">
                <span className={`flex items-center gap-4 font-500 ${isValid ? "text-success" : "text-danger"}`}>
                  {isValid ? (
                    <>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                      </svg>
                      Valid JSON
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                      </svg>
                      Invalid JSON
                    </>
                  )}
                </span>
                <span>Ln {lineCount}, Length: {jsonText.length} bytes</span>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: SCHEMA FIELDS CONFIG */}
          <div className="bg-white rounded-5 w-45">
            <div className="bordb flex justify-between items-center pr-10 pt-5">
              <Tab
                tabs={[
                  { name: "Fields", value: "fields" },
                  { name: "Array", value: "array" },
                  { name: "Object", value: "object" }
                ]}
                activeTab={rightTab}
                onChange={setRightTab}
              />
              <Button
                version="v2"
                bg="white"
                color="gray"
                className="p-6 justify-center items-center"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>

            <div className="p-12">
              <div className="grid-cols-1 gap-8 h-450 overflow-auto">
                {fields.map((field, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-10 bg-forth rounded-5 p-8 px-10">
                    <div className="flex items-center gap-8 w-60">
                      <span className="text-gray small-text font-600 text-center w-10">{getTypeIcon(field.type)}</span>
                      <input
                        type="text"
                        className="h-input border-0 w-90"
                        value={field.key}
                        onChange={(e) => handleFieldKeyChange(idx, e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-8 w-40">
                      <select
                        className="border-0 h-input"
                        value={field.type}
                        onChange={(e) => handleFieldTypeChange(idx, e.target.value)}
                      >
                        <option>String</option>
                        <option>Number</option>
                        <option>Boolean</option>
                        <option>Array</option>
                        <option>Object</option>
                      </select>

                      <Button
                        version="v2"
                        bg="white"
                        color="gray"
                        className="p-4 items-center"
                        onClick={() => handleFieldDelete(idx)}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                bg="primary"
                color="white"
                version="v3"
                onClick={handleAddField}
              >
                + Add Field
              </Button>
            </div>
          </div>

        </div>

        <div className="bg-white rounded-5 p-12">
          <p className="small-text font-600 text-dark mb-5 flex items-center gap-6">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className={isValid ? "text-success" : "text-danger"}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Validation
          </p>
          <div>
            <p className={`font-600 mb-5 ${isValid ? "text-success" : "text-danger"}`}>
              {isValid ? "JSON is valid" : "Syntax Error"}
            </p>
            <p className="text-gray m-0 small-text">
              {isValid ? "No errors found." : validationMsg}
            </p>
          </div>
        </div>
      </Structure>
    </>
  );
};

export default Json;
