import React, { useState, useEffect } from "react";

const BootcampSyllabus = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set initial width
    setWindowWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample syllabus data
  const syllabusData = [
    {
      id: 1,
      title: "Foundations of Python Programming",
      duration: "2 weeks",
      topics: [
        "Python syntax and data structures",
        "Functions and control flow",
        "Object-oriented programming concepts",
        "Working with libraries and packages",
        "File operations and data input/output",
      ],
      projects: [
        "Command-line data analysis tool",
        "Simple automation scripts",
      ],
      color: "#4285F4", // Google Blue
    },
    {
      id: 2,
      title: "Data Analysis and Visualization",
      duration: "3 weeks",
      topics: [
        "Data cleaning and preprocessing",
        "Exploratory data analysis",
        "Data visualization techniques",
        "Using libraries like Pandas, NumPy, Matplotlib, and Seaborn",
        "Statistical analysis and hypothesis testing",
      ],
      projects: [
        "Data visualization dashboard",
        "Exploratory data analysis report",
      ],
      color: "#DB4437", // Google Red
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      duration: "4 weeks",
      topics: [
        "Supervised and unsupervised learning",
        "Regression and classification algorithms",
        "Model evaluation and validation",
        "Feature engineering and selection",
        "Using libraries like Scikit-learn",
      ],
      projects: [
        "Predictive model for housing prices",
        "Customer segmentation analysis",
      ],
      color: "#F4B400", // Google Yellow
    },
    {
      id: 4,
      title: "Advanced Machine Learning",
      duration: "3 weeks",
      topics: [
        "Ensemble methods and boosting",
        "Dimensionality reduction techniques",
        "Time series analysis and forecasting",
        "Natural language processing",
        "Deep learning basics with TensorFlow and Keras",
      ],
      projects: [
        "Sentiment analysis on social media data",
        "Time series forecasting model",
      ],
      color: "#0F9D58", // Google Green
    },
    {
      id: 5,
      title: "Capstone Project",
      duration: "4 weeks",
      topics: [
        "Project planning and scoping",
        "Data collection and preprocessing",
        "Model development and evaluation",
        "Results presentation and storytelling",
        "Deploying machine learning models",
      ],
      projects: ["End-to-end data science project on a topic of choice"],
      color: "#AB47BC", // Google Purple
    },
  ];

  // Calculate total duration
  const totalWeeks = syllabusData.reduce(
    (acc, module) => acc + parseInt(module.duration),
    0
  );

  // Calculate positions for timeline
  const getModulePosition = (moduleIndex) => {
    const isWideScreen = windowWidth > 768;

    if (!isWideScreen) {
      // Return vertical positioning for mobile
      return { left: "0%", width: "100%" };
    }

    let position = 0;

    // Sum up weeks before this module
    for (let i = 0; i < moduleIndex; i++) {
      position += parseInt(syllabusData[i].duration);
    }

    // Calculate percent position
    const percentPosition = (position / totalWeeks) * 100;
    const percentWidth =
      (parseInt(syllabusData[moduleIndex].duration) / totalWeeks) * 100;

    return {
      left: `${percentPosition}%`,
      width: `${percentWidth}%`,
    };
  };

  return (
    <div className="syllabus-container">
      <h2 className="syllabus-title">Bootcamp Curriculum</h2>
      <p className="syllabus-description">
        From Python fundamentals to advanced machine learning
      </p>

      {/* Visual timeline */}
      <div className="timeline-wrapper">
        <div className="timeline-bar">
          {syllabusData.map((module, index) => {
            const position = windowWidth
              ? getModulePosition(index)
              : { left: "0%", width: "0%" };

            return (
              <div
                key={module.id}
                className={`timeline-module ${
                  activeModule === index ? "active" : ""
                }`}
                style={{
                  left: position.left,
                  width: position.width,
                  backgroundColor: module.color || "var(--color-primary)",
                }}
                onClick={() =>
                  setActiveModule(index === activeModule ? null : index)
                }
              >
                <div className="timeline-module-content">
                  <span className="module-number">{module.id}</span>
                  {windowWidth > 768 && (
                    <span className="module-title-short">
                      {module.title.split(" ")[0]}
                    </span>
                  )}
                </div>

                {/* Module connector arrows between blocks */}
                {index < syllabusData.length - 1 && windowWidth > 768 && (
                  <div className="timeline-connector">
                    <svg width="20" height="10" viewBox="0 0 20 10">
                      <path
                        d="M0 5 L15 5 L10 0 M15 5 L10 10"
                        stroke="var(--color-border)"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Module listings with titles */}
      <div className="module-list">
        {syllabusData.map((module, index) => (
          <div
            key={module.id}
            className={`module-item ${activeModule === index ? "active" : ""}`}
            onClick={() =>
              setActiveModule(index === activeModule ? null : index)
            }
          >
            <div className="module-header">
              <div
                className="module-indicator"
                style={{
                  backgroundColor: module.color || "var(--color-primary)",
                }}
              ></div>
              <h3 className="module-title">{module.title}</h3>
              <span className="module-toggle">
                {activeModule === index ? "−" : "+"}
              </span>
            </div>

            {activeModule === index && (
              <div className="module-details">
                <div className="module-column">
                  <h4>Topics Covered</h4>
                  <ul>
                    {module.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div className="module-column">
                  <h4>Projects</h4>
                  <ul>
                    {module.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .syllabus-container {
          width: 100%;
          max-width: 800px;
          margin: 3.5rem auto 4rem;
          font-family: var(--font-sans);
          background-color: var(--color-card-bg);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--color-border);
        }

        .syllabus-title {
          text-align: center;
          margin-bottom: 0.75rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-headings);
        }

        .syllabus-description {
          text-align: center;
          color: var(--color-secondary);
          margin-bottom: 3rem;
          font-size: 1.05rem;
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
        }

        /* Timeline styling */
        .timeline-wrapper {
          position: relative;
          margin: 4rem 0;
          padding: 0 0 2rem;
        }

        .timeline-bar {
          position: relative;
          height: 70px;
          background-color: rgba(var(--color-border-rgb), 0.3);
          border-radius: 35px;
          overflow: visible;
        }

        .timeline-module {
          position: absolute;
          height: 70px;
          border-radius: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: visible;
          color: white;
          font-weight: 600;
          z-index: 2;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          border: 2px solid white;
        }

        .timeline-module:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }

        .timeline-module.active {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .timeline-module-content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
          width: 100%;
          padding: 0 10px;
        }

        .module-number {
          font-size: 1.5rem;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .module-title-short {
          font-size: 0.8rem;
          opacity: 0.9;
          margin-top: 0.2rem;
        }

        .timeline-connector {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
        }

        /* Module list styling */
        .module-list {
          margin-top: 3rem;
        }

        .module-item {
          border: 1px solid var(--color-border);
          border-radius: 10px;
          margin-bottom: 1.25rem;
          overflow: hidden;
          background-color: var(--color-bg);
          transition: all 0.3s ease;
        }

        .module-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .module-item.active {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }

        .module-header {
          display: flex;
          align-items: center;
          padding: 1.25rem;
          cursor: pointer;
        }

        .module-indicator {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin-right: 1rem;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .module-title {
          flex: 1;
          margin: 0;
          font-size: 1.15rem;
          font-weight: 600;
        }

        .module-toggle {
          font-size: 1.5rem;
          line-height: 1;
          color: var(--color-muted);
          width: 24px;
          text-align: center;
          font-weight: 300;
          transition: transform 0.3s ease;
        }

        .module-item.active .module-toggle {
          transform: rotate(180deg);
          color: var(--color-primary);
        }

        .module-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          padding: 0.5rem 1.25rem 1.75rem;
          border-top: 1px solid var(--color-border);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .module-column h4 {
          margin: 1rem 0 0.75rem;
          font-size: 1rem;
          color: var(--color-headings);
          padding-bottom: 0.35rem;
          border-bottom: 1px dashed var(--color-border);
        }

        .module-column ul {
          margin: 0;
          padding: 0 0 0 1.25rem;
          font-size: 0.95rem;
        }

        .module-column li {
          margin-bottom: 0.65rem;
          line-height: 1.5;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .syllabus-container {
            padding: 1.5rem;
            margin: 2.5rem auto 3rem;
          }

          .syllabus-description {
            max-width: 100%;
          }

          .timeline-bar {
            height: auto;
            background: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .timeline-module {
            position: relative;
            height: 50px;
            border-radius: 8px;
            width: 100% !important;
            left: 0 !important;
          }

          .module-details {
            grid-template-columns: 1fr;
            padding: 0 1rem 1.5rem;
          }

          .module-header {
            padding: 1rem;
          }

          .module-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BootcampSyllabus;
