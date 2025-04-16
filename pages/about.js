import MainLayout from "../layouts/MainLayout";
import { useState } from "react";
import ContactForm from "../components/ContactForm";

// Fetch API key from environment variables
const web3FormsApiKey = process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY;

export default function About() {
  const [imageError, setImageError] = useState(false);

  return (
    <MainLayout
      title="About"
      description="Learn more about Théo Gédin's journey from civil engineering to data science and his current projects."
    >
      <div className="about-container">
        <h1>About Me</h1>
        <p className="about-intro">
          At the intersection of building and analysis, I&apos;m driven by a
          passion to create tangible solutions for our society&apos;s most
          pressing challenges.
        </p>

        <div className="crossroads-image-container">
          {/* Try fallback approach for image */}
          {!imageError ? (
            <img
              src="/at_the_crossing.webp"
              alt="At the crossing of different paths"
              className="crossroads-image"
              width="1200"
              height="600"
              loading="lazy"
              onError={(e) => {
                console.log("WebP image failed to load, trying JPEG fallback");
                e.target.src = "/at_the_crossing.jpg";
                e.onerror = () => {
                  console.log("JPEG fallback also failed, hiding image");
                  setImageError(true);
                };
              }}
            />
          ) : (
            <div className="image-placeholder">
              <p>Image unavailable</p>
            </div>
          )}
        </div>

        <section className="about-section">
          <h2>My Journey</h2>
          <p>
            Though my formal career in urban planning and civil engineering
            spanned just three years—working on development projects and public
            offerings in France—it profoundly shaped my perspective. During this
            time, I was consistently struck by the shortcomings in how French
            cities were designed and built. I observed vibrant potential
            suffocated by poor planning, resulting in urban centers that often
            felt lifeless despite their density—spaces where people existed but
            rarely thrived.
          </p>
          <p>
            This urban disconnect was what initially propelled me toward change,
            but my vision has since expanded far beyond city planning. I&apos;ve
            come to recognize similar patterns of inefficiency and untapped
            potential across education, industry, economy, and finance—all
            sectors poised for revolutionary transformation in the coming years.
            Currently, I&apos;m expanding my capabilities at 4Geeks Academy in
            Valencia, Spain, where I&apos;m immersing myself in data science and
            machine learning as practical tools to participate in this broader
            societal reshaping.
          </p>
          <p>
            I&apos;ve made Valencia my home, living with my Spanish girlfriend
            and experiencing firsthand how different approaches to community
            building and social organization can create vastly different
            outcomes—providing me with constant inspiration and a comparative
            lens through which to view systemic challenges.
          </p>
        </section>

        <section className="about-section">
          <h2>What Drives Me</h2>
          <p>
            While urban planning challenges first opened my eyes, I&apos;m now
            fundamentally driven by the extraordinary moment of transformation
            we&apos;re entering across multiple domains. The next years will be
            pivotal for reshaping our societies, and I&apos;m eager to
            contribute to this evolution through practical solution-building.
            The patterns I recognized in urban environments—systems that fail to
            serve human needs effectively—are equally present in how we approach
            education, organize our economy, and structure our industries.
          </p>
          <p>I'm particularly interested in:</p>
          <ul>
            <li>
              Education systems that nurture genuine creativity and
              problem-solving
            </li>
            <li>
              Economic models that distribute value more equitably and
              sustainably
            </li>
            <li>
              Industrial innovations that harmonize with human and environmental
              needs
            </li>
            <li>Financial approaches that democratize opportunity</li>
          </ul>
          <p>
            Data science and coding are simply modern instruments in my toolkit
            for addressing these fundamental challenges.
          </p>
        </section>

        <section className="about-section">
          <h2>My Approach</h2>
          <p>
            I believe that with determination and strategic learning, one person
            can acquire sufficient technical breadth to build functioning
            prototypes and initial solutions independently. This initial
            self-reliance is particularly valuable in innovation, where
            understanding both human elements and technical systems is essential
            for creating meaningful change. However, I&apos;ve observed that
            truly transformative projects flourish at the intersection of
            complementary skills and diverse perspectives. While the journey may
            begin with individual initiative and proof-of-concept work, the most
            impactful solutions emerge when founding ideas encounter different
            viewpoints, additional expertise, and collaborative energy.
          </p>
          <p>
            This is why I value both the independence to start building without
            waiting for perfect conditions and the wisdom to recognize when
            association with others will expand possibilities beyond what any
            individual could achieve alone. The most effective innovations often
            begin as a focused vision but evolve through the rich tapestry of
            collaborative development—where technical capabilities meet
            firsthand experiences and diverse stakeholders contribute their
            unique insights.
          </p>
        </section>

        <section className="about-section">
          <h2>Looking Forward</h2>
          <p>
            I&apos;m actively seeking opportunities to build solutions that
            catalyze positive transformation across various domains. Whether
            that means founding a venture from scratch or joining an early-stage
            team where I can apply both my understanding of systemic challenges
            and my technical skills, I&apos;m ready to move from observation to
            creation.
          </p>
          <p>
            As we stand at the threshold of potentially revolutionary changes in
            education, industry, economy, and urban development, I believe the
            coming years offer unprecedented opportunities to reshape our
            societies for the better. I&apos;m committed to being an active
            participant in this transformation rather than a mere observer.
          </p>
          <p>
            If you&apos;re interested in reimagining how our foundational
            systems might better serve humanity, in using data and technology to
            create more effective and equitable approaches, I&apos;d welcome a
            conversation. Together, we might build something that contributes
            meaningfully to the societal transformation that lies ahead.
          </p>
        </section>

        {/* New CV/Resume Section */}
        <section className="about-section cv-section">
          <h2>Curriculum Vitae</h2>
          <p>
            My CV is available in multiple languages. Click below to download:
          </p>
          <div className="cv-buttons">
            <a
              href="/theo-gedin-cv-en.pdf"
              className="cv-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cv-lang">English</span>
              <span className="cv-download">Download CV</span>
            </a>
            <a
              href="/theo-gedin-cv-es.pdf"
              className="cv-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cv-lang">Español</span>
              <span className="cv-download">Descargar CV</span>
            </a>
            <a
              href="/theo-gedin-cv-fr.pdf"
              className="cv-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cv-lang">Français</span>
              <span className="cv-download">Télécharger CV</span>
            </a>
          </div>
        </section>

        {/* Substack Newsletter Section */}
        <section className="about-section substack-section">
          <h2>Newsletter</h2>
          <div className="substack-container">
            <div className="substack-content">
              <p className="substack-description">
                What if our housing crisis isn&apos;t a resource problem, but an
                information one? Weekly explorations from an engineer with a
                poet&apos;s heart - mixing technical deep dives with
                philosophical musings on how we build our world.
              </p>
              <a
                href="https://theogedin.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="substack-button"
              >
                Read Crossroads of Curiosity
              </a>
            </div>
            <div className="substack-image-container">
              <a
                href="https://theogedin.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="substack-logo-link"
              >
                <div className="substack-logo-wrapper">
                  <img
                    src="/Logo.png" // Updated image source
                    alt="Crossroads of Curiosity Substack"
                    className="substack-logo"
                  />
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="about-section contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have an idea, opportunity, or just want to connect? I&apos;m always
            open to interesting conversations and potential collaborations.
          </p>
          <p>
            Thank you for reaching out. I'll get back to you as soon as
            possible.
          </p>
          <ContactForm apiKey={web3FormsApiKey} />
        </section>

        <div className="profile-image-wrapper">
          <div className="profile-image-container">
            {/* Fix profile image path to use .webp extension */}
            <img
              src="/profile_pic.webp"
              alt="Theo Gedin"
              className="profile-image"
              onError={(e) => {
                console.log(
                  "Profile image failed to load, falling back to placeholder"
                );
                e.target.src = "https://via.placeholder.com/180";
              }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .substack-section {
          margin: 2rem 0;
        }

        .substack-container {
          display: flex;
          align-items: center;
          background-color: var(--color-card-bg);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1rem;
          transition: background-color 0.3s ease, border-color 0.3s ease,
            box-shadow 0.3s ease;
          gap: 1.5rem;
        }

        /* Add subtle hover effect to container */
        .substack-container:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        /* Ensure dark mode has appropriate shadow */
        [data-theme="dark"] .substack-container:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .substack-content {
          flex: 1;
        }

        .substack-description {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.2rem;
          font-style: italic;
          color: var(--color-text);
        }

        .substack-image-container {
          flex: 0 0 200px;
          max-width: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .substack-logo-link {
          display: block;
          text-decoration: none;
        }

        .substack-logo-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        [data-theme="dark"] .substack-logo-wrapper {
          box-shadow: 0 3px 10px rgba(255, 255, 255, 0.05);
        }

        .substack-logo-wrapper:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }

        [data-theme="dark"] .substack-logo-wrapper:hover {
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
        }

        .substack-logo {
          display: block; /* Make it a block element */
          width: 100%;
          height: 100%;
          object-fit: cover; /* Keep cover */
          border-radius: inherit; /* Inherit border-radius from wrapper */
        }

        .substack-button {
          display: inline-block;
          background-color: var(--color-primary);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s ease;
          text-decoration: none;
          border: 1px solid transparent;
        }

        .substack-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }

        /* Ensure button is visible in both modes */
        [data-theme="dark"] .substack-button {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 640px) {
          .substack-container {
            flex-direction: column;
            text-align: center;
          }

          .substack-image-container {
            flex-basis: 150px;
            max-width: 150px;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </MainLayout>
  );
}
