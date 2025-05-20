import 'reflect-metadata';
import { container } from 'tsyringe';
import { Service } from './service'
import { readFileSync } from 'fs';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/ban-types
type Class = Function;
type Constructable<T = unknown> = new (rawValue: string) => T;
type PropertyKey = string | symbol;
type PropertyType = number | boolean | string | Class;
interface PropertyMetadata {
    type: PropertyType;
    envName?: string;
    schema?: z.ZodType<unknown>;
}

const globalMetadata = new Map<Class, Map<PropertyKey, PropertyMetadata>>();

const readEnv = (envName: string) => {
    if (envName in process.env) return process.env[envName];

    // Read the value from a file, if "_FILE" environment variable is defined
    const filePath = process.env[`${envName}_FILE`];
    if (filePath) return readFileSync(filePath, 'utf8');

    return undefined;
};

export const Config: ClassDecorator = (ConfigClass: Class) => {
    const factory = () => {
        const config = new (ConfigClass as new () => Record<PropertyKey, unknown>)();
        const classMetadata = globalMetadata.get(ConfigClass);
        if (!classMetadata) throw new Error('Invalid config class: ' + ConfigClass.name);

        for (const [key, { type, envName, schema }] of classMetadata) {
            if (typeof type === 'function' && globalMetadata.has(type)) {
                config[key] = container.resolve(type as Constructable);
            } else if (envName) {
                const value = readEnv(envName);
                if (value === undefined) continue;

                if (schema) {
                    const result = schema.safeParse(value);
                    if (!result.success) {
                        const issue = result.error.issues[0];
                        console.warn(`Invalid value for ${envName}: ${issue ? issue.message : 'Unknown validation error'}`);
                        continue;
                    }
                    config[key] = result.data;
                } else if (type === Number) {
                    const parsed = Number(value);
                    if (!isNaN(parsed)) config[key] = parsed;
                } else if (type === Boolean) {
                    config[key] = ['true', '1'].includes(value.toLowerCase());
                } else if (type === Date) {
                    const timestamp = Date.parse(value);
                    if (!isNaN(timestamp)) config[key] = new Date(timestamp);
                } else if (type === String) {
                    config[key] = value;
                } else {
                    config[key] = new (type as Constructable)(value);
                }
            }
        }
        return config;
    };

    container.register(ConfigClass as Constructable, { useFactory: factory });

    // Ensure the class is marked injectable
    Service({ singleton: true })(ConfigClass);
};

export const Nested: PropertyDecorator = (target: object, key: PropertyKey) => {
    const ConfigClass = target.constructor;
    const classMetadata = globalMetadata.get(ConfigClass) ?? new Map<PropertyKey, PropertyMetadata>();
    const type = Reflect.getMetadata('design:type', target, key) as PropertyType;
    classMetadata.set(key, { type });
    globalMetadata.set(ConfigClass, classMetadata);
};

export const Env =
    (envName: string, schema?: PropertyMetadata['schema']): PropertyDecorator =>
        (target: object, key: PropertyKey) => {
            const ConfigClass = target.constructor;
            const classMetadata =
                globalMetadata.get(ConfigClass) ?? new Map<PropertyKey, PropertyMetadata>();

            const type = Reflect.getMetadata('design:type', target, key) as PropertyType;
            const isZodSchema = schema instanceof z.ZodType;
            if (type === Object && !isZodSchema) {
                // eslint-disable-next-line n8n-local-rules/no-plain-errors
                throw new Error(
                    `Invalid decorator metadata on key "${key as string}" on ${ConfigClass.name}\n Please use explicit typing on all config fields`,
                );
            }

            classMetadata.set(key, { type, envName, schema });
            globalMetadata.set(ConfigClass, classMetadata);
        };
