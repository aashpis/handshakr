// import HandshakeRepsonseButtons from 'handshake-response-buttons'
import HandshakeStatusBadge from './handshake-status-badge'



export default function HandshakeCard({ id, initiator, agreererer, compensation, terms, status, notarized }) {
    const STATUS_BADGE = {
        "completed": <p className="bg-green-700 text-xs text-neutral text-center py-1 px-3 rounded uppercase">Completed</p>,
        "failed": <p className="bg-red-700 text-xs text-neutral text-center py-1 px-3 rounded uppercase">Failed</p>,
        "pending": <p className="bg-amber-500 text-xs text-neutral text-center py-1 px-3 rounded uppercase">Pending</p>
    }[status] ?? <p className="bg-neutral-700 text-xs text-neutral-dark text-center py-1 px-3 rounded uppercase">Status Unknown</p>;

    const STATUS_BG_STYLE = {
        "completed": "bg-green-100",
        "failed": "bg-red-100",
        "pending": "bg-amber-100"
    }[status] || "bg-gray-100";

    return (
        <div className=" mb-10 w-full max-w-md rounded-lg shadow-md">
            {/* Top section with dynamic background */}
            <div className={`px-6 py-2 rounded-t-lg ${STATUS_BG_STYLE}`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Handshake #{id}</h1>
                    <div className="text-right">
                        {STATUS_BADGE}
                        <p className={`text-sm ${notarized ? "text-gray-700" : "text-red-700"}`}>
                            {notarized ? `Notarized by ${notarized}` : "Not notarized"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom section with default background */}
            <div className="px-6 py-2 bg-white rounded-b-lg">
                <div className="flex justify-between">
                    <h2 className="font-medium">
                        <span className="text-gray-700 font-bold text-sm">Initiated by:</span> {initiator}
                    </h2>
                    <h2 className="font-medium">
                        <span className="text-gray-700 font-bold text-sm">Agreed by:</span> {agreererer}
                    </h2>
                </div>

                <div className="mt-3 space-y-1">
                    <p><span className="text-gray-700 font-bold text-sm">Compensation: </span>{compensation}</p>
                    <p><span className="text-gray-700 font-bold text-sm">Terms: </span>{terms}</p>
                </div>
                <div>
                    {}
                </div>
            </div>
        </div>
    );
}
