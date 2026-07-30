---
title: Voicemail
---

# Voicemail

NethVoice can send voicemail notifications by email.

By default, NethVoice inherits the SMTP configuration from the cluster-wide **Email notifications** settings of NethServer 8.

## Configure email delivery (recommended) {#configure-email-delivery}

Configure the SMTP server from the NS8 UI:

- Go to **Settings**
- Open the **Email notifications** card
- Enable **Send notifications with an SMTP server**
- Choose one of the available options:
   - **Use Mail app instance** (if the Mail application is installed in the cluster), or
   - **Manual configuration** to enter the SMTP parameters (host, port, encryption, TLS verification, credentials)

See the official NethServer 8 documentation for the full description of the available fields and validation behavior:

- https://docs.nethserver.org/projects/ns8/en/latest/email_notifications.html

After saving the settings, restart NethVoice services and verify email delivery by leaving a voicemail message.

## Configure the sender address (From) {#configure-sender-address}

Some SMTP providers refuse messages if the `From:` address (or envelope sender) does not match the authenticated sender domain.

NethVoice determines the `From:` address for voicemail emails with the following priority:

1. `SMTP_FROM_ADDRESS`, if set (see the advanced section below)
2. the `-f` option configured in the NethVoice advanced interface voicemail email settings
3. an auto-generated address based on `BRAND_NAME` and a domain derived from:
    - the domain part of `SMTP_USERNAME` (when it contains an `@`), or
    - `NETHVOICE_HOST` (when available and it is a valid host name), or
    - the domain of `SMTP_HOST`

### Option 1: set `SMTP_FROM_ADDRESS` (advanced)

Set `SMTP_FROM_ADDRESS` to a mailbox address, optionally including a display name:

- `nethvoice@example.com`
- `NethVoice <nethvoice@example.com>`

After changing module environment variables, restart the NethVoice service for the change to take effect.

### Option 2: set the `-f` parameter in NethVoice

If you can’t (or don’t want to) set `SMTP_FROM_ADDRESS`, you can force the sender envelope by adding the `-f` option in the NethVoice advanced interface:

- Go to **Advanced > Settings > Voicemail Admin > Settings > Email Config > Mail Command**
- Add `-f user@example.com`

The final result will be:

```/var/lib/asterisk/bin/send_email -f nethvoice@example.com```

## Advanced: override SMTP settings for voicemail {#advanced-smtp-override}

In most installations you should configure email delivery only from **Settings > Email notifications**.

For troubleshooting or special setups, you can override the SMTP smarthost used for voicemail email delivery by setting module environment variables for the NethVoice service.

The supported variables are:

- `SMTP_ENABLED`: enable SMTP smarthost (`1` to enable, empty to disable)
- `SMTP_HOST`: smarthost hostname (example: `smtp.example.com`)
- `SMTP_PORT`: smarthost port
- `SMTP_USERNAME`: smarthost username (example: `foo@example.com`)
- `SMTP_PASSWORD`: smarthost password
- `SMTP_ENCRYPTION`: encryption type (`starttls` or `tls`)
- `SMTP_TLSVERIFY`: verify smarthost TLS certificate (`1` to enable, empty to disable)
- `SMTP_FROM_ADDRESS`: from address for voicemail emails (`nethvoice@example.com` or `NethVoice <nethvoice@example.com>`) 

Add environment variables by editing the module environment file:

```bash
runagent -m nethvoiceX vi environment
```
If you edit the environment, you need to restart the NethVoice service for the changes to take effect.

### Verify current values

From the NS8 node, identify your module instance (for example `nethvoice1`) and run:

```bash
runagent -m nethvoiceX podman exec freepbx env | grep '^SMTP_'
```

## Notes

- If emails are still rejected, verify that the sender address you selected is allowed by the SMTP provider (SPF/DMARC policies can apply).
- If you change only voicemail settings inside the NethVoice advanced interface, you don’t need to restart services.
