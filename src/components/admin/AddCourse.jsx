import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function AddCourse({ onClose, onSave, existingCourse }) {
  const [step, setStep] = useState(1);

  // Basic Info
  const [category, setCategory] = useState(existingCourse?.category || "");
  const [title, setTitle] = useState(existingCourse?.title || "");
  const [description, setDescription] = useState(existingCourse?.description || "");
  const [file, setFile] = useState(null); 
  const [imageUrl, setImageUrl] = useState(existingCourse?.image || ""); 
  const [type, setType] = useState(existingCourse?.type || "Live"); 

  // Curriculum 
  const [modules, setModules] = useState(existingCourse?.modules || []);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescriptions, setModuleDescriptions] = useState([""]);

  // Pricing
  const [cost, setCost] = useState(existingCourse?.cost ?? "");
  const [discount, setDiscount] = useState(existingCourse?.discount ?? "");
  const [finalCost, setFinalCost] = useState(existingCourse?.finalCost ?? "");

  // FAQs
  const [faqs, setFaqs] = useState(existingCourse?.faqs || []);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const c = parseFloat(String(cost).replace(/[^0-9.]/g, "")) || 0;
    const d = parseFloat(String(discount).replace(/[^0-9.]/g, "")) || 0;
    const discounted = c - (c * d / 100);
    setFinalCost(discounted >= 0 ? discounted.toFixed(2) : "0.00");
  }, [cost, discount]);

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFile(f);
      const url = URL.createObjectURL(f);
      setImageUrl(url);
    }
  };

  // navigation
  const next = () => {
    setError("");
    if (step === 1) {
      if (!category.trim() || !title.trim() || !description.trim() || !type) {
        setError("Please fill Category, Title, Description and select Live/Recorded.");
        return;
      }
    }
    if (step === 2) {
    }
    if (step === 3) {
      // ensure cost is numeric
      const c = parseFloat(String(cost).replace(/[^0-9.]/g, ""));
      if (isNaN(c)) {
        setError("Please enter a valid Course Cost.");
        return;
      }
    }

    if (step < 5) setStep(step + 1);
  };

  const back = () => {
    setError("");
    if (step > 1) setStep(step - 1);
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

  // FAQ actions
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

  const handleSave = () => {
    if (!category.trim() || !title.trim() || !description.trim()) {
      setError("Please complete basic info before saving.");
      setStep(1);
      return;
    }

    const courseData = {
      id: existingCourse?.id || Date.now(),
      category: category.trim(),
      title: title.trim(),
      description: description.trim(),
      image: imageUrl || "",
      file: file || null, 
      type,
      modules,
      cost: parseFloat(String(cost).replace(/[^0-9.]/g, "")) || 0,
      discount: parseFloat(String(discount).replace(/[^0-9.]/g, "")) || 0,
      finalCost: parseFloat(String(finalCost).replace(/[^0-9.]/g, "")) || 0,
      faqs,
    };

    if (onSave) onSave(courseData);
    if (onClose) onClose();
  };

  const steps = ["Basic Info", "Curriculum", "Pricing", "FAQs", "Preview"];

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
      <div
        style={{
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
        }}
      >
        {/* Heading + Steps */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "22px", color: "#FFFFFF" }}>
            Add New Course
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

        {/* Error */}
        {error && (
          <div style={{ color: "#FFB4B4", background: "#3A2A2A", padding: "8px 12px", borderRadius: "8px" }}>{error}</div>
        )}

        {/* Step Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Course Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    flex: 1,
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

                <input
                  type="text"
                  placeholder="Course Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    flex: 2,
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
              </div>

              <textarea
                placeholder="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "97%",
                  height: "40px",
                  borderRadius: "12px",
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
                  width: "100%",
                  height: "40px",
                  borderRadius: "14px",
                  background: "#2E2E2E",
                  border: "1px dashed rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px", color: "#C9C9C9", marginTop: "15px" }}>
                  Choose File
                </p>
                <input id="course-image" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              </label>

              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="course-type"
                    checked={type === "Live"}
                    onChange={() => setType("Live")}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span style={{ color: "#C9C9C9", fontFamily: "Poppins, sans-serif" }}>Live</span>
                </label>
                
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="course-type"
                    checked={type === "Recorded"}
                    onChange={() => setType("Recorded")}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span style={{ color: "#C9C9C9", fontFamily: "Poppins, sans-serif" }}>Recorded</span>
                </label>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <button
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  style={{
                    width: "120px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#414141",
                    color: "#FFFFFF",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={next}
                  style={{
                    width: "120px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#2B6EF0",
                    color: "#FFFFFF",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
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
                  onClick={() => addDescriptionField()}
                  style={{
                    width: "150px",
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
                  + Add Module
                </button>
              </div>

              {/* Current module description fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {moduleDescriptions.map((desc, idx) => (
                  <textarea
                    key={idx}
                    placeholder={`Description ${idx + 1}`}
                    value={desc}
                    onChange={(e) => updateModuleDescription(idx, e.target.value)}
                    style={{
                      width: "98%",
                      minHeight: "36px",
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
              <div style={{ marginTop: "6px" }}>
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
                          style={{
                            height: "36px",
                            borderRadius: "8px",
                            background: "#414141",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            padding: "0 12px",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <button onClick={back} style={{ width: "120px", height: "44px", borderRadius: "12px", background: "#414141", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                  Back
                </button>
                <button onClick={next} style={{ width: "120px", height: "44px", borderRadius: "12px", background: "#2B6EF0", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Course Cost"
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
                  placeholder="Offer / Discount"
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

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <button onClick={back} style={{ width: "120px", height: "44px", borderRadius: "12px", background: "#414141", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                  Back
                </button>
                <button onClick={next} style={{ width: "120px", height: "44px", borderRadius: "12px", background: "#2B6EF0", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                <h4 style={{ color: "#FFFFFF", fontFamily: "Poppins, sans-serif" }}>Added FAQs</h4>
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
                          style={{
                            height: "36px",
                            borderRadius: "8px",
                            background: "#414141",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            padding: "0 12px",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <button onClick={back} style={{ width: "120px", height: "44px", borderRadius: "12px", background: "#414141", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                  Back
                </button>
                <button onClick={next} style={{ width: "120px", height: "44px", borderRadius: "12px", background: "#2B6EF0", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              {/* Left: image + title + type + faqs */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "240px", height: "120px", borderRadius: "8px", overflow: "hidden", background: "#2E2E2E", border: "1px solid rgba(255,255,255,0.04)" }}>
                    {imageUrl ? (
                      <img src={imageUrl} alt="Course image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9C9C9" }}>No Image</div>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                    <div style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700 }}>{title || "Untitled Course"}</div>
                    <div style={{ color: "#C9C9C9", fontSize: "13px" }}>{category}</div>
                    <div style={{ marginTop: "6px", padding: "6px 8px", background: "#2B2B2B", borderRadius: "8px", width: "fit-content" }}>
                      <span style={{ color: "#C9C9C9", fontFamily: "Poppins, sans-serif", fontSize: "13px" }}>{type}</span>
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

              {/* Right: pricing summary */}
              <div style={{ width: "240px", display: "flex", flexDirection: "column", gap: "10px" }}>
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

                {/* Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "40px" }}>
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
      </div>
    </div>
  );
}
