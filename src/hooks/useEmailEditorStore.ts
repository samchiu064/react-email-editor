import { create } from 'zustand';

interface Block {
  type: string;
  content?: string;
  src?: string;
  text?: string;
  href?: string;
}

interface EmailEditorStore {
  blocks: Block[];
  selectedBlockIndex: number | null;
  addBlock: (block: Block) => void;
  selectBlock: (index: number) => void;
  updateBlockContent: (name: string, value: string) => void;
  removeBlock: (index: number) => void;
}

export const useEmailEditorStore = create<EmailEditorStore>((set) => ({
  blocks: [],
  selectedBlockIndex: null,
  addBlock: (block: Block) =>
    set((state) => ({ blocks: [...state.blocks, block] })),
  selectBlock: (index: number) => set({ selectedBlockIndex: index }),
  updateBlockContent: (name, value) =>
    set((state) => {
      if (state.selectedBlockIndex === null) return state;
      const updatedBlocks = [...state.blocks];
      const block = {
        ...updatedBlocks[state.selectedBlockIndex],
        [name]: value,
      };
      updatedBlocks[state.selectedBlockIndex] = block;
      return { blocks: updatedBlocks };
    }),
  removeBlock: (index: number) => {
    set((state) => ({
      blocks: state.blocks.filter((_, i) => i !== index),
      selectedBlockIndex: null,
    }));
  },
}));
