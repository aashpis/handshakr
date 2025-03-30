export default function HandshakeStatusBadge({status}){
    const STATUS_BADGE = {
        "completed": <p className="bg-green-700 text-xs text-neutral text-center py-1 px-3 rounded uppercase">Completed</p>,
        "failed": <p className="bg-red-700 text-xs text-neutral text-center py-1 px-3 rounded uppercase">Failed</p>,
        "pending": <p className="bg-amber-500 text-xs text-neutral text-center py-1 px-3 rounded uppercase">Pending</p>
    }[status] ?? <p className="bg-neutral-700 text-xs text-neutral-dark text-center py-1 px-3 rounded uppercase">Status Unknown</p>;
    
    return(
        STATUS_BADGE
    );
}