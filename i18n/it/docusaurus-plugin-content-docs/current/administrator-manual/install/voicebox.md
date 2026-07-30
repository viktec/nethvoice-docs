---
title: Appliance VoiceBox
sidebar_position: 6
---

# Appliance VoiceBox

Le appliance VoiceBox sono dispositivi hardware pre-configurati con NethVoice e NethVoice Proxy già installati e pronti per il deployment. Combinano software PBX open-source collaudato con hardware affidabile di livello aziendale, fornendo una soluzione completa pronta all'uso per le organizzazioni.

## Panoramica

Le appliance VoiceBox includono:

- **Applicazioni pre-installate**: NethVoice Proxy e NethVoice
- **Piattaforma base NethServer 8**: Gestione dell'infrastruttura professionale
- **Design rack-montabile**: Accessorio opzionale per l'integrazione in infrastruttura standard
- **Deployment rapido**: Pronto all'uso dopo la configurazione di base della rete

Specifiche fisiche:

- **Fattore di forma**: Progettato per distribuzioni standard in data center
- **Montaggio a rack**: Accessorio opzionale disponibile per l'installazione in rack standard
- **Display e tastiera**: Supportati per la configurazione locale se SSH non è disponibile

:::info
Diversi modelli di VoiceBox sono disponibili tramite [NethShop](https://nethshop.nethesis.it). Consulta NethShop per i modelli e le specifiche attuali.
:::

## Configurazione predefinita

### Interfacce di rete

- **Porta 1** (Primaria): Interfaccia predefinita di gestione e dati
- **IP predefinito**: 192.168.1.1/24
- Interfacce di rete multiple per flessibilità e ridondanza

### Accesso predefinito

| Parametro | Valore |
|-----------|-------|
| Indirizzo IP predefinito | 192.168.1.1/24 |
| URL amministratore | https://192.168.1.1/cluster-admin |
| Nome utente | root |
| Password | Nethesis,1234 |
| Porta SSH | 22 |

:::warning Cambia le credenziali predefinite
Cambia la password predefinita immediatamente dopo il primo accesso. Questo è un requisito di sicurezza.
:::

## Configurazione iniziale della rete

### Passaggio 1: Collega l'appliance

1. Collega l'appliance alla rete utilizzando la **Porta 1** (interfaccia primaria)
2. Assicurati che il dispositivo abbia accesso a Internet e possa risolvere i nomi DNS
3. L'appliance sarà raggiungibile all'indirizzo IP predefinito: **192.168.1.1**

### Passaggio 2: Configura le impostazioni di rete

Accedi all'appliance utilizzando uno di questi metodi:

#### Metodo A: Configurazione SSH (Consigliato)

Connettiti via SSH sulla porta 22 e usa l'utilità `nmtui`:

```bash
ssh root@192.168.1.1
nmtui
```

Configura:
- Indirizzo IP e gateway
- Server DNS
- Nome del nodo (FQDN - deve essere risolvibile via DNS)

#### Metodo B: Console diretta

Se SSH non è disponibile:
1. Collega un monitor e una tastiera all'appliance
2. Accedi con le credenziali predefinite
3. Usa `nmtui` per configurare le impostazioni di rete
4. Dopo la configurazione, l'appliance sarà accessibile via SSH e interfaccia web

### Passaggio 3: Applica le modifiche di rete

Dopo aver modificato le impostazioni di rete con `nmtui`, riavvia il servizio NetworkManager:

```bash
systemctl restart NetworkManager
```

:::warning Requisiti critici di rete
L'appliance deve essere:
- Correttamente configurata sulla tua rete
- Capace di accedere a Internet
- Capace di risolvere i nomi DNS

Questi sono prerequisiti per la generazione di certificati, il clustering e tutte le funzioni di NethVoice.
:::

## Primi passi {#first-steps}

Dopo la corretta configurazione della rete, segui questi passaggi per portare l'appliance in produzione:

### 1. Imposta il nome del nodo

Assicurati che il nome host dell'appliance sia correttamente impostato e **risolvibile via DNS**. Questo è critico per:
- Generazione di certificati
- Clustering
- Host virtuali di NethVoice Proxy e NethVoice
- Funzionalità complessiva del sistema

### 2. Registra l'istanza NS8

Registra l'istanza di NethServer 8 nel centro servizi:
- Accedi all'interfaccia web: https://[indirizzo-appliance]/cluster-admin
- Vai a **Impostazioni** → **Abbonamento**
- Completa il processo di registrazione

:::note Database utenti
L'appliance è pre-configurata con un database utenti LDAP interno. Per usare un database utenti esistente, vedi [Configurazione dei domini utente in NethServer](nethvoice_install.md#user-domains).
:::

### 3. Abilita i certificati Let's Encrypt

Attiva i certificati HTTPS automatici:
- Nell'interfaccia amministratore, vai a **Certificati**
- Abilita **Let's Encrypt** per il provisioning automatico dei certificati
- Assicurati che il DNS sia correttamente configurato

### 4. Configura NethVoice e il Proxy

Segui la [Configurazione di NethVoice](../configuration/index.md) per completare l'installazione.

### 5. Configura il backup

Configura una strategia di backup automatizzato:
- Configura la destinazione del backup (locale, remota o cloud)
- Imposta la frequenza del backup e le politiche di conservazione
- Testa le procedure di backup e ripristino

## Reinstallazione / Reset

Se devi reinstallare NethVoice su un'appliance VoiceBox (da versioni precedenti), un'immagine ISO avviabile basata su Rocky Linux è disponibile per il download.

:::danger Avvertenza di perdita di dati
L'installazione ISO cancellerà completamente tutti i dati dell'appliance. Assicurati di aver eseguito il backup di qualsiasi configurazione critica prima di procedere.
:::

1. **Scarica l'immagine ISO**
   - Ottieni l'immagine più recente dal [repository](https://github.com/NethServer/ns8-rocky-iso/releases)

2. **Crea una USB avviabile**
   - Scrivi l'immagine ISO su una chiavetta USB
   - Su Linux: `dd if=nethvoice-8.iso of=/dev/sdX bs=4M`
   - Su macOS: `diskutil unmountDisk /dev/diskX && sudo dd if=nethvoice-8.iso of=/dev/rdiskX bs=4M`
   - Su Windows: Usa Etcher, Rufus o uno strumento simile

3. **Avvia da USB**
   - Inserisci la chiavetta USB nel VoiceBox
   - Accendi o riavvia l'appliance
   - Avvia da USB (controlla le impostazioni BIOS/UEFI se necessario)

4. **Installazione automatica**
   - Seleziona la voce **NethServer 8 (Rocky Linux)**, se non disponibile, accedi al menu di boot BIOS/UEFI per selezionare un dispositivo di avvio alternativo
   - Il processo di installazione è completamente automatico
   - Non è richiesto alcun intervento dell'utente
   - Il sistema si spegnerà al termine dell'installazione

5. **Dopo l'installazione**
   - Accendi l'appliance
   - Assicurati che l'appliance possa ancora accedere a Internet
   - L'appliance si riavvia e installa NethServer insieme a NethVoice

## Risoluzione dei problemi

### Non è possibile accedere all'interfaccia web

**Problema**: Impossibile raggiungere https://192.168.1.1/cluster-admin

**Soluzioni**:
1. Verifica che l'appliance sia accesa e collegata alla rete
2. Conferma che la tua rete possa raggiungere 192.168.1.1 (potrebbe essere necessario configurare temporaneamente il tuo PC nella stessa subnet)
3. Controlla il collegamento del cavo di rete alla Porta 1
4. Verifica che le regole del firewall consentano HTTPS (porta 443)
5. Prova l'accesso SSH: `ssh root@192.168.1.1` per verificare la connettività di rete

### Accesso SSH non disponibile

**Problema**: Impossibile connettersi via SSH per configurare la rete

**Soluzioni**:
1. Collega monitor e tastiera direttamente all'appliance
2. Usa `nmtui` dalla console locale per configurare le impostazioni di rete
3. Dopo la configurazione, riavvia NetworkManager: `systemctl restart NetworkManager`
4. Prova l'accesso SSH dal tuo client

### Problemi di risoluzione DNS

**Problema**: L'appliance non riesce a risolvere i nomi DNS

**Soluzioni**:
1. Connettiti via SSH o console
2. Usa `nmtui` per verificare che i server DNS siano configurati
3. Testa il DNS dall'appliance: `nslookup google.com`
4. Assicurati che i server DNS siano esterni (non configurati come 192.168.1.1)
5. Verifica che il firewall consenta il traffico DNS (porta 53 UDP/TCP)

### Generazione del certificato non riuscita

**Problema**: L'attivazione del certificato Let's Encrypt non riesce

**Cause probabili**:
- Il DNS non è correttamente configurato o non risolve l'FQDN
- Il firewall sta bloccando il traffico HTTPS in uscita (porta 443) verso i servizi Let's Encrypt
- Il nome del nodo non è risolvibile via DNS

**Soluzioni**:
1. Verifica che il DNS stia funzionando: `nslookup [appliance-fqdn]`
2. Assicurati che il nome del nodo sia impostato correttamente e risolvibile
3. Controlla la connettività a Internet in uscita
4. Esamina i registri di sistema per gli errori di certificato

## Supporto

Per supporto tecnico e problemi:

- Consulta il [Manuale amministratore di NethVoice](../index.md)
- Rivedi la [Documentazione di NethServer 8](https://docs.nethserver.org/projects/ns8/)
- Contatta il supporto di Nethesis se hai un abbonamento tramite [Helpdesk](https://helpdesk.nethesis.it)
