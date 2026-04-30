# RenovaBase — Club Sinergético

Plataforma de gestión de renovaciones de membresías conectada a Google Sheets.

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Plataforma web completa (frontend) |
| `manifest.json` | Configuración PWA (app instalable) |
| `sw.js` | Service Worker para funcionamiento offline |
| `icon-192.png` | Ícono de la app (192x192) |
| `icon-512.png` | Ícono de la app (512x512) |
| `RenovaBase_Script_v2.gs` | Script de Google Apps Script (backend) |

## Instalación

### 1. Backend (Google Apps Script)

1. Ve a [script.google.com](https://script.google.com) y crea un nuevo proyecto llamado **RenovaBase**
2. Pega el contenido de `RenovaBase_Script_v2.gs`
3. Ejecuta `inicializarRenovaBase()` una sola vez
4. Despliega como Web App:
   - Implementar → Nueva implementación → Aplicación web
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier usuario**
5. Copia la URL del Web App

### 2. Frontend (GitHub Pages)

1. Crea un repositorio en GitHub (ej. `renovabase`)
2. Sube todos los archivos de esta carpeta
3. Ve a Settings → Pages → Branch: main → Save
4. Tu URL será: `https://tuusuario.github.io/renovabase`

### 3. Credenciales iniciales

- **Usuario:** `admin`
- **Contraseña:** `admin123`
- Cambia la contraseña al entrar por primera vez

## Instalación como App (PWA)

- **Android:** Al abrir la URL, el navegador mostrará un banner "Instalar"
- **iPhone/iPad:** Safari → botón Compartir → "Añadir a inicio"

## Roles

| Rol | Acceso |
|---|---|
| `admin` | Todo: todos los miembros, usuarios, asignación masiva |
| `abeja` | Solo sus miembros asignados (columna Abeja del Sheet) |
