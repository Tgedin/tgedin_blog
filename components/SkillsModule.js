import { useState } from 'react';

export default function SkillsModule() {
  // Active tab state
  const [activeTab, setActiveTab] = useState('languages');
  
  // Helper function to determine if a tab is active
  const isActive = (tabName) => activeTab === tabName;
  
  return (
    <div className="skills-module">
      {/* Tab Navigation */}
      <div className="skills-tabs">
        <button 
          className={`skills-tab ${isActive('languages') ? 'active' : ''}`}
          onClick={() => setActiveTab('languages')}
        >
          Programming Languages
        </button>
        <button 
          className={`skills-tab ${isActive('frameworks') ? 'active' : ''}`}
          onClick={() => setActiveTab('frameworks')}
        >
          Frameworks & Libraries
        </button>
        <button 
          className={`skills-tab ${isActive('tools') ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools & Environments
        </button>
        <button 
          className={`skills-tab ${isActive('ai') ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          AI & ML
        </button>
        <button 
          className={`skills-tab ${isActive('domains') ? 'active' : ''}`}
          onClick={() => setActiveTab('domains')}
        >
          Domain Knowledge
        </button>
      </div>
      
      <div className="skills-content">
        <p className="skills-note">
          Thanks to AI, my curiosity, and today's learning possibilities, I believe in pursuing a broad and ambitious skill set. 
          <span className="dev-indicator-note">Items marked with <span className="dev-indicator">In Development</span> indicate skills I'm actively learning.</span>
        </p>
        
        {/* Programming Languages Tab */}
        {isActive('languages') && (
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <h3>Python</h3>
                <span className="skill-level">Advanced</span>
              </div>
              <p className="skill-description">
                Primary language for data science, machine learning, and automation tasks.
              </p>
              <div className="skill-use-cases">
                <h4>Use cases:</h4>
                <ul>
                  <li>Data analysis and visualization</li>
                  <li>Machine learning model development</li>
                  <li>API development</li>
                </ul>
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>JavaScript/TypeScript</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Building interactive web applications and implementing front-end functionality.
              </p>
              <div className="skill-use-cases">
                <h4>Use cases:</h4>
                <ul>
                  <li>Front-end development</li>
                  <li>Server-side with Node.js</li>
                  <li>Type-safe application development</li>
                </ul>
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>SQL</h3>
                <span className="skill-level">Intermediate</span>
              </div>
              <p className="skill-description">
                Database querying and data manipulation for analytics and applications.
              </p>
              <div className="skill-use-cases">
                <h4>Use cases:</h4>
                <ul>
                  <li>Database design and management</li>
                  <li>Complex data queries</li>
                  <li>Data aggregation and reporting</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Frameworks & Libraries Tab */}
        {isActive('frameworks') && (
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <h3>React/Next.js</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Building modern web applications with component-based architecture.
              </p>
              <div className="skill-use-cases">
                <h4>Focus areas:</h4>
                <ul>
                  <li>Server-side rendering</li>
                  <li>App Router implementation</li>
                  <li>Progressive enhancement patterns</li>
                </ul>
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>TailwindCSS</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Utility-first CSS framework for rapid UI development.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Data Science Libraries</h3>
                <span className="skill-level">Intermediate</span>
              </div>
              <p className="skill-description">
                Python libraries for data processing and analysis.
              </p>
              <div className="skill-use-cases">
                <h4>Libraries:</h4>
                <ul>
                  <li>Pandas & NumPy</li>
                  <li>Matplotlib & Seaborn</li>
                  <li>Scikit-learn</li>
                </ul>
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>MongoDB/Mongoose</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                NoSQL database for flexible data modeling and scaling.
              </p>
            </div>
          </div>
        )}
        
        {/* Tools & Environments Tab */}
        {isActive('tools') && (
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <h3>Git/GitHub</h3>
                <span className="skill-level">Intermediate</span>
              </div>
              <p className="skill-description">
                Version control for collaboration and code management.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Docker</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Containerization for consistent development and deployment environments.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Linux</h3>
                <span className="skill-level">Intermediate</span>
              </div>
              <p className="skill-description">
                Operating system for development and server environments.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Vercel</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Platform for hosting and deploying web applications.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Edge Functions</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Serverless functions for global optimization and performance.
              </p>
            </div>
          </div>
        )}
        
        {/* AI & ML Tab */}
        {isActive('ai') && (
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <h3>OpenAI API Integration</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Leveraging GPT models and embeddings in applications.
              </p>
              <div className="skill-use-cases">
                <h4>Focus areas:</h4>
                <ul>
                  <li>Prompt engineering</li>
                  <li>Vector embeddings for semantic search</li>
                  <li>Cost optimization strategies</li>
                </ul>
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Anthropic Claude API</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Alternative LLM integration for specialized use cases.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Vector Search</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Implementing semantic search using vector embeddings.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>AI-Powered UI Generation</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Using tools like Vercel V0 for AI-assisted interface creation.
              </p>
            </div>
          </div>
        )}
        
        {/* Domain Knowledge Tab */}
        {isActive('domains') && (
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <h3>Civil Engineering</h3>
                <span className="skill-level">Advanced</span>
              </div>
              <p className="skill-description">
                Professional background in structural design and urban development.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Urban Planning</h3>
                <span className="skill-level">Advanced</span>
              </div>
              <p className="skill-description">
                Experience in city planning and development strategies.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Data Science</h3>
                <span className="skill-level">Intermediate</span>
              </div>
              <p className="skill-description">
                Analytics, visualization, and extracting insights from data.
              </p>
            </div>
            
            <div className="skill-card">
              <div className="skill-header">
                <h3>Open Source Business Models</h3>
                <span className="skill-level dev-indicator">In Development</span>
              </div>
              <p className="skill-description">
                Strategies for sustainable open source development and monetization.
              </p>
              <div className="skill-use-cases">
                <h4>Areas of interest:</h4>
                <ul>
                  <li>Open Core implementation</li>
                  <li>Community contribution management</li>
                  <li>Financial transparency models</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
