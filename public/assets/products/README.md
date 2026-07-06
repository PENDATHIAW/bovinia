# Images BOVINIA

## Déposer vos visuels

Copiez **tous** les fichiers `.png` / `.jpg` directement ici :

```
public/assets/products/
```

Pas besoin de sous-dossiers. Les noms UUID officiels sont reconnus automatiquement.

## Mettre en ligne (GitHub)

GitHub **n'accepte plus le mot de passe** du compte. Utilisez l'une de ces méthodes :

### Option A — GitHub CLI (le plus simple sur Mac)

```bash
brew install gh
gh auth login
cd ~/Downloads/bovinia
git pull origin main
git push origin main
```

### Option B — Token personnel

1. Sur GitHub : **Settings → Developer settings → Personal access tokens → Generate**
2. Cochez au minimum `repo`
3. Copiez le token, puis :

```bash
cd ~/Downloads/bovinia
git pull origin main
git push https://VOTRE_TOKEN@github.com/PENDATHIAW/bovinia.git main
```

### Option C — SSH

```bash
ssh-keygen -t ed25519 -C "pendathiaw1995@gmail.com"
# Ajoutez ~/.ssh/id_ed25519.pub sur GitHub → Settings → SSH keys
git remote set-url origin git@github.com:PENDATHIAW/bovinia.git
git pull origin main
git push origin main
```

## Après le push

Vercel redéploie automatiquement en 1–2 minutes.  
Rafraîchissez le site avec **Cmd+Shift+R**.

## Fichiers « UUID 2.png »

Les doublons macOS (`fichier 2.png`) sont ignorés — gardez seulement la version sans ` 2`.

## Nouveaux UUID inconnus

Ajoutez-les dans `asset-manifest.json` à côté de ce fichier.
