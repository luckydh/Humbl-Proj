/* eslint-disable no-console */
import fetch from "node-fetch";
import fs from "fs/promises";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

const figmaAuthToken = process.env.FIGMA_AUTH_TOKEN;
if (!figmaAuthToken) {
  console.error(`
  Error - No figma auth token found. Add your Figma user auth token to your .env file under
  "FIGMA_AUTH_TOKEN"

  Make sure you read the confluence doc as well: 
  https://humblpay.atlassian.net/wiki/spaces/HC/pages/762052609/Icons+Illustrations+generation
  `);
  process.exit();
}

// https://www.figma.com/file/{designFileKey}/HUMBL-Pay-Mobile?node-id={designNodeId}
const designFileKey = "QPSFMyF0BndoFizvebnr9b";
const designUrl = "https://api.figma.com/v1";
// nodeIds should match up to root container frame nodeid in the design file
const designNodeIds = {
  icons: "11083%3A108479",
  illustrations: "10796%3A105724",
};

const iconsType = process.argv[2];

if (!iconsType || !Object.keys(designNodeIds).includes(iconsType)) {
  console.error(`
  Error - Enter a valid icon type. [${Object.keys(designNodeIds).join(" | ")}]

  Usage
  npm run generate:icons illustrations
  `);
  process.exit();
}

// TODO: drop the "2"
const iconsFolder = `src/assets/${iconsType}2`;
const rootUrl = `${designUrl}/files/${designFileKey}/nodes?ids=${designNodeIds[iconsType]}`;

const requestOptions = {
  headers: {
    "X-Figma-Token": figmaAuthToken,
  },
};

(async () => {
  await resetFolders();

  const iconNodes = await getIconNodes();
  const iconsList = await writeIconsToFiles(iconNodes);
  await writeIndexFile(iconsList.sort());

  console.log(`\nAll done!
  \n*************
  \nEnsure to view the new icons in storybook on Safari as SVGs tend to have issues there.
  \n*************
  `);
})();

async function writeIndexFile(iconsList) {
  console.log("\nBegin index file creation...");

  // capitalize first letter
  const iconTypePrefix = `${iconsType.charAt(0).toUpperCase()}${iconsType.slice(1)}`;
  const tsString = `export type ${iconTypePrefix}Type = keyof typeof ${iconTypePrefix}`;

  let importString = "// ReactComponent triggers a component import instead of a path.";
  let exportString = "";

  iconsList.forEach((icon) => {
    importString += `\nimport { ReactComponent as ${icon}Svg } from "./${icon}.svg";`;
    exportString += `\n\t${icon}: ${icon}Svg,`;
  });

  await fs.writeFile(
    `${iconsFolder}/index.tsx`,
    `${importString}
    \n${tsString};
    \nexport const ${iconTypePrefix} = {${exportString}
}`
  );

  console.log("Index file created succesfully!");
}

async function writeIconsToFiles(icons) {
  const iconsList = [];

  console.log(`\nWriting icons to file system...`);
  for (const icon of icons) {
    const iconName = formatFileName(icon.name);
    const svgUrl = await getSvgUrl(icon);
    const writeSucceded = await writeSvg(svgUrl, iconName);

    if (writeSucceded) {
      iconsList.push(iconName);
    }
  }

  if (iconsList.length) {
    console.log(`${iconsList.length} icon(s) written`);
  } else {
    console.error("Error - No icons were written to file");
    process.exit();
  }

  return iconsList;
}

async function getIconNodes() {
  console.log("\nFetching root node, this could take a bit...");
  const response = await fetch(rootUrl, requestOptions);
  const data = await response.json();

  const rootNode = Object.values(data.nodes)[0];
  const iconNodes = rootNode.document.children;

  if (!iconNodes) {
    console.error("Error getting icon nodes");
    process.exit();
  }

  console.log(`Root node found with ${iconNodes.length} icons`);

  return iconNodes;
}

async function getSvgUrl(icon) {
  const imageUrl = `${designUrl}/images/${designFileKey}/?ids=${icon.id}&format=svg`;
  const imageResponse = await fetch(imageUrl, requestOptions);
  const { err, images } = await imageResponse.json();

  if (err) {
    console.error("Error getting image data", icon.name, err);
    return;
  }

  const svgUrl = Object.values(images)[0];

  return svgUrl;
}

async function writeSvg(svgUrl, svgName) {
  const svgResponse = await fetch(svgUrl, requestOptions);
  const svgData = await svgResponse.text();

  try {
    await fs.writeFile(`${iconsFolder}/${svgName}.svg`, svgData);
    return true;
  } catch (error) {
    console.error("Error writing svg", svgName, error);
    return false;
  }
}

async function resetFolders() {
  try {
    await fs.rm(iconsFolder, { recursive: true });
  } catch (error) {
    // folder didn't exist, all is good
  }

  await fs.mkdir(iconsFolder);
}

function formatFileName(filename) {
  return (
    filename
      .trim()
      .toLowerCase()
      // replace invalid characters
      .replace(/\s+|-/g, "_")
      // remove default icon designs naming suffix
      .replace("_lg", "")
      // remove icons designs naming prefix
      .replace(`${iconsType.slice(0, -1)}_`, "")
  );
}
