import { Mail, Phone, MapPin } from "lucide-react";

function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-500">
          Contact Us
        </h1>

        <p className="mt-4 text-gray-600">
          We'd love to hear from you. Reach out to us anytime!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-white shadow-lg rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Send a Message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="5"
              placeholder="Message"
              className="w-full border rounded-lg p-3"
            ></textarea>

            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Send Message
            </button>

          </form>

        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Contact Information
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <Phone className="text-orange-500" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-orange-500" />
              <span>support@somadelivery.com</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-orange-500" />
              <span>Andhra Pradesh, India</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;