import { useState, useEffect } from "react";

export default function SkillsModule({ defaultCollapsed = false }) {
  const [activeTab, setActiveTab] = useState("development");
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
        <h2 className="featured-heading">
          Transversal Skills: AI Engineering ↔ Real Estate Development
        </h2>
      </div>

      {/* Content that is always visible */}
      <div className="collapsible-content visible">
        {/* Goal Section */}
        <div className="goal-section">
          <p>
            My unique background combines{" "}
            <strong>
              real estate project management and development expertise
            </strong>{" "}
            with emerging <strong>AI engineering capabilities</strong>. This
            transversal skillset positions me to bridge the gap between
            traditional construction processes and intelligent automation -
            understanding both the technical challenges and industry
            complexities that most AI solutions fail to address.
          </p>
        </div>

        {/* Updated Tab Navigation */}
        <div className="skills-tabs" role="tablist">
          <button
            className={`skills-tab ${isActive("development") ? "active" : ""}`}
            onClick={() => handleTabChange("development")}
            role="tab"
            aria-selected={isActive("development")}
            aria-controls="development-content"
            id="development-tab"
            tabIndex={isActive("development") ? 0 : -1}
          >
            Development & Project Leadership
          </button>
          <button
            className={`skills-tab ${
              isActive("ai-engineering") ? "active" : ""
            }`}
            onClick={() => handleTabChange("ai-engineering")}
            role="tab"
            aria-selected={isActive("ai-engineering")}
            aria-controls="ai-engineering-content"
            id="ai-engineering-tab"
            tabIndex={isActive("ai-engineering") ? 0 : -1}
          >
            AI Engineering & Technical Foundation
          </button>
        </div>

        {/* Skills Content */}
        <div className={`skills-content ${animating ? "animating" : ""}`}>
          {/* Development & Project Leadership Tab */}
          {isActive("development") && (
            <div
              className="skills-grid"
              id="development-content"
              role="tabpanel"
              aria-labelledby="development-tab"
            >
              {/* Strategic Project Management */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Strategic Project Management</h4>
                </div>
                <p>
                  End-to-end project delivery from conception to completion.
                  Proven track record managing complex real estate developments
                  with multimillion-euro budgets and multi-year timelines.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">Portfolio Management</span>
                  <span className="application-tag">Resource Allocation</span>
                  <span className="application-tag">Risk Assessment</span>
                </div>
              </div>

              {/* Cross-Functional Leadership */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Cross-Functional Team Leadership</h4>
                </div>
                <p>
                  Coordinating interdisciplinary stakeholders including
                  architects, engineers, contractors, legal teams, and financial
                  partners. Expert at aligning diverse priorities toward common
                  objectives.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">
                    Stakeholder Management
                  </span>
                  <span className="application-tag">Conflict Resolution</span>
                  <span className="application-tag">
                    Strategic Communication
                  </span>
                </div>
              </div>

              {/* Market Analysis & Feasibility */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Market Analysis & Feasibility Studies</h4>
                </div>
                <p>
                  Territorial analysis, market assessment, and investment
                  viability evaluation. Data-driven approach to identifying
                  opportunities and quantifying risks in complex real estate
                  markets.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">Financial Modeling</span>
                  <span className="application-tag">Market Research</span>
                  <span className="application-tag">Due Diligence</span>
                </div>
              </div>

              {/* Regulatory & Compliance */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Regulatory Navigation & Compliance</h4>
                </div>
                <p>
                  Deep understanding of urban planning regulations, zoning
                  requirements, and development approval processes. Experience
                  managing complex regulatory frameworks across multiple
                  jurisdictions.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">Permit Management</span>
                  <span className="application-tag">Legal Compliance</span>
                  <span className="application-tag">Policy Analysis</span>
                </div>
              </div>

              {/* Land Acquisition & Negotiation */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Land Acquisition & Negotiation</h4>
                </div>
                <p>
                  Proven track record in property owner negotiations,
                  acquisition strategy, and relationship building. Expert at
                  structuring deals that balance risk, profitability, and
                  stakeholder interests.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">Contract Negotiation</span>
                  <span className="application-tag">Relationship Building</span>
                  <span className="application-tag">Deal Structuring</span>
                </div>
              </div>

              {/* Strategic Development Experience */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Strategic Development Experience</h4>
                </div>
                <p>
                  2-year apprenticeship with a major French real estate
                  developer, gaining hands-on experience in large-scale urban
                  development projects and strategic portfolio management.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">Urban Development</span>
                  <span className="application-tag">Portfolio Strategy</span>
                  <span className="application-tag">Investment Analysis</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Engineering & Technical Foundation Tab */}
          {isActive("ai-engineering") && (
            <div
              className="skills-grid"
              id="ai-engineering-content"
              role="tabpanel"
              aria-labelledby="ai-engineering-tab"
            >
              {/* ML Operations & Model Deployment */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>ML Operations & Model Deployment</h4>
                </div>
                <p>
                  Building production-ready ML pipelines with Vertex AI,
                  implementing automated model training, validation, and
                  deployment workflows for scalable AI solutions.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">Vertex AI</span>
                  <span className="application-tag">MLOps Pipelines</span>
                  <span className="application-tag">Model Monitoring</span>
                </div>
              </div>

              {/* Cloud Infrastructure & Orchestration */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Cloud Infrastructure & Orchestration</h4>
                </div>
                <p>
                  Designing and managing cloud-native architectures using
                  Docker, Cloud Run, and serverless technologies. Focus on
                  cost-effective, scalable solutions for AI workloads.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">Docker & Containers</span>
                  <span className="application-tag">Cloud Run</span>
                  <span className="application-tag">
                    Serverless Architecture
                  </span>
                </div>
              </div>

              {/* Data Engineering & Analytics */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Data Engineering & Analytics</h4>
                </div>
                <p>
                  Building robust data pipelines and analytics solutions using
                  BigQuery, SQL, and Python. Expertise in transforming complex
                  datasets into actionable business insights.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">BigQuery & SQL</span>
                  <span className="application-tag">Data Pipelines</span>
                  <span className="application-tag">Python Analytics</span>
                </div>
              </div>

              {/* AI Integration & Automation */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>AI Integration & Automation</h4>
                </div>
                <p>
                  Implementing intelligent automation solutions, API
                  integrations, and workflow orchestration. Focus on bridging AI
                  capabilities with existing business processes.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">API Development</span>
                  <span className="application-tag">Workflow Automation</span>
                  <span className="application-tag">System Integration</span>
                </div>
              </div>

              {/* Data-Driven Decision Making */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Data-Driven Decision Making</h4>
                </div>
                <p>
                  Applying analytical approaches developed in real estate to
                  optimize AI model performance, resource allocation, and
                  technical architecture decisions.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">
                    Performance Optimization
                  </span>
                  <span className="application-tag">Cost Analysis</span>
                  <span className="application-tag">Technical Strategy</span>
                </div>
              </div>

              {/* Responsible AI & Security */}
              <div className="skill-card">
                <div className="skill-header">
                  <h4>Responsible AI & Security</h4>
                </div>
                <p>
                  Implementing secure, ethical AI solutions with focus on data
                  privacy, model transparency, and regulatory compliance -
                  critical for enterprise adoption.
                </p>
                <div className="skill-applications">
                  <span className="application-tag">
                    Security Best Practices
                  </span>
                  <span className="application-tag">Ethical AI</span>
                  <span className="application-tag">Compliance Management</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .skills-module {
          margin: 2rem 0;
          background-color: var(--color-card-bg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: all var(--transition-medium) ease;
        }

        .skills-header {
          padding: 2rem 2rem 1rem;
          text-align: center;
        }

        .featured-heading {
          font-size: 1.8rem;
          margin: 0;
          color: var(--color-headings);
          font-weight: 700;
        }

        .goal-section {
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-primary-dark)
          );
          color: white;
          padding: 2rem;
          margin: 0 2rem 2rem;
          border-radius: var(--radius-md);
          text-align: center;
        }

        .goal-section p {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .collapsible-content {
          overflow: hidden;
          transition: all var(--transition-medium) ease;
        }

        .collapsible-content.visible {
          max-height: none;
          opacity: 1;
        }

        .skills-tabs {
          display: flex;
          border-bottom: 1px solid var(--color-border);
          margin: 0 2rem;
          gap: 0;
        }

        .skills-tab {
          flex: 1;
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-secondary);
          border-bottom: 3px solid transparent;
          transition: all var(--transition-fast) ease;
          position: relative;
        }

        .skills-tab:hover {
          color: var(--color-primary);
          background-color: var(--color-hover);
        }

        .skills-tab.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
          background-color: var(--color-hover);
        }

        .skills-content {
          padding: 2rem;
          transition: opacity var(--transition-fast) ease;
        }

        .skills-content.animating {
          opacity: 0.7;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .skill-card {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          transition: all var(--transition-medium) ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .skill-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }

        .skill-header {
          margin-bottom: 1rem;
        }

        .skill-header h4 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--color-primary);
          font-weight: 600;
        }

        .skill-card p {
          color: var(--color-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .skill-applications {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .application-tag {
          background-color: var(--color-tag-bg);
          color: var(--color-primary);
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid var(--color-border);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .skills-tabs {
            flex-direction: column;
            margin: 0 1rem;
          }

          .skills-tab {
            border-bottom: 1px solid var(--color-border);
            border-right: none;
            text-align: left;
          }

          .skills-tab.active {
            border-bottom-color: var(--color-border);
            border-left: 3px solid var(--color-primary);
          }

          .skills-content {
            padding: 1.5rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .goal-section {
            margin: 0 1rem 1.5rem;
            padding: 1.5rem;
          }

          .skills-header {
            padding: 1.5rem 1rem 1rem;
          }

          .featured-heading {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .skill-card {
            padding: 1rem;
          }

          .application-tag {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
