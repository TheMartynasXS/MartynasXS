<script>
    import logo from "$lib/images/no_bg.png";
    import Navbar from "$lib/components/Navbar.svelte";

    import runeforge from "$lib/images/runeforge.png";
</script>

<Navbar />

<div class="container">
    <section>
        <h2>
            Web Developer
            <a href="https://runeforge.dev"
                ><span class="accent">@Runeforge.dev</span></a
            >
        </h2>
        <div class="split">
            <p>
                Runeforge.dev is a publishing platform for custom League of
                Legends content, including modifications of characters,
                environments and user interfaces.
            </p>

            <img width="100%" src={runeforge} alt="Runeforge Interface" />
        </div>
    </section>
    <section>
        <h2>
            Developer
            <a href="https://github.com/LeagueToolkit/"
                ><span class="accent">@LeagueToolkit</span></a
            >
        </h2>
        <p>
            LeagueToolkit is an open-source library that provides a
            comprehensive set of tools and utilities for developers working with
            the League of Legends ecosystem. It offers a wide range of features,
            including API wrappers, data models, and helper functions, making it
            easier to interact with Riot Games' APIs and build applications
            related to League of Legends.
        </p>
    </section>
</div>

<style>
    .container {
        gap: 2rem;
        padding: 5rem;
        display: flex;
        flex-direction: column;
        max-width: 80%;
        margin: auto;
    }
    .container section {
        padding: 3rem;
        background: rgba(18, 18, 18, 0.4);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(13.1px);
        -webkit-backdrop-filter: blur(13.1px);
        border: 1px solid rgba(18, 18, 18, 0.4);
        border-radius: 1rem;
    }
    .accent {
        font-family: consolas, monospace;
        color: #7944de;
        font-weight: 600;
    }
    a {
        text-decoration: none;
    }
    h2 {
        font-size: 3rem;
    }
    p {
        font-size: 1.5rem;
        line-height: 1.6;
        color: #e2e2e2;
        /* limit character width */
        max-width: 80ch;
    }
    .split {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;
        justify-content: center;
    }
</style>
