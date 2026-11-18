# Hosting the hub on the Beelink

The hub stays a plain website: the same files GitHub Pages serves. On the Beelink, three
small Docker containers run it next to Nexora without touching it:

| Container | Job |
|---|---|
| `sync` | Keeps a copy of this repository up to date. Pulls every 5 minutes, so new training plans published by the scheduled task appear automatically. |
| `web` | Serves that copy with nginx. Hides `.git` and `work/`, and never caches `data/`. |
| `tunnel` | Cloudflare Tunnel: gives the hub a public HTTPS address without forwarding ports on the router. |

GitHub Pages keeps working as the backup. If the Beelink, the power or the internet goes down
on workshop day, send people the GitHub Pages link instead.

## Keeping it separate from Nexora

- Its own Compose project name (`ai-workshop`), so `docker compose` commands here never touch Nexora's containers.
- Its own Docker network and volume (created automatically).
- Its own tunnel and hostname in Cloudflare. Don't reuse Nexora's tunnel token.
- Only port 8090 on the Beelink is used, for testing at home. Change it in `docker-compose.yml` if Nexora already uses 8090.

## One-time setup

1. **Docker.** Check it's installed on the Beelink: `docker compose version`.
2. **Cloudflare tunnel.** You need a domain on Cloudflare.
   1. Go to Cloudflare Zero Trust, then Networks, then Tunnels, then Create a tunnel (type: Cloudflared). Name it `ai-workshop`.
   2. Copy the token from the install step; you don't need to run their install command.
   3. Add a public hostname, for example `workshop.<your-domain>`. Set the service type to **HTTP** and the URL to **`web:80`**.
3. **Get the files onto the Beelink.** Clone this repository, or copy just this `deploy/` folder.
4. **Settings.** In `deploy/`, copy `.env.example` to `.env` and paste the tunnel token.
5. **Start it.** From the `deploy/` folder:

   ```
   docker compose --env-file .env up -d
   ```

6. **Check it.**
   - On the home network: `http://<beelink-ip>:8090` shows the hub.
   - Anywhere else: `https://workshop.<your-domain>`.
   - Logs: `docker compose logs -f sync` (pulls) or `docker compose logs -f tunnel` (connection).

## Day to day

- **Updating content:** change files on GitHub (or merge a pull request). The Beelink picks the change up within 5 minutes.
- **Restart after a power cut:** the containers restart on their own when Docker starts. Make sure Docker is set to start at boot.
- **Stopping:** `docker compose down` in `deploy/`. Nexora keeps running.

## Workshop day checklist

- [ ] The day before, open the public address from a phone on mobile data, not home Wi-Fi.
- [ ] Open the Workshop day page: `https://workshop.<your-domain>/#workshop-hr` or `#workshop-cx`.
- [ ] Have the GitHub Pages link ready as the backup.

## Privacy

Only what is already public in this repository is served: the hub, the activity library,
de-identified plans and made-up practice files. Survey answers never reach the Beelink.
They stay in the private sheet, and only the privacy-checked plans are published.
