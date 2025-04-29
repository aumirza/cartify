export default function PrivacyPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-sm">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>Information We Collect</h2>
        <p>
          We collect information that you provide directly to us when using
          Cartify, including but not limited to your shopping preferences and
          cart data.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve
          our services, and to enhance your shopping experience.
        </p>
      </div>
    </div>
  );
}
