const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  inputDirectory: '/libs/kit/icons',
  vectorEffect: 'non-scaling-stroke', // 'none' or 'non-scaling-stroke'
  strokeWidth: '1.5', // any number
};

const strokeElements = ['path', 'line', 'polyline', 'polygon', 'circle', 'ellipse', 'rect'];

function processDirectory(directory) {
  try {
    const files = fs.readdirSync(directory);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');

    console.log(`Found ${svgFiles.length} SVG files in directory: ${directory}`);

    svgFiles.forEach(file => {
      const filePath = path.join(directory, file);
      processSVGFile(filePath);
    });

    console.log('Processing completed!');
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
  }
}

function processSVGFile(filePath) {
  try {
    console.log(`Processing: ${path.basename(filePath)}`);

    const content = fs.readFileSync(filePath, 'utf8');
    let processedContent = content;
    let modificationsCount = 0;

    strokeElements.forEach(elementType => {
      const regex = new RegExp(`<${elementType}([^>]*?)>`, 'gi');

      processedContent = processedContent.replace(regex, (match, attributes) => {
        let newAttributes = attributes;

        // Add vector-effect
        if (!newAttributes.includes('vector-effect=')) {
          newAttributes += ` vector-effect="${config.vectorEffect}"`;
          modificationsCount++;
        }

        // Add stroke-width
        if (!newAttributes.includes('stroke-width=')) {
          newAttributes += ` stroke-width="${config.strokeWidth}"`;
          modificationsCount++;
        }

        return `<${elementType}${newAttributes}>`;
      });
    });

    if (modificationsCount > 0) {
      fs.writeFileSync(filePath, processedContent);
      console.log(`  Modified elements: ${modificationsCount}`);
    } else {
      console.log(`  No changes needed`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
  }
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.length > 0) {
  config.inputDirectory = args[0];
}

// Check if directory exists
if (!fs.existsSync(config.inputDirectory)) {
  console.error(`Directory not found: ${config.inputDirectory}`);
  process.exit(1);
}

console.log(`Directory: ${config.inputDirectory}`);
console.log(`Vector Effect: ${config.vectorEffect}`);
console.log(`Stroke Width: ${config.strokeWidth}`);

processDirectory(config.inputDirectory);
