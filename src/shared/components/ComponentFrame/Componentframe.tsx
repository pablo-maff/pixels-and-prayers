import type { ReactNode } from 'react';
import style from './ComponentFrame.module.scss';

interface ComponentFrameProps {
  title?: string;
  children: ReactNode;
}

export default function ComponentFrame({ title, children }: ComponentFrameProps) {
  return (
    <div>
      <h4 className={style.h4}>{title}</h4>
      <div className={style.componentFrame}>{children}</div>
    </div>
  );
}
