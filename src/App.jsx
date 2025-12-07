// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const initialForm = {
  name: "",
  email: "",
  course: "",
  level: "",
  message: "",
};

function getErrors(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.course.trim()) {
    errors.course = "Please choose a course.";
  }

  if (!values.level.trim()) {
    errors.level = "Select your experience level.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [submitMessage, setSubmitMessage] = useState("");
  const errors = getErrors(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitMessage(""); // clear submit message while typing
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setSubmitMessage("Please fix the highlighted fields before submitting.");
      return;
    }
    setSubmitMessage(
      "Form looks good! This data is ready to send to an API (but we are not calling any API here). 🚀"
    );
  };

  return (
    <div className="app-root">
      <Header />

      <main className="main">
        {/* LEFT: FORM */}
        <section className="form-card">
          <div className="form-header">
            <span className="pill">Task 3 • Controlled Form</span>
            <h1>Student Registration Form</h1>
            <p>
              All inputs are fully controlled using <code>useState</code>. Your
              data updates live on the preview panel.
            </p>
          </div>

          <form className="form-body" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="field">
              <label htmlFor="name">
                Full Name <span>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Course select */}
            <div className="field">
              <label htmlFor="course">
                Course <span>*</span>
              </label>
              <select
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
              >
                <option value="">Select a course</option>
                <option value="react">React Fundamentals</option>
                <option value="fullstack">Full-Stack Bootcamp</option>
                <option value="uiux">UI / UX Design</option>
              </select>
              {errors.course && <p className="error-text">{errors.course}</p>}
            </div>

            {/* Level radio */}
            <div className="field">
              <label>
                Experience level <span>*</span>
              </label>
              <div className="radio-row">
                <label className="radio-pill">
                  <input
                    type="radio"
                    name="level"
                    value="beginner"
                    checked={form.level === "beginner"}
                    onChange={handleChange}
                  />
                  <span>Beginner</span>
                </label>
                <label className="radio-pill">
                  <input
                    type="radio"
                    name="level"
                    value="intermediate"
                    checked={form.level === "intermediate"}
                    onChange={handleChange}
                  />
                  <span>Intermediate</span>
                </label>
                <label className="radio-pill">
                  <input
                    type="radio"
                    name="level"
                    value="advanced"
                    checked={form.level === "advanced"}
                    onChange={handleChange}
                  />
                  <span>Advanced</span>
                </label>
              </div>
              {errors.level && <p className="error-text">{errors.level}</p>}
            </div>

            {/* Message */}
            <div className="field">
              <label htmlFor="message">
                Short message (why this course?) <span>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Tell us in one or two lines..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="error-text">{errors.message}</p>
              )}
            </div>

            {/* Buttons & overall validation message */}
            <div className="form-footer">
              <div className="buttons">
                <button type="submit" className="btn-primary">
                  Validate Form
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={handleReset}
                >
                  Clear
                </button>
              </div>

              {submitMessage && (
                <p className={`submit-message ${isValid ? "ok" : "warn"}`}>
                  {submitMessage}
                </p>
              )}
            </div>
          </form>
        </section>

        {/* RIGHT: LIVE PREVIEW */}
        <section className="preview-card">
          <div className="preview-header">
            <span className="pill pill-outline">Live Preview</span>
            <h2>Entered Values</h2>
            <p>
              As you type in the form, this panel updates instantly. This shows
              how controlled components keep UI in sync with state.
            </p>
          </div>

          <div className="preview-body">
            <div className="preview-row">
              <span className="label">Name</span>
              <span className="value">
                {form.name || <span className="placeholder">Not filled yet</span>}
              </span>
            </div>

            <div className="preview-row">
              <span className="label">Email</span>
              <span className="value">
                {form.email || <span className="placeholder">Not filled yet</span>}
              </span>
            </div>

            <div className="preview-row">
              <span className="label">Course</span>
              <span className="value">
                {form.course
                  ? form.course === "react"
                    ? "React Fundamentals"
                    : form.course === "fullstack"
                    ? "Full-Stack Bootcamp"
                    : "UI / UX Design"
                  : <span className="placeholder">Not selected</span>}
              </span>
            </div>

            <div className="preview-row">
              <span className="label">Level</span>
              <span className="value">
                {form.level ? (
                  form.level[0].toUpperCase() + form.level.slice(1)
                ) : (
                  <span className="placeholder">Not selected</span>
                )}
              </span>
            </div>

            <div className="preview-row preview-row-message">
              <span className="label">Message</span>
              <span className="value">
                {form.message ? (
                  form.message
                ) : (
                  <span className="placeholder">
                    Start typing to see your message here…
                  </span>
                )}
              </span>
            </div>

            <div className="preview-status">
              <span
                className={`status-dot ${isValid ? "status-ok" : "status-warn"}`}
              />
              <span className="status-text">
                {isValid
                  ? "Form is currently valid."
                  : "Form has some validation issues."}
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
