import { useState } from "react";

export default function ContactForm({ apiKey }) {
  // Add this log at the start of your component to verify the key exists
  console.log("API Key available:", !!apiKey);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
    success: false,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({ ...formStatus, submitting: true });

    try {
      // Send data to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: apiKey,
          from_name: "From Bricks to Bytes Contact Form",
          subject: `New message from ${formData.name}`,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Form submitted successfully
        setFormStatus({
          submitted: true,
          submitting: false,
          error: null,
          success: true,
        });

        // Reset form data
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        submitting: false,
        error: error.message,
        success: false,
      });
    }
  };

  return (
    <div className="contact-form-container">
      {formStatus.success ? (
        <div className="form-success">
          <h3>Message sent!</h3>
          <p>
            Thank you for reaching out. I&apos;ll get back to you as soon as
            possible.
          </p>
          <button
            onClick={() =>
              setFormStatus({
                submitted: false,
                submitting: false,
                error: null,
                success: false,
              })
            }
            className="form-button"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message"
              rows={6}
            />
          </div>

          {formStatus.error && (
            <div className="form-error">
              <p>Error: {formStatus.error}</p>
              <p>Please try again or email me directly.</p>
            </div>
          )}

          <button
            type="submit"
            className="form-button"
            disabled={formStatus.submitting}
          >
            {formStatus.submitting ? "Sending..." : "Send Message"}
          </button>

          <p className="form-note">
            Your information is securely processed by Web3Forms and routed to my
            inbox. I&apos;ll never share your details with anyone else.
          </p>
        </form>
      )}
    </div>
  );
}
