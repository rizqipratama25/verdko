const StatusFormat = ({status}: {status: string}) => {
  return (
    status === "success" ? (
      <span className="text-white bg-success text-xs font-medium px-2 py-1 rounded-full">{status.toUpperCase()}</span>
    ) : (
      <span className="text-white bg-failed text-xs font-medium px-2 py-1 rounded-full">{status.toUpperCase()}</span>
    )
  )
}

export default StatusFormat