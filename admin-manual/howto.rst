|product|: installazione codec g729
===================================

Se è già installato in |product| un codec g729, il seguente comando deve stampare ``INSTALLED``: ::

  asterisk -rx 'core show translation' | grep -q g729 && echo INSTALLED

.. warning::

  Il riavvio del servizio ``asterisk`` causa la caduta delle chiamate in corso

Per installare ed attivare il codec g729 di Intel eseguire i seguenti comandi: ::

  yum install -y asterisk-codecs-g729
  systemctl restart asterisk

Il codec g729 di Intel non è compatibile con la versione a pagamento di Digium, 
che si può installare seguendo la procedura che vi forniranno con l'acquisto,
dopo aver disintallato il pacchetto ``asterisk-codecs-g729`` con il comando: ::

  yum remove -y asterisk-codecs-g729
  systemctl restart asterisk


|product|: configurazione dell'IP locale
========================================

In fase di provisioning, l'IP usato come IP del centralino è l'IP della prima rete ``green`` (rete locale). 
Questo può essere modificato da linea di comando, per esempio se si hanno :index:`reti green multiple`.
Se si desidera forzare un determinato indirizzo IP, esempio ``192.168.123.11``, utilizzare i seguenti comandi: ::

  config setprop nethvoice LocalIP 192.168.123.11
  signal-event nethserver-nethvoice14-update

|product|: configurazione del transport PJSIP
=============================================

In |product| il modulo `chan_pjsip` di Asterisk è configurato per stare in ascolto su tutti gli indirizzi di tutte le reti green.
È possibile che sia necessario cambiare questa configurazione in situazioni particolari.
Se si desidera che chan_pjsip stia in ascolto anche sulle RED ed i loro alias, eseguire i comandi: ::

  config setprop nethvoice PJSIPBind all
  signal-event nethserver-nethvoice14-update

Se invece si desidera fare delle personalizzazioni maggiori, come ad esempio escludere una rete green, è possibile farlo dall'interfaccia della configurazione avanzata:
:menuselection:`Asterisk SIP Settings --> Chan PJSIP Settings`.
Sarà poi necessario abilitare le configurazioni avanzate :guilabel:`Show Advanced Settings` e fare le opportune modifiche. 


.. note::

   Se la visualizzazione delle configurazioni avanzate è abilitata, le impostazioni di transport **non** 
   verranno più sovrascritte in caso di aggiornamento o modifica delle interfacce di rete.


|product|: configurazione rubrica
=================================

La rubrica di |product| è la Rubrica Centralizzata di |product_service|. Vedere nella documentazione di |product_service| come popolarla e integrarla con la rubrica del |product_cti| e i :ref:`Numeri Rapidi <rapidcode-ref-label>`.

I telefoni vengono collegati alla rubrica di |product| automaticamente se configurati tramite il provisioning, altrimenti per i modelli che lo supportano è possibile configurare una rubrica di tipo LDAP.
I parametri da utilizzare per i vari modelli sono:

Parametri comuni
----------------

Indirizzo del server:
  ``Indirizzo IP o nome centralino``

Base:
  ``dc=phonebook,dc=nh``

Attributi nome LDAP:
  ``cn o``

Attributi numero LDAP:
  ``telephoneNumber mobile homePhone``

Porta:
  ``389`` per |parent_product| 6

  ``10389`` per |parent_product| 7

Filtro ricerca nomi LDAP:
  ``(&(telephoneNumber=*)(sn=%))`` per |parent_product| 6

  ``(|(cn=%)(o=%))`` per |parent_product| 7

Filtro ricerca numeri LDAP:
  ``(&(telephoneNumber=%)(sn=*))`` per |parent_product| 6

  ``(|(telephoneNumber=%)(mobile=%)(homePhone=%))`` per |parent_product| 7

Protocollo:
  ``Version3``


Sangoma
-------

Parametri aggiuntivi:

* Ricerca LDAP per chiamate in ingresso: Off
* Risultati di ordinamento LDAP: On

Snom
----

Parametri aggiuntivi:

* LDAP su TLS: off
* Ordina Risultati: on
* Predici Testo: on
* Fai una query iniziale: on

Yealink
-------

Parametri aggiuntivi:

* Battute massime (1-32000): 50
* Mostra nome LDAP: %cn %o
* Ricerca LDAP per chiamate in ingresso: Disabilitato
* Ricerca LDAP in uscita: Disabilitato
* Risultati di ordinamento LDAP: Abilitato





|product|: collegamenti remoti
==============================

