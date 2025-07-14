import * as fs from 'fs';
import * as path from 'path';

const config = {
  inputDirectory: './libs/kit/icons',
  vectorEffect: 'non-scaling-stroke',
  strokeWidth: '1.4',
};

const strokeElements = ['path', 'line', 'polyline', 'polygon', 'circle', 'ellipse', 'rect'];

function processDirectory(directory: string): void {
  try {
    const files = fs.readdirSync(directory);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');

    console.log(`Found ${svgFiles.length} SVG files in directory: ${directory}`);

    svgFiles.forEach(file => {
      const filePath = path.join(directory, file);
      processSVGFile(filePath);
    });

    console.log('Processing completed!');
  } catch (error: any) {
    console.error(`Error reading directory: ${error.message}`);
  }
}

function processSVGFile(filePath: string): void {
  try {
    console.log(`Processing: ${path.basename(filePath)}`);

    let processedContent = fs.readFileSync(filePath, 'utf8');
    let modificationsCount = 0;

    strokeElements.forEach(elementType => {
      const vectorEffectRegex = new RegExp(`<${elementType}([^>]*?)(/?)>`, 'gi');

      processedContent = processedContent.replace(
        vectorEffectRegex,
        (_, attributes, selfClosing) => {
          let newAttributes = attributes;

          const vectorEffectAttrRegex = /vector-effect\s*=\s*["'][^"']*["']/i;
          if (vectorEffectAttrRegex.test(newAttributes)) {
            newAttributes = newAttributes.replace(
              vectorEffectAttrRegex,
              `vector-effect="${config.vectorEffect}"`
            );
            modificationsCount++;
          } else {
            newAttributes += ` vector-effect="${config.vectorEffect}"`;
            modificationsCount++;
          }

          return `<${elementType}${newAttributes}${selfClosing}>`;
        }
      );
    });

    // Handle stroke-width on <svg>
    const svgRegex = /<svg([^>]*?)>/gi;
    processedContent = processedContent.replace(svgRegex, (match: string, attributes: string) => {
      let newAttributes = attributes;

      const strokeWidthRegex = /stroke-width\s*=\s*["'][^"']*["']/i;
      if (strokeWidthRegex.test(newAttributes)) {
        newAttributes = newAttributes.replace(
          strokeWidthRegex,
          `stroke-width="${config.strokeWidth}"`
        );
        modificationsCount++;
      } else {
        newAttributes += ` stroke-width="${config.strokeWidth}"`;
        modificationsCount++;
      }

      return `<svg${newAttributes}>`;
    });

    if (modificationsCount > 0) {
      fs.writeFileSync(filePath, processedContent);
      console.log(`Modified elements: ${modificationsCount}`);
    } else {
      console.log(`No changes needed`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error}`);
  }
}

// CLI argument override
const args = process.argv.slice(2);
if (args.length > 0) {
  config.inputDirectory = args[0];
}

if (!fs.existsSync(config.inputDirectory)) {
  console.error(`Directory not found: ${config.inputDirectory}`);
  process.exit(1);
}

processDirectory(config.inputDirectory);
