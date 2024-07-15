import app from "./index";
import { swaggerDocs as V1SwaggerDocs } from './v1/swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  V1SwaggerDocs(app, PORT);
});