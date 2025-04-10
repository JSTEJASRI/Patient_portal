interface PatientProps {
  setSearchPatient: (value: string) => void;
}

const Patient: React.FC<PatientProps> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-700">Patients</h2>
      <div className="mt-2 relative">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-8 pr-4 py-2 border rounded-md text-sm"
          onChange={(data) => {
            props.setSearchPatient(data.target.value);
          }}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Patient