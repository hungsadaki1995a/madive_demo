import { ReactNode } from 'react';

export interface RouteItem {
  path: string;
  element?: ReactNode;
  menuName?: string;
  child?: RouteItem[];
  icon?: ReactNode;
  label?: string;
  id: string;
  fullPath?: string;
}
