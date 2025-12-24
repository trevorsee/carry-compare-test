'use client';

interface HeaderProps {
  onEducationClick: () => void;
  comparisonCount: number;
  onShowComparison: () => void;
}

export default function Header({ onEducationClick, comparisonCount, onShowComparison }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Carry Compare</h1>
          </div>
          <nav className="flex items-center gap-4">
            <button
              onClick={onEducationClick}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Learn More
            </button>
            {comparisonCount > 0 && (
              <button
                onClick={onShowComparison}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Compare ({comparisonCount})
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
