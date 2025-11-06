import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getAllProducts, getProductById, createProduct, deleteProduct, saveProductImage } from "./fileStorage";
import { InsertProduct } from "../drizzle/schema";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(() => getAllProducts()),
    
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getProductById(input.id)),
    
    create: protectedProcedure
      .input(z.object({
        productId: z.string(),
        name: z.string(),
        price: z.string(),
        description: z.string(),
        image: z.string(), // Base64 or URL
        video: z.string().optional(),
        country: z.enum(["SA", "EG", "AE", "IQ"]),
      }))
      .mutation(({ input }) => {
        try {
          // If image is base64, save it
          let imageUrl = input.image;
          if (input.image.startsWith('data:image/')) {
            const base64Data = input.image.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
            imageUrl = saveProductImage(filename, buffer);
          }

          return createProduct({
            productId: input.productId,
            name: input.name,
            price: input.price,
            description: input.description,
            image: imageUrl,
            video: input.video,
            country: input.country as 'SA' | 'EG' | 'AE' | 'IQ',
          } as any);
        } catch (error) {
          console.error('[API] Error creating product:', error);
          throw error;
        }
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteProduct(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
