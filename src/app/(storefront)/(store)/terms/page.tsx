export default function TermsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-sm">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Terms</h2>
        <p>
          By accessing Cartify, you agree to be bound by these terms of service
          and agree that you are responsible for compliance with any applicable
          local laws.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Cartify for personal,
          non-commercial transitory viewing only.
        </p>
      </div>
    </div>
  );
}
