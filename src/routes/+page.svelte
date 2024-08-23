<script lang="ts">
	import { fade } from "svelte/transition";

	export let form;

	let audio: any;
	let rotateDuck: boolean = false;
	let quacks: string[] = [];
	async function duckClicked() {
		rotateDuck = true;
		// Render a quack icon around the duck
		quacks = [...quacks, possibleQuacks[randomNumbers(0, possibleQuacks.length - 1)]];
		audio.play();
		await sleep(100);
		rotateDuck = false;
		await sleep(200);
		quacks = quacks.slice(1);
	}

	const possibleQuacks: string[] = [
		'absolute -translate-x-8 translate-y-10 text-sm',
		'absolute translate-x-48 translate-y-0 text-sm',
		'absolute translate-x-60 translate-y-10 text-sm',
		'absolute translate-x-60 translate-y-12 text-sm',
		'absolute translate-x-48 translate-y-6 text-sm',
		'absolute translate-x-0 translate-y-6 text-sm',
		'absolute translate-x-4 translate-y-12 text-sm',
		'absolute translate-x-10 translate-y-2 text-sm',
		'absolute translate-x-14 translate-y-0 text-sm',
		'absolute translate-x-24 -translate-y-2 text-sm'

	];

	// Sleep helper
	const sleep = (milliseconds: number) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	const randomNumbers = (min: number, max: number) => {
		return Math.round(Math.random() * (max - min)) + min;
	};
</script>

<main class="relative w-screen h-screen overflow-hidden flex justify-center items-center sm:items-start bg-[#f6f6e9]">
	<div class="flex flex-col sm:mt-40 items-center">
		<div class="relative">
			<h1
				class="inset-0 text-5xl md:text-7xl xl:text-[6.5rem] font-bold text-[#A89a64] lg:translate-y-1 translate-y-0.5 opacity-50"
			>
				GrizzHacks 7
			</h1>
			<h1 class="inset-0 absolute text-5xl md:text-7xl xl:text-[6.5rem] font-bold text-[#3281A8]">
				GrizzHacks 7
			</h1>
		</div>
		<form method="POST" class="w-full flex flex-col lg:flex-row text-lg lg:text-xl ring-2 ring-[#3281A8] rounded-md">
			<input
				placeholder="your email"
				type="email"
				name="email"
				id="email"
				class="px-2 p-1 lg:w-3/4 w-full rounded-t-md lg:rounded-l-md lg:rounded-tr-none focus:drop-shadow-md focus:outline-none font-recoleta"
			/>
			<button class="lg:w-1/4 w-full bg-[#3281A8] text-white lg:rounded-bl-none rounded-b-md lg:rounded-r-md p-1 lg:p-2 font-recoleta">Notify me</button
			>
		</form>
		<p class="font-recoleta opacity-60 my-1 font-medium">{form?.success ? "Success! you'll hear from us soon" :"Get notified when applications open"}</p>
	</div>

	<div class="w-full bottom-0 absolute">
		<div class="relative">
			<button on:click={duckClicked} class="absolute -top-7 left-36 cursor-pointer scale-75 -translate-y-24 -translate-x-20 lg:scale-100 sm:scale-90 sm:-translate-y-12 lg:-translate-y-7 xl:translate-y-5 2xl:scale-110 2xl:translate-y-12 2xl:translate-x-14">
				{#each quacks as quack}
					<p transition:fade={{duration: 50 }} class="{quack} font-recoleta">quack</p>
				{/each}
				<img
					src="duck.svg"
					class="cursor-pointer {rotateDuck ? '-rotate-6' : ''}"
					alt=""
				/>
			</button>
			<img src="water.svg" class="w-full scale-110 sm:translate-y-10 lg:translate-y-14 xl:translate-y-28 z-30" alt="" />
		</div>
	</div>
</main>

<audio src="/quack.mp3" bind:this={audio}></audio>
