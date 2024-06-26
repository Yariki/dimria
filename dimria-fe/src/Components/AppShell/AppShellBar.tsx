import paletteIcon from '@ui5/webcomponents-icons/dist/palette.js';
import {
    List,
    ListMode,
    ListPropTypes,
    ResponsivePopover,
    ResponsivePopoverDomRef,
    ShellBar,
    ShellBarItem,
    ShellBarItemPropTypes,
    StandardListItem
} from '@ui5/webcomponents-react';
import { useRef, useState } from 'react';
import './appshellbar.css';
import { getTheme, setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';

const THEMES = [
    { key: 'sap_horizon', value: 'Morning Horizon (Light)' },
    { key: 'sap_horizon_dark', value: 'Evening Horizon (Dark)' },
    { key: 'sap_horizon_hcb', value: 'Horizon High Contrast Black' },
    { key: 'sap_horizon_hcw', value: 'Horizon High Contrast White' }
];

export function AppShellBar() {
    const popoverRef = useRef<ResponsivePopoverDomRef | null>(null);
    const [currentTheme, setCurrentTheme] = useState(getTheme);

    const handleThemeSwitchItemClick: ShellBarItemPropTypes['onClick'] = (e) => {
        popoverRef.current?.showAt(e.detail.targetRef);
    };
    const handleThemeSwitch: ListPropTypes['onSelectionChange'] = (e) => {
        const { targetItem } = e.detail;
        setTheme(targetItem.dataset.key!);
        setCurrentTheme(targetItem.dataset.key!);
    };

    return (
        <>
            <ShellBar
                primaryTitle={'Adverts Monitoring'}
            >
                <ShellBarItem icon={paletteIcon} text="Change Theme" onClick={handleThemeSwitchItemClick} />
            </ShellBar>
            <ResponsivePopover ref={popoverRef} className="popover">
                <List onSelectionChange={handleThemeSwitch} headerText="Change Theme" mode={ListMode.SingleSelect}>
                    {THEMES.map((theme) => (
                        <StandardListItem key={theme.key} selected={currentTheme === theme.key} data-key={theme.key}>
                            {theme.value}
                        </StandardListItem>
                    ))}
                </List>
            </ResponsivePopover>
        </>
    );
}