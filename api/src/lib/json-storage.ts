import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { env } from '../config/env.js';

interface JsonStorageOptions {
  createIfNotExists?: boolean;
  defaultData?: unknown;
}

async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dir = filePath.substring(0, filePath.lastIndexOf('/'));
  if (dir && !existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

export async function readJsonFile<T>(
  filename: string,
  options: JsonStorageOptions = {}
): Promise<T> {
  const filePath = join(env.DATA_DIR, filename);

  if (!existsSync(filePath)) {
    if (options.createIfNotExists && options.defaultData) {
      await writeJsonFile(filename, options.defaultData);
      return options.defaultData as T;
    }
    throw new Error(`File not found: ${filename}`);
  }

  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    throw new Error(`Failed to read JSON file: ${filename}. ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function writeJsonFile(
  filename: string,
  data: unknown
): Promise<void> {
  const filePath = join(env.DATA_DIR, filename);

  await ensureDirectoryExists(filePath);

  try {
    const content = JSON.stringify(data, null, 2);
    await writeFile(filePath, content, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to write JSON file: ${filename}. ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function appendToJsonArray<T extends { id: string }>(
  filename: string,
  item: T
): Promise<T> {
  const array = await readJsonFile<T[]>(filename, {
    createIfNotExists: true,
    defaultData: [],
  });

  array.push(item);
  await writeJsonFile(filename, array);

  return item;
}

export async function updateJsonArrayItem<T extends { id: string }>(
  filename: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const array = await readJsonFile<T[]>(filename);

  const index = array.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  array[index] = { ...array[index], ...updates };
  await writeJsonFile(filename, array);

  return array[index];
}

export async function deleteJsonArrayItem<T extends { id: string }>(
  filename: string,
  id: string
): Promise<boolean> {
  const array = await readJsonFile<T[]>(filename);

  const index = array.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  array.splice(index, 1);
  await writeJsonFile(filename, array);

  return true;
}

export async function findJsonArrayItem<T extends { id: string }>(
  filename: string,
  id: string
): Promise<T | null> {
  const array = await readJsonFile<T[]>(filename, {
    createIfNotExists: true,
    defaultData: [],
  });

  return array.find((item) => item.id === id) || null;
}
