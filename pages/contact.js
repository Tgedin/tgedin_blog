import MainLayout from "../layouts/MainLayout";
import ContactForm from "../components/ContactForm";
import Image from "next/image";

const web3FormsApiKey = process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY;

export default function Contact() {
  return (
    <MainLayout
      title="Contact"
      description="Get in touch with Théo Gédin for collaborations, questions, or opportunities."
    >
      <div className="contact-container">
        <h1>Contact</h1>
        <div className="contact-logo-container">
          <Image
            src="/profile_pic.webp"
            alt="Profile picture of Théo Gédin"
            className="contact-logo"
            width={220}
            height={220}
            style={{ objectFit: "cover", borderRadius: "50%" }}
            priority
          />
        </div>
        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have an idea, opportunity, or just want to connect? I{"'"}m always
            open to interesting conversations and potential collaborations.
          </p>
          <ContactForm apiKey={web3FormsApiKey} />
        </section>
      </div>
      <style jsx>{`
        .contact-container {
          max-width: 600px;
          margin: 3rem auto;
          padding: 2rem;
          background: var(--color-card-bg);
          border-radius: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          text-align: center;
        }
        .contact-logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .contact-logo {
          width: 220px;
          height: 220px;
          object-fit: cover;
          border-radius: 50%;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
        }
        .contact-section {
          margin-top: 2rem;
        }
        .contact-section h2 {
          margin-bottom: 1rem;
        }
        .contact-section p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </MainLayout>
  );
}
