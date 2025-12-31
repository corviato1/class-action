import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
        <p className="text-xl text-gray-600 mb-12">
          Simple, transparent, and effective. Join the movement to make justice accessible.
        </p>

        <div className="space-y-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Submit or Browse</h2>
            </div>
            <p className="text-gray-700 ml-16">
              Submit a case for review or browse active lawsuits that need funding. Our legal team reviews all submissions to ensure they meet the criteria for class action lawsuits.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Pledge Support</h2>
            </div>
            <p className="text-gray-700 ml-16">
              Back cases you believe in with financial pledges to cover legal costs. Your contribution helps fund attorney fees, court costs, and expert witnesses. Minimum pledge is $10.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Track Progress</h2>
            </div>
            <p className="text-gray-700 ml-16">
              Follow case updates and see how your contribution makes a difference. Get notified when cases reach funding goals, when legal proceedings begin, and when settlements are reached.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                4
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Make an Impact</h2>
            </div>
            <p className="text-gray-700 ml-16">
              When cases are successful, settlements benefit all class members. Your pledge helps hold corporations accountable and creates positive change for communities affected by corporate wrongdoing.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-indigo-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-700 mb-6">
            Browse active cases or submit your own class action proposal for review.
          </p>
          <div className="flex gap-4">
            <Link
              href="/cases"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Cases
            </Link>
            <Link
              href="/submit"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Submit a Case
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
