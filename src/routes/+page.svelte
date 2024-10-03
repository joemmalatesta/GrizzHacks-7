<script lang="ts">
  import About from '../components/About.svelte';
  import Landing from '../components/Landing.svelte';
	import Prizes from '../components/Prizes.svelte';
	import Schedule from '../components/Schedule.svelte';
	import Sponsors from '../components/Sponsors.svelte';
	import Team from '../components/Team.svelte';
</script>

<main>
	<Landing></Landing>
	<!-- ABOUT SECTION -->
	<About></About>
	<Prizes />
	<Sponsors />
	<Schedule />
	<Team />
</main>
