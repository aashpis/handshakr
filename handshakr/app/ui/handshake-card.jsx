export default function HandshakeCard({ id, initiator, agreer, compensation, terms, status, notarized }) {
    
    function checkNotarized(notarized) {
        if (notarized) {
            return <p><span className="text-gray-700 text-sm">Notarized by </span>{notarized}</p>;
        }
        return <p className="text-red-700 text-sm">Not notarized</p>;
    }
   
    // Using object literal lookup for status badges
    const STATUS_BADGE = {
        "completed": <p className="bg-green-700 text-xs text-white text-center py-1 px-3 rounded uppercase">completed</p>,
        "failed": <p className="bg-red-700 text-xs text-white text-center py-1 px-3 rounded uppercase">failed</p>,
        "pending": <p className="bg-amber-500 text-xs text-white text-center py-1 px-3 rounded uppercase">pending</p>
    }[status] ?? <p className="bg-neutral-dark text-xs text-neutral text-center py-1 px-3 rounded uppercase">status not found</p>;
    
    // Dynamic status classes
    const STATUS_BG_STYLE = {
        "completed": "bg-green-700 bg-opacity-20 text-green-900",
        "failed": "bg-red-700 bg-opacity-20 text-red-900",
        "pending": "bg-amber-500 bg-opacity-20 text-amber-900"
    }[status] || "";
   
    return (
        <div className="border mb-10 px-6 py-2 w-full max-w-md rounded-lg shadow-md">
            <div className={`flex justify-between items-center p-2 rounded-md ${STATUS_BG_STYLE}`}>
                <div className="my-auto">
                    <h1 className="text-lg font-semibold">Handshake #{id}</h1>
                </div>
                <div>
                    {STATUS_BADGE}    
                    {checkNotarized(notarized)}
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
                <h2 className="font-medium"><span className="text-gray-700 font-bold text-sm">Initiated by:</span> {initiator}</h2>
                <h2 className="font-medium"><span className="text-gray-700 font-bold text-sm">Agreed by: </span>{agreer}</h2>
            </div>
           
            <div className="mt-3 space-y-1">
                <p><span className="text-gray-700 font-bold text-sm">Compensation: </span>{compensation}</p>
                <p><span className="text-gray-700 font-bold text-sm">Terms: </span>{terms}</p>
            </div>
        </div>
    );
}