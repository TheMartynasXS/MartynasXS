<script>
	import { onMount } from 'svelte';
	import Item from 'comps/Item.svelte';

	let yourItems = [];
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
			on:click={() => {
				let answer = prompt('Cheat code: ');
				switch (answer) {
					case 'reset':
						localStorage.removeItem('firstVisit');
						localStorage.removeItem('firstTime');
						document.location.reload();
						break;
					case 'bypass':
						yourItems = yourItems.concat(roomItems);
						roomItems = [];
						yourItems = yourItems;
						roomItems = roomItems;
				}
			}}
		>
			paper
		</button>
	</div>
</div>

<style>
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
		border-right: 5vh inset #513b2f;
		border-top: 5vh inset #5e4333;
		border-left: 5vh inset #7c5744;
		border-bottom: 5vh inset #5e4333;
		background-color: rgb(118, 85, 61);
	}
	.door {
		position: absolute;
		right: 0px;
		top: 10vh;
		height: 25vh;
		width: 5vh;
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
