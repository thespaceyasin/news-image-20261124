import fs from "node:fs";
import path from "node:path";

const PNG_MAGIC = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const MAX_PNG_BYTES = 1_048_576;
const EXPECTED_DIM = 1024;

function validatePng(buf: Buffer, filePath: string): void {
  if (buf.length < 33 || !buf.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error(`Invalid PNG signature in ${filePath}`);
  }
  if (buf.length > MAX_PNG_BYTES) {
    throw new Error(`PNG exceeds 1 MiB limit (${buf.length} bytes)`);
  }

  let offset = 8;
  let sawIhdr = false;
  let sawIend = false;

  while (offset + 12 <= buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString("ascii");
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const crcEnd = dataEnd + 4;

    if (crcEnd > buf.length) {
      throw new Error(`Truncated PNG chunk ${type} in ${filePath}`);
    }

    if (type === "IHDR") {
      if (length !== 13) {
        throw new Error(`Invalid IHDR length ${length}`);
      }
      const width = buf.readUInt32BE(dataStart);
      const height = buf.readUInt32BE(dataStart + 4);
      if (width !== EXPECTED_DIM || height !== EXPECTED_DIM) {
        throw new Error(`Expected ${EXPECTED_DIM}x${EXPECTED_DIM}, got ${width}x${height}`);
      }
      sawIhdr = true;
    }

    offset = crcEnd;
    if (type === "IEND") {
      sawIend = true;
      break;
    }
  }

  if (!sawIhdr || !sawIend || offset !== buf.length) {
    throw new Error(`Malformed PNG chunk stream in ${filePath}`);
  }
}

function main(): void {
  const botDir = path.resolve(process.env.MAKEFUN_BOT_DIR || process.cwd());
  const outDir = path.resolve(process.env.MAKEFUN_OUTPUT_DIR || process.cwd());

  const srcPath = path.join(botDir, "entry.png");
  const dstPath = path.join(outDir, "entry.png");

  const data = fs.readFileSync(srcPath);
  validatePng(data, srcPath);

  if (path.resolve(srcPath) !== path.resolve(dstPath)) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(dstPath, data, { mode: 0o644 });
  }
  console.log(`Verified & emitted ${dstPath} (1024x1024 PNG, ${data.length} bytes)`);
}

main();
