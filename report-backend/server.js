import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import archiver from "archiver";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow large HTML payloads

app.post("/generate-zip", async (req, res) => {
  try {
    const { files } = req.body; // files = [{ fileName, html }]
    if (!Array.isArray(files) || files.length === 0)
      return res.status(400).json({ error: "No files provided" });

    const tmpDir = path.join(process.cwd(), "tmp_reports");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      for (const item of files) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });
        await page.setContent(item.html, { waitUntil: "networkidle0" });
        const pdfPath = path.join(tmpDir, `${item.fileName}.pdf`);
        await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
        await page.close();
      }
    } finally {
      await browser.close();
    }

    // Create zip file
    const zipPath = path.join(process.cwd(), `reports_${Date.now()}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      res.download(zipPath, "report_cards.zip", (err) => {
        try {
          fs.unlinkSync(zipPath);
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (e) {}
      });
    });

    archive.pipe(output);
    archive.directory(tmpDir, false);
    await archive.finalize();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