Due o più |product| remoti, cioè non nella stessa rete posso essere collegati tra di loro tramite dei fasci iax.  Si utilizza il protocollo IAX sia per le sue caratteristiche di semplicità, richiede solo la porta 4569 UDP, sia per il brillante comportamento in caso di nat, sia per le performance su chiamate multiple.

Se possibile è sempre indicato collegare le varie sedi remote con vpn tra di loro, in modo da far passare il traffico voce su di esse.

Configurazione Fasci IAX
------------------------

Avendo permesso, tramite o la vpn e/o l'eventuale configurazione delle reti fidate, il traffico tra i due |product|, bisogna a questo punto configurare i fasci iax. In pratica i centralini per interfacciarsi devono scambiarsi uno username e password che autorizza il collegamento.

.. warning:: L'utente è univoco, deve essere utilizzato per un solo collegamento, in caso di collegamento tra diversi |product| utilizzare username diversi per ogni fascio IAX.

Ecco un esempio pratico:

.. note:: Nel caso la VPN sia instaurata direttamente dal |product|, sul centralino remoto può essere necessario indicare l'ip del punto punto della vpn e non l'indirizzo della rete green.

Esempio configurazione fasci IAX per connessione tra due |product|
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sede A
^^^^^^

Impostazioni in Uscita
''''''''''''''''''''''
::

  Nome fascio: SedeA

  Dettagli PEER:

  host=IP_SEDE_B
  username=utenteB
  secret=passwordB
  type=peer
  qualify=60000

Impostazioni in Ingresso
''''''''''''''''''''''''
::

  Contesto UTENTE: utenteA

  Dettagli UTENTE:

  secret=passwordA
  type=user 
  context=from-intracompany

Sede B
^^^^^^

Impostazioni in Uscita
''''''''''''''''''''''
::

  Nome fascio: SedeB

  Dettagli PEER:

  host=IP_SEDE_A
  username=utenteA
  secret=passwordA
  type=peer
  qualify=60000

Impostazioni in Ingresso
''''''''''''''''''''''''
::

  Contesto UTENTE: utenteB

  Dettagli UTENTE:

  secret=passwordB
  type=user 
  context=from-intracompany

Configurazione Rotte in Uscita
------------------------------

L'ultima configurazione da effettuare è nelle rotte in uscita. Quello che dobbiamo fare è indicare al |product| come raggiungere gli interni remoti.

Le possibilità possono essere anche qui due:

Interni delle due sedi sovrapposti
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Se i due |product| hanno la numerazione di interni sovrapposta, stessi interni in entrambi i centralini, si deve creare una rotta in uscita con il pattern di chiamata che includa gli interni remoti e un prefisso.

Il prefisso fa instradare la chiamata non per l'interno locale ma per l'interno remoto.

Ovviamente l'unico fascio da utilizzare sarà quello IAX precedentemente creato per il collegamento infra sede.

Ricordarsi di spuntare **Rotta Intra-Aziendale** se si vuole inviare al centralino remoto anche il nome del chiamante oltre che il numero, in modo che il chiamato sul display del telefono lo visualizzi.

Interni delle due sedi non sovrapposti
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Nel caso che gli interni dei due |product| collegati siano ben distinti, non ci si deve preoccupare di distinguere con un prefisso la rotta in uscita.

É necessario quindi creare una rotta con il pattern degli interni remoti e indicare il fascio iax di collegamento precedentemente creato.

Ricordarsi di spuntare **Rotta Intra-Aziendale** se si vuole inviare al centralino remoto anche il nome del chiamante oltre che il numero, in modo che il chiamato sul display del telefono lo visualizzi.


|product_cti|: attivazione debug
================================

Di default il file di log riporta solamente messaggi di *warning* ed *errori*.
È possibile innalzare il livello di debug per avere maggiori informazioni:

.. code-block:: bash

  config setprop nethcti-server LogLevel info
  signal-event nethcti-server3-update

.. warning::
  Innalzando il livello la dimensione del file di log aumenta rapidamente.

Per ripristinare il livello di default:

.. code-block:: bash

  config setprop nethcti-server LogLevel warn
  signal-event nethcti-server3-update


|product_cti|: telefoni con modalità Click2Call
===============================================

La modalità "Click2Call" di |product_cti| consente un utilizzo semplificato
dei telefoni fisici. In generale, quando si utilizza |product_cti| con associato
un telefono fisico, é necessario sollevare la cornetta quando si effettuano chiamate.

Esistone tre diverse modalità di Click2Call, di seguito elencate e i telefoni supportati sono:

- NethPhone
- Yealink
- Snom
- Sangoma
- Fanvil

Modalità "Click2Call manuale"
-----------------------------

