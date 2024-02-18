
import '@ui5/webcomponents-react/dist/Assets.js';
import { AppShellBar } from './AppShellBar';
import { ReactNode } from 'react';
import './appshell.css';

interface AppShellProps {
    children?: ReactNode | ReactNode[];
}

export function AppShell({ children }: AppShellProps) {
    return (
        <>
            <AppShellBar />
            <div className="appScrollContainer">{children}</div>
        </>
    );
}