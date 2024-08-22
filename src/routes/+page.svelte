<script lang="ts">
	import { fade } from "svelte/transition";

	let audio: any;
	let rotateDuck: boolean = false;
	let quacks: string[] = [];
	async function duckClicked() {
		rotateDuck = true;
		quacks = [...quacks, possibleQuacks[randomNumbers(0, possibleQuacks.length - 1)]];
		console.log(quacks);
		// Render a quack icon around the duck
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

<main class="relative w-screen h-screen overflow-hidden flex justify-center bg-[#f6f6e9]">
	<div class="flex flex-col my-12 items-center">
		<div class="relative">
			<h1
				class="inset-0 text-5xl xl:text-[6.5rem] font-bold text-[#A89a64] translate-y-1 opacity-50"
			>
				GrizzHacks 7
			</h1>
			<h1 class="inset-0 absolute text-5xl xl:text-[6.5rem] font-bold text-[#3281A8]">
				GrizzHacks 7
			</h1>
		</div>
		<form action="" method="POST" class="w-full flex text-xl ring-2 ring-[#3281A8] rounded-md">
			<input
				placeholder="your email"
				type="email"
				name="email"
				id="email"
				class="px-2 w-3/4 rounded-l-md focus:drop-shadow-md focus:outline-none font-recoleta"
			/>
			<button class="w-1/4 bg-[#3281A8] text-white rounded-r-md p-2 font-recoleta">Notify me</button
			>
		</form>
		<p class="font-recoleta opacity-60 my-1">Get notified when applications open</p>
	</div>

	<div class="w-full bottom-0 absolute">
		<div class="relative">
			<button on:click={duckClicked} class="absolute -top-7 left-36 cursor-pointer">
				{#each quacks as quack}
					<p transition:fade={{duration: 50 }} class="{quack} font-recoleta">quack</p>
				{/each}
				<img
					src="duck.svg"
					class=" translate-y-8 cursor-pointer {rotateDuck ? '-rotate-6' : ''}"
					alt=""
				/>

				<!-- Show quack icons here -->
			</button>
			<img src="water.svg" class="w-full scale-110 translate-y-28 z-30" alt="" />
		</div>
	</div>
</main>

<audio src="/quack.mp3" bind:this={audio}></audio>
