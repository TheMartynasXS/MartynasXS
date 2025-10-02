<script>
    import logo from "$lib/images/no_bg.png";
</script>

<div class="header">
    <nav>
        <a id="logo-link" href="/" class:active={location.pathname === "/"}
            ><img width="120px" height="120px" src={logo} alt="Logo" /></a
        >
        <div class="nav-links">
            <a href="/skindb" class:active={location.pathname === "/skindb"}
                >SkinDB</a
            >
        </div>
    </nav>
</div>

<style>
    nav {
        padding: 1rem;
        padding-inline-end: 10rem;
        font-size: 2rem;
        background: rgba(18, 18, 18, 0.4);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(13.1px);
        -webkit-backdrop-filter: blur(13.1px);
        border: 1px solid rgba(18, 18, 18, 0.4);
        position: relative;
        display: flex;
        align-items: center;
        /* remove underline */
    }
    #logo-link {
        position: absolute;
        left: 0px;
        top: 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .nav-links {
        margin-left: auto;
        display: flex;
        align-items: center;
    }
    nav a {
        text-decoration: none;
        font-weight: 400;
        margin-right: 2rem;
        position: relative;
    }
    .nav-links a:last-child {
        margin-right: 0;
    }
    a {
        color: #e2e2e2;
        filter: drop-shadow(0 0 0rem #7944de);
        transition-duration: 200ms;
    }
    a:hover {
        color: white;
        filter: drop-shadow(0 0 0.25rem #000) drop-shadow(0 0 0.25rem #7944de);
    }
    a.active {
        text-decoration: underline;
        text-underline-offset: 0.5rem;
    }
</style>
