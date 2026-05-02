"use client"; // remove this line if you're not using Next.js App Router

import { API_URL } from "@/assets/api";
import React, { useActionState, useState } from "react";

/*
  ╔══════════════════════════════════════════════════════╗
  ║  CreateProject.tsx — Prayer Mawere Portfolio         ║
  ║                                                      ║
  ║  Add to index.html / _document.tsx:                  ║
  ║  <link href="https://fonts.googleapis.com/css2?      ║
  ║    family=Syne:wght@700;800&                         ║
  ║    family=DM+Sans:wght@300;400;500&display=swap"     ║
  ║    rel="stylesheet" />                               ║
  ║                                                      ║
  ║  POST http://localhost:5000/projects                 ║
  ║  Content-Type: application/json                      ║
  ║  Authorization: Bearer <token>                       ║
  ╚══════════════════════════════════════════════════════╝
*/

// ─── Types ────────────────────────────────────────────────────────────────────
interface ActionState {
  success: boolean;
  error: string;
}

// ─── Token helper (swap with your own auth hook / context) ───────────────────
// e.g. import { useAuth } from "@/context/AuthContext";
// const { token } = useAuth();
const getToken = (): string => localStorage.getItem("token") ?? "";

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProjectEdit() {
  // Image URL is controlled state (not a FormData field we read from the form
  // itself) so we keep it in useState — same pattern as _message in the blog form.
  const [imageUrl, setImageUrl] = useState("");
  const [imgError, setImgError] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // ── Action ─────────────────────────────────────────────────────────────────
  const FormHandler = async (
    _prev: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    try {
      const token = getToken();

      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        benefit1: formData.get("benefit1") as string | null,
        benefit2: formData.get("benefit2") as string | null,
        benefit3: formData.get("benefit3") as string | null,
        link: formData.get("link") as string | null,
        _image: imageUrl, // injected from controlled state
      };

      console.log("Form values:", JSON.stringify(formValues));

      // Basic client-side guard (server should also validate)
      if (!formValues.title.trim()) throw new Error("Title is required.");
      if (!formValues.description.trim())
        throw new Error("Description is required.");
      if (!formValues._image.trim())
        throw new Error("Cover image URL is required.");

      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Server error ${response.status}`);
      }

      console.log("response from server:", await response.json());

      return { success: true, error: "" };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      };
    }
  };

  const [state, formAction, loading] = useActionState<ActionState, FormData>(
    FormHandler,
    { success: false, error: "" },
  );

  // ── Image URL preview ──────────────────────────────────────────────────────
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const showPreview =
    imageUrl.trim() !== "" && isValidUrl(imageUrl) && !imgError;

  // ── Reset helper ────────────────────────────────────────────────────────────
  // We use a key on the <form> to reset all native inputs at once.
  const [formKey, setFormKey] = useState(0);
  const handleReset = () => {
    setImageUrl("");
    setImgError(false);
    setTouched(new Set());
    setFormKey((k) => k + 1);
  };

  // If last action was success, clear the form
  React.useEffect(() => {
    if (state.success) handleReset();
  }, [state.success]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Char counters (uncontrolled via ref + onInput) ─────────────────────────
  const [titleLen, setTitleLen] = useState(0);
  const [descLen, setDescLen] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .cpf-d { font-family: 'Syne', sans-serif; }
        .cpf-b { font-family: 'DM Sans', sans-serif; }

        @keyframes cp-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cp-fade-up { animation: cp-fade-up .5s cubic-bezier(.22,1,.36,1) both; }

        @keyframes cp-orb {
          0%,100% { transform: translateY(0) scale(1);      opacity: .14; }
          50%      { transform: translateY(-18px) scale(1.05); opacity: .07; }
        }
        .cp-orb { animation: cp-orb var(--t,10s) ease-in-out infinite; }

        @keyframes cp-spin { to { transform: rotate(360deg); } }
        .cp-spin { animation: cp-spin .75s linear infinite; }

        @keyframes cp-pop {
          0%   { transform: scale(.75); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        .cp-pop { animation: cp-pop .4s cubic-bezier(.22,1,.36,1) both; }

        /* ── Shared input styles ── */
        .cp-input {
          width: 100%;
          background: #0c1525;
          border: 1.5px solid #1c2d48;
          border-radius: 10px;
          color: #d4e0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          padding: 11px 14px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
          resize: none;
        }
        .cp-input::placeholder { color: #22324a; }
        .cp-input:focus {
          border-color: #5b8dee;
          background: #0d1828;
          box-shadow: 0 0 0 3px #5b8dee18;
        }
        .cp-input.cp-error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px #ef444415;
        }

        .cp-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #3e5270;
          margin-bottom: 6px;
        }
        .cp-req  { color: #5b8dee; margin-left: 2px; }
        .cp-opt  { font-size: 10px; text-transform: none; letter-spacing: normal; color: #1e3050; margin-left: 6px; }

        .cp-char { font-family: 'DM Sans', sans-serif; font-size: 10px; color: #1e3050; text-align: right; margin-top: 3px; transition: color .2s; }
        .cp-char.warn { color: #f59e0b; }

        .cp-err-hint { font-family: 'DM Sans', sans-serif; font-size: 10.5px; color: #f87171; margin-top: 4px; }

        .cp-btn {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: transform .15s, box-shadow .2s, background .2s, opacity .2s;
        }
        .cp-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .cp-btn:active:not(:disabled) { transform: translateY(0); }
        .cp-btn:disabled { opacity: .5; cursor: not-allowed; }
      `}</style>

      {/* ── Root ────────────────────────────────────────────────────────── */}
      <div
        className="cpf-b relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg,#0b1120 0%,#0d1628 60%,#0a1020 100%)",
          borderRadius: "20px",
          border: "1px solid #162035",
          boxShadow: "0 40px 100px #000b, 0 0 0 1px #ffffff04",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* Ambient orbs */}
        {(
          [
            {
              s: "260px",
              t: "-8%",
              l: "-7%",
              c: "#3b6be8",
              dur: "11s",
              del: "0s",
            },
            {
              s: "150px",
              t: "78%",
              l: "72%",
              c: "#5b8dee",
              dur: "14s",
              del: "3s",
            },
            {
              s: "110px",
              t: "38%",
              l: "93%",
              c: "#7c5cbf",
              dur: "9s",
              del: "5s",
            },
          ] as const
        ).map((o, i) => (
          <span
            key={i}
            className="cp-orb absolute rounded-full pointer-events-none"
            style={
              {
                width: o.s,
                height: o.s,
                top: o.t,
                left: o.l,
                background: o.c,
                filter: "blur(90px)",
                "--t": o.dur,
                animationDelay: o.del,
              } as React.CSSProperties
            }
          />
        ))}

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex items-start justify-between gap-4 px-7 pt-7 pb-5"
          style={{ borderBottom: "1px solid #111d32" }}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div
                className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#5b8dee1a",
                  border: "1px solid #5b8dee30",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1v12M1 7h12"
                    stroke="#5b8dee"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h1
                className="cpf-d text-white font-bold tracking-tight"
                style={{ fontSize: "1.2rem" }}
              >
                New Project
              </h1>
            </div>
            <p style={{ fontSize: "12px", color: "#3a5070" }}>
              Fill in the details below to publish a project to your portfolio.
            </p>
          </div>
          <span
            className="flex-shrink-0 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{
              background: "#5b8dee1a",
              color: "#5b8dee",
              border: "1px solid #5b8dee30",
              marginTop: "4px",
            }}
          >
            Create
          </span>
        </div>

        {/* ── Form ────────────────────────────────────────────────────── */}
        <form key={formKey} action={formAction} noValidate>
          <div className="relative z-10 px-7 py-6 flex flex-col gap-5">
            {/* ── Title ─────────────────────────────────────────────── */}
            <div className="cp-fade-up" style={{ animationDelay: "0ms" }}>
              <label htmlFor="title" className="cp-label">
                Title<span className="cp-req">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                maxLength={700}
                required
                placeholder="e.g. StreamSync — Real-time Collaboration"
                className={`cp-input${touched.has("title") ? " cp-error" : ""}`}
                onInput={(e) =>
                  setTitleLen((e.target as HTMLInputElement).value.length)
                }
                onBlur={() => setTouched((p) => new Set(p).add("title"))}
              />
              <div className="flex justify-between items-center">
                {touched.has("title") && (
                  <p className="cp-err-hint">Title is required.</p>
                )}
                <p
                  className={`cp-char ml-auto${titleLen > 630 ? " warn" : ""}`}
                >
                  {titleLen} / 700
                </p>
              </div>
            </div>

            {/* ── Description ───────────────────────────────────────── */}
            <div className="cp-fade-up" style={{ animationDelay: "55ms" }}>
              <label htmlFor="_description" className="cp-label">
                Description<span className="cp-req">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                maxLength={1000}
                required
                rows={4}
                placeholder="What does this project do? Who is it for? What problem does it solve?"
                className={`cp-input${touched.has("description") ? " cp-error" : ""}`}
                onInput={(e) =>
                  setDescLen((e.target as HTMLTextAreaElement).value.length)
                }
                onBlur={() => setTouched((p) => new Set(p).add("description"))}
              />
              <div className="flex justify-between items-center">
                {touched.has("description") && (
                  <p className="cp-err-hint">Description is required.</p>
                )}
                <p className={`cp-char ml-auto${descLen > 900 ? " warn" : ""}`}>
                  {descLen} / 1000
                </p>
              </div>
            </div>

            {/* ── Key Benefits ──────────────────────────────────────── */}
            <div className="cp-fade-up" style={{ animationDelay: "110ms" }}>
              <p className="cp-label" style={{ marginBottom: "10px" }}>
                Key Benefits
                <span className="cp-opt">(optional)</span>
              </p>
              <div className="flex flex-col gap-3">
                {(
                  [
                    {
                      name: "benefit1",
                      ph: "e.g. Real-time syncing across all devices",
                    },
                    {
                      name: "benefit2",
                      ph: "e.g. Zero-latency WebSocket engine",
                    },
                    {
                      name: "benefit3",
                      ph: "e.g. Deployed on scalable cloud infra",
                    },
                  ] as const
                ).map(({ name, ph }, idx) => (
                  <BenefitRow
                    key={name}
                    index={idx + 1}
                    name={name}
                    placeholder={ph}
                  />
                ))}
              </div>
            </div>

            {/* ── Project URL ───────────────────────────────────────── */}
            <div className="cp-fade-up" style={{ animationDelay: "165ms" }}>
              <label htmlFor="link" className="cp-label">
                Project URL
                <span className="cp-opt">(optional)</span>
              </label>
              <div className="relative flex items-center">
                <span
                  className="absolute left-3 pointer-events-none"
                  style={{ color: "#1e3050" }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M5 7.5s.8 1.5 3 1.5l1.5-1.5a2.12 2.12 0 0 0-3-3L5 6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 5.5s-.8-1.5-3-1.5L3.5 5.5a2.12 2.12 0 0 0 3 3L8 7"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  id="link"
                  name="link"
                  type="url"
                  placeholder="https://github.com/you/project"
                  className="cp-input"
                  style={{ paddingLeft: "34px" }}
                />
              </div>
            </div>

            {/* ── Cover Image URL ───────────────────────────────────── */}
            <div className="cp-fade-up" style={{ animationDelay: "220ms" }}>
              <label htmlFor="_image" className="cp-label">
                Cover Image URL<span className="cp-req">*</span>
              </label>

              <div className="relative flex items-center">
                <span
                  className="absolute left-3 pointer-events-none"
                  style={{ color: "#1e3050" }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect
                      x="1.5"
                      y="2.5"
                      width="10"
                      height="8"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M1.5 9l3-3 2.5 2.5 1.5-1.5 2.5 2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="9.5" cy="5" r="1" fill="currentColor" />
                  </svg>
                </span>
                <input
                  id="_image"
                  type="url"
                  placeholder="https://i.imgur.com/your-image.jpg"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImgError(false);
                  }}
                  onBlur={() => setTouched((p) => new Set(p).add("_image"))}
                  className={`cp-input${touched.has("_image") && !imageUrl.trim() ? " cp-error" : ""}`}
                  style={{ paddingLeft: "34px" }}
                />
              </div>

              {touched.has("_image") && !imageUrl.trim() && (
                <p className="cp-err-hint">Cover image URL is required.</p>
              )}

              {/* Live preview */}
              {showPreview && (
                <div
                  className="cp-pop relative mt-3 rounded-xl overflow-hidden"
                  style={{ height: "160px", border: "1.5px solid #5b8dee33" }}
                >
                  <img
                    src={imageUrl}
                    alt="Cover preview"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(.75) saturate(1.1)" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top,#0b1120bb,transparent 50%)",
                    }}
                  />
                  <span
                    className="absolute bottom-2.5 left-3 text-[10.5px] font-medium"
                    style={{
                      color: "#8aaad0",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Preview
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setImgError(false);
                    }}
                    className="cp-btn absolute top-2.5 right-2.5 text-[11px] px-2.5 py-1 rounded-lg"
                    style={{
                      background: "#0b112099",
                      backdropFilter: "blur(8px)",
                      color: "#8899bb",
                      border: "1px solid #1c2d48",
                      fontSize: "11px",
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}

              {imgError && imageUrl.trim() !== "" && (
                <p className="cp-err-hint">
                  Couldn't load image — check the URL and make sure it's
                  publicly accessible.
                </p>
              )}
            </div>
          </div>
          {/* end fields */}

          {/* ── Footer ────────────────────────────────────────────────── */}
          <div
            className="relative z-10 flex items-center justify-between gap-4 px-7 py-5"
            style={{ borderTop: "1px solid #111d32" }}
          >
            {/* Status messages */}
            <div className="flex items-center gap-2 min-h-[28px]">
              {state.success && (
                <div className="cp-pop flex items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: "22px",
                      height: "22px",
                      background: "#10b98122",
                      border: "1px solid #10b98144",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5l2.5 2.5 4.5-5"
                        stroke="#10b981"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#34d399",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Project published successfully!
                  </span>
                </div>
              )}
              {!state.success && state.error && (
                <div className="cp-pop flex items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: "22px",
                      height: "22px",
                      background: "#ef444422",
                      border: "1px solid #ef444440",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 2l6 6M8 2L2 8"
                        stroke="#ef4444"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#f87171",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    {state.error}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {/* Reset */}
              <button
                type="button"
                className="cp-btn px-4 py-2.5 rounded-xl"
                style={{
                  background: "#111d32",
                  color: "#3e5270",
                  border: "1px solid #1c2d48",
                  fontSize: "13px",
                }}
                onClick={handleReset}
              >
                Reset
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="cp-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-white"
                style={{
                  background: loading ? "#4a78cc" : "#5b8dee",
                  boxShadow: !loading ? "0 4px 20px #5b8dee44" : "none",
                  fontSize: "13px",
                }}
                onClick={() =>
                  setTouched(new Set(["title", "_description", "_image"]))
                }
              >
                {loading ? (
                  <>
                    <svg
                      className="cp-spin"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <circle
                        cx="6.5"
                        cy="6.5"
                        r="5"
                        stroke="#ffffff44"
                        strokeWidth="2"
                      />
                      <path
                        d="M6.5 1.5A5 5 0 0 1 11.5 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Publishing…
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5"
                        stroke="white"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Publish Project
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

// ─── Benefit Row sub-component ────────────────────────────────────────────────
function BenefitRow({
  index,
  name,
  placeholder,
}: {
  index: number;
  name: string;
  placeholder: string;
}) {
  const [filled, setFilled] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: "24px",
          height: "24px",
          background: filled ? "#5b8dee1a" : "#111d32",
          border: `1px solid ${filled ? "#5b8dee44" : "#1c2d48"}`,
          transition: "all .25s",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: filled ? "#5b8dee" : "#1e3050",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {index}
        </span>
      </div>
      <input
        name={name}
        type="text"
        maxLength={700}
        placeholder={placeholder}
        className="cp-input"
        style={{ flex: 1 }}
        onInput={(e) =>
          setFilled((e.target as HTMLInputElement).value.length > 0)
        }
      />
    </div>
  );
}
