export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('../public/manifest.webmanifest')
                .then(reg => {
                    console.log('SW registered: ', reg);
                })
                .catch(err => {
                    console.log('SW registration failed: ', err);
                });
        });
    }
}
