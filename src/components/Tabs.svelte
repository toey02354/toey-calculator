<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import { selectedTab, tabContent, tabStores } from "../stores/tabStores";
    import { getStoredTab, getStoredTabs } from "../utils/localStorageServices"
	import type { ITab } from "../types/tab";

    const {tabSubscribe, addTab, setTabs} = tabStores()

    let tabs: ITab[] = [];
    let currentTabId = 0
    let currentSelectedTab = 0

    const unsubscribeTab = tabSubscribe(value => {
        tabs = value || []
    })
    const unsubscribeSelectedTab = selectedTab.subscribe(value => {
        currentSelectedTab = value
    })

    onMount(() => {
        const stored = getStoredTabs()
        if(!!stored && stored.length > 0){
            setTabs(stored)
            currentTabId = stored[stored.length - 1].id
        }
    })
    onDestroy(() => {
        unsubscribeTab()
        unsubscribeSelectedTab()
    })

    function addNewTab(){
        currentTabId++
        const newTab: ITab = {
            id: currentTabId,
            name: `Tab${currentTabId}`,
            isSelected: false,
            content: ""
        }
        addTab(newTab)
    }

    function selectTab(tabNumber: number){
        selectedTab.set(tabNumber)
        // const tab = getStoredTab(tabNumber)
        // if(!!tab) {
        //     console.log(tab)
        //     tabContent.set(tab.content)
        // }
    }
</script>

<div class="tab-container">
    {#each tabs as tab (tab.id)}
    <button 
        class={currentSelectedTab===tab.id?"variant-filled-primary":"variant-filled-secondary"}
        on:click={()=>selectTab(tab.id)}
    >
        {tab.name}
    </button>
    {/each}
    <button on:click={addNewTab}>+</button>
</div>

<style lang="postcss">
.tab-content-selected{
    background: theme(colors.primary.500);
    color: theme(colors.white);
    border: none;
}
</style>