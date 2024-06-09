import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fileDataProps, variantInfo } from "@/types/product";
import cloudinaryUploader from "@/utils/cloudinary";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
const AddNewVariant = ({
  variants,
  setVariants,
}: {
  variants: variantInfo[];
  setVariants: React.Dispatch<React.SetStateAction<variantInfo[]>>;
}) => {
  const { toast } = useToast();
  const [newVariant, setNewVariant] = useState<variantInfo>({
    additionalCost: 0,
    name: "",
    images: [],
  });

  const [isPending, startTransition] = useTransition();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const imageUrl = data.url;
      let newImages = newVariant.images;
      newImages.push(imageUrl);
      setNewVariant({ ...newVariant, images: newImages });
      setFileData([]);
    },
  });

  const [fileData, setFileData] = useState<fileDataProps[]>([]);
  const fileUploader = async () => {
    let files = [];

    for (let ele of fileData) {
      files.push(ele.file);
    }

    if (!files.length) {
      return;
    }
    startUpload(files as File[], { configId: undefined });

    // for (let ele of fileData!) {
    //   let data = await cloudinaryUploader({
    //     ele: ele.file!,
    //     location: "variant-images",
    //     type: ele.type,
    //   });

    //   ans.push(data);
    // }

    // return ans;
  };

  const fileHandler = async (Files: FileList) => {
    let newFileData = fileData;
    for (let i = 0; i < Files.length; i++) {
      let file = Files[i];
      let type = file.type.split("/")[i];

      let image = {
        fileName: file.name,
        type: type,
        file: file,
      };
      newFileData?.push(image);
    }
    setFileData(newFileData);
  };
  async function submitHandler() {
    let name = newVariant.name.trim();
    if (name.length == 0) {
      console.log(newVariant);
      toast({
        title: "Please enter a variant name.",
        variant: "destructive",
      });
      return;
    }

    if (fileData.length == 0) {
      toast({
        title: "Please upload some images for this variant.",
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Uploading images...",
      variant: "default",
    });

    await fileUploader().then(() => {
      let newVariants = variants;
      newVariants.push({
        name: newVariant.name,
        additionalCost: newVariant.additionalCost,
        images: newVariant.images,
      });
      setNewVariant({
        additionalCost: 0,
        images: [],
        name: "",
      });
      setVariants(newVariants);
      toast({
        title: "Variant added successfully.",
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          Add new variant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Variant</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="sm:grid sm:grid-cols-4 flex flex-col sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newVariant.name}
              onChange={(e) =>
                setNewVariant({ ...newVariant, name: e.target.value })
              }
            />
          </div>
          <div className="sm:grid sm:grid-cols-4 flex flex-col sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Additional Cost
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newVariant.additionalCost}
              type="number"
              onChange={(e) =>
                setNewVariant({
                  ...newVariant,
                  additionalCost: e.target.valueAsNumber,
                })
              }
            />
          </div>
          <div className="sm:grid sm:grid-cols-4 flex flex-col sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Images
            </Label>
            <div className="flex flex-col gap-3 col-span-3">
              <Input
                id="name"
                className="w-full"
                multiple
                type="file"
                required
                onChange={(e) => {
                  fileHandler(e.target.files!);
                  e.target.value = "";
                }}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-4 flex flex-col sm:items-center gap-2 sm:gap-4">
            <div></div>
            <div className="flex flex-col col-span-3 gap-1">
              {fileData?.map((image, key) => {
                return (
                  <div key={key} className="">
                    <Badge className="gap-2 hover:bg-red-600">
                      <span>{image?.fileName}</span>
                      <X
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => {
                          let newFiles = fileData.filter((e) => {
                            if (e.fileName !== image.fileName) return e;
                          });

                          setFileData(newFiles);
                        }}
                      />
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitHandler}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewVariant;
