<template>
    <div class="menu-sections">
        <section class="info">
            <div class="description">
                <h2 class="title">Nasze Menu</h2>
                <p class="text">Zobacz nasz zbiór domowych potraw, przyrządzonych z pozyskiwanych lokalnie składników</p>
                <RouterLink class="button" to="/menu">Przejdź</RouterLink>
            </div>
            <div class="img">   
                <img class="section-img" src="https://e-reklamowe.com/wp-content/uploads/2025/03/karta-menu-restauracja-ciemna-4.webp" alt="Menu">
            </div>
        </section>

        <section class="info reverse">
            <div class="description">
                <h2 class="title">Promocje</h2>
                <p class="text">Zobacz, jakie promocje są dostępne w naszym serwisie. Zobacz aktualne oferty zniżkowe i rabaty!</p>
                <RouterLink class="button" to="/promocje">Przejdź</RouterLink>
            </div>
            <div class="img">   
                <img class="section-img" src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80" alt="Promocje">
            </div>
        </section>

        <section class="info">
            <div class="description">
                <h2 class="title">Restauracje</h2>
                <p class="text">Sprawdź lokalizacje naszych restauracji, gdzie możesz zjeść przepyszne klasyczne dania</p>
                <RouterLink class="button" to="/restauracje">Przejdź</RouterLink>
            </div>
            <div class="img">   
                <img class="section-img" src="https://www.liveabout.com/thmb/nZ_-SHcGwyBimb50uGAT1IbpmrM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-697537897-58ac81cb5f9b58a3c93d58f5.jpg" alt="Restauracje">
            </div>
        </section>
    </div>
</template>

<style scoped>
    .menu-sections {
        max-width: 1400px;
        margin: 0 auto;
        padding: 1rem;
        font-family: times new roman, times, serif;
    }

    .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #3a2613;
        margin: 1.5rem;
    }

    .reverse {
        flex-direction: row-reverse;
    }

    .description {
        width: 40%;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.25rem;
    }

    .title {
        font-size: 2.5rem;
        color: #ffffff;
        font-weight: 900;
        margin: 0;
    }

    .text {
        font-size: 1.1rem;
        color: #ffc107;
    }

    .img {
        width: 55%;
        height: 400px;
    }

    .section-img {
        width: 100%;
        height: 100%;
    }

    .button {
        font-size: 1.1rem;
        font-weight: 700;
        background-color: #e30613;
        color: #ffffff;
        text-decoration: none;
        border-radius: 30px;
        padding: 0.8rem 2rem;
    }

    .button:hover {
        background-color: #b8050f;
    }

    @media (max-width: 768px) {
        .info, .reverse {
            flex-direction: column;
        }

        .description, .img {
            width: 100%;
        }

        .description {
            padding: 2rem 1.5rem;
            align-items: center;
            text-align: center;
        }

        .img {
            height: 250px;
            order: -1;
        }
    }
</style>