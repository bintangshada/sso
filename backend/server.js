import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

dotenv.config();
const app = express();

// Setup JWT Middleware untuk verifikasi token
const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri:
      "http://localhost:8080/realms/kampus/protocol/openid-connect/certs",
  }),
  algorithms: ["RS256"],
});

// Setup middleware
app.use(cors());
app.use(express.json());

// Endpoint yang dilindungi (misal hanya untuk Dosen)
app.get("/protected/dosen", jwtCheck, (req, res) => {
  if (req.user.realm_access.roles.includes("Dosen")) {
    res.json({ message: "Selamat datang di halaman Dosen!" });
  } else {
    res.status(403).json({ message: "Access Forbidden" });
  }
});

// Jalankan server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
