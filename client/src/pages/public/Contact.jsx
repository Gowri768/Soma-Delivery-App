import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { submitContact } from "../../services/contactService";
import BackButton from "../../components/common/BackButton";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const data = await submitContact(formData);

      setSuccess(
        data.message || "Your message has been sent successfully."
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 pt-6">
      <BackButton />
    </div>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">

          <div className="inline-flex items-center justify-center bg-orange-100 p-4 rounded-2xl mb-5">
            <Mail
              size={35}
              className="text-orange-500"
            />
          </div>

          <h1 className="text-5xl font-bold text-gray-800">
            Contact{" "}
            <span className="text-orange-500">
              Us
            </span>
          </h1>

          <p className="mt-4 text-gray-500 text-lg">
            Have a question or need help? We'd love to hear
            from you.
          </p>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-orange-100 p-3 rounded-xl">
                <Send
                  size={22}
                  className="text-orange-500"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Send a Message
              </h2>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={19} />
                    Send Message
                  </>
                )}
              </button>

            </form>

            {/* Success */}
            {success && (
              <div className="mt-5 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 flex items-center gap-3">

                <CheckCircle size={20} />

                <p className="text-sm font-medium">
                  {success}
                </p>

              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

                <p className="text-sm font-medium">
                  {error}
                </p>

              </div>
            )}

          </div>

          {/* Contact Information */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">

                {/* Phone */}
                <div className="flex items-start gap-4">

                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Phone
                      size={22}
                      className="text-orange-500"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Phone
                    </p>

                    <p className="text-gray-500 mt-1">
                      +91 98765 43210
                    </p>
                  </div>

                </div>

                {/* Email */}
                <div className="flex items-start gap-4">

                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Mail
                      size={22}
                      className="text-orange-500"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Email
                    </p>

                    <p className="text-gray-500 mt-1">
                      support@somadelivery.com
                    </p>
                  </div>

                </div>

                {/* Location */}
                <div className="flex items-start gap-4">

                  <div className="bg-orange-100 p-3 rounded-xl">
                    <MapPin
                      size={22}
                      className="text-orange-500"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Location
                    </p>

                    <p className="text-gray-500 mt-1">
                      Andhra Pradesh, India
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Support Card */}
            <div className="bg-orange-500 rounded-2xl p-8 text-white">

              <h2 className="text-2xl font-bold">
                Need Help?
              </h2>

              <p className="mt-3 text-orange-50 leading-relaxed">
                Our support team is here to help with your
                orders, products, and delivery-related questions.
              </p>

              <p className="mt-5 font-semibold">
                We are happy to assist you!
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;