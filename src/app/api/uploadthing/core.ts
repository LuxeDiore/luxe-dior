import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import databaseConnect from "@/lib/db";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 100 } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return file.url;
      //   await databaseConnect();

      //   const { configId } = metadata.input;

      //   const res = await fetch(file.url);
      //   const buffer = await res.arrayBuffer();
      //   const imgMetaData = await sharp(buffer).metadata();
      //   const { height, width } = imgMetaData;

      //   if (!configId) {
      //     const configuration = await db.configuration.create({
      //       data: {
      //         height: height || 500,
      //         width: width || 500,
      //         imageUrl: file.url,
      //       },
      //     });
      //     return { configId: configuration.id };
      //   } else {
      //     const updatedConfiguration = await db.configuration.update({
      //       where: {
      //         id: configId,
      //       },
      //       data: {
      //         croppedImageUrl: file.url,
      //       },
      //     });
      //     return { configId: updatedConfiguration.id };
      //   }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
