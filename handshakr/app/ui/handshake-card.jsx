export default function HandshakeCard({ id, initiator, agreer, compensation, terms, status, notarized }) {
    
    function checkNotarized(notarized){
        if (notarized){
            return <p><span className="text-gray-700 text-sm">Notarized by </span>{notarized}</p>;
        }
        return <p className="text-red-700 text-sm">Not notarized</p>;
    }

    function checkStatus(status){
        switch(status){
            case "completed":
                return <p className="bg-green-700 text-xs text-white text-center  py-1 px-auto rounded uppercase">completed</p>
            case "failed":
                return <p className="bg-red-700 text-xs text-white  text-center py-1 px-auto rounded uppercase">failed</p>
            case "pending":
                return <p className="bg-amber-500 text-xs text-white  text-center py-1 px-auto rounded uppercase">pending</p>
        }
        
    }
    
    return (
        <div className="border mb-10 px-6 py-2  w-full max-w-md rounded-lg shadow-md">
            <div className="flex justify-between content-center">
                <div className="my-auto">
                <h1 className=" text-lg font-semibold">Handshake #{id}</h1>
                </div>
                <div>
                    {checkStatus(status)}    
                    {checkNotarized(notarized)}
                </div>
            </div>
            <hr className="mb-4"></hr>
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
