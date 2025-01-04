import { create } from "zustand";

interface CommentStore {
    comment : string;
    setComment: (comment: string) => void;
};

const useCommentStore = create<CommentStore>(set => ({
    comment: '',
    setComment: (comment) => set(state => ({ ...state, comment })),
}));

export default useCommentStore;