É la modalità base utilizzata con qualsiasi telefono fisico non supportato. Quando l'utente finale effettua una chiamata, come prima operazione dovrà sollevare la cornetta del dispositivo telefonico e successivamente verrà messo in comunicazione con la destinazione.

Attivazione:

.. code-block:: bash

  config setprop nethcti-server AutoC2C disabled
  signal-event nethcti-server3-update

Modalità "Click2Call automatico"
--------------------------------

É la modalità che semplifica l'utilizzo del telefono fisico. Consente di bypassare l'uso della cornetta sfruttando ad esempio il vivavoce del telefono o delle cuffie audio direttamente indossate dall'utente. La modalità "automatica" è attiva di default e prevede che il centralino telefonico e i telefoni fisici siano presenti all'interno della stessa rete LAN aziendale e che possano comunicare direttamente tramite il protocollo HTTP.

La modalità è attiva di default.

Disattivazione:

.. code-block:: bash

  config setprop nethcti-server AutoC2C disabled
  signal-event nethcti-server3-update

Riattivazione:

.. code-block:: bash

  config setprop nethcti-server AutoC2C enabled
  signal-event nethcti-server3-update

Modalità "Click2Call cloud"
---------------------------

La modalità *"Click2Call cloud"* è uguale alla modalità click2call automatico, con l'unica differenza che deve essere abilitato nel caso in cui il centralino telefonico è stato installato in qualche piattaforma cloud esterna all'azienda, mentre i telefoni fisici sono presenti nella propria rete LAN aziendale. In questo scenario il centralino non è in grado di comunicare direttamente con i telefoni e quindi viene richiesta l'attivazione della modalità "cloud".

In questo modo, anche se il centralino è esterno alla rete aziendale, l'utente finale potrà gestire il proprio telefono fisico presente in locale tramite |product_cti|. Questa funzionalità è realizzata grazie a un terzo componente: Nethifier.

Le due modalità "click2call automatico" e "click2call cloud" sono mutuamente esclusive.

La modalità "click2call cloud" è disabilitata di default.

.. note::
  La modalità "Click2Call cloud" prevede obbligatoriamente l'uso dell'applicazione Nethifier (vedi sezione apposita)

Attivazione:

.. code-block:: bash

  config setprop nethcti-server AutoC2C cloud
  signal-event nethcti-server3-update

Disattivazione:

.. code-block:: bash

  config setprop nethcti-server AutoC2C disabled
  signal-event nethcti-server3-update



|product_cti|: utilizzo di un server chat esterno
=================================================

È possibile configurare un server chat presente su un'altra macchina:

.. code-block:: bash

  config setprop nethcti-server JabberUrl <BOSH_URL>
  signal-event nethcti-server3-update

Per esempio:

.. code-block:: bash

  config setprop nethcti-server JabberUrl https://nethserver.mydomain.it/http-bind
  signal-event nethcti-server3-update

Per ripristinare il default:

.. code-block:: bash

  config setprop nethcti-server JabberUrl ""
  signal-event nethcti-server3-update

.. note::
  Il server chat specificato deve supportare `XMPP <https://en.wikipedia.org/wiki/XMPP>`_ su protocollo `BOSH <https://en.wikipedia.org/wiki/BOSH_(protocol)>`_.
  `NethServer <http://docs.nethserver.org/it/v7/chat.html>`_ lo supporta di default.


|product_cti|: configurazione di un prefisso telefonico
=======================================================

È possibile configurare un prefisso telefonico per qualsiasi chiamata:

.. code-block:: bash

  config setprop nethcti-server Prefix <PREFISSO>
  signal-event nethcti-server3-update


Per ripristinare il default:

.. code-block:: bash

  config setprop nethcti-server Prefix ""
  signal-event nethcti-server3-update


|product_cti|: configurazione Softphone WebRTC
==============================================

Il softphone WebRTC utilizza il `Gateway Janus <https://github.com/meetecho/janus-gateway>`_
installato direttamente nel centralino telefonico.

Janus-gateway può operare in tre differenti modalità di NAT:

1. STUN (default)
2. ICE
3. 1:1 (NAT)

Per la configurazione del NAT e delle opzioni, sono disponibili quattro proprietà sotto la
chiave *janus-gateway* del database di configurazione:

1. NatMode: <stun|ice|1:1>
2. StunServer: indirizzo del server STUN da usare. Il default è *stun1.l.google.com*. Viene ignorato se la modalità non è STUN
3. StunPort: porta del server STUN. Il default è 19302. Viene ignorato se la modalità non è STUN
4. PublicIP: è l'indirizzo IP pubblico del server su cui è in esecuzione janus-gateway. Viene ignorato se la modalità non è 1:1

