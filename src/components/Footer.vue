<template>
    <footer class="lower-nav">
        <div class="lower-nav-section lower-nav-brand-sec">
            <div class="lower-nav-brand-name">MANTICORE</div>
            <div class="lower-nav-copyright">&copy; 2025 Manticore S.A.</div>
        </div>

        <div class="lower-nav-section lower-nav-contact">
            <div class="lower-nav-heading">Chcesz się z nami skontaktować?</div>
            <div class="lower-nav-contact-item">
                <span class="label">Telefon:</span>
                <a href="tel:+123456879" class="contact-link">+123 456 879</a>
            </div>
            <div class="lower-nav-contact-item">
                <span class="label">E-mail:</span>
                <a href="mailto:manticore@biznes.pl" class="contact-link">manticore@biznes.pl</a>
            </div>
        </div>

        <div class="lower-nav-section lower-nav-links">
            <div class="lower-nav-heading">Zaobserwuj nas</div>
            <div class="social-links-grid">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" class="social-link fb">Facebook</a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="social-link ig">Instagram</a>
                <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" class="social-link x">X</a>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    .lower-nav {
        background-color: #3a2613;
        color: #ffffff;
        border-top: 4px solid #e30613;
        display: flex;
        width: 100%;
        padding: 1rem 180px;
        font-family: 'Times New Roman', Times, serif;
    }

    .lower-nav-section {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        flex: 1;
    }

    .lower-nav-heading {
        font-size: 1.5rem;
        letter-spacing: 1px;
        color: #ffc107;
        margin-bottom: 0.5rem;
    }

    .lower-nav-brand-sec {
        align-items: flex-start;
    }

    .lower-nav-brand-name {
        font-size: 2.5rem;
        font-weight: 900;
        letter-spacing: 3px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.4);
        color: #ffc107;
        line-height: 1;
    }

    .lower-nav-copyright {
        font-size: 0.9rem;
        color: #b3a293;
        display: block;
        margin-top: 0.5rem;
    }

    .lower-nav-contact {
        align-items: center;
        text-align: center;
    }

    .lower-nav-contact-item {
        font-size: 1rem;
    }

    .lower-nav-contact-item .label {
        color: #b3a293;
        margin-right: 0.5rem;
    }

    .contact-link {
        color: #ffffff;
        text-decoration: none;
    }

    .contact-link:hover {
        color: #ffc107;
    }

    .lower-nav-links {
        align-items: flex-end;
    }

    .social-links-grid {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .social-link {
        color: #ffffff;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        border-bottom: 1px solid transparent;
        text-align: center;
    }


    .social-link:hover {
        color: #ffc107;
        border-bottom: 1px solid #ffc107;
    }

    @media (max-width: 768px) {
        .lower-nav {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.5rem;
            padding: 1.5rem 1.5rem;
        }

        .lower-nav-section, 
        .lower-nav-brand-sec, 
        .lower-nav-links {
            align-items: center;
            text-align: center;
            width: 100%;
        }

        .social-link:hover {
            padding-left: 0;
        }
    }
</style>