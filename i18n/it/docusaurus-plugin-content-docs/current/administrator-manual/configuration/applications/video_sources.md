---
title: Sorgenti video
sidebar_position: 4
---

# Sorgenti video

La sezione *Sorgenti video* consente di configurare e gestire telecamere IP e sorgenti video per l'integrazione con NethVoice. Cliccando sul bottone **Crea nuova sorgente** è possibile compilare un form per la creazione di una nuova sorgente video.
Gli utenti che accedono a CTI con le autorizzazioni appropriate possono visualizzare i flussi video da queste sorgenti direttamente nell'interfaccia CTI, possono anche attivare azioni come l'apertura di cancelli o porte collegati alla sorgente video utilizzando i toni DTMF.

## Creazione di una Sorgente Video {#creating-video-source}

Fai clic sul bottone **Crea nuova sorgente** per accedere al form di configurazione. Compila i seguenti campi:

- **Nome**: Specifica il nome della sorgente video.
Specificare il nome da dare alla sorgente video. Questo nome verrà utilizzato per identificare la sorgente video all'interno di NethVoice.
- **Extension**: Specifica l'interno associato alla sorgente video. Questo interno deve essere stato precedentemente creato nella sezione "Utenti".
- **URL**: Specifica l'URL di collegamento per recuperare i frame video. Deve essere l'URL diretto al flusso video o alla sorgente di immagini.
- **Codice d'apertura**: Inserire il tono DTMF per un codice d'apertura opzionale. Questo è utile quando la telecamera è collegata a un cancello o una porta che richiede un codice di apertura.
- **Profilo**: Specifica il profilo da assegnare alla sorgente video. Questo filtra il tipo di utente che ha accesso alla sorgente video in base al profilo assegnato.


#### Connessione {#connection}

Premere il bottone **Verifica** per verificare che l'URL inserito sia corretto. Questo effettuerà:

- Test della connessione all'URL
- Recupero e visualizzazione del frame video dalla sorgente
- Conferma che la sorgente video è accessibile e funzionante correttamente

## Salvataggio della Sorgente Video

Una volta completata la compilazione di tutti i campi obbligatori, premere il bottone **Salva** per salvare la configurazione e creare la nuova sorgente video. La sorgente video sarà quindi disponibile per l'uso all'interno di CTI.