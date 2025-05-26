import { readdir, copyFile, stat, unlink } from 'fs/promises';
import { join } from 'path';

async function copyFiles() {
    const migrationsRoot = join('src', 'migrations');
    const seedersRoot = join('src', 'seeders');

    try {
        const migrationSubfolders = (await readdir(migrationsRoot, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .sort()
            .reverse();
        const seederSubfolders = (await readdir(seedersRoot, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .sort()
            .reverse();
        
        const existingMigrationFiles = (await readdir(migrationsRoot, { withFileTypes: true }))
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.js'))
            .map(dirent => join(migrationsRoot, dirent.name));
        const existingSeederFiles = (await readdir(seedersRoot, { withFileTypes: true }))
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.js'))
            .map(dirent => join(seedersRoot, dirent.name));

        for (const file of existingMigrationFiles) {
            await unlink(file);
            console.log(`Removed existing migration: ${file}`);
        }
        for (const file of existingSeederFiles) {
            await unlink(file);
            console.log(`Removed existing seeder: ${file}`);
          }

        if (migrationSubfolders.length > 0) {
            const latestMigrationFolder = join(migrationsRoot, migrationSubfolders[0]);
            const migrationFiles = (await readdir(latestMigrationFolder)).sort();
            for (const file of migrationFiles) {
                const srcPath = join(latestMigrationFolder, file);
                const destPath = join(migrationsRoot, file);
                await copyFile(srcPath, destPath);
                console.log(`Copied migration: ${srcPath} to ${destPath}`);
            }
          }

        if (seederSubfolders.length > 0) {
            const latestSeederFolder = join(seedersRoot, seederSubfolders[0]);
            const seederFiles = (await readdir(latestSeederFolder)).sort();
            for (const file of seederFiles) {
                const srcPath = join(latestSeederFolder, file);
                const destPath = join(seedersRoot, file);
                await copyFile(srcPath, destPath);
                console.log(`Copied seeder: ${srcPath} to ${destPath}`);
            }
          }

        console.log('All files copied successfully.');
    } catch (error) {
        console.error('Error copying files:', error.message);
    }
}

async function main() {
    await copyFiles();
}

main();