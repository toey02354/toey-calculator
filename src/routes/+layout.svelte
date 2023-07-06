<script>
    import "../styles/app.pcss"
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';

    // themes https://www.skeleton.dev/docs/get-started
    // import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
    // import '@skeletonlabs/skeleton/themes/theme-crimson.css';

    import { AppShell } from '@skeletonlabs/skeleton';
	import Tabs from "../components/Tabs.svelte";
	import Total from "../components/Total.svelte";
</script>

<svelte:head>
    <title>Toey Calculator</title>
</svelte:head>

<!-- <slot/> -->


<AppShell>
	<svelte:fragment slot="header"><Tabs/></svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter"><Total/></svelte:fragment>
</AppShell>