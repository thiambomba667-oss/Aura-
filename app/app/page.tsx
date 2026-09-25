"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

const SUGGESTIONS = [
  { icon: "✉️", label: "Écrire un email", prompt: "Aide-moi à écrire un email" },
  { icon: "💰", label: "Faire mon budget", prompt: "Aide-moi à faire mon budget" },
  { icon: "💡", label: "Idée de business", prompt: "Donne-moi une idée de business" },
  { icon: "✈️", label: "Préparer un voyage", prompt: "Aide-moi à préparer un voyage" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Bonsoir";
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  return "Bonsoir";
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, append, isLoading } =
    useChat({ api: "/api/chat" });
  const [greeting] = useState(getGreeting());

  const hasMessages = messages.length > 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at 50% 0%, #fff4e0 0%, #f7e9f5 40%, #ece3f7 100%)",
        position: "relative",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #f7c6e0, #b490f0 60%, #f0a868)",
          }}
        />
        <span style={{ fontWeight: 600, fontFamily: "Georgia, serif" }}>Aura</span>
      </header>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 20px 100px",
          overflowY: "auto",
        }}
      >
        {!hasMessages && (
          <div style={{ textAlign: "center", marginTop: "40px", maxWidth: 480 }}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                margin: "0 auto 24px",
                background:
                  "radial-gradient(circle at 35% 30%, #f9d3ea, #c79af5 55%, #f3b06e)",
                filter: "blur(0.3px)",
              }}
            />
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "36px",
                margin: "0 0 12px",
                color: "#2a2438",
              }}
            >
              {greeting}
            </h1>
            <p style={{ color: "#6b6478", fontSize: "17px", marginBottom: "32px" }}>
              Comment puis-je vous aider aujourd'hui ?
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => append({ role: "user", content: s.prompt })}
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: "20px",
                    padding: "18px 14px",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(150,120,180,0.15)",
                  }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "10px" }}>{s.icon}</div>
                  <div style={{ fontWeight: 500, color: "#2a2438" }}>{s.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {hasMessages && (
          <div style={{ width: "100%", maxWidth: 640, marginTop: "20px" }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: m.role === "user" ? "12px 18px" : "0",
                    borderRadius: "20px",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #e8c9f0, #d8b8ec)"
                        : "transparent",
                    color: "#2a2438",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.5,
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ color: "#9a90ab", fontSize: "14px" }}>Aura écrit…</div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          right: "20px",
          maxWidth: 640,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(14px)",
          borderRadius: "30px",
          padding: "8px 8px 8px 20px",
          boxShadow: "0 10px 30px rgba(150,120,180,0.2)",
        }}
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Écrivez à Aura…"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #d8a8ea, #b98ce8)",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ↑
        </button>
      </form>
    </main>
  );
                               }
