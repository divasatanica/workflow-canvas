import { ReactNode } from 'react';

export interface CommonProps {
  onDrop(x: number, y: number): void;
  title: string | ReactNode;
}
