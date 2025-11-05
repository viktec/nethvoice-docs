---
title: Google Sintesi Vocale e Riconoscimento Vocale
sidebar_position: 6
---

# Google Text-To-Speech e Speech-To-Text

L'integrazione *Google TTS/STT* ti consente di sfruttare i servizi di sintesi vocale e riconoscimento vocale avanzati di Google all'interno di NethVoice. Questi servizi possono essere utilizzati per creare annunci vocali dinamici e abilitare scenari di riconoscimento vocale personalizzati.

## Configurazione e Autenticazione {#setup-authentication}

### Ottenimento delle Credenziali dell'API Google

Per utilizzare i servizi TTS e STT di Google, devi ottenere le credenziali di autenticazione dalla piattaforma Google Developer:

1. Visita la [Google Developer Console](https://console.developers.google.com/)
2. Crea o seleziona un progetto esistente
3. Abilita le API richieste:
   - Google Cloud Text-to-Speech API
   - Google Cloud Speech-to-Text API
4. Crea un account di servizio e genera un file di chiave JSON
5. Scarica il file delle credenziali JSON sul tuo computer locale

Per istruzioni dettagliate su come ottenere le tue credenziali, far riferimento ai link all'interno della pagina.

### Caricamento delle Credenziali in NethVoice

Per abilitare i servizi Google in NethVoice:

1. Vai a `Applicazioni > Servizi cloud`
2. Fai clic sul bottone **Upload**
3. Seleziona il file JSON delle credenziali scaricato dalla piattaforma Google Developer
4. Le credenziali verranno archiviate in modo sicuro in NethVoice

Una volta caricate le credenziali, entrambe le funzioni TTS e STT diventano disponibili.

## Google Text-To-Speech (TTS) {#google-tts}

### Panoramica

Google TTS ti consente di generare registrazioni vocali di alta qualità dal testo. Questo è particolarmente utile per creare annunci vocali professionali, prompt IVR e registrazioni di code di chiamata senza richiedere una registrazione vocale manuale.

### Utilizzo del TTS in VisualPlan

Puoi utilizzare Google TTS ovunque in NethVoice sia possibile aggiungere una registrazione:

- **Annunci**: Crea annunci vocali per le chiamate
- **IVR (Interactive Voice Response)**: Costruisci menu vocali con prompt dinamici
- **CQR (Call Queue Recordings)**: Genera messaggi professionali della coda

#### Creazione di una Registrazione TTS

1. Vai al dialog di aggiunta della registrazione nella funzione desiderata (Annunci, IVR, CQR)
2. Se le credenziali non sono state ancora caricate, avrai la possibilità di caricare la tua chiave API di Google nel dialog
3. Se le credenziali sono già configurate, appariranno due menu a discesa:
   - **Lingua**: Seleziona la lingua per la voce
   - **Voce**: Seleziona la variante di voce specifica
4. Inserisci il testo del tuo messaggio nel campo di testo fornito
5. Fai clic sul bottone **Riproduci** (icona dell'altoparlante) per anteprima la voce generata
6. Dopo aver confermato che la registrazione suona come desiderato:
   - Inserisci un **Nome** per la registrazione
   - Inserisci una **Descrizione**
   - Fai clic su **Salva** per archiviarla come registrazione di sistema

La registrazione può ora essere utilizzata in tutto NethVoice ovunque le registrazioni siano supportate.

## Google Speech-To-Text (STT) {#google-stt}

### Panoramica

Google STT fornisce capacità di riconoscimento vocale avanzate per implementazioni e integrazioni NethVoice personalizzate.

### Implementazione Personalizzata

STT è principalmente utilizzato tramite implementazioni API personalizzate e integrazioni. Per casi d'uso specifici e guida all'integrazione, si prega di contattare il supporto Nethesis aprendo un ticket tramite l'[helpdesk](https://helpdesk.nethesis.it/).

**Risorse di Supporto:**
- Apri un ticket di supporto per la guida all'implementazione STT personalizzata
- Discuti il tuo caso d'uso specifico e i tuoi requisiti con il team di supporto
- Ricevi raccomandazioni di esperti per il tuo scenario particolare

## Considerazioni sui Costi

Entrambi i servizi Google TTS e STT sono soggetti ai prezzi di Google Cloud. I costi di utilizzo dipendono da:

- Numero di caratteri elaborati (TTS)
- Durata dell'audio elaborato (STT)
- Frequenza di chiamate API

Consulta la pagina [Prezzi di Google Cloud](https://cloud.google.com/pricing) per i tassi attuali e i limiti di utilizzo.
