===============
|product_hotel|
===============

|product_hotel| è un modulo di |product| che permette di gestire degli interni opportunamente configurati come camere di un hotel.

L’accesso al |product_hotel| è consentito di default all’utente admin.

Caratteristiche principali:

* Check-in/Check-out camere
* Sveglia
* Sveglia di gruppo
* Report chiamate
* Personalizzazione Tariffe
* Numeri brevi
* Storico chiamate
* Abilitazione/Disabilitazione chiamate fra camere

Configurazione |product|
========================

Dopo aver installato il modulo |product_hotel| dal sofware center di |parent_product|, sono necessarie alcune configurazioni lato |product|:

* nell'interfaccia avanzata di |product| sezione Connettività -> Rotte in Uscita, creare una Rotta in Uscita dedicata per le camere che preveda l'utilizzo di un prefisso, di solito 0, lasciandola come ultima nell'elenco delle rotte, fare Salva e Applicare le Configurazioni.
* nell'interfaccia avanzata di |product| accedere al contesto personalizzato per gli interni delle camere, sezione Connettività -> Contesti Custom -> Hotel Room Context, e abilitare la Rotta in Uscita appena creata per consentire agli interni delle camere di effettuare chiamate esterne, fare Salva e Applicare le Configurazioni.
* Aggiungere gli interni creati per le camere al profilo  **hotel** nel pannello di configurazione di |product| o nell'applicazione `Gestione Multipla Interni`.

Tutti gli interni che fanno parte del profilo **hotel** entrano a far parte della gestione |product_hotel|.

Come configurare il centralino
==============================
Consigliamo di configurare il centralino in questo modo:

* tutti gli interni delle camere devono essere aggiunti al profilo hotel dalla sezione `Configurazioni` o utilizzando l'applicazione `Gestione Multipla Interni`
* gli interni di servizio, come ad esempio la reception, non devono essere aggiunti al profilo hotel e devono essere configurati come interni standard, seguendo la normale politica dell'hotel. Ad esempio se le camere avranno come range di interni dal 201 al 299, l'interno della reception dovrà essere sempre a 3 cifre, ad esempio 200 o 300. Per consentire alle camere di chiamare la reception bisognerà configurare un numero breve, invece gli interni di servizio tra di loro si potranno chiamare direttamente.
* è consigliabile utilizzare per gli interni di servizio una Rotta in Uscita senza prefisso diversa da quella per gli interni delle camere

Codici funzioni da telefono
===========================
Nell'interfaccia di gestione del centralino |product| in Codici Servizi si trovano i codici per utilizzare le funzionalità del |product_hotel| dai telefoni.

Ad esempio per aggiungere un extra per una camera dovrò chiamare ::

 *33 + Interno Camera + # + Id Extra + # + Numero

Gestione camere
===============

Nella pagina principale sono elencate tutte gli interni configurati. Le camere vengono divise in tab a seconda del valore numerico del campo callgroup dell'interno telefonico, configurabile dall'interfaccia di |product|. Le camere libere sono contraddistinte dal colore verde, quelle che hanno già effettuato il check-in invece dal colore rosso, quelle da pulire dal colore giallo.

Tutte le funzioni disponibili sono presentate direttamente nel riquadro della camere. É possibile anche utilizzare il menu contestuale con il tasto destro del mouse.

Sveglia

La sveglia può essere programmata una tantum oppure reiterata su più giorni.
Ogni cliente può configurare la sveglia della propria camera componendo il numero ::

 977

Gruppi
======

É possibile raggruppare più camere in un unico gruppo. Questo consente effettuare operazioni su tutte le camere membre del gruppo (checkin, checkout, sveglia) e avere delle politiche sulle chiamate dedicate alle camere che fanno parte del gruppo nelle impostazioni(abilitazione chiamate tra le camere, abilitazione chiamate tra tutte le camere, abilitazione chiamate esterne).


Aggiungere un Extra
===================

Per aggiungere un extra ad una camera cliccare sulla relativa icona.


Report
======

Per ottenere il report del conto delle camere attualmente occupate è sufficiente cliccare sulla relativa icona. Il report riporta il dettaglio di ciascuna chiamata e di ogni extra, in fondo c'è un riepilogo che visualizza in tempo reale il conto totale.


Tariffe
=======

All'interno di |product_hotel| è presente un set predefinito di tariffe che variano in base al tipo di chiamata (es. cellulari, locali, ecc).
É possibile modificare le tariffe esistenti o crearne di nuove. É anche possibile abilitare/disabilitare le chiamate verso particolari numerazioni.


