import { writable } from "svelte/store";
import type { ITab } from "../types/tab";
import { saveStoredTabs } from "../utils/localStorageServices";

export const selectedTab = writable(1)
export const tabContent = writable("")

export function tabStores() {
    const { subscribe, set, update, } = writable<ITab[]>()

    function addTab(newTab: ITab) {
        update(value => {
            let updatedValue: ITab[] = !value ? [newTab] : value.concat(newTab)
            saveStoredTabs(updatedValue)
            selectedTab.set(newTab.id)
            tabContent.set(newTab.content)
            return updatedValue
        })
    }

    function removeTab(tabId: number) {
        update(value => {
            const updateValue = value.filter(t => t.id !== tabId)
            saveStoredTabs(updateValue)
            return updateValue
        })
    }

    function setTabs(tabs: ITab[]) {
        set(tabs)
        saveStoredTabs(tabs)
    }

    function removeAllTab() {
        set([])
        saveStoredTabs([])
    }

    return {
        tabSubscribe: subscribe,
        addTab,
        removeTab,
        removeAllTab,
        setTabs
    }
}
