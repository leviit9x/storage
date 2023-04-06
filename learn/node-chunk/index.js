const fs = require("fs");
const path = require("path");

// Bit	1 Bit	1/8
// Nibble	4 Bits	1/2 (rare)
// Byte	8 Bits	1
// Kilobyte	1024 Bytes	1024
// Megabyte	1, 024 Kilobytes	1, 048, 576
// Gigabyte	1, 024 Megabytes	1, 073, 741, 824
// Terrabyte	1, 024 Gigabytes	1, 099, 511, 627, 776
// Petabyte	1, 024 Terabytes	1, 125, 899, 906, 842, 624
// Exabyte	1, 024 Petabytes	1, 152, 921, 504, 606, 846, 976
// Zettabyte	1, 024 Exabytes	1, 180, 591, 620, 717, 411, 303, 424
// Yottabyte	1, 024 Zettabytes	1, 208, 925, 819, 614, 629, 174, 706, 176

const CHUNK_SIZE = 1024; // 1KB chunk size
/**
 * Split a file into chunks and write each chunk to a separate file.
 * @param {string} filePath - Path to the file to split.
 * @param {string} outputDir - Path to the directory where the chunks will be written.
 * @returns {Promise<string[]>} An array of paths to the chunk files.
 */
async function splitFileIntoChunks(filePath, outputDir) {
  const chunkPaths = [];
  let fileOffset = 0;
  let chunkIndex = 0;

  const fileStream = fs.createReadStream(filePath, {
    highWaterMark: CHUNK_SIZE,
  });

  return new Promise((resolve, reject) => {
    fileStream.on("readable", async () => {
      let chunk;
      while ((chunk = fileStream.read(CHUNK_SIZE)) !== null) {
        const chunkPath = path.join(outputDir, `chunk-${chunkIndex}.bin`);
        await fs.promises.writeFile(chunkPath, chunk);

        chunkPaths.push(chunkPath);
        fileOffset += chunk.length;
        chunkIndex++;
      }
    });

    fileStream.on("end", () => {
      resolve(chunkPaths);
    });

    fileStream.on("error", reject);
  });
}

/**
 * Reconstruct a file from its chunks.
 * @param {string[]} chunkPaths - An array of paths to the chunk files.
 * @param {string} outputFilePath - Path to the file to reconstruct.
 * @returns {Promise<void>}
 */
async function reconstructFileFromChunks(chunkPaths, outputFilePath) {
  const outputStream = fs.createWriteStream(outputFilePath);

  for (const chunkPath of chunkPaths) {
    const chunkStream = fs.createReadStream(chunkPath);
    await new Promise((resolve, reject) => {
      chunkStream.pipe(outputStream, { end: false });
      chunkStream.on("error", reject);
      chunkStream.on("end", resolve);
    });
  }

  outputStream.end();
}
// Example usage:
(async () => {
  const inputFile = "Screenshot 2023-01-21 at 23.25.32.png";
  const outputDir = "chunks";
  const outputFilePath = "reconstructed.png";
  // Split the file into chunks
  splitFileIntoChunks(inputFile, outputDir)
    .then((chunkPaths) => {
      console.log("chunkPaths", chunkPaths);
      reconstructFileFromChunks(chunkPaths, outputFilePath).then(() => {
        console.log("File reconstructed successfully.");
      });
    })
    .catch((e) => {
      console.log("e", e);
    });
})();
