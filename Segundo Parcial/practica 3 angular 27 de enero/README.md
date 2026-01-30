# 🛠️ Problema de carga de datos en Angular 21 (Zone.js)

Este README explica un problema común en **Angular 21** donde los datos **sí se obtienen del backend**, pero **no se renderizan en la vista** hasta que se fuerza una recarga (guardar archivo / hot reload).

## 🔍 Causa real

El problema ocurre por una **configuración incompleta de Zone.js**.

En Angular 17+ (y especialmente Angular 21):

- Si la aplicación **usa change detection con Zone.js**
- Y se registra `provideZoneChangeDetection(...)`
- **Pero Zone.js no está importado**

Angular entra en un estado inconsistente:

- La app arranca
- HTTP funciona
- ❌ Change Detection NO se ejecuta automáticamente

---

## 💥 Error relacionado (cuando se intenta arreglar)

Al agregar `provideZoneChangeDetection` sin Zone.js, aparece:

```
RuntimeErro: NG0908: In this configuration Angular requires Zone.js
```

Esto indica que **Angular espera Zone.js pero no lo encuentra cargado**.

---

## ✅ Solución correcta (paso a paso)

### 1️⃣ Instalar Zone.js (si no está instalado)

```bash
npm install zone.js
```

---

### 2️⃣ Importar Zone.js en `main.ts`

Este paso es **obligatorio**.

```ts
import "zone.js";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
```

---

### 3️⃣ Configurar correctamente `app.config.ts`

```ts
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
```

---

## 🧠 Resultado

Con esta configuración:

- Angular detecta correctamente los cambios
- Los `subscribe()` disparan change detection
- `@if`, `@for` y bindings se actualizan automáticamente
- Los datos se muestran **sin necesidad de recargar**

## 📌 Recomendación

Si el proyecto es un CRUD o app estándar:

👉 **Usar Zone.js correctamente** (como en este README)

Zoneless + Signals se recomienda solo cuando se domina bien el flujo de change detection.

---
