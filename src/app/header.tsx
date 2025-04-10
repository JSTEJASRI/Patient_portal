const Header = ()=>{
    return <header className="bg-white p-4 shadow-sm">
    <div className="flex items-center">
      <div className="flex items-center">
        {<img src={"TestLogo.png"}/>}
      </div>

      <nav className="ml-10 flex space-x-6">
        <button className="flex items-center px-3 py-2 text-sm text-gray-600">
        <img src="Overview.png" alt="Overview Icon" className="w-3 h-3 mr-1" />
          Overview
        </button>
        <button className="flex items-center px-3 py-2 text-sm text-teal-500 border-b-2 border-teal-500 font-medium">
        <img src="patients.png" alt="Overview Icon" className="w-3 h-3 mr-1" />
          Patients
        </button>
        <button className="flex items-center px-3 py-2 text-sm text-gray-600">
        <img src="schedule.png" alt="Overview Icon" className="w-3 h-3 mr-1" />
          Schedule
        </button>
        <button className="flex items-center px-3 py-2 text-sm text-gray-600">
        <img src="message.png" alt="Overview Icon" className="w-3 h-3 mr-1" />
          Messages
        </button>
        <button className="flex items-center px-3 py-2 text-sm text-gray-600">
        <img src="transactions.png" alt="Overview Icon" className="w-3 h-3 mr-1" />
          Transactions
        </button>
      </nav>

      <div className="ml-auto flex items-center">
        <div className="flex items-center mr-4">
          <img
            src="doctor.png"
            alt="Doctor"
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2 text-sm font-medium">Dr. Jean Simmons</span>
        </div>
        <button className="text-gray-500">
        </button>
      </div>
    </div>
  </header>
}

export default Header
