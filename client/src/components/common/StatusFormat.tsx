const StatusFormat = ({status}: {status: string}) => {
  return (
    status === "success" ? (
      <span className="text-white bg-success text-xs font-medium px-2 py-1 rounded-full">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    ) : (
      <span className="text-white bg-danger text-xs font-medium px-2 py-1 rounded-full">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    )
  )
}

export default StatusFormat