In alcuni scenari d'utilizzo l'audio delle telefonate potrebbe non funzionare e conseguentemente le chiamate
vengono terminate automaticamente dal centralino dopo un certo intervallo temporale. In questi casi
è necessario configurare correttamente il WebRTC in base all'architettura di rete utilizzata.

*Esempio*

Nel caso si utilizzi un centralino in cloud dietro NAT, è necessario configurare il WebRTC come segue:

.. code-block:: bash

  config setprop janus-gateway NatMode 1:1
  config setprop janus-gateway PublicIP <DOMAIN OR PUBLIC IP>
  signal-event nethserver-janus-update


**Configurazione interfacce per STUN e ICE**

È possibile scegliere quale interfaccia di rete utilizzare per l'utilizzo dei candidati ICE. Come comportamento di default Janus cerca di utilizzare tutte le interfacce di rete, tranne:

- **vmnet*:** utilizzata da VMware
- **tun* e tap*:** usate per le VPN
- **virb*:** usata per KVM
- **vb-*:** usata dal container di NethServer AD

È possibile modificare il comportamento di default elencando esplicitamente le interfacce da usare o quelle da escludere. È possibile farlo tramite le seguenti due proprietà:

- **ICEEnforceList:** lista dei nomi delle interacce separati da virgola da usare per l'ICE gathering. Per esempio "e0,e1"
- **ICEIgnoreList:** lista dei nomi delle interacce separati da virgola da escludere dall'ICE gathering. Janus userà tutte le altre interfacce eccetto queste. Per esempio "e3,vmnet,10.0.0".

Esempio di configurazione:

.. code-block:: bash

  config setprop janus-gateway ICEIgnoreList "e3,vmnet,10.0.0"
  signal-event nethserver-janus-update


|product_cti|: disattivazione della gestione eventi dei fasci
=============================================================

È possibile disabilitare la gestione degli eventi dei fasci all'interno di |product_cti| Server come segue:

.. code-block:: bash

  config setprop nethcti-server TrunksEvents "disabled"
  signal-event nethcti-server3-update

Per riabilitarli:

.. code-block:: bash

  config setprop nethcti-server TrunksEvents "enabled"
  signal-event nethcti-server3-update

.. note::
  I fasci rimangono pienamente funzionanti: la disattivazione riguarda solamente |product_cti| Server.

  Tale disattivazione comporta solamente la non visualizzazione delle chiamate nella schermata dei "fasci" lato |product_cti| Client.

|product_cti|: effettuare chiamate in maniera non autenticata
=============================================================

|product_cti| offre la possibilità di fare telefonate invocando una particolare API senza autenticazione: :code:`astproxy/unauthe_call.`

**Questa funzionalità è disabilitata di default per motivi di sicurezza.**

Per l'attivazione eseguire:

.. code-block:: bash

  config setprop nethcti-server UnautheCall enabled
  signal-event nethcti-server3-update

per disabilitarla:

.. code-block:: bash

  config setprop nethcti-server UnautheCall disabled
  signal-event nethcti-server3-update

Una volta attivata è possibile effettuare una telefonata invocando la REST API `astproxy/unauthe_call. <https://nethvoice.docs.nethesis.it/en/v14/cti_dev.html#elenco-delle-api>`_

Di default solamente gli indirizzi appartenenti alle "Trusted Networks" sono abilitati all'utilizzo della API.
È comunque possibile personalizzare tale lista eseguendo:

.. code-block:: bash

  config setprop nethcti-server UnautheCallAddress "192.168.5.60 192.168.6.60/255.255.255.0 192.168.4.0/24"
  signal-event nethcti-server3-update

È consentito l'inserimento di campi multipli separati da uno spazio vuoto, è possibile specificare un singolo indirizzo
IP o un range, sia tramite netmask sia utilizzando la notazione CIDR.

.. warning:: Se la funzionalità viene abilitata, chiunque potrà eseguire telefonate da qualsiasi interno verso qualsiasi destinazione tramite richieste HTTP POST, ma solo dagli indirizzi indicati nella lista ottenuta col seguente comando :code:`"config getprop nethcti-server UnautheCallAddress".`

|product_cti|: disabilitare l'autenticazione
============================================

.. warning:: L'autenticazione è ABILITATA di default. Una volta disabilitata, sarà possibile eseguire il login a |product_cti| inserendo solamente il nome utente!

È possibile disabilitare l'autenticazione nella seguente maniera:

.. code-block:: bash

  config setprop nethcti AuthenticationEnabled false
  config setprop nethcti-server AuthenticationEnabled false
  signal-event nethcti3-update
  signal-event nethcti-server3-update

