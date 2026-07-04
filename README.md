# ChronosStudio - Visualizador de Tiempo Alternativo

Este proyecto consiste en una aplicación web desarrollada en **Angular standalone** que implementa un sistema interactivo para visualizar el transcurso del tiempo de forma abstracta y conceptual. El proyecto cumple estrictamente con las pautas requeridas, absteniéndose del uso de librerías de componentes externas y basándose en lógica matemática e interna propia.

## Características del Proyecto

- **10 Modos de Visualización:** Implementación de diez interfaces gráficas independientes que representan horas, minutos y segundos a través de analogías mecánicas, físicas y naturales.
- **Flujo de Tiempo Abstracto:** El sistema evita la representación numérica tradicional y se enfoca en animaciones reactivas que expresan visualmente el paso del tiempo.
- **Alteración Temporal de Demostración:** Inclusión de un control deslizante (slider) lineal indexado de 0 a 1439 minutos (las 24 horas del día) para modificar dinámicamente el tiempo interno y facilitar las pruebas en vivo.
- **Módulo de Autenticación:** Sistema de inicio de sesión y registro de usuarios con persistencia de datos configurada a través de `localStorage`.
- **Metadata Complementaria:** Despliegue de variables adicionales en el pie de página que muestran la fecha completa formateada (día, mes y año).

---

## Lógica y Mapeo Matemático de los Visualizadores

La aplicación utiliza un servicio centralizado (`TimeService`) gobernado por **RxJS** que actualiza el estado temporal global cada `100ms`. Los componentes consumen este flujo y aplican las siguientes transformaciones:

1. **⌛ Reloj de Arena Animado:** Mapea el porcentaje del día transcurrido mediante el cálculo de vectores en trazados SVG dinámicos que controlan la altura del vaciado superior e inferior.
2. **🕯️ La Vela del Tiempo:** Reduce proporcionalmente la altura en píxeles del cuerpo de la vela con base en las horas acumuladas, aplicando fluctuaciones de escala a la llama según los segundos.
3. **☀️ Ciclo Solar y Lunar:** Calcula coordenadas de posición sobre un arco de 180° utilizando funciones trigonométricas (`Math.sin` y `Math.cos`) y altera los gradientes de color del fondo según el horario diurno o nocturno.
4. **⛓️ El Péndulo Caótico:** Sincroniza la oscilación angular en CSS mediante lógica condicional basada en los segundos, modificando la amplitud del arco según la hora.
5. **🌱 Crecimiento Orgánico:** Ajusta dinámicamente la altura de la estructura central (tallo) con las horas y genera ramificaciones (hojas) de manera condicional por minuto.
6. **⛽ Medidor de Combustible:** Una barra de progreso que evalúa el tiempo total del día disminuyendo su porcentaje de ocupación de `100%` a `0%`.
7. **💾 Cascada de Código Digital:** Altera la propiedad de duración de animación en CSS (`animation-duration`) de flujos tipográficos utilizando funciones modulares basadas en el segundero.
8. **🌊 Marea y Ondas Concéntricas:** Regula el volumen de un contenedor hidrodinámico utilizando el residuo de los minutos sobre la hora corriente.
9. **🪐 Órbitas Planetarias:** Aplica transformaciones de rotación espacial en CSS (`rotate`) con multiplicadores fijos de $minutos \times 6^\circ$ y $horas \times 15^\circ$ sobre ejes concéntricos.
10. **⚙️ Mecanismo de Engranajes:** Ejecuta rotaciones físicas inversas sobre elementos tipográficos vectoriales acoplados de manera proporcional al paso de los segundos y minutos.

---

## Estructura de Directorios

La aplicación se organiza bajo una arquitectura plana y directa dentro del directorio de código fuente:

```text
src/app/
├── services/       # Servicios de tiempo (RxJS) y persistencia de autenticación (localStorage)
├── auth/           # Lógica, vista y estilos del módulo de login y registro
└── clocks/         # Panel principal de control y componentes de visualización abstracta
