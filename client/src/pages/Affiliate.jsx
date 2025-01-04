export default function Affiliate() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-6 text-center">
          <div>
            <h1 className="text-3xl font-semibold text-center my-7 text-indigo-600">
              Join Our Affiliate Program
            </h1>
            <div className="text-md flex flex-col gap-6">
              <p>
                Become a part of our AI-powered revolution and earn money by promoting our innovative AI reel
                generation platform! Whether you're an influencer, blogger, or simply have an audience, our
                Affiliate Program lets you earn commissions by referring users to our platform.
              </p>
  
              <h2 className="text-xl font-semibold my-5 text-indigo-600">Why Join Our Affiliate Program?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                <div className="p-4 bg-indigo-600 shadow-md rounded-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 ">Earn Competitive Commissions</h3>
                  <p>
                    Get rewarded with generous commissions for each user who signs up through your referral. The more
                    users you refer, the more you earn!
                  </p>
                </div>
                <div className="p-4 bg-indigo-600 shadow-md rounded-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 ">No Upfront Cost</h3>
                  <p>
                    Joining our affiliate program is free. There are no hidden fees or upfront costs—just the potential
                    for earnings from your referrals.
                  </p>
                </div>
                <div className="p-4 bg-indigo-600 shadow-md rounded-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3">Easy to Promote</h3>
                  <p>
                    We provide you with everything you need to start promoting. From banners to affiliate links, we’ve
                    made it easy for you to get started.
                  </p>
                </div>
                <div className="p-4 bg-indigo-600 shadow-md rounded-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3">Track Your Earnings</h3>
                  <p>
                    With our intuitive dashboard, you can track your referrals, monitor your earnings, and optimize
                    your affiliate strategy.
                  </p>
                </div>
                <div className="p-4 bg-indigo-600 shadow-md rounded-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3">Exclusive Promotions</h3>
                  <p>
                    As an affiliate, you'll receive access to exclusive promotions and discounts that you can share
                    with your audience to boost conversions.
                  </p>
                </div>
              </div>
  
              <h2 className="text-xl font-semibold my-7 text-indigo-600">How to Register as an Affiliate</h2>
              <p>Getting started is simple! Just follow these easy steps:</p>
              <ol className="list-decimal list-inside text-left my-5">
                <li>Sign up for an account on our platform.</li>
                <li>Navigate to the "Affiliate Program" section in your account settings.</li>
                <li>Complete the affiliate registration form with your details.</li>
                <li>Once approved, you'll get your unique referral link.</li>
                <li>Start promoting and earn commissions on every successful referral!</li>
              </ol>
  
              <h2 className="text-xl font-semibold my-7 text-indigo-600">Get Started Now</h2>
              <p>
                Ready to join the program and start earning? Click below to sign up and begin sharing your referral
                link!
              </p>
              <button className="bg-indigo-600 text-white py-2 px-6 rounded-full mt-4 hover:bg-indigo-700 transition-all duration-300">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  