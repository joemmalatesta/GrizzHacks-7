<script lang="ts">
	import { fade } from 'svelte/transition';

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

<div class="relative w-screen h-screen overflow-hidden flex justify-center bg-light">
	<div class="flex flex-col mt-40 items-center gap-4">
		<div class="relative">
			<h1
				class="inset-0 text-5xl md:text-7xl xl:text-8xl xl:text-[6.5rem] font-bold text-secondary lg:translate-y-1 translate-y-0.5 opacity-50"
			>
				GrizzHacks 7
			</h1>
			<h1 class="inset-0 absolute text-5xl md:text-7xl xl:text-8xl xl:text-[6.5rem] font-bold text-primary">
				GrizzHacks 7
			</h1>
		</div>
		<div class="flex gap-5 w-full items-center justify-center">
			<div class="flex gap-0.5 items-center">
				<img src="/calendar-blank.svg" alt="calendar" class="sm:w-8 w-7" />
				<p class="sm:text-xl text-lg">February 8-9th</p>
			</div>
			<div class="flex gap-0.5 items-center">
				<img src="/map-pin.svg" alt="map pin" class="sm:w-8 w-7" />
				<p class="sm:text-xl text-lg">Oakland University</p>
			</div>
		</div>
		<div class="flex gap-4 w-full items-center">
			<a
				href="https://somewhere.com"
				class="w-1/2 text-center bg-primary text-light rounded-md p-1 lg:p-2 font-recoleta text-xl font-medium"
				>Apply Today!</a
			>
			<a href="#about" class=" text-secondary">Learn more</a>
		</div>
	</div>

	<div class="w-full bottom-0 absolute">
		<div class="relative">
			<button
				on:click={duckClicked}
				class="absolute -top-28 left-32 sm:-top-8 sm:left-36 cursor-pointer scale-75 -translate-y-24 -translate-x-20 lg:scale-100 sm:scale-90 sm:-translate-y-12 lg:-translate-y-7 xl:translate-y-10 2xl:scale-110 2xl:translate-y-12 2xl:translate-x-14"
			>
				{#each quacks as quack}
					<p transition:fade={{ duration: 50 }} class="{quack} font-recoleta">quack</p>
				{/each}
				<img src="duck.svg" class="cursor-pointer {rotateDuck ? '-rotate-6' : ''}" alt="" />
			</button>
			<img
				src="water.svg"
				class="w-full scale-125 md:scale-110 sm:translate-y-10 lg:translate-y-14 xl:translate-y-28 z-30"
				alt=""
			/>
		</div>
		<flex class="justify-between md:mx-10 mx-2 absolute md:bottom-5 bottom-1 text-light">
			<div class="flex gap-2">
				<p class="md:text-lg font-recoleta">
					Need <a
						class="underline underline-offset-2 transition-all hover:underline-offset-4"
						href="mailto:grizzhacksou@gmail.com">help?</a
					>
				</p>
			</div>
			<p class=" text-light md:text-lg font-recoleta">
				Looking to <a
					class="underline underline-offset-2 transition-all hover:underline-offset-4"
					href="mailto:grizzhacksou@gmail.com">sponsor?</a
				>
			</p>
		</flex>
	</div>
</div>
