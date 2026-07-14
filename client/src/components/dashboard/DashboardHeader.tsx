interface Props {
    name: string;
    email: string;
}

const DashboardHeader = ({ name, email }: Props) => {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {name[0]}
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-semibold">{name}</p>
                            <p className="text-xs text-gray-500">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader