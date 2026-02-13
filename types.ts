
export type ChoiceKey = 'A' | 'B';

export interface Slide {
  id: number;
  question: string;
  choiceA: string;
  choiceB: string;
  failChoice: ChoiceKey | null;
  memeSticker?: string;
}

export interface GameState {
  currentSlideIndex: number;
  isLocked: boolean;
  isPermanentlyLocked: boolean;
  attempts: number;
  isFinished: boolean;
  hasSeenLetter: boolean;
}
