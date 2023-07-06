<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import {selectedTab, tabContent} from "../stores/tabStores"
	import { getStoredTab } from "../utils/localStorageServices";

    let total = 0

    onMount(()=>{
        retrieveTab()
    })

    const unsubscribeSelectedTab = selectedTab.subscribe(tabNumber => {
        // console.log(tabNumber)
        retrieveTab(tabNumber)
    })
    const unsubscribeContent = tabContent.subscribe(contentString => {
        // console.log(contentString)
    })

    onDestroy(()=>{
        unsubscribeSelectedTab()
        unsubscribeContent()
    })

    function retrieveTab(tabNumber?: number){
        const tab = getStoredTab(tabNumber || $selectedTab)
        if(!!tab){
            if(tab.content) tabContent.set(tab.content)
            else tabContent.set("")
        }
    }
    
</script>

<textarea 
    class="text-black"
    bind:value={$tabContent}
/>

<style lang="postcss">
    textarea {
        padding: 0.5rem;
        border: none;
        resize: none;
        height: 80vh;
        width: 100vw;
        font-size: 14px;
    }
</style>