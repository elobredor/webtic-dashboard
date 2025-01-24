Aquí tienes una versión mejorada y más detallada del README con instrucciones más claras y mejor estructuradas:

---

## **DASBOARD WEBTIC**

Este proyecto es un dashboard reutilizable diseñado para ser integrado con nuestra librería de componentes **Webtic UI**. A continuación, te guiaré a través de los pasos para configurar y personalizar el dashboard.

---

### **Pasos para la Configuración**

#### 1. **Configurar Enlaces y Vistas**

- **Ubicación:** `/config/Links.ts`
- Aquí puedes configurar los enlaces principales del dashboard, personalizando las vistas y asignando los íconos correspondientes.
- Si deseas agregar sub-enlaces, puedes hacerlo directamente en esta configuración.

**Ejemplo:**

```ts
export const links = [
	{ href: "/dashboard", label: "Dashboard", icon: HomeIcon },
	{ href: "/dashboard/solicitudes", label: "Solicitudes", icon: RequestIcon },
	{
		href: "/dashboard/settings",
		label: "Settings",
		icon: SettingsIcon,
		subLinks: [
			{ href: "/dashboard/settings/profile", label: "Profile" },
			{ href: "/dashboard/settings/security", label: "Security" },
		],
	},
];
```

#### 2. **Crear las Vistas**

- **Ubicación:** `/app`
- Recuerda que estamos usando el **App Router** de Next.js, así que crea las vistas correspondientes en las carpetas adecuadas.
- Cada enlace que agregues en `/config/Links.ts` deberá tener su vista correspondiente en la estructura de `/app`.
- Si creas sub-enlaces, asegúrate de organizar las vistas en carpetas dentro de `/app/dashboard`.

**Ejemplo:**

```bash
/app
  ├── dashboard
  │   ├── page.tsx
  │   ├── solicitudes
  │   │   └── page.tsx
  │   └── settings
  │       ├── page.tsx
  │       ├── profile
  │       └── security
  └── login
      └── page.tsx
```

#### 3. **Configurar las Variables de Entorno**

- **Ubicación:** `.env` o `/config/api.config.ts`
- Asegúrate de declarar las variables necesarias para la configuración de la API.
- En el archivo `.env`, puedes declarar la URL de la API que utilizará el dashboard.

**Ejemplo de `.env`:**

```env
API_URL=https://mi-api.com
```

- Alternativamente, puedes declarar esta configuración directamente en el archivo `/config/api.config.ts`.

**Ejemplo de `api.config.ts`:**

```ts
export const apiConfig = {
	API_URL: "https://mi-api.com",
};
```

---

### **Uso de Webtic UI**

El proyecto utiliza la librería **Webtic UI**, que es un conjunto de componentes reutilizables para acelerar el desarrollo y mantener la coherencia visual en la interfaz.

#### **Instrucciones Generales:**

1. **Instalar Webtic UI:**

   - Si no lo has hecho aún, asegúrate de instalar **Webtic UI** en tu proyecto:
     ```bash
     npm install webtic-ui
     ```

2. **Importar Componentes:**

   - Para usar los componentes de **Webtic UI**, solo importa el componente que necesitas dentro de tu archivo.

   **Ejemplo:**

   ```tsx
   import { Datatable } from "webtic-ui";

   const MyComponent = () => {
   	return <DataTable data={data} columns={columns} tableId={"seller"} />;
   };
   ```

3. **Customización:**
   - Si necesitas personalizar algún componente de Webtic UI (como cambiar colores o tamaños), consulta la documentación de la librería para ajustar los estilos o crear temas personalizados.

---

### **Subir Assets**

Si necesitas subir cualquier asset, como el logo o imágenes, colócalos en la carpeta `public` de tu proyecto.

#### **Ejemplo:**

1. Coloca tu logo dentro de la carpeta `public`:

   ```bash
   /public/logo.png
   ```

2. Luego, usa el logo en tus vistas de esta manera:

   ```tsx
   import Image from "next/image";

   const MyComponent = () => {
   	return <Image src="/logo.png" alt="Logo Webtic" width={100} height={100} />;
   };
   ```

---

### **Resumen del Flujo de Trabajo**

1. **Configura tus enlaces** en `/config/Links.ts`.
2. **Crea las vistas correspondientes** en `/app`.
3. **Declara las variables de entorno** en `.env` o `/config/api.config.ts`.
4. **Usa los componentes de Webtic UI** para construir la interfaz.
5. **Sube tus assets** a la carpeta `public`.

---

### **Conclusión**

Con estos pasos, puedes configurar y personalizar el dashboard de manera efectiva y sencilla. Recuerda seguir la estructura del App Router y usar Webtic UI para mantener la consistencia y eficiencia en tu desarrollo.

---

¡Listo para trabajar en tu dashboard! Si tienes alguna duda o necesitas ayuda adicional, no dudes en preguntar.
