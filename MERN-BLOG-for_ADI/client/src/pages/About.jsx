export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div>
          <h1 className="text-3xl  font-semibold text-center my-7 text-indigo-600">
            About Our AI Reel Generation Platform
          </h1>
          <div className="text-md flex flex-col gap-6">
            <p>
              Welcome to our AI-powered platform for generating dynamic, engaging reels! With our
              cutting-edge technology, we enable creators, marketers, and businesses to generate high-quality
              video content effortlessly. Whether you're a social media influencer or a business looking to
              create promotional material, our platform helps you create AI-driven reels in minutes.
            </p>

            {/* <p >Here’s what our platform can help you with:</p>
             */}
             <h1 className="text-3xl  font-semibold text-center my-7 text-indigo-600">
             Here’s what our platform can help you with
          </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              <div className="p-4 bg-indigo-600 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Create AI-Generated Reels</h3>
                <p>
                  Automatically generate engaging, high-quality video reels with AI. Just input your ideas, and
                  let the platform work its magic!
                </p>
              </div>
              <div className="p-4 bg-indigo-600 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-3 ">Customizable Templates</h3>
                <p>
                  Choose from a variety of AI-powered templates that you can easily customize to suit your
                  brand or personal style.
                </p>
              </div>
              <div className="p-4 bg-indigo-600 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-3 ">Fast Video Generation</h3>
                <p>
                  Create professional-quality reels in a fraction of the time compared to traditional video
                  editing methods, thanks to our efficient AI tools.
                </p>
              </div>
              <div className="p-4 bg-indigo-600 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-3 ">Advanced Analytics</h3>
                <p>
                  Analyze your generated reels with built-in metrics to understand viewer engagement and improve
                  your content strategy.
                </p>
              </div>
              <div className="p-4 bg-indigo-600 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-3 ">Seamless Social Media Sharing</h3>
                <p>
                  Once your AI-generated reel is ready, share it directly on social media platforms with just a
                  few clicks.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold my-7 text-indigo-600">How It Works</h2>
            <p>Follow these simple steps to create your own AI-generated reel:</p>
            <ol className="list-decimal list-inside text-left my-5">
              <li>Sign up or log in to our platform.</li>
              <li>Select a template or create a new reel from scratch.</li>
              <li>Customize the content, text, and visuals using AI tools.</li>
              <li>Preview your reel and make any final adjustments.</li>
              <li>Generate and download the reel, ready to share on social media.</li>
            </ol>

            <h2 className="text-xl font-semibold my-7 text-indigo-600">Pricing</h2>
            <p>Choose the plan that fits your needs. Whether you're an individual creator or a business, we have options for everyone:</p>
            <div className="overflow-x-auto my-5">
              <table className="min-w-full table-auto border-separate border-spacing-2 text-left">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-4">Plan</th>
                    <th className="p-4">Features</th>
                    <th className="p-4">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="p-4">Basic Plan</td>
                    <td className="p-4">Access to basic templates and limited video generation.</td>
                    <td className="p-4">$19/month</td>
                  </tr>
                  <tr className="">
                    <td className="p-4">Pro Plan</td>
                    <td className="p-4">Advanced templates, custom branding, and unlimited video generation.</td>
                    <td className="p-4">$49/month</td>
                  </tr>
                  <tr className="">
                    <td className="p-4">Enterprise Plan</td>
                    <td className="p-4">Custom features, team collaboration, and dedicated support.</td>
                    <td className="p-4">$149/month</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold my-7 text-indigo-600">FAQs</h2>
            <div className="text-left">
              <h3 className="font-semibold">Q: How do I generate my first reel?</h3>
              <p>A: Simply sign up, choose a template, customize it, and hit generate. It's that easy!</p>

              <h3 className="font-semibold mt-4">Q: Can I cancel my subscription at any time?</h3>
              <p>A: Yes, you can cancel your subscription anytime from your account settings.</p>

              <h3 className="font-semibold mt-4">Q: Is there a free trial for the Pro Plan?</h3>
              <p>A: Yes, we offer a 7-day free trial for the Pro Plan so you can try all the features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
