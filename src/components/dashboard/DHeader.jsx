const DHeader = ({ employer }) => {
    return (
        <header className="bg-white shadow-md py-4 px-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {employer.companyLogo ? (
                        <img
                            src={employer.companyLogo}
                            alt={`${employer.companyName} logo`}
                            className="h-12 w-12 object-contain"
                        />
                    ) : (
                        <div className="h-12 w-12 bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                            {employer.companyName?.charAt(0)}
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-gray-800">{employer.companyName}</h1>
                </div>
                <div className="text-sm text-gray-600">
                    <p>Welcome, <span className="text-blue-600 font-semibold">{employer.EmployerName},</span></p>
                    <p className="text-blue-600">{employer.EmployerDesignation}</p>
                </div>
            </div>
        </header>
    )
}

export default DHeader;
