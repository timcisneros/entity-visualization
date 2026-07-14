import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

async function sourceFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
        else if (/\.(?:css|js|json)$/.test(entry.name)) files.push(path);
    }
    return files;
}

test('professional environment identifiers are not committed', async () => {
    const files = await sourceFiles(fileURLToPath(new URL('../src/', import.meta.url)));
    const contents = await Promise.all(
        files.map((file) => readFile(file, 'utf8')),
    );
    const source = contents.join('\n');

    assert.doesNotMatch(source, /springcm\.com/i);
    assert.doesNotMatch(source, /us-east-1_[a-z0-9]+/i);
    assert.doesNotMatch(source, /Demo123|demo@example\.com/i);
});

test('repository includes safe configuration and publication guidance', async () => {
    const [example, readme, notice] = await Promise.all([
        readFile(new URL('../.env.example', import.meta.url), 'utf8'),
        readFile(new URL('../README.md', import.meta.url), 'utf8'),
        readFile(new URL('../NOTICE.md', import.meta.url), 'utf8'),
    ]);

    assert.match(example, /VITE_COGNITO_USER_POOL_ID/);
    assert.match(readme, /anonymized demonstration data/i);
    assert.match(notice, /no license is granted/i);
});

test('Vite preserves the browser global expected by legacy dependencies', async () => {
    const config = await readFile(new URL('../vite.config.js', import.meta.url), 'utf8');

    assert.match(config, /global:\s*['"]globalThis['"]/);
});
