'use client';

interface Step {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StatusExplainerProps {
  currentStep: number;
  type: 'submission' | 'case' | 'provider';
}

const submissionSteps: Omit<Step, 'status'>[] = [
  {
    title: 'Submitted',
    description: 'Your case has been received and is in our queue.',
  },
  {
    title: 'Under Review',
    description: 'Our team is reviewing your submission for merit and compliance.',
  },
  {
    title: 'Decision',
    description: 'You will be notified via email of approval or if more information is needed.',
  },
  {
    title: 'Live',
    description: 'Approved cases go live for public funding.',
  },
];

const providerSteps: Omit<Step, 'status'>[] = [
  {
    title: 'Application Submitted',
    description: 'Your service provider application has been received.',
  },
  {
    title: 'Verification',
    description: 'We are verifying your credentials and licensing.',
  },
  {
    title: 'Manual Review',
    description: 'An admin is reviewing your application.',
  },
  {
    title: 'Approved',
    description: 'You can now offer services on the platform.',
  },
];

const caseSteps: Omit<Step, 'status'>[] = [
  {
    title: 'Funding',
    description: 'Case is accepting pledges from supporters.',
  },
  {
    title: 'Goal Reached',
    description: 'Funding goal met, legal team engaged.',
  },
  {
    title: 'In Progress',
    description: 'Legal proceedings are underway.',
  },
  {
    title: 'Resolved',
    description: 'Case has been settled or concluded.',
  },
];

export default function StatusExplainer({ currentStep, type }: StatusExplainerProps) {
  const steps = type === 'submission' 
    ? submissionSteps 
    : type === 'provider' 
      ? providerSteps 
      : caseSteps;

  const stepsWithStatus: Step[] = steps.map((step, index) => ({
    ...step,
    status: index < currentStep ? 'completed' : index === currentStep ? 'current' : 'upcoming',
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {type === 'submission' ? 'Submission Status' : type === 'provider' ? 'Application Status' : 'Case Progress'}
      </h3>
      
      <div className="relative">
        {stepsWithStatus.map((step, index) => (
          <div key={step.title} className="flex items-start mb-6 last:mb-0">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : step.status === 'current'
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.status === 'completed' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < stepsWithStatus.length - 1 && (
                <div
                  className={`w-0.5 h-12 ${
                    step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            
            <div className="pt-1">
              <h4
                className={`font-medium ${
                  step.status === 'current'
                    ? 'text-indigo-600'
                    : step.status === 'completed'
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}
              >
                {step.title}
                {step.status === 'current' && (
                  <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </h4>
              <p className={`text-sm mt-1 ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-600'}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
