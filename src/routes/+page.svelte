<script lang="ts">
  import About from '../components/About.svelte';

  import Landing from '../components/Landing.svelte';
	export let form

</script>

<main>
	<Landing {form}></Landing>
	<!-- ABOUT SECTION -->
	<About></About>
</main>