Extra
=====

É possibile configurare degli extra. É possibile poi assegnarli alle varie camere sia da interfaccia web e sia da telefono (ad esempio basta chiamare il ::

 *33201#99#3 per addebitare alla camera 201 tre volte l'extra che ha codice 99).  


Opzioni 
=======

Le opzioni generali comprendono:

* Configurazione del prefisso per effettuare chiamate esterne
* Formato interni
* Abilitazione/disabilitazione delle chiamate fra camere
* Abilitazione/disabilitazione delle chiamate fra camere appartenenti allo stesso gruppo
* Abilitazione/disabilitazione delle chiamate esterne
* Abilitazione/disabilitazione delle chiamate fra camere che non hanno eseguito il check-in
* Interno da contattare per allarmi sveglia non risposta
* Abilitazione della funzione Pulizia Camere
* Abilitare il codice per la Pulizia Camere
* Lingua per i messaggi dell'interno della Reception, funzionerà anche come fallback per le camere senza impostazioni.


Numeri Brevi
============

La sezione Numeri Brevi consente di specificare delle scorciatoie per chiamare interni predefiniti, ad esempio 9 per contattare la reception. É possibile associare ad un numero breve uno dei gruppi temporali caricati nell'interfaccia di gestione del centralino |product|. Questo consente di configurare le due destinazioni per la chiamata, se la condizione temporale viene rispettata in Destinazione, se non lo è in Altrimenti.


Storico
=======

Qualora sia necessario consultare uno storico di tutte le chiamate effettuate dalle camere è possibile utilizzare la sezione **Storico**. Lo storico delle chiamate è filtrabile per data e numero di camera.


Tono di chiamata alla digitazione del prefisso
==============================================

|product| non crea un tono di chiamata automaticamente con la digitazione del solo prefisso, ma aspetta l’intera digitazione del numero da chiamare.

Si può modificare questo comportamento con una piccola personalizzazione.

Aggiungere al file :file:`/etc/asterisk/extensions_custom.conf` (potrebbe essere vuoto)
il seguente contenuto e sostituendo **XXX** (5 sostituzioni da fare) con il prefisso impostato nell’interfaccia del |product_hotel| ::

 ;-----     Inizio Configurazione NethHotel -------

 [camere]
 exten => XXX,1,Noop(Chiamata Esterna)
 exten => XXX,n,Set(TIMEOUT(digit)=5)
 exten => XXX,n,Set(TIMEOUT(response)=10)
 exten => XXX,n,DISA(no-password,camere-disa,${CALLERID(number)})
 
 [camere-disa]
 exten => _[*#0-9].,1,Set(NETH_HOTEL_EXTEN=XXX${EXTEN})
 exten => _[*#0-9].,n,Noop(${NETH_HOTEL_EXTEN})
 exten => _[*#0-9].,n,agi(set-room-lang.php,${CALLERID(number)})
 exten => _[*#0-9].,n,agi(camere.php,${CALLERID(number)},${NETH_HOTEL_EXTEN})

 ;-----     Fine Configurazione NethHotel -------


Dopo aver salvato il file appena modificato dare il comando ::

 asterisk -rx "dialplan reload"

.. note:: Configurare il timeout di digitazione sui vari telefoni utilizzati dalle camere del |product_hotel| a valori bassi per facilitare il comportamento voluto


FIAS
====

È possibile collegare |product_hotel| ad un gestionale alberghiero **Oracle Opera**, o a qualunque sia compatibile con il protocollo di scambio dati **FIAS**. |product| è **certificato Oracle**. Collegando |product_hotel| ad un PMS compatibile, sarà possibile controllare direttamente dall'interfaccia del PMS le seguenti funzionalità:

* Check in, con abilitazione del telefono della camera
* Check out
* Impostazione ed esito della sveglia
* Addebito delle chiamate effettuate dalla camera
* Addebito di minibar ed extra, anche tramite codici telefonici
* Lingua dei messaggi audio per l'ospite in base alla lingua della prenotazione

Per l'installazione e la configurazione, rivolgersi al supporto.

Versioni **Oracle** e **FIAS**

* Oracle Hospitality OPERA 5.5
* Oracle Hospitality Interface IFC8 8.14.7.0
* Fidelio Interface Application Specification (FIAS) 2.20.23

Versioni minime necessarie del **PMS Oracle** (versioni superiori sono compatibili):

* Opera 5 PMS
* V5.0.03.03 E43
* V5.0.04.01 E24
* V5.0.04.02 E17
* V5.0.04.03 E10
* V5.5.0




