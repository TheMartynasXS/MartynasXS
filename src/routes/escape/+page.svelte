<script>
	import { onMount } from 'svelte';
	import Item from 'comps/Item.svelte';

	let yourItems = [];

	let Claimed = [0, 0, 0, 0];

	let roomItems = [
		{
			Name: 'CPU',
			Desc: 'Compute processing unit - the brain of the computer and performs most of the calculations and processing tasks.\n\nIt handles tasks such as data preprocessing, model training, and inference.',
			Color: '#ff595e'
		},
		{
			Name: 'GPU',
			Desc: 'Graphics processing unit - it excels at parallel processing, making it well-suited for AI workloads that involve large-scale computations.',
			Color: '#ffca3a'
		},
		{
			Name: 'SSD',
			Desc: 'Solid state drive - for AI applications that require quick access to data, SSDs or NVMe drives are preferred over HDDs due to their faster read and write speeds.',
			Color: '#8ac926'
		},
		{
			Name: 'RAM',
			Desc: 'Random access memory - Sufficient RAM is crucial for running AI workloads smoothly, as it allows for faster data retrieval and processing.',
			Color: '#1982c4'
		},
		{
			Name: 'Motherboard',
			Desc: 'The main circuit board of a computer - acts as the backbone of the system, providing connectivity and power to all the components.',
			Color: '#6a4c93'
		}
	];
	if (localStorage.getItem('firstVisit') === null) {
		localStorage.setItem('firstVisit', Date.now());
		alert(
			'Welcome to the Escape Room!\n\nYou have to collect all computer parts to open the door.\n\nClick on the parts to learn more about them.\n\nGood luck!'
		);
	}
	// yourItems.push(roomItems.pop());
	onMount(() => {
		document.title = 'Escape Room';
	});
	$: count = yourItems.length;
</script>

