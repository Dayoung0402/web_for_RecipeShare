import { create } from 'zustand';

interface BoardStore {
    title: string;
    content: string;
    boardImageFileList: File[];
    price: number;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    setPrice: (price: number) => void;
    resetBoard: () => void;
};

const useBoardStore = create<BoardStore>(set => ({
    title: '',
    content: '',
    boardImageFileList: [],
    price: 0,
    setTitle: (title) => set(state => ({ ...state, title })),
    setContent: (content) => set(state => ({ ...state, content })),
    setBoardImageFileList: (boardImageFileList) => set(state => ({ ...state, boardImageFileList })),
    setPrice: (price) => set((state) => ({ ...state, price })),
    resetBoard: () => set(state => ({ ...state, title: '', content: '', price:0, boardImageFileList: []})),
}));

export default useBoardStore;