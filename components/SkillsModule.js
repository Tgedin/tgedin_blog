import { useState, useEffect } from "react";

export default function SkillsModule({ defaultCollapsed = true }) {
  const [activeTab, setActiveTab] = useState("phase1");
  const [animating, setAnimating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Helper function to determine if a tab is active
  const isActive = (tabName) => activeTab === tabName;

  // Handle tab changes with animation
  const handleTabChange = (tabName) => {
    if (activeTab === tabName) return;

    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tabName);
      setAnimating(false);
    }, 200);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`skills-module ${isCollapsed ? "collapsed" : "expanded"}`}>
      {/* Collapsible Toggle Header */}
      <div className="skills-toggle" onClick={toggleCollapse}>
        <h3>My Professional Skills</h3>
        <button
          className="collapse-toggle"
          aria-label={
            isCollapsed ? "Expand skills section" : "Collapse skills section"
          }
        >
          <span>{isCollapsed ? "▼ Show Skills" : "▲ Hide Skills"}</span>
        </button>
      </div>

      {/* Content that shows/hides */}
      <div className="collapsible-content">
        {/* Skill Section Introduction */}
        <div className="skills-intro">
          <p>
            My skill development follows a structured learning path that builds
            upon my civil engineering background while expanding into data
            science and machine learning.
          </p>
        </div>

        {/* Updated Tab Navigation with keyboard accessibility */}
        <div className="skills-tabs" role="tablist">
          <button
            className={`skills-tab ${isActive("phase1") ? "active" : ""}`}
            onClick={() => handleTabChange("phase1")}
            role="tab"
            aria-selected={isActive("phase1")}
            aria-controls="phase1-content"
            id="phase1-tab"
            tabIndex={isActive("phase1") ? 0 : -1}
          >
            Phase 1: Core Foundations
          </button>
          <button
            className={`skills-tab ${isActive("phase2") ? "active" : ""}`}
            onClick={() => handleTabChange("phase2")}
            role="tab"
            aria-selected={isActive("phase2")}
            aria-controls="phase2-content"
            id="phase2-tab"
            tabIndex={isActive("phase2") ? 0 : -1}
          >
            Phase 2: Specialization
          </button>
          <button
            className={`skills-tab ${isActive("domain") ? "active" : ""}`}
            onClick={() => handleTabChange("domain")}
            role="tab"
            aria-selected={isActive("domain")}
            aria-controls="domain-content"
            id="domain-tab"
            tabIndex={isActive("domain") ? 0 : -1}
          >
            Domain Expertise
          </button>
          <button
            className={`skills-tab ${isActive("roadmap") ? "active" : ""}`}
            onClick={() => handleTabChange("roadmap")}
            role="tab"
            aria-selected={isActive("roadmap")}
            aria-controls="roadmap-content"
            id="roadmap-tab"
            tabIndex={isActive("roadmap") ? 0 : -1}
          >
            Learning Roadmap
          </button>
        </div>

        <div className={`skills-content ${animating ? "fade-out" : "fade-in"}`}>
          {/* Skill levels legend - improved layout */}
          <div className="skills-note">
            <div className="skill-legend-title">Skill Proficiency Levels:</div>
            <div className="skill-levels-legend">
              <div className="skill-level-item">
                <span className="skill-level proficient">Proficient</span>
                <span className="skill-level-desc">
                  Mastered through professional experience
                </span>
              </div>
              <div className="skill-level-item">
                <span className="skill-level applied">Applied</span>
                <span className="skill-level-desc">
                  Used in multiple projects
                </span>
              </div>
              <div className="skill-level-item">
                <span className="skill-level practicing">Practicing</span>
                <span className="skill-level-desc">
                  Actively using in current projects
                </span>
              </div>
              <div className="skill-level-item">
                <span className="skill-level learning">Learning</span>
                <span className="skill-level-desc">Currently studying</span>
              </div>
              <div className="skill-level-item">
                <span className="skill-level exploratory">Exploratory</span>
                <span className="skill-level-desc">
                  Beginning to investigate
                </span>
              </div>
            </div>
          </div>

          {/* Phase 1: Core Foundations */}
          {isActive("phase1") && (
            <div
              className="skills-phase"
              id="phase1-content"
              role="tabpanel"
              aria-labelledby="phase1-tab"
            >
              <p className="phase-description">
                My current focus is mastering these core technical skills that
                form the foundation of effective data science work.
              </p>

              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Python Data Analysis</h3>
                    <span className="skill-level practicing">Practicing</span>
                  </div>
                  <p className="skill-description">
                    Working with Pandas and NumPy to clean, transform, and
                    analyze complex datasets.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Key capabilities:</h4>
                    <ul>
                      <li>Data cleaning and preprocessing</li>
                      <li>Feature engineering</li>
                      <li>Exploratory data analysis</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>SQL for Data Extraction</h3>
                    <span className="skill-level applied">Applied</span>
                  </div>
                  <p className="skill-description">
                    Writing efficient queries to extract and manipulate data
                    from relational databases.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Key capabilities:</h4>
                    <ul>
                      <li>Complex joins and subqueries</li>
                      <li>Aggregate functions</li>
                      <li>Performance optimization</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Data Visualization</h3>
                    <span className="skill-level practicing">Practicing</span>
                  </div>
                  <p className="skill-description">
                    Creating clear, insightful visualizations that communicate
                    data patterns effectively.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Libraries:</h4>
                    <ul>
                      <li>Matplotlib & Seaborn</li>
                      <li>Plotly for interactive visuals</li>
                      <li>Dashboard creation</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Statistics Fundamentals</h3>
                    <span className="skill-level learning">Learning</span>
                  </div>
                  <p className="skill-description">
                    Applying statistical methods to draw meaningful conclusions
                    from data.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Focus areas:</h4>
                    <ul>
                      <li>Hypothesis testing</li>
                      <li>Probability distributions</li>
                      <li>Statistical inference</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Specialization */}
          {isActive("phase2") && (
            <div
              className="skills-phase"
              id="phase2-content"
              role="tabpanel"
              aria-labelledby="phase2-tab"
            >
              <p className="phase-description">
                After establishing core competencies, I'm exploring these
                specialized areas to build more advanced capabilities.
              </p>

              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Machine Learning Models</h3>
                    <span className="skill-level learning">Learning</span>
                  </div>
                  <p className="skill-description">
                    Building and fine-tuning models to solve classification,
                    regression, and clustering problems.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Algorithms:</h4>
                    <ul>
                      <li>Random Forests & Gradient Boosting</li>
                      <li>Support Vector Machines</li>
                      <li>Neural Networks</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Model Interpretation</h3>
                    <span className="skill-level exploratory">Exploratory</span>
                  </div>
                  <p className="skill-description">
                    Using techniques to explain model predictions and understand
                    feature importance.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Approaches:</h4>
                    <ul>
                      <li>SHAP values</li>
                      <li>LIME explanations</li>
                      <li>Feature importance analysis</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>MLOps Basics</h3>
                    <span className="skill-level exploratory">Exploratory</span>
                  </div>
                  <p className="skill-description">
                    Learning best practices for deploying and maintaining ML
                    models in production.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Components:</h4>
                    <ul>
                      <li>Model versioning</li>
                      <li>CI/CD for ML pipelines</li>
                      <li>Monitoring and maintenance</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Deep Learning Fundamentals</h3>
                    <span className="skill-level exploratory">Exploratory</span>
                  </div>
                  <p className="skill-description">
                    Exploring neural network architectures and applications for
                    complex problems.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Focus areas:</h4>
                    <ul>
                      <li>Convolutional Neural Networks</li>
                      <li>Recurrent Neural Networks</li>
                      <li>Transfer Learning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Domain Expertise */}
          {isActive("domain") && (
            <div
              className="skills-phase"
              id="domain-content"
              role="tabpanel"
              aria-labelledby="domain-tab"
            >
              <p className="phase-description">
                My professional background gives me valuable domain knowledge
                that informs and enhances my data science work.
              </p>

              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Civil Engineering</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Professional experience in structural design, analysis, and
                    project management.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Applications:</h4>
                    <ul>
                      <li>Structural analysis and design</li>
                      <li>Construction management</li>
                      <li>Building code compliance</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Urban Planning</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Understanding of urban development principles, regulations,
                    and stakeholder management.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Areas of expertise:</h4>
                    <ul>
                      <li>Land use planning</li>
                      <li>Transportation planning</li>
                      <li>Public space design</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Infrastructure Analysis</h3>
                    <span className="skill-level applied">Applied</span>
                  </div>
                  <p className="skill-description">
                    Assessing infrastructure systems for efficiency,
                    sustainability, and resilience.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Systems analyzed:</h4>
                    <ul>
                      <li>Transportation networks</li>
                      <li>Utility distribution systems</li>
                      <li>Public facilities</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Sustainable Development</h3>
                    <span className="skill-level applied">Applied</span>
                  </div>
                  <p className="skill-description">
                    Implementing principles of sustainability in built
                    environment projects.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Focus areas:</h4>
                    <ul>
                      <li>Energy efficiency</li>
                      <li>Resource conservation</li>
                      <li>Climate resilience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Learning Roadmap */}
          {isActive("roadmap") && (
            <div
              className="skills-phase"
              id="roadmap-content"
              role="tabpanel"
              aria-labelledby="roadmap-tab"
            >
              <p className="phase-description">
                Looking ahead, I'm planning to explore these areas to expand my
                capabilities and tackle more complex data problems.
              </p>

              <div className="skills-grid">
                <div className="skill-card roadmap-card">
                  <div className="skill-header">
                    <h3>NLP for Document Processing</h3>
                    <span className="skill-level future">Future Focus</span>
                  </div>
                  <p className="skill-description">
                    Applying natural language processing to extract insights
                    from unstructured text documents.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Potential applications:</h4>
                    <ul>
                      <li>Building code analysis</li>
                      <li>Contract document summarization</li>
                      <li>Sentiment analysis for urban planning feedback</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card roadmap-card">
                  <div className="skill-header">
                    <h3>Computer Vision for Structural Analysis</h3>
                    <span className="skill-level future">Future Focus</span>
                  </div>
                  <p className="skill-description">
                    Using image processing and computer vision for automated
                    structural assessments.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Potential applications:</h4>
                    <ul>
                      <li>Crack detection in structures</li>
                      <li>Building condition assessment</li>
                      <li>Construction site monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card roadmap-card">
                  <div className="skill-header">
                    <h3>Model Deployment at Scale</h3>
                    <span className="skill-level future">Future Focus</span>
                  </div>
                  <p className="skill-description">
                    Learning frameworks and best practices for deploying models
                    to production environments.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Technologies to explore:</h4>
                    <ul>
                      <li>Kubernetes for ML workloads</li>
                      <li>Model serving APIs</li>
                      <li>Edge deployment for IoT applications</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card roadmap-card">
                  <div className="skill-header">
                    <h3>Geospatial Data Analysis</h3>
                    <span className="skill-level future">Future Focus</span>
                  </div>
                  <p className="skill-description">
                    Working with location-based data to uncover spatial patterns
                    and relationships.
                  </p>
                  <div className="skill-use-cases">
                    <h4>Potential applications:</h4>
                    <ul>
                      <li>Urban mobility analysis</li>
                      <li>Land use optimization</li>
                      <li>Infrastructure placement planning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .skills-intro {
          padding: 1.5rem 2rem 0;
          color: var(--color-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .skills-note {
          margin: 0 0 2rem;
          padding: 1.25rem;
          border-radius: 8px;
          background-color: var(--color-card-bg);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .skill-legend-title {
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--color-headings);
        }

        .skill-levels-legend {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .skill-level-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .skill-level-desc {
          font-size: 0.8rem;
          color: var(--color-muted);
        }

        .fade-out {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .fade-in {
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        @media (max-width: 640px) {
          .skills-note {
            padding: 1rem;
          }

          .skill-levels-legend {
            grid-template-columns: 1fr;
          }

          .skills-intro {
            padding: 1rem 1rem 0;
            font-size: 0.95rem;
          }
        }

        .skills-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          border-bottom: ${isCollapsed
            ? "none"
            : "1px solid var(--color-border)"};
          background-color: var(--color-card-bg);
          transition: background-color 0.3s ease, border-bottom 0.3s ease;
        }

        .skills-toggle:hover {
          background-color: var(--color-bg);
        }

        .skills-toggle h3 {
          margin: 0;
          font-size: 1.2rem;
          color: var(--color-headings);
        }

        .collapse-toggle {
          background: none;
          border: none;
          color: var(--color-primary);
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          transition: background-color 0.2s ease, transform 0.3s ease;
        }

        .collapse-toggle:hover {
          background-color: rgba(var(--color-primary-rgb), 0.1);
          transform: translateY(-1px);
        }

        .collapse-toggle span {
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: inline-block;
        }

        .collapse-toggle:hover span {
          transform: ${isCollapsed ? "translateY(2px)" : "translateY(-2px)"};
        }

        .collapsible-content {
          max-height: ${isCollapsed ? "0" : "3000px"};
          overflow: hidden;
          transition: max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
          opacity: ${isCollapsed ? "0" : "1"};
          visibility: ${isCollapsed ? "hidden" : "visible"};
          transform-origin: top;
        }

        /* Add a small delay before skills content appears */
        .skills-content {
          transition: opacity 0.4s ease, transform 0.4s ease;
          opacity: ${isCollapsed ? "0" : "1"};
          transform: ${isCollapsed ? "translateY(10px)" : "translateY(0)"};
          transition-delay: ${isCollapsed ? "0s" : "0.2s"};
        }

        .skills-module.collapsed {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.4s ease;
        }

        .skills-module.expanded {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.4s ease;
        }

        /* Staggered animation for skills tabs */
        .skills-tabs button {
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: ${isCollapsed ? "0" : "1"};
          transform: ${isCollapsed ? "translateY(10px)" : "translateY(0)"};
        }

        .skills-tabs button:nth-child(1) {
          transition-delay: ${isCollapsed ? "0s" : "0.1s"};
        }
        .skills-tabs button:nth-child(2) {
          transition-delay: ${isCollapsed ? "0s" : "0.15s"};
        }
        .skills-tabs button:nth-child(3) {
          transition-delay: ${isCollapsed ? "0s" : "0.2s"};
        }
        .skills-tabs button:nth-child(4) {
          transition-delay: ${isCollapsed ? "0s" : "0.25s"};
        }
      `}</style>
    </div>
  );
}
