import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Reagan Petrehn',
  description: 'Privacy policy and data protection information for Reagan Petrehn\'s portfolio website.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, including when you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact us through our website</li>
            <li>Subscribe to our newsletter</li>
            <li>Interact with our content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Send you updates and marketing communications</li>
            <li>Respond to your comments and questions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-4">
            Email: [Your Email]<br />
            Address: [Your Address]
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </main>
  );
} 