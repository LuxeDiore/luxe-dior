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
import { fileDataProps, productInfo, variantInfo } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
const AddNewVariant = ({
  variants,
  setVariants,
  setItem,
  item,
}: {
  variants: variantInfo[];
  setVariants: React.Dispatch<React.SetStateAction<variantInfo[]>>;
  setItem: React.Dispatch<React.SetStateAction<productInfo>>;
  item: productInfo;
}) => {
  const { toast } = useToast();
  const [newVariant, setNewVariant] = useState<variantInfo>({
    additionalCost: 0,
    name: "",
    images: [],
  });

  const [fileData, setFileData] = useState<fileDataProps[]>([]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      // console.log("Before Uploading : ");
      // console.log("New variant : ", newVariant);
      const imageUrl = data.url;
      let newImages = newVariant.images;
      newImages.push(imageUrl);
      setNewVariant({ ...newVariant, images: newImages });
      // console.log("After Uploading : ");
      // console.log("New variant : ", newVariant);
      // console.log("..............................");

      // setFileData([]);
    },
  });

  const fileUploader = async () => {
    // console.log("Before File Uploader : ");
    // console.log("File data : ", fileData);
    let files = [];

    for (let ele of fileData) {
      files.push(ele.file);
    }

    setFileData([]);
    if (!files.length) {
      return;
    }

    for (let ele of files) {
      await startUpload([ele] as File[], { configId: undefined });
    }
  };

  const fileHandler = async (Files: FileList) => {
    // console.log("Before File Handler : ", fileData);
    for (let i = 0; i < Files.length; i++) {
      let file = Files[i];
      let type = file.type.split("/")[i];

      let image = {
        fileName: file.name,
        type: type,
        file: file,
      };
      setFileData((fileData) => [...fileData, image]);
    }
    // console.log("After File Handler : ", fileData);

    // console.log("..............................");
  };
  async function submitHandler() {
    // console.log("Before Submit Handler :");
    // console.log("item : ", item);
    // console.log("new-variant before : ", newVariant);
    // console.log("file-data before : ", fileData);
    let name = newVariant.name.trim();
    if (name.length == 0) {
      toast({
        title: "Please enter a variant name.",
        variant: "destructive",
      });
      return;
    }

    if (!fileData || fileData!.length == 0) {
      toast({
        title: "Please upload some images for this variant.",
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Uploading images...It may take some time.",
      variant: "default",
    });

    await fileUploader().then(() => {
      let newFileData: fileDataProps[] = [];
      let newNewVariant: variantInfo = {
        additionalCost: 0,
        images: [],
        name: "",
      };

      setVariants((variants) => [...variants, newVariant]);
      setNewVariant(newNewVariant);
      setFileData(newFileData);
      setItem({
        ...item,
        variants: variants,
        variantsCount: variants.length,
      });

      toast({
        title: "Variant added successfully.",
      });

      // console.log("After Submit Handler : ");
      // console.log("item : ", item);
      // console.log("new-variant after : ", newVariant);
      // console.log("file-data after : ", fileData);

      // console.log("..............................");
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            setFileData([]);
            setNewVariant({
              additionalCost: 0,
              images: [],
              name: "",
            });
          }}
        >
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
            <Label htmlFor="new-variant-image" className="sm:text-right">
              Images
            </Label>
            <div className="flex flex-col gap-3 col-span-3">
              <Input
                id="new-variant-image"
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
