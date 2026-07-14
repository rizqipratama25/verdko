import { X } from "lucide-react"
import type { Dispatch, ReactNode, SetStateAction } from "react"

interface Props {
    modalTitle: string;
    children?: ReactNode;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setShowModal, modalTitle, children }: Props) => {
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-secondary">{modalTitle}</h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="p-2 rounded text-secondary hover:text-secondary/50 cursor-pointer"
                    >
                        <X />
                    </button>
                </div>
                    {children}
            </div>
        </div>
    )
}

export default Modal