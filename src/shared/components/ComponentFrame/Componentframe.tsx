import type { ReactNode } from 'react';
import style from './ComponentFrame.module.scss';

interface ComponentFrameProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function ComponentFrame({ title, children, className = '' }: ComponentFrameProps) {
  return (
    <div className={className}>
      {!!title?<h4 className={style.h4}>{title}</h4>: null}
      <div className={style.componentFrame}>{children}</div>
    </div>
  );
}
