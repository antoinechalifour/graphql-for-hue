import { initBridge } from "./init";
import { createApp } from "./app";

const PORT = 3000;

/* APPLICATION BOOTSTRAP */
async function runApp() {
  const { userName } = await initBridge();
  const app = createApp({ userName });

  app.listen(PORT, () => console.log(`Running @ http://localhost:${PORT}`));
}

runApp().catch(err => console.log(err));
