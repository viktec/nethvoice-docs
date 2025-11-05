---
title: Installazione di NethVoice
sidebar_position: 4
---

# Installazione di NethVoice

NethVoice è un'applicazione VoIP che richiede un'installazione specifica su NethServer. Questa guida ti accompagnerà nel processo di installazione.

:::tip
Se desideri un'installazione di NethVoice pronta all'uso, prendi in considerazione il nostro servizio **[NethVoice SaaS](saas.md#nethvoice-as-a-service)**, che fornisce un'istanza NethVoice completamente gestita nel cloud.
:::

## Panoramica

NethVoice è installato in due passaggi:

1. **NethVoice Proxy** (richiesto per primo)
2. **Modulo/i NethVoice**

NethVoice Proxy è un componente obbligatorio che deve essere installato e configurato **prima** di distribuire istanze di NethVoice. Ciò si applica anche se stai installando solo una singola istanza di NethVoice.

:::warning Ordine di installazione
**NethVoice Proxy deve essere installato PER PRIMO, prima di NethVoice.**

Il proxy gestisce tutto l'accesso a Internet esterno e gestisce l'instradamento del traffico SIP/RTP. È richiesto per:
- Accesso esterno da Internet
- Delega del traffico a più installazioni di NethVoice sullo stesso nodo
- Gestione dei collegamenti SIP e RTP per tutte le istanze di NethVoice
- Terminazione SSL/TLS per il traffico VoIP esposto a Internet

Anche con una singola installazione di NethVoice, il proxy è essenziale per una corretta gestione del traffico di rete.
:::

## Passaggi di installazione

### Passaggio 1: Installa NethVoice Proxy

1. **Accedi al Software Center** nel tuo sistema NethServer 8.
2. **Cerca "NethVoice Proxy"** nella barra di ricerca del Software Center.
3. **Fai clic su "Installa"** accanto a NethVoice Proxy.
4. **Attendi il completamento dell'installazione** (potrebbe richiedere alcuni minuti).
5. **Procedi alla configurazione del proxy** prima di passare al passaggio successivo (vedi [Configurazione di NethVoice Proxy](#step-2-configure-nethvoice-proxy)).

:::tip Importante
Assicurati che NethVoice Proxy sia completamente installato e configurato con FQDN appropriate e record DNS prima di procedere all'installazione delle istanze di NethVoice.
:::

### Passaggio 2: Configura NethVoice Proxy {#step-2-configure-nethvoice-proxy}

Prima di installare NethVoice, devi configurare NethVoice Proxy:

1. **Configura il dominio proxy** questo è l'FQDN pubblico dove il proxy sarà raggiungibile.
   Non inserire l'FQDN di NethServer ma utilizzarne uno dedicato, come `proxy.nethserver.org`.
   Questo nome verrà utilizzato dai client esterni per raggiungere i tuoi servizi VoIP, ma
   non verrà utilizzato direttamente dagli utenti finali.
2. **Imposta l'interfaccia di rete** che gestirà il traffico VoIP
3. **Configura l'indirizzo IP pubblico** se diverso dall'IP dell'interfaccia

La configurazione precedente sarà il punto di ingresso per tutto il traffico VoIP esterno.

Assicurati che:
- l'FQDN configurato si risolva correttamente all'indirizzo IP pubblico
- eventuali record DNS siano configurati correttamente per puntare al proxy

Questi requisiti sono critici per ottenere un certificato SSL/TLS valido per le comunicazioni sicure.

Vedi [Documentazione di NethVoice Proxy](../advanced/nethvoice_proxy.md) per ulteriori informazioni.

### Passaggio 3: Installa NethVoice

Una volta che NethVoice Proxy è in esecuzione, puoi installare le istanze di NethVoice:

1. **Torna al Software Center** nel tuo sistema NethServer 8.
2. **Cerca "NethVoice"** nella barra di ricerca del Software Center.
3. **Fai clic su "Installa"** accanto a NethVoice.
4. **Attendi il completamento dell'installazione**.
5. **Procedi con la configurazione del modulo** come descritto nella sezione successiva.
6. **Accedi all'istanza di NethVoice** e segui la procedura guidata di configurazione iniziale per completare la configurazione.

:::info Più istanze
Puoi installare più istanze di NethVoice sullo stesso nodo. Ognuna utilizzerà il NethVoice Proxy condiviso per l'accesso esterno e l'instradamento del traffico. Ogni istanza richiede una configurazione separata e FQDN dedicati.
:::

## Configurazione del modulo {#module-configuration}

:::warning Prerequisiti richiesti
Prima di procedere con la configurazione di qualsiasi istanza di NethVoice, assicurati che:

1. **NethVoice Proxy sia installato** - Vedi [Installazione di NethVoice Proxy](../advanced/nethvoice_proxy.md)
2. **NethVoice Proxy sia configurato** - Il dominio proxy (FQDN) deve essere impostato e i record DNS creati
3. **NethVoice Proxy sia in esecuzione** - Verifica lo stato del proxy nell'interfaccia di gestione del nodo
4. **Il dominio utente sia creato** - Vedi [Domini utente nell'installazione di NethServer](./nethserver.md#user-domains) (richiesto per gli utenti e gli interni di NethVoice)

Il modulo NethVoice richiede almeno un dominio utente per gestire utenti, interni e autenticazione. Se non hai ancora creato un dominio utente, segui la [guida alla configurazione dei domini utente](./nethserver.md#user-domains) prima di configurare NethVoice.
:::

Per configurare NethVoice, hai bisogno di due host virtuali dedicati:

- uno per la pagina di amministrazione di NethVoice, ad es. `nethvoice.nethserver.org`
- uno per l'applicazione web NethVoice CTI, ad es. `cti.nethserver.org`

Prima di procedere con la configurazione, assicurati di aver creato i record DNS corrispondenti per questi FQDN nel tuo server DNS.

Se prevedi di utilizzare un certificato Let's Encrypt come certificato predefinito, assicurati di avere i necessari record DNS pubblici.

Durante la procedura guidata di configurazione del modulo, ti verrà chiesto di fornire le seguenti informazioni:

- **Host base di NethVoice**: Inserisci un FQDN valido per accedere alla pagina di amministrazione dell'applicazione, qui è dove gestirai le impostazioni di NethVoice, ad es. `nethvoice.nethserver.org`.
- **Host base di NethVoice CTI**: Inserisci un FQDN valido per accedere all'applicazione web NethVoice CTI, ad es. `cti.nethserver.org`.
- **Dominio utente**: Scegli uno dei [domini utente](./nethserver.md#user-domains) già configurati.
- **Fuso orario**: Seleziona il fuso orario appropriato per la tua istanza di NethVoice, questo è importante per la registrazione e la pianificazione accurate delle chiamate.
- **Richiedi certificato Let's Encrypt**: Se abilitato, verrà richiesto un certificato Let's Encrypt per ognuno dei due host.
- **Prefisso report**: Inserisci il prefisso telefonico internazionale da considerare locale nel sistema di reporting.
- **Ripristina la password dell'amministratore di NethVoice per accedere all'interfaccia utente**: Inserisci una password valida per l'utente amministratore di NethVoice (facoltativo, la password predefinita è *Nethesis,1234*).

Opzioni di configurazione avanzata:

- **Chiave API di Deepgram**: Inserisci la tua chiave API di Deepgram per abilitare funzionalità di riconoscimento vocale avanzate.
  - **Abilita trascrizione delle chiamate (Anteprima)**: Abilita questa opzione per trascrivere tutte le chiamate utilizzando il servizio speech-to-text di Deepgram. Nota che questa funzione è in anteprima e potrebbe avere limitazioni e comporterà costi aggiuntivi in base al tuo utilizzo di Deepgram.
  - **Trascrizione della segreteria telefonica**: Abilita la trascrizione della segreteria telefonica per convertire i messaggi della segreteria telefonica in testo utilizzando Deepgram. Questa funzione comporta anche costi aggiuntivi in base al tuo utilizzo di Deepgram.

Le seguenti opzioni sono disponibili solo con un abbonamento Enterprise attivo:

- **Abilita modulo hotel**: Attiva il modulo Hotel per la gestione delle funzionalità telefoniche specifiche dell'hotel.
  Vedi [Documentazione del modulo NethVoice Hotel](../nethhotel/index.md) per ulteriori dettagli.
- **Host del server Hotel FIAS**: Inserisci l'indirizzo IP o il nome host del server Hotel FIAS.
- **Porta del server Hotel FIAS**: Specifica il numero di porta per la connessione al server Hotel FIAS.

## Passaggi successivi

Dopo aver salvato i parametri di configurazione, NethVoice sarà accessibile al suo host base, ad es:
```
https://nethvoice.nethserver.org
```

Per accedere all'interfaccia di amministrazione di NethVoice, utilizza le seguenti credenziali:

- Utente: `admin`
- Password: `Nethesis,1234`, la password predefinita se l'opzione *Ripristina la password dell'amministratore di NethVoice per accedere all'interfaccia utente* non è stata utilizzata durante la configurazione
