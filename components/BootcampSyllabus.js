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
      <div className="timeline-bar">
        {syllabusData.map((module, index) => (
          <div
            key={module.id}
            className="timeline-module"
            style={{ backgroundColor: module.color }}
          >
            <span className="module-title-short">
              {module.title.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
      <div className="module-list">
        {syllabusData.map((module, index) => (
          <div key={module.id} className="module-item">
            <div className="module-header">
              <div
                className="module-indicator"
                style={{ backgroundColor: module.color }}
              ></div>
              <h3 className="module-title">{module.title}</h3>
            </div>
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
          </div>
        ))}
      </div>
      <style jsx>{`
        .syllabus-container {
          max-width: 800px;
          margin: 3rem auto 4rem;
          background: var(--color-card-bg);
          border-radius: 12px;
          padding: 2.25rem 1.75rem; /* Adjusted padding */
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--color-border);
        }
        .syllabus-title {
          text-align: center;
          margin-bottom: 0.75rem; /* Adjusted margin */
          font-size: 1.7rem; /* Adjusted font size */
          font-weight: 700;
        }
        .syllabus-description {
          text-align: center;
          color: var(--color-secondary);
          margin-bottom: 2.75rem; /* Adjusted margin */
          font-size: 1.1rem; /* Adjusted font size */
        }
        .timeline-bar {
          display: flex;
          justify-content: space-between;
          gap: 0.6rem; /* Adjusted gap */
          margin: 2.75rem 0 2.25rem; /* Adjusted margin */
        }
        .timeline-module {
          flex: 1;
          border-radius: 2rem;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 1.02rem; /* Adjusted font size */
          height: 2.7rem; /* Adjusted height */
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08); /* Adjusted shadow */
          padding: 0 0.75rem; /* Added padding */
        }
        .module-list {
          margin-top: 2.75rem; /* Adjusted margin */
        }
        .module-item {
          border: 1px solid var(--color-border);
          border-radius: 12px; /* Adjusted border-radius */
          margin-bottom: 1.6rem; /* Adjusted margin */
          background: var(--color-bg);
          box-shadow: 0 2px 7px rgba(0, 0, 0, 0.045); /* Adjusted shadow */
        }
        .module-header {
          display: flex;
          align-items: center;
          padding: 1.2rem 1.25rem; /* Adjusted padding */
        }
        .module-indicator {
          width: 13px; /* Adjusted size */
          height: 13px; /* Adjusted size */
          border-radius: 50%;
          margin-right: 1.1rem; /* Adjusted margin */
        }
        .module-title {
          font-size: 1.12rem; /* Adjusted font size */
          font-weight: 600;
        }
        .module-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.3rem; /* Adjusted gap */
          padding: 0.25rem 1.25rem 1.35rem 1.25rem; /* Adjusted padding */
        }
        .module-column h4 {
          margin: 1.1rem 0 0.6rem; /* Adjusted margin */
          font-size: 1.02rem; /* Adjusted font size */
          color: var(--color-headings);
        }
        .module-column ul {
          margin: 0;
          padding: 0 0 0 1.25rem;
          font-size: 0.95rem;
        }
        .module-column li {
          margin-bottom: 0.55rem; /* Adjusted margin */
          line-height: 1.5; /* Added line-height */
        }
        @media (max-width: 700px) {
          .syllabus-container {
            padding: 1.25rem; /* Adjusted padding */
          }
          .timeline-bar {
            flex-direction: column;
            gap: 0.7rem;
          }
          .timeline-module {
            height: 2.4rem; /* Adjusted height */
            font-size: 0.98rem; /* Adjusted font size */
          }
          .module-details {
            grid-template-columns: 1fr;
          }
          .module-header {
            padding: 1rem 1.1rem; /* Adjusted padding */
          }
          .module-title {
            font-size: 1.05rem; /* Adjusted font size */
          }
        }
      `}</style>
    </div>
  );
};

export default BootcampSyllabus;
