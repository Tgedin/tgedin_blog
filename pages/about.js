import MainLayout from '../layouts/MainLayout';
import { useState } from 'react';
import ContactForm from '../components/ContactForm';

export default function About() {
  const [imageError, setImageError] = useState(false);
  // Use environment variable instead of hardcoded key
  const web3FormsApiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  return (
    <MainLayout 
      title="About Me" 
      description="At the intersection of building and analysis, I'm driven by a passion to create tangible solutions for our society's most pressing challenges."
    >
      <div className="about-container">
        <h1>About Me</h1>
        <p className="about-intro">
          At the intersection of building and analysis, I'm driven by a passion to create tangible solutions for our society's most pressing challenges.
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
            Though my formal career in urban planning and civil engineering spanned just three years—working on development projects and public offerings in France—it profoundly shaped my perspective. During this time, I was consistently struck by the shortcomings in how French cities were designed and built. I observed vibrant potential suffocated by poor planning, resulting in urban centers that often felt lifeless despite their density—spaces where people existed but rarely thrived.
          </p>
          <p>
            This urban disconnect was what initially propelled me toward change, but my vision has since expanded far beyond city planning. I've come to recognize similar patterns of inefficiency and untapped potential across education, industry, economy, and finance—all sectors poised for revolutionary transformation in the coming years. Currently, I'm expanding my capabilities at 4Geeks Academy in Valencia, Spain, where I'm immersing myself in data science and machine learning as practical tools to participate in this broader societal reshaping.
          </p>
          <p>
            I've made Valencia my home, living with my Spanish girlfriend and experiencing firsthand how different approaches to community building and social organization can create vastly different outcomes—providing me with constant inspiration and a comparative lens through which to view systemic challenges.
          </p>
        </section>
        
        <section className="about-section">
          <h2>What Drives Me</h2>
          <p>
            While urban planning challenges first opened my eyes, I'm now fundamentally driven by the extraordinary moment of transformation we're entering across multiple domains. The next years will be pivotal for reshaping our societies, and I'm eager to contribute to this evolution through practical solution-building. The patterns I recognized in urban environments—systems that fail to serve human needs effectively—are equally present in how we approach education, organize our economy, and structure our industries.
          </p>
          <p>
            I'm particularly interested in:
          </p>
          <ul>
            <li>Education systems that nurture genuine creativity and problem-solving</li>
            <li>Economic models that distribute value more equitably and sustainably</li>
            <li>Industrial innovations that harmonize with human and environmental needs</li>
            <li>Financial approaches that democratize opportunity</li>
          </ul>
          <p>
            Data science and coding are simply modern instruments in my toolkit for addressing these fundamental challenges.
          </p>
        </section>
        
        <section className="about-section">
          <h2>My Approach</h2>
          <p>
            I believe that with determination and strategic learning, one person can acquire sufficient technical breadth to build functioning prototypes and initial solutions independently. This initial self-reliance is particularly valuable in innovation, where understanding both human elements and technical systems is essential for creating meaningful change. However, I've observed that truly transformative projects flourish at the intersection of complementary skills and diverse perspectives. While the journey may begin with individual initiative and proof-of-concept work, the most impactful solutions emerge when founding ideas encounter different viewpoints, additional expertise, and collaborative energy.
          </p>
          <p>
            This is why I value both the independence to start building without waiting for perfect conditions and the wisdom to recognize when association with others will expand possibilities beyond what any individual could achieve alone. The most effective innovations often begin as a focused vision but evolve through the rich tapestry of collaborative development—where technical capabilities meet firsthand experiences and diverse stakeholders contribute their unique insights.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Looking Forward</h2>
          <p>
            I'm actively seeking opportunities to build solutions that catalyze positive transformation across various domains. Whether that means founding a venture from scratch or joining an early-stage team where I can apply both my understanding of systemic challenges and my technical skills, I'm ready to move from observation to creation.
          </p>
          <p>
            As we stand at the threshold of potentially revolutionary changes in education, industry, economy, and urban development, I believe the coming years offer unprecedented opportunities to reshape our societies for the better. I'm committed to being an active participant in this transformation rather than a mere observer.
          </p>
          <p>
            If you're interested in reimagining how our foundational systems might better serve humanity, in using data and technology to create more effective and equitable approaches, I'd welcome a conversation. Together, we might build something that contributes meaningfully to the societal transformation that lies ahead.
          </p>
        </section>
        
        {/* New CV/Resume Section */}
        <section className="about-section cv-section">
          <h2>Curriculum Vitae</h2>
          <p>
            My CV is available in multiple languages. Click below to download:
          </p>
          <div className="cv-buttons">
            <a href="/theo-gedin-cv-en.pdf" className="cv-button" target="_blank" rel="noopener noreferrer">
              <span className="cv-lang">English</span>
              <span className="cv-download">Download CV</span>
            </a>
            <a href="/theo-gedin-cv-es.pdf" className="cv-button" target="_blank" rel="noopener noreferrer">
              <span className="cv-lang">Español</span>
              <span className="cv-download">Descargar CV</span>
            </a>
            <a href="/theo-gedin-cv-fr.pdf" className="cv-button" target="_blank" rel="noopener noreferrer">
              <span className="cv-lang">Français</span>
              <span className="cv-download">Télécharger CV</span>
            </a>
          </div>
        </section>
        
        <section className="about-section contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have an idea, opportunity, or just want to connect? I'm always open to interesting conversations and potential collaborations.
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
                console.log("Profile image failed to load, falling back to placeholder");
                e.target.src = "https://via.placeholder.com/180";
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
