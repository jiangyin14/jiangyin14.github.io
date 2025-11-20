import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const INPUT_PATH = path.resolve('public/images/author.jpeg')
const OUTPUT_DIR = path.resolve('public/images/logo')

/**
 * Ensure output directory exists; create if missing.
 */
async function ensureOutputDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
}

/**
 * Convert source image to square WebP icons at given sizes with center crop.
 */
async function generateWebpFavicons(input, outDir, sizes) {
  const tasks = sizes.map(async (size) => {
    const outFile = path.join(outDir, `favicon-${size}x${size}.webp`)
    await sharp(input)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .webp({ quality: 85 })
      .toFile(outFile)
    return outFile
  })
  return Promise.all(tasks)
}

/**
 * Generate multi-resolution favicon.ico from PNG layers.
 */
async function generateFaviconIco(input, outDir, icoSizes = [16, 32, 48, 64]) {
  const pngBuffers = await Promise.all(
    icoSizes.map((size) =>
      sharp(input)
        .resize(size, size, { fit: 'cover', position: 'centre' })
        .png({ compressionLevel: 9 })
        .toBuffer()
    )
  )
  const icoBuffer = await pngToIco(pngBuffers)
  const icoPath = path.join(outDir, 'favicon.ico')
  await fs.writeFile(icoPath, icoBuffer)
  return icoPath
}

/**
 * Create a square logo.webp at the maximum favicon size.
 */
async function generateLogoWebp(input, outDir, size) {
  const outFile = path.join(outDir, 'logo.webp')
  await sharp(input)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .webp({ quality: 90 })
    .toFile(outFile)
  return outFile
}

/**
 * Generate logo.svg embedding a 128x128 PNG from source.
 */
async function generateLogoSvg(input, outDir, size = 128) {
  const pngBuffer = await sharp(input)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toBuffer()
  const base64 = pngBuffer.toString('base64')
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n` +
    `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n` +
    `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}" xml:space="preserve">` +
    `<image width="${size}" height="${size}" x="0" y="0" href="data:image/png;base64,${base64}"/></svg>\n`
  const outFile = path.join(outDir, 'logo.svg')
  await fs.writeFile(outFile, svg)
  return outFile
}

/**
 * Orchestrate all conversions from `author.jpeg` into `public/images/logo/`.
 */
async function main() {
  await ensureOutputDir(OUTPUT_DIR)
  const faviconSizes = [32, 96, 256, 512]
  const webpPaths = await generateWebpFavicons(INPUT_PATH, OUTPUT_DIR, faviconSizes)
  const icoPath = await generateFaviconIco(INPUT_PATH, OUTPUT_DIR)
  const logoPath = await generateLogoWebp(INPUT_PATH, OUTPUT_DIR, Math.max(...faviconSizes))
  const logoSvgPath = await generateLogoSvg(INPUT_PATH, OUTPUT_DIR, 128)
  console.log('Generated files:')
  for (const p of webpPaths) console.log('-', p)
  console.log('-', icoPath)
  console.log('-', logoPath)
  console.log('-', logoSvgPath)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})