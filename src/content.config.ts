import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const casos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/casos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      /** La pregunta de negocio que originó el caso. */
      question: z.string(),
      summary: z.string(),
      category: z.enum(['ingenieria', 'analisis', 'bi', 'automatizacion']),
      /** Nombres de herramientas; se resuelven a iconos en src/data/tool-refs.ts. */
      stack: z.array(z.string()),
      organization: z.string().optional(),
      role: z.string().optional(),
      period: z.string().optional(),
      impact: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
      /** Si falta, se busca src/assets/images/casos/<slug>.(png|jpg|webp|avif). */
      cover: image().optional(),
      /** Si es true, la página muestra el aviso de anonimización. */
      confidential: z.boolean().default(false),
      links: z.object({ repo: z.url().optional(), demo: z.url().optional() }).default({}),
      featured: z.boolean().default(false),
      order: z.number(),
    }),
});

export const collections = { casos };
