const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../src/app/learn/(content)');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      if (file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const allPages = walkDir(basePath);

const stubContent = `export default function Page() {
  return null;
}
`;

const newContent = `import { Callout } from "@/components/ui/Callout";

export default function ComingSoonPage() {
  return (
    <Callout icon="🚧" className="bg-[#f8fafc] border-[#e2e8f0]">
      <div className="text-[#475569]">
        <strong>Content coming soon!</strong> The curriculum for this lesson is currently being written. Use the arrow keys (← →) or the button below to continue exploring the platform!
      </div>
    </Callout>
  );
}
`;

let count = 0;
allPages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content === stubContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    count++;
  }
});

console.log(`Replaced ${count} empty stub pages with rich placeholders.`);
