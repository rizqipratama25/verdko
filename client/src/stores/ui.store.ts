import { create } from "zustand"

interface UIState {
    loginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

export const useLoginModalOpen = create<UIState>((set) => ({
    loginModalOpen: false,
    openLoginModal: () => set(() => ({loginModalOpen: true})),
    closeLoginModal: () => set(() => ({loginModalOpen: false}))
}))