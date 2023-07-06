import type { ITab } from "../types/tab";

export function saveStoredTabs(value: ITab[]) {
    localStorage.storedTabs = JSON.stringify(value)
}

export function getStoredTabs(): ITab[] {
    const stored = localStorage.storedTabs
    if(!stored) return []
    return stored.length === 0 ? [] : JSON.parse(stored)
}

export function getStoredTab(tabId: number): ITab | null{
    const stored = getStoredTabs()
    if (stored.length === 0)
        return null
    const tab = stored.find(s => s.id === tabId)
    if (!!tab)
        return tab
    return null
}