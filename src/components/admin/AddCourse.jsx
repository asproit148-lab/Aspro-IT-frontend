// src/components/AddCourse.jsx
import React, { useEffect, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { addCourse } from "../../api/course"; 

export default function AddCourse({ onClose, onSave, existingCourse }) {

  // Step navigation
  const [step, setStep] = useState(1);

  // BASIC INFO
  const [title, setTitle] = useState(existingCourse?.Course_title || "");
  const [description, setDescription] = useState(existingCourse?.Course_description || "");

  // Image
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(existingCourse?.imageUrl || ""); // FIXED

  // Course Type 
  const [mode, setMode] = useState(existingCourse?.Course_type || "Offline"); // FIXED

  // Skills
  const [skills, setSkills] = useState(existingCourse?.Skills || []);
  const [skillInput, setSkillInput] = useState("");


  // MODULES (Curriculum)
  const [modules, setModules] = useState(existingCourse?.Modules || []);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescriptions, setModuleDescriptions] = useState([""]);

  // PRICING
  const [cost, setCost] = useState(existingCourse?.Course_cost ?? "");
  const [discount, setDiscount] = useState(existingCourse?.Discount ?? "");
  const [finalCost, setFinalCost] = useState(existingCourse?.Final_cost ?? ""); // FIXED FIELD NAME

  // FAQs
  const [faqs, setFaqs] = useState(existingCourse?.FAQs || []); // FIXED
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  // UI / Errors
  const [error, setError] = useState("");

  // finalCost
  useEffect(() => {
    const c = parseFloat(String(cost).replace(/[^0-9.]/g, "")) || 0;
    const d = parseFloat(String(discount).replace(/[^0-9.]/g, "")) || 0;
    const discounted = c - (c * d) / 100;
    setFinalCost(discounted >= 0 ? discounted.toFixed(2) : "0.00");
  }, [cost, discount]);

  // file/image preview
  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFile(f);
      const url = URL.createObjectURL(f);
      setImageUrl(url);
    }
  };

  // Navigation: Next with validations
  const next = () => {
    setError("");
    if (step === 1) {
      if (!title.trim() || !description.trim() || !mode) {
        setError("Please fill Title, Description and select Online/Offline.");
        return;
      }
    }
    if (step === 2) {
    }
    if (step === 3) {
      const c = parseFloat(String(cost).replace(/[^0-9.]/g, ""));
      if (isNaN(c)) {
        setError("Please enter a valid Course Cost.");
        return;
      }
    }
    if (step === 4) {
    }
    if (step < 5) setStep((s) => s + 1);
  };
  const back = () => {
    setError("");
    if (step > 1) setStep((s) => s - 1);
  };

  const addDescriptionField = () => {
    setModuleDescriptions((prev) => [...prev, ""]);
  };

  const updateModuleDescription = (index, value) => {
    setModuleDescriptions((prev) => prev.map((d, i) => (i === index ? value : d)));
  };

  const addModule = () => {
    if (!moduleTitle.trim()) {
      setError("Module title required to add module.");
      return;
    }
    const cleanedDescriptions = moduleDescriptions.map((d) => d.trim()).filter(Boolean);
    const newModule = { id: Date.now(), title: moduleTitle.trim(), descriptions: cleanedDescriptions };
    setModules((prev) => [...prev, newModule]);
    setModuleTitle("");
    setModuleDescriptions([""]);
    setError("");
  };

  const removeModule = (id) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  const addFaq = () => {
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      setError("Please enter FAQ Question and Answer before adding.");
      return;
    }
    const newFaq = { id: Date.now(), question: faqQuestion.trim(), answer: faqAnswer.trim() };
    setFaqs((prev) => [...prev, newFaq]);
    setFaqQuestion("");
    setFaqAnswer("");
    setError("");
  };

  const removeFaq = (id) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Skills
  const addSkill = () => {
    if (skillInput.trim() === "") return;
    setSkills((prev) => [...prev, skillInput.trim()]);
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

    // Save handler
  const handleSave = async () => {
    setError("");

    const formData = new FormData();

    formData.append("Course_title", title);
    formData.append("Course_description", description);
    formData.append("Course_type", mode); // Online/Offline
    formData.append("Course_cost", cost);
    formData.append("Discount", discount);

    // Arrays must be stringified
    formData.append("Skills", JSON.stringify(skills));
    formData.append("Modules", JSON.stringify(modules));
    formData.append("FAQs", JSON.stringify(faqs));

    // Image upload
    if (file) {
      formData.append("imageFile", file); 
    }

    try {
          console.log("Sending course data...");

      const res = await addCourse(formData);

      alert("Course added successfully!");
        if (onSave && res.course) {
      onSave(res.course); // This should include the real imageUrl from Cloudinary
    }
      onClose();
    } catch (err) {
      console.error("Error adding course:", err);
      setError("Failed to add course. Please try again.");
    }
  };


  const steps = ["Basic Info", "Curriculum", "Pricing", "FAQs & Skills", "Preview"];

  const boxStyle = {
    width: "820px",
    maxHeight: "80vh",
    overflowY: "auto",
    background: "#1B1B1B",
    borderRadius: "20px",
    padding: "26px 28px",
    boxShadow: "0px 8px 24px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "18px",
  };

  const stepContentStyle = {
    minHeight: "360px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div style={boxStyle}>
        {/* Heading + Steps */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "22px", color: "#FFFFFF" }}>
            {existingCourse ? "Edit Course" : "Add New Course"}
          </h2>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {steps.map((s, i) => {
              const idx = i + 1;
              const isActive = step === idx;
              const clickable = step === 5;
              return (
                <div
                  key={s}
                  onClick={() => (clickable ? setStep(idx) : null)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "999px",
                    background: isActive ? "#2B6EF0" : "transparent",
                    color: isActive ? "#fff" : "#C9C9C9",
                    border: isActive ? "none" : "1px solid rgba(255,255,255,0.06)",
                    cursor: clickable ? "pointer" : "default",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                    userSelect: "none",
                  }}
                >
                  {s}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div style={{ color: "#FFB4B4", background: "#3A2A2A", padding: "8px 12px", borderRadius: "8px" }}>
            {error}
          </div>
        )}

        {/* Step Content */}
        <div style={stepContentStyle}>
          {/* STEP 1 - BASIC INFO */}
          {step === 1 && (
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
                <input
                  type="text"
                  placeholder="Course Title *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "90%",
                    height: "48px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#2E2E2E",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    paddingLeft: "16px",
                    fontFamily: "Poppins, sans-serif",
                    outline: "none",
                  }}
                />

                <textarea
                  placeholder="Course Description *"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: "89%",
                    minHeight: "120px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#2E2E2E",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    padding: "12px 14px",
                    fontFamily: "Poppins, sans-serif",
                    resize: "vertical",
                    outline: "none",
                  }}
                />

                {/* Upload */}
                <label
                  htmlFor="course-image"
                  style={{
                    width: "91%",
                    height: "56px",
                    borderRadius: "14px",
                    background: "#2E2E2E",
                    border: "1px dashed rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "12px",
                    cursor: "pointer",
                    paddingLeft: "18px",
                    overflow: "hidden",
                    color: "#C9C9C9",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <Upload size={16} />
                  <span style={{ fontSize: "15px", fontWeight: 500 }}>Choose File</span>
                  <input id="course-image" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                </label>

                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "#C9C9C9" }}>
                    <input
                      type="radio"
                      name="mode"
                      checked={mode === "Online"}
                      onChange={() => setMode("Online")}
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span style={{ fontFamily: "Poppins, sans-serif" }}>Online</span>
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "#C9C9C9" }}>
                    <input
                      type="radio"
                      name="mode"
                      checked={mode === "Offline"}
                      onChange={() => setMode("Offline")}
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span style={{ fontFamily: "Poppins, sans-serif" }}>Offline</span>
                  </label>
                </div>
              </div>

              {/* RIGHT side - Skills / preview small */}
              <div style={{ width: "35%", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h4 style={{ color: "#FFFFFF", fontFamily: "Poppins, sans-serif", margin: 0 }}>Skills</h4>

                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="Enter Skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    style={{
                      flex: 1,
                      height: "46px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#2E2E2E",
                      color: "#FFFFFF",
                      paddingLeft: "12px",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={addSkill}
                    style={{
                      width: "110px",
                      height: "46px",
                      borderRadius: "10px",
                      background: "#2B6EF0",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    + Add
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                  {skills.length === 0 && (
                    <div style={{ color: "#C9C9C9", fontFamily: "Poppins, sans-serif" }}>No skills added yet.</div>
                  )}
                  {skills.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px",
                        background: "#222222",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#FFFFFF", fontFamily: "Poppins, sans-serif" }}>{s}</span>
                      <button
                        onClick={() => removeSkill(i)}
                        title="Remove skill"
                        style={{
                          height: "30px",
                          width: "36px",
                          borderRadius: "8px",
                          background: "#414141",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Small cancel button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
                  <button
                    onClick={() => onClose && onClose()}
                    style={{
                      width: "120px",
          height: "44px",
          borderRadius: "12px",
          background: "#414141",
          color: "#FFFFFF",
          border: "none",
          cursor: "pointer",
          fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 - CURRICULUM */}
          {step === 2 && (
            <div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Module Title"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  style={{
                    flex: 1,
                    height: "46px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#2E2E2E",
                    color: "#FFFFFF",
                    paddingLeft: "12px",
                    fontFamily: "Poppins, sans-serif",
                    outline: "none",
                  }}
                />
                <button
                  onClick={addDescriptionField}
                  style={{
                    width: "200px",
                    height: "46px",
                    borderRadius: "10px",
                    background: "#414141",
                    color: "#FFFFFF",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  + Add Another Description
                </button>
                <button
                  onClick={addModule}
                  style={{
                    width: "150px",
                    height: "46px",
                    borderRadius: "10px",
                    background: "#2B6EF0",
                    color: "#FFFFFF",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  + Add Module
                </button>
              </div>

              {/* Module descriptions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                {moduleDescriptions.map((desc, idx) => (
                  <textarea
                    key={idx}
                    placeholder={`Description ${idx + 1}`}
                    value={desc}
                    onChange={(e) => updateModuleDescription(idx, e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "48px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#2E2E2E",
                      color: "#FFFFFF",
                      padding: "10px",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                ))}
              </div>

              {/* Modules list */}
              <div style={{ marginTop: "12px" }}>
                <h4 style={{ color: "#FFFFFF", fontFamily: "Poppins, sans-serif" }}>Added Modules</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                  {modules.length === 0 && <div style={{ color: "#C9C9C9" }}>No modules added yet.</div>}
                  {modules.map((m) => (
                    <div key={m.id} style={{ padding: "10px", background: "#222222", borderRadius: "10px", display: "flex", justifyContent: "space-between", gap: "12px" }}>
                      <div>
                        <div style={{ color: "#FFFFFF", fontWeight: 600 }}>{m.title}</div>
                        <div style={{ color: "#C9C9C9", marginTop: "6px" }}>
                          {m.descriptions.map((d, i) => (
                            <div key={i} style={{ fontSize: "13px", marginBottom: "6px" }}>
                              • {d}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => removeModule(m.id)}
                          title="Remove module"
                          style={{
                            height: "36px",
                            width: "40px",
                            borderRadius: "8px",
                            background: "#414141",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 - PRICING */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Course Cost *"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  style={{
                    flex: 1,
                    height: "46px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#2E2E2E",
                    color: "#FFFFFF",
                    paddingLeft: "12px",
                    fontFamily: "Poppins, sans-serif",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Offer / Discount (%)"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  style={{
                    width: "220px",
                    height: "46px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#2E2E2E",
                    color: "#FFFFFF",
                    paddingLeft: "12px",
                    fontFamily: "Poppins, sans-serif",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Final Cost"
                  value={finalCost}
                  readOnly
                  style={{
                    width: "180px",
                    height: "46px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#141414",
                    color: "#FFFFFF",
                    paddingLeft: "12px",
                    fontFamily: "Poppins, sans-serif",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 4 - FAQS & SKILLS */}
          {step === 4 && (
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              {/* left - FAQs */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                <h4 style={{ color: "#FFFFFF", fontFamily: "Poppins, sans-serif", margin: 0 }}>FAQs</h4>
                <div style={{ display: "flex", gap: "12px" }}>
                  <input
                    type="text"
                    placeholder="Question"
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    style={{
                      flex: 1,
                      height: "46px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#2E2E2E",
                      color: "#FFFFFF",
                      paddingLeft: "12px",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Answer"
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    style={{
                      width: "320px",
                      height: "46px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#2E2E2E",
                      color: "#FFFFFF",
                      paddingLeft: "12px",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={addFaq}
                    style={{
                      width: "140px",
                      height: "46px",
                      borderRadius: "10px",
                      background: "#2B6EF0",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    + Add FAQ
                  </button>
                </div>

                <div style={{ marginTop: "6px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                    {faqs.length === 0 && <div style={{ color: "#C9C9C9" }}>No FAQs added yet.</div>}
                    {faqs.map((f) => (
                      <div key={f.id} style={{ padding: "10px", background: "#222222", borderRadius: "10px", display: "flex", justifyContent: "space-between", gap: "12px" }}>
                        <div>
                          <div style={{ color: "#FFFFFF", fontWeight: 600 }}>{f.question}</div>
                          <div style={{ color: "#C9C9C9", marginTop: "6px" }}>{f.answer}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            onClick={() => removeFaq(f.id)}
                            title="Remove FAQ"
                            style={{
                              height: "36px",
                              width: "40px",
                              borderRadius: "8px",
                              background: "#414141",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 - PREVIEW */}
          {step === 5 && (
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              {/* Left: image + title + mode + faqs + curriculum */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "260px", height: "140px", borderRadius: "8px", overflow: "hidden", background: "#2E2E2E", border: "1px solid rgba(255,255,255,0.04)" }}>
                    {imageUrl ? (
                      <img src={imageUrl} alt="Course image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9C9C9" }}>No Image</div>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                    <div style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 700 }}>{title || "Untitled Course"}</div>

                    {/* Skills under title: 3 in a row */}
                    {skills.length > 0 && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "6px" }}>
                        {skills.map((s, idx) => (
                          <div key={idx} style={{ background: "#222222", padding: "8px", borderRadius: "8px", textAlign: "center", color: "#FFFFFF", fontSize: "13px" }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ marginTop: "8px", padding: "6px 8px", background: "#2B2B2B", borderRadius: "8px", width: "fit-content" }}>
                      <span style={{ color: "#C9C9C9", fontFamily: "Poppins, sans-serif", fontSize: "13px" }}>{mode}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: "#FFFFFF" }}>Curriculum</h4>
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {modules.length === 0 && <div style={{ color: "#C9C9C9" }}>No modules added.</div>}
                    {modules.map((m) => (
                      <div key={m.id} style={{ background: "#222222", padding: "10px", borderRadius: "8px" }}>
                        <div style={{ color: "#FFFFFF", fontWeight: 600 }}>{m.title}</div>
                        <div style={{ color: "#C9C9C9", marginTop: "6px" }}>{m.descriptions.join(" • ")}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: "#FFFFFF" }}>FAQs</h4>
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {faqs.length === 0 && <div style={{ color: "#C9C9C9" }}>No FAQs added.</div>}
                    {faqs.map((f) => (
                      <div key={f.id} style={{ background: "#222222", padding: "10px", borderRadius: "8px" }}>
                        <div style={{ color: "#FFFFFF", fontWeight: 600 }}>{f.question}</div>
                        <div style={{ color: "#C9C9C9", marginTop: "6px" }}>{f.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: pricing summary & actions */}
              <div style={{ width: "260px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ padding: "12px", background: "#111111", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ color: "#C9C9C9", fontSize: "13px" }}>Cost</div>
                  <div style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700, marginTop: "6px" }}>{cost || "0.00"}</div>
                </div>

                <div style={{ padding: "12px", background: "#111111", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ color: "#C9C9C9", fontSize: "13px" }}>Discount</div>
                  <div style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700, marginTop: "6px" }}>{discount || "0.00"}</div>
                </div>

                <div style={{ padding: "12px", background: "#0B0B0B", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ color: "#C9C9C9", fontSize: "13px" }}>Final Cost</div>
                  <div style={{ color: "#2B6EF0", fontSize: "20px", fontWeight: 800, marginTop: "6px" }}>{finalCost || "0.00"}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                  <button
                    onClick={back}
                    style={{
                      width: "100%",
                      height: "44px",
                      borderRadius: "10px",
                      background: "#414141",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      width: "100%",
                      height: "44px",
                      borderRadius: "10px",
                      background: "#2B6EF0",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom navigation (consistent placement) */}
        {step !== 5 && (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "6px",
    }}
  >
    {/* Hide Back button on Step 1 */}
    {step !== 1 && (
      <button
        onClick={back}
        style={{
          width: "120px",
          height: "44px",
          borderRadius: "12px",
          background: "#414141",
          color: "#FFFFFF",
          border: "none",
          cursor: "pointer",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Back
      </button>
    )}

    <button
      onClick={next}
      style={{
        width: "120px",
        height: "44px",
        borderRadius: "12px",
        background: "#2B6EF0",
        color: "#FFFFFF",
        border: "none",
        cursor: "pointer",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 600,
      }}
    >
      Next
    </button>
  </div>
)}
      </div>
    </div>
  );
}
