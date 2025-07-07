import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

const dummyData = [
  {
    title: "Listen to TPAB",
    description:
      "Honestly, it's one of the best rap albums I've ever listened to with all of the jazz instrumentation.",
    submittedBy: "Evan",
    timestamp: "2025-02-28T01:16:26",
  },
  {
    title: "Inception",
    description:
      "A film that dares to challenge your grip on reality. Watch it late at night, in silence, and let Hans Zimmer's score echo in your bones.",
    submittedBy: "Amy",
    timestamp: "2025-06-19T03:20:02",
  },
  {
    title: "The Office",
    description:
      "Not just a comedy — a slow-burn comfort show. You’ll stay for the laughs and end up emotionally invested in a beet farm.",
    submittedBy: "Chris",
    timestamp: "2024-11-03T08:42:02",
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    title: "",
    description: "",
    submittedBy: "",
  });

  const handleScroll = (e) => {
    if (e.deltaY > 0 && index < dummyData.length - 1) {
      setIndex(index + 1);
    } else if (e.deltaY < 0 && index > 0) {
      setIndex(index - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && index < dummyData.length - 1) {
      setIndex(index + 1);
    } else if (e.key === "ArrowUp" && index > 0) {
      setIndex(index - 1);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dummyData.push({
      ...newSuggestion,
      timestamp: new Date().toISOString(),
    });
    setNewSuggestion({
      title: "",
      description: "",
      submittedBy: "",
    });
    setShowForm(false);
  };

  const formattedTimestamp = new Date(
    dummyData[index].timestamp
  ).toLocaleString();

  return (
    <div
      className="scroll-container"
      onWheel={handleScroll}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="card-container"
          >
            <div className="card">
              <h1 className="text-2xl font-semibold mb-4 text-gray-700">
                {dummyData[index].title}
              </h1>
              <p className="text-base mb-6 text-gray-600 leading-relaxed">
                {dummyData[index].description}
              </p>
              {dummyData[index].submittedBy && (
                <p className="meta-info">
                  – {dummyData[index].submittedBy}
                  <span>{formattedTimestamp}</span>
                </p>
              )}
              <button
                onClick={handleAdd}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
              >
                Add Your Word of Mouth
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="card-container"
          >
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Add Your Word of Mouth
              </h2>
              <input
                className="w-full p-3 mb-3 border border-gray-300 rounded"
                placeholder="Title"
                value={newSuggestion.title}
                onChange={(e) =>
                  setNewSuggestion({ ...newSuggestion, title: e.target.value })
                }
                required
              />
              <textarea
                className="w-full p-3 mb-3 border border-gray-300 rounded"
                placeholder="Why are you recommending this?"
                value={newSuggestion.description}
                onChange={(e) =>
                  setNewSuggestion({
                    ...newSuggestion,
                    description: e.target.value,
                  })
                }
                required
              />
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                placeholder="Your Name (optional)"
                value={newSuggestion.submittedBy}
                onChange={(e) =>
                  setNewSuggestion({
                    ...newSuggestion,
                    submittedBy: e.target.value,
                  })
                }
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
