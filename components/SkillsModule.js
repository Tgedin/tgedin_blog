import { useState, useEffect } from "react";

export default function SkillsModule({ defaultCollapsed = false }) {
  const [activeTab, setActiveTab] = useState("cloud");
  const [animating, setAnimating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Always expanded by default

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

  return (
    <div className={`skills-module expanded`}>
      {/* Heading */}
      <div className="skills-header">
        <h2 className="featured-heading">AI Engineering for Construction</h2>
      </div>

      {/* Content that is always visible */}
      <div className="collapsible-content visible">
        {/* Goal Section */}
        <div className="goal-section">
          <p>
            Drawing from my real estate project management experience, I'm
            building expertise across the full AI engineering stack to implement
            intelligent solutions in construction. My focus is on bringing AI
            orchestration, MLOps, and data engineering to transform how we build
            and manage infrastructure.
          </p>
        </div>

        {/* Updated Tab Navigation */}
        <div className="skills-tabs" role="tablist">
          <button
            className={`skills-tab ${isActive("cloud") ? "active" : ""}`}
            onClick={() => handleTabChange("cloud")}
            role="tab"
            aria-selected={isActive("cloud")}
            aria-controls="cloud-content"
            id="cloud-tab"
            tabIndex={isActive("cloud") ? 0 : -1}
          >
            Cloud Infrastructure
          </button>
          <button
            className={`skills-tab ${isActive("ml") ? "active" : ""}`}
            onClick={() => handleTabChange("ml")}
            role="tab"
            aria-selected={isActive("ml")}
            aria-controls="ml-content"
            id="ml-tab"
            tabIndex={isActive("ml") ? 0 : -1}
          >
            Production ML
          </button>
          <button
            className={`skills-tab ${isActive("technical") ? "active" : ""}`}
            onClick={() => handleTabChange("technical")}
            role="tab"
            aria-selected={isActive("technical")}
            aria-controls="technical-content"
            id="technical-tab"
            tabIndex={isActive("technical") ? 0 : -1}
          >
            Technical Foundation
          </button>
          <button
            className={`skills-tab ${isActive("business") ? "active" : ""}`}
            onClick={() => handleTabChange("business")}
            role="tab"
            aria-selected={isActive("business")}
            aria-controls="business-content"
            id="business-tab"
            tabIndex={isActive("business") ? 0 : -1}
          >
            Business-Critical
          </button>
        </div>

        <div className={`skills-content ${animating ? "fade-out" : "fade-in"}`}>
          {/* Core Cloud Infrastructure */}
          {isActive("cloud") && (
            <div
              className="skills-phase"
              id="cloud-content"
              role="tabpanel"
              aria-labelledby="cloud-tab"
            >
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Container Deployment</h3>
                    <span className="skill-level applied">Applied</span>
                  </div>
                  <p className="skill-description">
                    Docker containerization with Cloud Run for scalable,
                    serverless deployment
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Docker + Cloud Run</li>
                      <li>Serverless auto-scaling</li>
                      <li>Multi-environment deployments</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Database Management</h3>
                    <span className="skill-level applied">Applied</span>
                  </div>
                  <p className="skill-description">
                    Managing both relational and NoSQL databases for different
                    data patterns
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Cloud SQL (PostgreSQL)</li>
                      <li>Firestore for real-time data</li>
                      <li>Data migration strategies</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>API & Microservices</h3>
                    <span className="skill-level practicing">Practicing</span>
                  </div>
                  <p className="skill-description">
                    Building robust REST APIs and microservices architecture
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>RESTful API design</li>
                      <li>Service decomposition</li>
                      <li>API gateway patterns</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>CI/CD Pipelines</h3>
                    <span className="skill-level learning">Learning</span>
                  </div>
                  <p className="skill-description">
                    Automated deployment pipelines for reliable software
                    delivery
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>GitHub Actions workflows</li>
                      <li>Automated testing integration</li>
                      <li>Environment promotion</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Cost & Resource Optimization</h3>
                    <span className="skill-level practicing">Practicing</span>
                  </div>
                  <p className="skill-description">
                    Managing cloud costs and optimizing resource allocation
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Cloud billing analysis</li>
                      <li>Resource right-sizing</li>
                      <li>Performance monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Production ML Engineering */}
          {isActive("ml") && (
            <div
              className="skills-phase"
              id="ml-content"
              role="tabpanel"
              aria-labelledby="ml-tab"
            >
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Vertex AI Platform</h3>
                    <span className="skill-level learning">Learning</span>
                  </div>
                  <p className="skill-description">
                    End-to-end ML platform for training, deployment, and
                    monitoring
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Model training pipelines</li>
                      <li>Endpoint deployment</li>
                      <li>Performance monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>MLOps Pipelines</h3>
                    <span className="skill-level exploring">Exploring</span>
                  </div>
                  <p className="skill-description">
                    Production ML workflows with versioning and automated
                    testing
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Model versioning (MLflow)</li>
                      <li>A/B testing frameworks</li>
                      <li>Continuous monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Data Engineering at Scale</h3>
                    <span className="skill-level practicing">Practicing</span>
                  </div>
                  <p className="skill-description">
                    Building robust data pipelines for large-scale processing
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>BigQuery analytics</li>
                      <li>Data pipeline orchestration</li>
                      <li>ETL/ELT processes</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Model Optimization</h3>
                    <span className="skill-level exploring">Exploring</span>
                  </div>
                  <p className="skill-description">
                    Balancing performance, cost, and accuracy in production
                    models
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Performance tuning</li>
                      <li>Cost-accuracy trade-offs</li>
                      <li>Resource allocation</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Responsible AI</h3>
                    <span className="skill-level learning">Learning</span>
                  </div>
                  <p className="skill-description">
                    Implementing ethical AI practices and bias detection
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Bias detection techniques</li>
                      <li>Fairness metrics</li>
                      <li>Ethical AI frameworks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Technical Foundation */}
          {isActive("technical") && (
            <div
              className="skills-phase"
              id="technical-content"
              role="tabpanel"
              aria-labelledby="technical-tab"
            >
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Python Development</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Full-stack Python for ML workflows and web development
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>ML libraries (scikit-learn, pandas)</li>
                      <li>Web frameworks (FastAPI, Flask)</li>
                      <li>Data processing pipelines</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>SQL & Data Analysis</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Advanced SQL for data analysis and database management
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Complex queries & joins</li>
                      <li>Performance optimization</li>
                      <li>Data warehousing patterns</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>REST API Design</h3>
                    <span className="skill-level applied">Applied</span>
                  </div>
                  <p className="skill-description">
                    Designing and implementing robust API interfaces
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>RESTful design principles</li>
                      <li>API versioning strategies</li>
                      <li>Documentation (OpenAPI)</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Git & Collaboration</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Version control and collaborative development workflows
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Git workflows (GitFlow)</li>
                      <li>Code review processes</li>
                      <li>Branch management</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Security Practices</h3>
                    <span className="skill-level practicing">Practicing</span>
                  </div>
                  <p className="skill-description">
                    Implementing security best practices in cloud applications
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>IAM (Identity & Access Management)</li>
                      <li>Data encryption at rest/transit</li>
                      <li>Authentication & authorization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business-Critical Skills */}
          {isActive("business") && (
            <div
              className="skills-phase"
              id="business-content"
              role="tabpanel"
              aria-labelledby="business-tab"
            >
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3>System Design Thinking</h3>
                    <span className="skill-level applied">Applied</span>
                  </div>
                  <p className="skill-description">
                    Designing scalable, reliable, and performant systems
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Scalability planning</li>
                      <li>Reliability engineering</li>
                      <li>Performance optimization</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Production Troubleshooting</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Quickly diagnosing and resolving production issues
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Log analysis & debugging</li>
                      <li>Performance monitoring</li>
                      <li>Incident response</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Cross-functional Communication</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Translating technical concepts to business stakeholders
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Technical to business translation</li>
                      <li>Stakeholder management</li>
                      <li>Project communication</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Agile Methodologies</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Rapid iteration and startup-style development approaches
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Scrum & Kanban practices</li>
                      <li>Sprint planning & execution</li>
                      <li>Continuous improvement</li>
                    </ul>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="skill-header">
                    <h3>Documentation & Knowledge Sharing</h3>
                    <span className="skill-level proficient">Proficient</span>
                  </div>
                  <p className="skill-description">
                    Creating clear documentation and sharing technical knowledge
                  </p>
                  <div className="skill-use-cases">
                    <ul>
                      <li>Technical documentation</li>
                      <li>Knowledge base creation</li>
                      <li>Team training & mentoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .skills-module {
          margin: 2rem 0 3rem;
          border-radius: 12px;
          overflow: hidden;
          background-color: var(--color-card-bg);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          transition: box-shadow 0.3s ease;
          border: 1px solid var(--color-border);
          max-width: 100%;
        }

        .skills-module:hover {
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.16);
        }

        .skills-header {
          padding: 1.5rem 2rem;
          background-color: var(--color-card-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .skills-header h2 {
          margin: 0;
          color: var(--color-headings);
          font-size: 1.75rem;
          margin-bottom: 0;
        }

        .goal-section {
          padding: 1.5rem 2rem;
          color: var(--color-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
          background: linear-gradient(
            135deg,
            rgba(139, 90, 43, 0.05),
            rgba(139, 90, 43, 0.02)
          );
          border-bottom: 1px solid var(--color-border);
        }

        .collapsible-content {
          max-height: none;
          overflow: visible;
          opacity: 1;
          visibility: visible;
        }

        .collapsible-content.visible {
          display: block;
        }

        .skills-tabs {
          display: flex;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0.5rem;
          gap: 0.25rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          position: sticky;
          top: 65px;
          z-index: 20;
          background-color: var(--color-card-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .skills-tabs::-webkit-scrollbar {
          display: none;
        }

        .skills-tab {
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          font-family: var(--font-primary);
          font-size: 0.9rem;
          color: var(--color-text);
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          flex-shrink: 0;
          scroll-snap-align: start;
          border-radius: 6px;
        }

        .skills-tab:hover {
          color: var(--color-primary);
          background-color: rgba(139, 90, 43, 0.05);
        }

        .skills-tab.active {
          color: var(--color-primary);
          border-bottom: 2px solid var(--color-primary);
          font-weight: 500;
          background-color: rgba(139, 90, 43, 0.05);
        }

        .skills-content {
          padding: 1.5rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .skill-card {
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 1.25rem;
          background-color: var(--color-card-bg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .skill-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .skill-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          gap: 0.5rem;
        }

        .skill-header h3 {
          margin: 0;
          font-size: 1.1rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          flex: 1;
          color: var(--color-headings);
        }

        .skill-description {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          color: var(--color-text);
          line-height: 1.5;
          flex-grow: 1;
        }

        .skill-use-cases {
          margin-top: auto;
        }

        .skill-use-cases ul {
          margin: 0;
          padding: 0 0 0 1.25rem;
          font-size: 0.85rem;
        }

        .skill-use-cases li {
          margin-bottom: 0.4rem;
          color: var(--color-secondary);
        }

        .skill-level {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 12px;
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 80px;
          text-align: center;
          letter-spacing: 0.02em;
        }

        .skill-level.proficient {
          background-color: #4caf50;
        }

        .skill-level.applied {
          background-color: #2196f3;
        }

        .skill-level.practicing {
          background-color: #ff9800;
        }

        .skill-level.learning {
          background-color: #9c27b0;
        }

        .skill-level.exploring {
          background-color: #607d8b;
        }

        .fade-out {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .fade-in {
          opacity: 1;
          transition: opacity 0.2s ease;
          animation: smoothFadeIn 0.3s ease forwards;
        }

        @keyframes smoothFadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .skills-tabs {
            padding: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .skills-content {
            padding: 1rem 0.75rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .skill-card {
            padding: 1rem;
          }

          .skill-level {
            font-size: 0.65rem;
            padding: 0.2rem 0.5rem;
            min-width: 70px;
          }

          .skill-header h3 {
            font-size: 1rem;
          }

          .skill-description {
            font-size: 0.85rem;
            margin-bottom: 0.875rem;
          }

          .skill-use-cases ul {
            font-size: 0.8rem;
          }

          .goal-section {
            padding: 1rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .skills-header {
            padding: 1rem;
          }

          .skills-header h2 {
            font-size: 1.5rem;
          }

          .skills-tab {
            font-size: 0.85rem;
            padding: 0.6rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