per riabilitarla:

.. code-block:: bash

  config setprop nethcti AuthenticationEnabled true
  config setprop nethcti-server AuthenticationEnabled true
  signal-event nethcti3-update
  signal-event nethcti-server3-update

|product_cti|: personalizzare il messaggio di fallito login per utenti non configurati
======================================================================================

Un utente non configurato **non** ha il permesso di accedere a |product_cti|.
In questo caso è possibile personalizzare il messaggio di warning visualizzato dopo un tentativo di login.
Procedere nella seguente maniera:

1. creare il template custom del file `/usr/share/cti/customizable/login-user-noconfig.html`:

.. code-block:: bash

  mkdir -p /etc/e-smith/templates-custom/usr/share/cti/customizable/login-user-noconfig.html
  cp /etc/e-smith/templates/usr/share/cti/customizable/login-user-noconfig.html/10base /etc/e-smith/templates-custom/usr/share/cti/customizable/login-user-noconfig.html/

2. personalizzare il contenuto del template custom `/etc/e-smith/templates-custom/usr/share/cti/customizable/login-user-noconfig.html/10base`
3. eseguire l'evento `nethcti3-update`

.. code-block:: bash

  signal-event nethcti3-update

Per ripristinare il messaggio originale:

.. code-block:: bash

  rm -f /etc/e-smith/templates-custom/usr/share/cti/customizable/login-user-noconfig.html/10base
  signal-event nethcti3-update


|product_cti|: eseguire uno script al termine di una chiamata
=============================================================

È possibile configurare NethCTI Server per eseguire uno script al termine di ogni chiamata.
Lo script verrà invocato tramite i seguenti parametri così come ricevuti da Asterisk stesso:

.. code-block:: bash

  "source, channel, endtime, duration, amaflags, uniqueid, callerid, starttime, answertime, destination, disposition, lastapplication, billableseconds, destinationcontext, destinationchannel"

Esempio:

.. code-block:: bash
  
  ./<SCRIPT_PATH> '200' 'PJSIP/200-00000000' '2019-01-17 18:05:13' '10' 'DOCUMENTATION' '1547744703.0' '"Alessandro Polidori" <200>' '2019-01-17 18:05:03' '2019-01-17 18:05:09' '201' 'ANSWERED' 'Dial' '3' 'ext-local' 'PJSIP/201-00000001' 


Per attivare l'esecuzione di uno script eseguire:

.. code-block:: bash

  config setprop nethcti-server CdrScript <SCRIPT_PATH>
  config setprop nethcti-server CdrScriptTimeout 5000
  signal-event nethcti-server3-update

Il secondo comando è opzionale e consente di stabilire un timeout (espresso in msec) per l'esecuzione dello script: il default è 5 secondi.
Inoltre è lo stesso parametro che influenzerà anche lo script eseguito per ogni chiamata in ingresso dall'esterno (vedi sotto).

Per disattivarlo eseguire:

.. code-block:: bash

  config setprop nethcti-server CdrScript ""
  config setprop nethcti-server CdrScriptTimeout 5000
  signal-event nethcti-server3-update


.. note:: Lo script deve essere eseguibile dall'utente "asterisk" e si consiglia di configurare opportunamente i permessi del file.

|product_cti|: eseguire uno script per ogni chiamata in ingresso dall'esterno
=============================================================================

È possibile configurare NethCTI Server per eseguire uno script per ogni chiamata in ingresso dall'esterno.
Lo script verrà invocato tramite i seguenti parametri così come ricevuti da Asterisk stesso:

.. code-block:: bash

  "callerNum, uniqueId"

Esempio:

.. code-block:: bash

  ./<SCRIPT_PATH> '3331234567' '1532343425.123'


Per attivare l'esecuzione di uno script eseguire:

.. code-block:: bash

  config setprop nethcti-server CdrScriptCallIn <SCRIPT_PATH>
  config setprop nethcti-server CdrScriptTimeout 5000
  signal-event nethcti-server3-update

Il secondo comando è opzionale e consente di stabilire un timeout (espresso in msec) per l'esecuzione dello script: il default è 5 secondi.
Inoltre è lo stesso parametro che influenzerà anche lo script eseguito al termine di una chiamata (vedi sopra).

Per disattivarlo eseguire:

.. code-block:: bash

  config setprop nethcti-server CdrScriptCallIn ""
  config setprop nethcti-server CdrScriptTimeout 5000
  signal-event nethcti-server3-update


.. note:: Lo script deve essere eseguibile dall'utente "asterisk" e si consiglia di configurare opportunamente i permessi del file.
