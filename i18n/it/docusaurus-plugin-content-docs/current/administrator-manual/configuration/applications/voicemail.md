---
title: Casella vocale
---

# Casella vocale

NethVoice può inviare notifiche della casella vocale via email.

Per impostazione predefinita, NethVoice eredita la configurazione SMTP dalle impostazioni globali di **Notifiche email** di NethServer 8.

## Configurare l’invio email (consigliato) {#configurare-invio-email}

Configura il server SMTP dalla UI di NS8:

- Vai in **Impostazioni**
- Apri la scheda **Notifiche email**
- Abilita **Invia notifiche con un server SMTP**
- Scegli una delle opzioni disponibili:
  - **Usa istanza dell’app Mail** (se l’applicazione Mail è installata nel cluster), oppure
  - **Configurazione manuale** per inserire i parametri SMTP (host, porta, cifratura, verifica TLS, credenziali)

Consulta la documentazione ufficiale di NethServer 8 per la descrizione completa dei campi disponibili e del comportamento di validazione:

- https://docs.nethserver.org/projects/ns8/it/latest/email_notifications.html

Dopo aver salvato le impostazioni, riavvia i servizi NethVoice e verifica l’invio email lasciando un messaggio in casella vocale.

## Configurare l’indirizzo mittente (From) {#configurare-mittente}

Alcuni provider SMTP rifiutano i messaggi se l’indirizzo `From:` (o il mittente della busta/envelope sender) non corrisponde al dominio del mittente autenticato.

NethVoice determina l’indirizzo `From:` delle email della casella vocale con questa priorità:

1. `SMTP_FROM_ADDRESS`, se impostata (vedi la sezione avanzata)
2. l’opzione `-f` configurata nelle impostazioni email della casella vocale nell’interfaccia avanzata di NethVoice
3. un indirizzo generato automaticamente in base a `BRAND_NAME` e a un dominio derivato da:
   - la parte di dominio di `SMTP_USERNAME` (quando contiene `@`), oppure
   - `NETHVOICE_HOST` (se disponibile e se è un nome host valido), oppure
   - il dominio di `SMTP_HOST`

### Opzione 1: impostare `SMTP_FROM_ADDRESS` (avanzato)

Imposta `SMTP_FROM_ADDRESS` su un indirizzo email, opzionalmente includendo il nome visualizzato:

- `nethvoice@example.com`
- `NethVoice <nethvoice@example.com>`

Dopo aver modificato le variabili d’ambiente del modulo, riavvia il servizio NethVoice affinché le modifiche abbiano effetto.

### Opzione 2: impostare il parametro `-f` in NethVoice

Se non puoi (o non vuoi) impostare `SMTP_FROM_ADDRESS`, puoi forzare il mittente aggiungendo l’opzione `-f` dall’interfaccia avanzata di NethVoice:

- Vai in **Avanzate > Impostazioni > Amministrtore Voicemail > Configurazione email > Comando di posta**
- Aggiungi `-f user@example.com`

Il risultato finale sarà:

```/var/lib/asterisk/bin/send_email -f nethvoice@example.com```

In questo modo NethVoice passerà il parametro `-f` al comando di invio usato per le notifiche della casella vocale.

## Avanzato: override SMTP per la casella vocale {#avanzato-override-smtp}

Nella maggior parte dei casi è sufficiente configurare l’invio email solo da **Impostazioni > Notifiche email**.

Per attività di troubleshooting o scenari particolari, è possibile forzare lo smarthost SMTP usato per l’invio delle email della casella vocale impostando variabili d’ambiente del modulo per il servizio NethVoice.

Le variabili supportate sono:

- `SMTP_ENABLED`: abilita lo smarthost SMTP (`1` per abilitare, vuoto per disabilitare)
- `SMTP_HOST`: hostname dello smarthost (esempio: `smtp.example.com`)
- `SMTP_PORT`: porta dello smarthost
- `SMTP_USERNAME`: username dello smarthost (esempio: `foo@example.com`)
- `SMTP_PASSWORD`: password dello smarthost
- `SMTP_ENCRYPTION`: tipo di cifratura (`starttls` o `tls`)
- `SMTP_TLSVERIFY`: verifica il certificato TLS dello smarthost (`1` per abilitare, vuoto per disabilitare)
- `SMTP_FROM_ADDRESS`: indirizzo mittente per le email della casella vocale (`nethvoice@example.com` oppure `NethVoice <nethvoice@example.com>`)

### Verificare i valori correnti

Per aggiungere variabili d’ambiente, modifica il file `environment` del modulo:

```bash
runagent -m nethvoiceX vi environment
```

Se modifichi `environment`, devi riavviare il servizio NethVoice affinché le modifiche abbiano effetto.

Dal nodo NS8, identifica l’istanza del modulo (ad esempio `nethvoice1`) ed esegui:

```bash
runagent -m nethvoiceX podman exec freepbx env | grep '^SMTP_'
```

## Note

- Se le email vengono ancora rifiutate, verifica che l’indirizzo mittente scelto sia consentito dal provider SMTP (possono applicarsi policy SPF/DMARC).
- Se modifichi solo le impostazioni della casella vocale dentro NethVoice, non è necessario riavviare i servizi.