<div class="landscape">
	<div class="left">
		<div>INVENTORY</div>
		{#each yourItems as item}
			<Item
				Name={item.Name}
				Desc={item.Desc + `\n\nYou have ${count}/5 parts`}
				Color={item.Color}
			/>
		{/each}
		{#each roomItems as item}
			<div class="empty" />
		{/each}
	</div>
	<div class="right">
		<div class="room" />
		<button
			class="couch hover"
			on:click={() => {
				if (Claimed[4] == 1) {
					return 0;
				}
				let answer = prompt(
					'Hidden cd\n\nWhat is an alternative name for artificial intelligence?'
				).toLowerCase();
				switch (answer) {
					case 'machine learning':
					case 'deep learning':
						let reward = roomItems.pop();
						alert(`Correct! You receive a ${reward.Name}!`);
						yourItems.push(reward);
						yourItems = yourItems;
						roomItems = roomItems;
						Claimed[4] = 1;
						break;
					default:
						alert('Wrong answer!');
				}
			}}
		/>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="door hover"
			on:click={() => {
				if (yourItems.length == 5) {
					if (localStorage.getItem('firstTime') === null) {
						localStorage.setItem('firstTime', localStorage.getItem('firstVisit') - Date.now());
					}
					alert(`You win! \n 
					You took ${Math.abs(localStorage.getItem('firstTime')) / 1000} seconds to escape the room.`);
				} else {
					alert(
						`To open the door you need to collect all computer parts
						\n\nYou have ${yourItems.length}/5 parts`
					);
				}
			}}
		>
			<div class="doorhandle" />
		</div>
		<button
			class="server hover"
			on:click={() => {
				if (Claimed[0] == 1) {
					return 0;
				}
				let answer = prompt(
					'Super Computer Rack\n\nWhich British mathematician is often credited as being the key founder of AI? (surname only)'
				).toLowerCase();
				switch (answer) {
					case 'turing':
						let reward = roomItems.pop();
						alert(`Correct! You receive a ${reward.Name}!`);
						yourItems.push(reward);
						yourItems = yourItems;
						roomItems = roomItems;
						Claimed[0] = 1;
						break;
					default:
						alert('Wrong answer!');
				}
			}}
		/>
		<div class="table">
			<div class="chair" />
			<button
				class="computer hover"
				on:click={() => {
					if (Claimed[1] == 1) {
						return 0;
					}
					let answer = prompt(
						'Desktop Computer\n\nWhich company developed the widely used deep learning framework called TensorFlow?'
					).toLowerCase();
					switch (answer) {
						case 'google':
							let reward = roomItems.pop();
							alert(`Correct! You receive a ${reward.Name}!`);
							yourItems.push(reward);
							yourItems = yourItems;
							roomItems = roomItems;
							Claimed[1] = 1;
							break;
						default:
							alert('Wrong answer!');
					}
				}}
			/>
			<div class="keyboard" />
		</div>

		<button
			class="tablet"
			on:click={() => {
				if (Claimed[2] == 1) {
					return 0;
				}
				let answer = prompt(
					'Tablet Computer\n\n Which movie explores the concept of a future where humans live alongside highly advanced humanoid robots called "replicants"?'
				).toLowerCase();
				switch (answer) {
					case 'blade runner':
						let reward = roomItems.pop();
						alert(`Correct! You receive a ${reward.Name}!`);
						yourItems.push(reward);
						yourItems = yourItems;
						roomItems = roomItems;
						Claimed[2] = 1;
						break;
					default:
						alert('Wrong answer!');
				}
			}}
		/>
		<button
			class="television hover"
			on:click={() => {
				if (Claimed[3] == 1) {
					return 0;
				}
				let answer = prompt(
					'Talevision\n\n Which project by OpenAI demonstrated remarkable language generation capabilities?'
				).toLowerCase();
				switch (answer) {
					case 'gpt':
					case 'gpt-3':
					case 'gpt3':
					case 'chatgpt':
						let reward = roomItems.pop();
						alert(`Correct! You receive a ${reward.Name}!`);
						yourItems.push(reward);
						yourItems = yourItems;
						roomItems = roomItems;
						Claimed[3] = 1;
						break;
					default:
						alert('Wrong answer!');
				}
			}}
		/>
	</div>
</div>

<style>
	.couch {
		position: absolute;
		top: 40dvh;
		z-index: 2;
		left: 35dvh;
		height: 20dvh;
		width: 40dvh;
		border-top: 5dvh solid #31241d;
		border-left: 5dvh solid #31241d;
		border-right: 5dvh solid #31241d;
		border-radius: 5dvh 5dvh 0 0;
		background-color: #513b2f;
		box-sizing: border-box;
	}
	.television {
		position: absolute;
		bottom: 0dvh;
		left: 30dvh;
		height: 8dvh;
		width: 60dvh;
		background-color: gray;
		border-top: 1dvh solid black;
		border-radius: 1dvh;
	}
	.tablet:hover,
	.tablet:focus-within,
	.tablet:active {
		background-image: url('./ipad.png');
	}
	.tablet {
		position: absolute;
		bottom: 10dvh;
		right: 10dvh;
		height: 12dvh;
		width: 10dvh;
		transform: rotate(80deg);
		border-radius: 2dvh;
		background: black;
		transition: all 0.1s ease-in-out;
		background-size: cover;
		border: gray 1dvh inset;
		box-sizing: border-box;
	}
	.keyboard {
		position: absolute;
		bottom: 1dvh;
		left: 10dvh;
		height: 4dvh;
		width: 12dvh;
		background-color: gray;
		border-top: darkgray 1dvh solid;
		box-sizing: border-box;
		border-radius: 1dvh;
	}
	.computer {
		position: absolute;
		top: 2vh;
		right: 10dvh;
		height: 6dvh;
		width: 10dvh;
		border-bottom: #1f2137 1.5dvh solid;
		border-left: rgb(80, 42, 42) 1dvh solid;
		border-right: rgb(80, 42, 42) 1dvh solid;
		background-color: gray;
		box-sizing: border-box;
		transform: rotate(16deg);
		transition: all 0.1s ease-in-out;
		z-index: 1;
	}
	.chair {
		position: absolute;
		bottom: -16dvh;
		transform: rotate(4deg);
		left: 12dvh;
		height: 2dvh;
		width: 10dvh;
		background-color: rgb(80, 42, 42);
		box-sizing: border-box;
		transition: all 0.1s ease-in-out;
		z-index: 1;
	}
	.chair::before {
		content: '';
		position: absolute;
		bottom: 0dvh;
		transform: rotateY(180deg);
		left: 0;
		z-index: -2;
		height: 10dvh;
		width: 10dvh;
		border-left: rgb(80, 42, 42) 2dvh solid;
		border-right: rgb(80, 42, 42) 2dvh solid;
		box-sizing: border-box;
		transition: all 0.1s ease-in-out;
	}
	.chair:hover {
		height: 10dvh;
	}
	.chair:hover::before {
		height: 0;
	}

	.table {
		position: absolute;
		top: 6dvh;
		height: 15dvh;
		width: 40dvh;
		left: 40dvh;
		transform: rotate(4deg);
		background-color: rgb(80, 42, 42);
		box-sizing: border-box;
	}
	.server {
		position: absolute;
		top: 20dvh;
		height: 40dvh;
		width: 20dvh;
		background-color: #2b2d42;
		border-bottom: 5dvh inset #1f2137;
		border-top: 5dvh solid #333652;
		border-right: 5dvh inset #222441;
		box-sizing: border-box;
	}
	.empty {
		background-color: var(--bg-200);
		width: 50%;
		aspect-ratio: 1;
		border-radius: 1000rem;
	}
	.landscape {
		position: relative;
		height: 100%;
		display: grid;
		grid-template-columns: 9rem 7fr;
	}
	.left {
		overflow: hidden;
		display: grid;
		place-items: center;
		grid-template-rows: 0.5fr repeat(5, 1fr);
		padding: 1rem;
	}
	.left > div {
		color: white;
	}
	.right {
		overflow: hidden;
		position: relative;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(10, 1fr);
		box-sizing: border-box;
	}
	.room {
		position: absolute;
		z-index: -1;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		border-right: 5dvh inset #513b2f;
		border-top: 5dvh inset #5e4333;
		border-left: 5dvh inset #7c5744;
		border-bottom: 5dvh inset #5e4333;
		background-color: rgb(118, 85, 61);
	}
	.room::after {
		position: absolute;
		content: '';
		height: auto;
		width: auto;
		inset: 20dvh;
		background-color: olivedrab;
		border: solid 5dvh green;
		transform: rotate(-4deg);
		filter: saturate(0.5);
	}
	.door {
		position: absolute;
		right: 0px;
		top: 10dvh;
		height: 25dvh;
		width: 5dvh;
		background-color: rgb(175, 155, 131);
	}
	.doorhandle {
		position: absolute;
		bottom: 1rem;
		left: -1rem;
		height: 1rem;
		width: 1rem;
		background-color: gray;
	}
</style>
