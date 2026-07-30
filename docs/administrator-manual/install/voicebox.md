---
title: VoiceBox Appliances
sidebar_position: 6
---

# VoiceBox Appliances

VoiceBox appliances are pre-configured hardware devices with NethVoice and NethVoice Proxy already installed and ready to deploy. They combine proven open-source PBX software with reliable enterprise-grade hardware, providing a complete out-of-the-box solution for organizations.

## Overview

VoiceBox appliances include:

- **Pre-installed applications**: NethVoice Proxy and NethVoice
- **NethServer 8 base platform**: Professional infrastructure management
- **Rack-mountable design**: Optional accessory for standard infrastructure integration
- **Quick deployment**: Ready to use after basic network configuration

Physical specifications:

- **Form factor**: Designed for standard data center deployments
- **Rack mounting**: Optional accessory available for standard rack installation
- **Display & keyboard**: Supported for local configuration if SSH is unavailable

:::info
Different VoiceBox models are available through [NethShop](https://nethshop.nethesis.it). Please refer to NethShop for current models and specifications.
:::

## Default configuration

### Network Interfaces

- **Port 1** (Primary): Default management and data interface
- **Default IP**: 192.168.1.1/24
- Multiple network interfaces for flexibility and redundancy

### Default Access

| Parameter | Value |
|-----------|-------|
| Default IP Address | 192.168.1.1/24 |
| Admin URL | https://192.168.1.1/cluster-admin |
| Username | root |
| Password | Nethesis,1234 |
| SSH Port | 22 |

:::warning Change Default Credentials
Change the default password immediately after first login. This is a security requirement.
:::

## Initial Network Configuration

### Step 1: Connect the Appliance

1. Connect the appliance to your network using **Port 1** (primary interface)
2. Ensure the device has internet access and can resolve DNS names
3. The appliance will be reachable at default IP: **192.168.1.1**

### Step 2: Configure Network Settings

Access the appliance using one of these methods:

#### Method A: SSH Configuration (Recommended)

Connect via SSH on port 22 and use the `nmtui` utility:

```bash
ssh root@192.168.1.1
nmtui
```

Configure:
- IP address and gateway
- DNS servers
- Node name (FQDN - must be DNS-resolvable)

#### Method B: Direct Console

If SSH is unavailable:
1. Connect a monitor and keyboard to the appliance
2. Log in with default credentials
3. Use `nmtui` to configure network settings
4. After configuration, the appliance will be accessible via SSH and web interface

### Step 3: Apply Network Changes

After modifying network settings with `nmtui`, restart the NetworkManager service:

```bash
systemctl restart NetworkManager
```

:::warning Critical Network Requirements
The appliance must be:
- Correctly configured on your network
- Able to access the internet
- Able to resolve DNS names

These are prerequisites for certificate generation, clustering, and all NethVoice functions.
:::

## First Steps {#first-steps}

After successful network configuration, follow these steps to bring the appliance into production:

### 1. Set Node Name

Ensure the appliance hostname is properly set and **resolvable via DNS**. This is critical for:
- Certificate generation
- Clustering
- NethVoice Proxy and NethVoice virtual hosts
- Overall system functionality

### 2. Register NS8 Instance

Register the NethServer 8 instance in the service center:
- Access the web interface: https://[appliance-ip]/cluster-admin
- Navigate to **Settings** → **Subscription**
- Complete the registration process

:::note User Database
The appliance comes pre-configured with an internal LDAP user database. To use an existing user database instead, see [User Domains Configuration](nethvoice_install.md#user-domains).
:::

### 3. Enable Let's Encrypt Certificates

Activate automatic HTTPS certificates:
- In the admin interface, go to **Certificates**
- Enable **Let's Encrypt** for automatic certificate provisioning
- Ensure DNS is correctly configured

### 4. Configure NethVoice and the Proxy

Follow [NethVoice Configuration](../configuration/index.md) to complete the setup.

### 5. Configure Backup

Set up automated backup strategy:
- Configure backup destination (local, remote, or cloud)
- Set backup frequency and retention policies
- Test backup and restore procedures

## Reinstallation / Reset

If you need to reinstall NethVoice on a VoiceBox appliance (from previous versions), a bootable ISO image based on Rocky Linux is available for download.

:::danger Data Loss Warning
The ISO installation will completely erase all data on the appliance. Ensure you have backed up any critical configuration before proceeding.
:::

1. **Download ISO Image**
   - Obtain the latest image from the [repository](https://github.com/NethServer/ns8-rocky-iso/releases)

2. **Create Bootable USB**
   - Write the ISO image to a USB flash drive
   - On Linux: `dd if=nethvoice-8.iso of=/dev/sdX bs=4M`
   - On macOS: `diskutil unmountDisk /dev/diskX && sudo dd if=nethvoice-8.iso of=/dev/rdiskX bs=4M`
   - On Windows: Use Etcher, Rufus, or similar tool

3. **Boot from USB**
   - Insert the USB drive into the VoiceBox
   - Power on or restart the appliance
   - Boot from USB (check BIOS/UEFI settings if needed)

4. **Automatic Installation**
   - Select **NethServer 8 (Rocky Linux)** entry, if the entry is not available, access
   the BIOS/UEFI boot menu to select an alternative boot device
   - The installation process is completely automatic
   - No user intervention required
   - The system will power off when installation is complete

5. **After Installation**
   - Power on the appliance
   - Make sure the appliance can still access Internet
   - The appliance restarts and installs NethServer along with NethVoice

## Troubleshooting

### Cannot Access Web Interface

**Problem**: Unable to reach https://192.168.1.1/cluster-admin

**Solutions**:
1. Verify the appliance is powered on and connected to the network
2. Confirm your network can reach 192.168.1.1 (may need to configure your PC in the same subnet temporarily)
3. Check network cable connection to Port 1
4. Verify firewall rules allow HTTPS (port 443)
5. Try SSH access: `ssh root@192.168.1.1` to verify network connectivity

### SSH Access Unavailable

**Problem**: Cannot connect via SSH to configure network

**Solutions**:
1. Connect monitor and keyboard directly to the appliance
2. Use `nmtui` from the local console to configure network settings
3. After configuration, restart NetworkManager: `systemctl restart NetworkManager`
4. Try SSH access from your client

### DNS Resolution Issues

**Problem**: Appliance cannot resolve DNS names

**Solutions**:
1. Connect via SSH or console
2. Use `nmtui` to verify DNS servers are configured
3. Test DNS from the appliance: `nslookup google.com`
4. Ensure DNS servers are external (not configured as 192.168.1.1)
5. Verify firewall allows DNS traffic (port 53 UDP/TCP)

### Certificate Generation Fails

**Problem**: Let's Encrypt certificate activation fails

**Likely causes**:
- DNS is not correctly configured or not resolving the FQDN
- Firewall is blocking outbound HTTPS (port 443) to Let's Encrypt services
- Node name is not resolvable via DNS

**Solutions**:
1. Verify DNS is working: `nslookup [appliance-fqdn]`
2. Ensure node name is set correctly and resolvable
3. Check outbound internet connectivity
4. Review system logs for certificate errors

## Support

For technical support and issues:

- Consult the [NethVoice Administrator Manual](../index.md)
- Review [NethServer 8 Documentation](https://docs.nethserver.org/projects/ns8/)
- Contact Nethesis support if you have a subscription via [Helpdesk](https://helpdesk.nethesis.it)




