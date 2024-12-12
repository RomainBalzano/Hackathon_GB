(async function scrapeMobbinUrls() {
    const SCROLL_PAUSE = 2000; // Pause entre les scrolls en ms (augmenté pour laisser plus de temps au chargement)
    const MAX_SCROLL_ITERATIONS = 50; // Nombre maximum de scrolls pour éviter les boucles infinies
    const allImageUrls = new Set(); // Stocker toutes les URLs trouvées

    // Fonction pour défiler jusqu'en bas de la page
    async function scrollToBottom() {
        let iterations = 0;
        let previousHeight = 0;

        while (iterations < MAX_SCROLL_ITERATIONS) {
            console.log(`Défilement ${iterations + 1}...`);
            window.scrollTo(0, document.body.scrollHeight);

            await new Promise(resolve => setTimeout(resolve, SCROLL_PAUSE));

            const currentHeight = document.body.scrollHeight;

            if (currentHeight === previousHeight) {
                console.log("Aucune nouvelle zone chargée après ce défilement.");
                break;
            }

            previousHeight = currentHeight;
            iterations++;
        }
    }

    // Fonction pour extraire les URLs d'images utiles
    function extractImageUrls() {
        const images = Array.from(document.querySelectorAll("img.object-cover"))
            .map(img => img.src)
            .filter(src => src && src.includes("bytescale.mobbin.com")); // Filtrer les images pertinentes

        console.log(`Images visibles actuellement : ${images.length}`);
        images.forEach(url => allImageUrls.add(url)); // Ajouter au Set pour éviter les doublons
        console.log(`Total d'images collectées jusqu'à présent : ${allImageUrls.size}`);
    }

    console.log("Début du scraping...");

    for (let i = 0; i < MAX_SCROLL_ITERATIONS; i++) {
        console.log(`Défilement ${i + 1}...`);
        window.scrollTo(0, document.body.scrollHeight);

        // Pause pour permettre le chargement des nouvelles images
        await new Promise(resolve => setTimeout(resolve, SCROLL_PAUSE));

        // Extraire les nouvelles URLs après chaque défilement
        extractImageUrls();

        const currentHeight = document.body.scrollHeight;

        // Si aucune nouvelle zone n'est chargée après plusieurs défilements, arrêter
        if (i > 0 && currentHeight === previousHeight) {
            console.log("Aucune nouvelle zone chargée. Arrêt du scraping.");
            break;
        }

        previousHeight = currentHeight;
    }

    console.log(`Total final d'URLs collectées : ${allImageUrls.size}`);

    if (allImageUrls.size === 0) {
        console.log("Aucune URL pertinente trouvée. Vérifiez les sélecteurs CSS ou les mécanismes de chargement dynamique.");
        return;
    }

    // Convertir les URLs en texte
    const urlsText = Array.from(allImageUrls).join("\n");

    // Créer un fichier texte avec les URLs
    const blob = new Blob([urlsText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mobbin_urls.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Les URLs ont été écrites dans un fichier texte.");
})();
